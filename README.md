# 🚀 Job Application Management System (Backend)

This is the **backend API** for a Job Application System. It supports **two user roles**:
- Admin
- Employee

##  User Roles

| Role     | Capabilities                                           |
|----------|--------------------------------------------------------|
| Employee | Register, Login, Apply for a job, View Profile        |
| Admin    | Login, View all users/applications, Approve/Reject    |

---

## 📁 Folder Structure

project-root/
├── Controllers/         # Business logic for users
├── Routes/              # Route handlers for users
├── Models/              # Mongoose schemas
├── Middleware/          # Auth middleware (JWT)
├── Db/                  # DB connection file
├── .env                 # Environment variables
├── server.js            # Entry point
└── README.md

---

## ⚙️ Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- bcrypt for password hashing
- dotenv for environment variables

---

## 📦 Setup Instructions

### 1. Install dependencies

### 2. Create `.env` file

### 3. Run the server



> Server runs at http://localhost:5000

---

## 🔐 API Endpoints

### 🧑‍💼 Authentication

| Method | Endpoint         | Access | Description           |
|--------|------------------|--------|-----------------------|
| POST   | /user/register   | Public | Register a new user   |
| POST   | /user/login      | Public | Login user            |


| Method | Endpoint        | Access    | Description              |
|--------|-----------------|-----------|--------------------------|
| GET    | /user/profile   | Protected | Get current user profile |

| Method | Endpoint         | Access    | Description               |
|--------|------------------|-----------|---------------------------|
| GET    | /user/getUsers   | Admin     | Get all users/applications|


### Auth Notes
Login returns a JWT token

Use token in headers like:

## makefile
Authorization: Bearer <token>
Middleware (verifyToken) checks the token for protected routes

### To-Do (For Developers)
 Add job application model & route (/apply-job)

 Create endpoints for admin to approve/reject applications

