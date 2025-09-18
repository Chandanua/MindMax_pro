# MindMax Server (Express + TypeScript)

## Setup

1. Create an `.env` file in `server/` (optional; defaults shown):

```
PORT=4000
JWT_SECRET=replace-with-a-long-random-string
DATA_DIR=./data
```

2. Install and run:

```
cd server
npm install
npm run dev
```

Server will start at `http://localhost:4000`.

## Endpoints

- Auth
  - POST `/api/auth/register` { name, email, password }
  - POST `/api/auth/login` { email, password }

- Users
  - GET `/api/users/me` (Bearer token)
  - GET `/api/users/stats` (Bearer token)

- Check-ins
  - GET `/api/checkins` (Bearer token)
  - POST `/api/checkins` (Bearer token)
    - Body: { mood: "happy"|"sad"|"anxious"|"calm"|"stressed"|"neutral", intensity: 1-10, notes?: string, timestamp?: ISO }
  - DELETE `/api/checkins/:id` (Bearer token)

## Quick test

```
# Register
curl -s -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"secret123"}'

# Login
TOKEN=$(curl -s -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"secret123"}' | node -pe 'JSON.parse(fs.readFileSync(0,"utf8")).token')

# Create check-in
curl -s -X POST http://localhost:4000/api/checkins \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"mood":"calm","intensity":7,"notes":"Feeling okay"}'

# List
curl -s http://localhost:4000/api/checkins -H "Authorization: Bearer $TOKEN"
```

## Notes
- Data is stored in JSON files under `DATA_DIR` (defaults to `server/data/`).
- Replace `JWT_SECRET` in production.
- CORS and Helmet are enabled; adjust origins if deploying separately.


