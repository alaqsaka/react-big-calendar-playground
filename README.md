# MERN Calendar App

A full-stack MERN (MongoDB, Express, React, Node.js) calendar application with authentication, CRUD operations, and automated email sending.

## Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React + TypeScript + Vite |
| Backend | Node.js + Express + TypeScript |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcryptjs |
| Email | Nodemailer + Mailtrap |
| Calendar | react-big-calendar |

---

## Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)
- npm or yarn

---

## Installation & Setup

### 1. Clone the repository

```bash
cd mern-calendar-app
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/mern-calendar
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# Email (Mailtrap)
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_mailtrap_user
SMTP_PASS=your_mailtrap_pass
EMAIL_FROM=no-reply@mern-calendar.com
```

Start the backend:

```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/` directory:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

---

## MongoDB Setup

### Option 1: Local MongoDB

1. Install MongoDB from https://www.mongodb.com/try/download/community
2. Start MongoDB service
3. Connection string: `mongodb://localhost:27017/mern-calendar`

### Option 2: MongoDB Atlas (Cloud)

1. Create account at https://www.mongodb.com/atlas
2. Create a free cluster
3. Get connection string (replace password)
4. Update `MONGO_URI` in `.env`

---

## Email Testing Setup

This app uses **Mailtrap** for testing emails (no real emails sent).

### Setup Mailtrap:

1. Go to https://mailtrap.io and create free account
2. Copy your SMTP credentials:
   - Host: `smtp.mailtrap.io`
   - Port: `2525`
   - Username: from Mailtrap inbox settings
   - Password: from Mailtrap inbox settings
3. Update the SMTP values in `backend/.env`

### Testing Email:

1. Login to the app
2. Create a new event with an email address
3. Check your Mailtrap inbox - you should receive an email with:
   - Subject: `Salam Kenal`
   - Body: `Hi Salam kenal`

---

## Dummy Login Account

The app includes a seed script to create a test user.

### Run the seed script:

```bash
cd backend
npm run seed
```

### Test Credentials:

| Field | Value |
|-------|-------|
| Email | admin@test.com |
| Password | Admin123! |

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login (returns JWT) |
| POST | `/api/auth/logout` | Logout (protected) |

### Events

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/events` | Get all events (protected) |
| POST | `/api/events` | Create event (protected, sends email) |
| PUT | `/api/events/:id` | Update event (protected) |
| DELETE | `/api/events/:id` | Delete event (protected) |

---

## Database Schema

### User Collection

```
┌─────────────────────┐
│       User          │
├─────────────────────┤
│ _id: ObjectId       │ ← Primary Key
│ email: String       │ ← Unique, Required
│ password: String    │ ← Hashed, Required
│ loginLogs: Array    │
│   └─ action:        │   'login' | 'logout'
│   └─ timestamp:     │   Date
│ createdAt: Date    │
│ updatedAt: Date    │
└─────────────────────┘
```

**Example Document:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "email": "admin@test.com",
  "password": "$2a$10$abcdef...",
  "loginLogs": [
    { "action": "login", "timestamp": "2026-03-04T10:00:00.000Z" },
    { "action": "logout", "timestamp": "2026-03-04T12:00:00.000Z" }
  ],
  "createdAt": "2026-03-01T00:00:00.000Z",
  "updatedAt": "2026-03-04T12:00:00.000Z"
}
```

### Event Collection

```
┌─────────────────────┐
│       Event         │
├─────────────────────┤
│ _id: ObjectId       │ ← Primary Key
│ email: String       │ ← Required (recipient)
│ date: Date          │ ← Required (event date)
│ description: String│ ← Required
│ createdBy: ObjectId │ ← Foreign Key → User._id
│ createdAt: Date     │
│ updatedAt: Date     │
└─────────────────────┘
```

**Example Document:**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "email": "recipient@example.com",
  "date": "2026-03-15T00:00:00.000Z",
  "description": "Meeting with team",
  "createdBy": "507f1f77bcf86cd799439011",
  "createdAt": "2026-03-04T08:00:00.000Z",
  "updatedAt": "2026-03-04T08:00:00.000Z"
}
```

### Relationships

```
User (1) ──────< (N) Event
```

- One User can create many Events
- Each Event is linked to one User via `createdBy` field

---

## Features

- User authentication (register/login/logout)
- JWT token-based auth
- Login/logout timestamp logging
- Calendar view (month/week/day/agenda)
- Create, Read, Update, Delete events
- Automated email notification on event creation

---