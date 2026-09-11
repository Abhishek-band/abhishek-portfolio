"""Backend tests for Abhishek Band Portfolio admin enquiries + contact API."""
import os
import time
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://premium-profile-ai.preview.emergentagent.com').rstrip('/')
# Load from frontend/.env explicitly to make sure
try:
    with open('/app/frontend/.env') as f:
        for line in f:
            if line.startswith('REACT_APP_BACKEND_URL='):
                BASE_URL = line.split('=', 1)[1].strip().rstrip('/')
except Exception:
    pass

ADMIN_PASSWORD = "KvtBb91oO2Lc-DRy6jA"


@pytest.fixture(scope="session")
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="session")
def token(api):
    r = api.post(f"{BASE_URL}/api/admin/login", json={"password": ADMIN_PASSWORD})
    assert r.status_code == 200, r.text
    return r.json()["token"]


@pytest.fixture(scope="session")
def auth_headers(token):
    return {"Authorization": f"Bearer {token}"}


# --- Public / contact ---
def test_root(api):
    r = api.get(f"{BASE_URL}/api/")
    assert r.status_code == 200


def test_create_contact_enquiry(api):
    payload = {"name": "TEST User", "email": "test_user@example.com", "message": "This is a test enquiry message from pytest."}
    r = api.post(f"{BASE_URL}/api/contact", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["name"] == payload["name"]
    assert data["email"] == payload["email"]
    assert data["read"] is False
    assert data["starred"] is False
    assert "id" in data
    pytest.enquiry_id = data["id"]


# --- Admin login ---
def test_login_wrong_password(api):
    r = api.post(f"{BASE_URL}/api/admin/login", json={"password": "wrong-password-xyz"})
    assert r.status_code == 401
    assert "Incorrect password" in r.json().get("detail", "")


def test_login_correct(api):
    r = api.post(f"{BASE_URL}/api/admin/login", json={"password": ADMIN_PASSWORD})
    assert r.status_code == 200
    assert "token" in r.json()


# --- Auth ---
def test_enquiries_no_token(api):
    r = api.get(f"{BASE_URL}/api/admin/enquiries")
    assert r.status_code == 401


def test_enquiries_list(api, auth_headers):
    r = api.get(f"{BASE_URL}/api/admin/enquiries", headers=auth_headers)
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list)
    assert len(data) >= 1
    # sorted newest first
    times = [d["created_at"] for d in data]
    assert times == sorted(times, reverse=True)
    for d in data:
        assert "read" in d and "starred" in d
        assert "_id" not in d


def test_me(api, auth_headers):
    r = api.get(f"{BASE_URL}/api/admin/me", headers=auth_headers)
    assert r.status_code == 200
    assert r.json()["role"] == "admin"


# --- PATCH ---
def test_patch_toggle_read_and_star(api, auth_headers):
    eid = getattr(pytest, "enquiry_id", None)
    assert eid, "enquiry_id fixture missing"
    r = api.patch(f"{BASE_URL}/api/admin/enquiries/{eid}", json={"read": True}, headers=auth_headers)
    assert r.status_code == 200
    assert r.json()["read"] is True

    r = api.patch(f"{BASE_URL}/api/admin/enquiries/{eid}", json={"starred": True}, headers=auth_headers)
    assert r.status_code == 200
    assert r.json()["starred"] is True


def test_patch_unknown(api, auth_headers):
    r = api.patch(f"{BASE_URL}/api/admin/enquiries/does-not-exist", json={"read": True}, headers=auth_headers)
    assert r.status_code == 404


def test_patch_empty_body(api, auth_headers):
    eid = getattr(pytest, "enquiry_id", None)
    r = api.patch(f"{BASE_URL}/api/admin/enquiries/{eid}", json={}, headers=auth_headers)
    assert r.status_code == 400


# --- DELETE ---
def test_delete_and_repeat(api, auth_headers):
    # create fresh enquiry to delete
    r = api.post(f"{BASE_URL}/api/contact", json={
        "name": "TEST Delete", "email": "del@example.com", "message": "Delete me please, test message."
    })
    eid = r.json()["id"]
    r = api.delete(f"{BASE_URL}/api/admin/enquiries/{eid}", headers=auth_headers)
    assert r.status_code == 204
    r = api.delete(f"{BASE_URL}/api/admin/enquiries/{eid}", headers=auth_headers)
    assert r.status_code == 404


# --- Brute force (MUST be last) ---
@pytest.mark.order("last")
def test_zzz_brute_force_lockout(api):
    """Runs LAST. Locks IP for 15min. Cleared by fixture teardown."""
    for _ in range(5):
        api.post(f"{BASE_URL}/api/admin/login", json={"password": "bad"})
    r = api.post(f"{BASE_URL}/api/admin/login", json={"password": "bad"})
    assert r.status_code == 429, f"Expected 429, got {r.status_code}: {r.text}"
    # Cleanup: clear login_attempts via mongo
    try:
        from pymongo import MongoClient
        m = MongoClient(os.environ.get('MONGO_URL', 'mongodb://localhost:27017'))
        dbname = os.environ.get('DB_NAME', 'test_database')
        m[dbname].login_attempts.delete_many({})
        m.close()
    except Exception as e:
        print(f"Cleanup warning: {e}")
