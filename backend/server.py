from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

from fastapi import FastAPI, APIRouter, HTTPException, Request, Depends
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import uuid
import bcrypt
import jwt
from typing import Optional
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from datetime import datetime, timezone, timedelta

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

JWT_SECRET = os.environ['JWT_SECRET']
JWT_ALGORITHM = "HS256"
ADMIN_PASSWORD_HASH = bcrypt.hashpw(os.environ['ADMIN_PASSWORD'].encode(), bcrypt.gensalt()).decode()
MAX_ATTEMPTS = 5
LOCKOUT_MINUTES = 15

app = FastAPI()
api_router = APIRouter(prefix="/api")
admin_router = APIRouter(prefix="/api/admin")


class ContactMessageCreate(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    message: str = Field(min_length=10, max_length=2000)


class ContactMessage(ContactMessageCreate):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    read: bool = False
    starred: bool = False


class EnquiryPatch(BaseModel):
    read: Optional[bool] = None
    starred: Optional[bool] = None


class AdminLogin(BaseModel):
    password: str = Field(min_length=1, max_length=200)


def create_token() -> str:
    payload = {"sub": "admin", "type": "access", "exp": datetime.now(timezone.utc) + timedelta(hours=12)}
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


async def require_admin(request: Request) -> str:
    auth = request.headers.get("Authorization", "")
    if not auth.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(auth[7:], JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Session expired, please sign in again")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    if payload.get("sub") != "admin" or payload.get("type") != "access":
        raise HTTPException(status_code=401, detail="Invalid token")
    return "admin"


@api_router.get("/")
async def root():
    return {"message": "Abhishek Band Portfolio API"}


@api_router.post("/contact", response_model=ContactMessage)
async def create_contact_message(input: ContactMessageCreate):
    msg = ContactMessage(**input.model_dump())
    await db.contact_messages.insert_one(msg.model_dump())
    logger.info(f"New contact enquiry from {msg.email}")
    return msg


@admin_router.post("/login")
async def admin_login(body: AdminLogin, request: Request):
    ip = request.headers.get("x-forwarded-for", request.client.host if request.client else "unknown").split(",")[0].strip()
    now = datetime.now(timezone.utc)
    attempt = await db.login_attempts.find_one({"identifier": ip}, {"_id": 0})
    if attempt and attempt.get("count", 0) >= MAX_ATTEMPTS:
        locked_until = datetime.fromisoformat(attempt["last_attempt"]) + timedelta(minutes=LOCKOUT_MINUTES)
        if now < locked_until:
            mins = max(1, int((locked_until - now).total_seconds() // 60) + 1)
            raise HTTPException(status_code=429, detail=f"Too many attempts. Try again in {mins} min.")
        await db.login_attempts.delete_one({"identifier": ip})

    if not bcrypt.checkpw(body.password.encode(), ADMIN_PASSWORD_HASH.encode()):
        await db.login_attempts.update_one(
            {"identifier": ip},
            {"$inc": {"count": 1}, "$set": {"last_attempt": now.isoformat()}},
            upsert=True,
        )
        raise HTTPException(status_code=401, detail="Incorrect password")

    await db.login_attempts.delete_one({"identifier": ip})
    return {"token": create_token()}


@admin_router.get("/me")
async def admin_me(_: str = Depends(require_admin)):
    return {"role": "admin"}


@admin_router.get("/enquiries", response_model=list[ContactMessage])
async def list_enquiries(_: str = Depends(require_admin)):
    docs = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return [ContactMessage(**d) for d in docs]


@admin_router.patch("/enquiries/{enquiry_id}", response_model=ContactMessage)
async def patch_enquiry(enquiry_id: str, patch: EnquiryPatch, _: str = Depends(require_admin)):
    changes = patch.model_dump(exclude_none=True)
    if not changes:
        raise HTTPException(status_code=400, detail="Nothing to update")
    doc = await db.contact_messages.find_one_and_update(
        {"id": enquiry_id}, {"$set": changes}, projection={"_id": 0}, return_document=True
    )
    if not doc:
        raise HTTPException(status_code=404, detail="Enquiry not found")
    return ContactMessage(**doc)


@admin_router.delete("/enquiries/{enquiry_id}", status_code=204)
async def delete_enquiry(enquiry_id: str, _: str = Depends(require_admin)):
    res = await db.contact_messages.delete_one({"id": enquiry_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Enquiry not found")


app.include_router(api_router)
app.include_router(admin_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def create_indexes():
    await db.login_attempts.create_index("identifier")
    await db.contact_messages.create_index("created_at")


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
