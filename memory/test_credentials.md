# Test Credentials

## Admin (Enquiries Dashboard)
- URL: {REACT_APP_BACKEND_URL}/admin
- Password: KvtBb91oO2Lc-DRy6jA  (from backend/.env ADMIN_PASSWORD; single admin, no email/username)
- Login: POST /api/admin/login  {"password": "..."} → {"token": "<jwt>"} (12h expiry)
- Auth: Authorization: Bearer <token> on all /api/admin/* routes
- Brute force: 5 failed attempts per IP → 15 min lockout (429)
- Endpoints: GET /api/admin/me, GET /api/admin/enquiries, PATCH /api/admin/enquiries/{id} {read?, starred?}, DELETE /api/admin/enquiries/{id}

## Contact form (public, no login needed)
- Endpoint: POST {REACT_APP_BACKEND_URL}/api/contact
- Body: {"name": "...", "email": "...", "message": "... (min 10 chars)"}
- Saved to MongoDB collection: contact_messages
