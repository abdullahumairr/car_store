CarMarket — Used Car Marketplace

CarMarket is a full-stack web application for browsing, selling, and booking used cars.
It includes role-based access (User, Seller, Admin), a car management system, and a clean modern UI.

Tech Stack
Frontend

React + Vite

TailwindCSS

Axios

Lucide Icons

Backend

Node.js + Express

MySQL

JWT Authentication

Features
🔹 User

Browse all cars

View car details

Book a car (car will be removed from database)

🔹 Seller

Add new car listings

Edit & delete own listings

Upload up to 10 image URLs

🔹 Admin

Full CRUD on all cars

Manage users

Access dashboards for all roles

Project Structure
CarMarket/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│
└── frontend/
    ├── components/
    ├── pages/
    ├── services/api.js
    ├── App.jsx
    ├── main.jsx

Installation Guide
1. Backend Setup
cd backend
npm install


Create database:

CREATE DATABASE carmarket;


Configure database in:

backend/src/config/db.js


Start server:

npm run dev


Backend runs at:

http://localhost:7777

2. Frontend Setup
cd frontend
npm install
npm run dev


Frontend runs at:

http://localhost:5173

Usage
Login & Roles

User: browse and book cars

Seller: manage own listings

Admin: full access

Booking a Car

Clicking Booking in Car Detail will:

Delete the car from DB

Redirect user to homepage

API Overview
User Authentication
POST /auth/register
POST /auth/login

Cars
GET    /cars
GET    /cars/:id
POST   /cars
PUT    /cars/:id
DELETE /cars/:id

Users (Admin)
GET    /users
GET    /users/:id
PUT    /users/:id
DELETE /users/:id

License

This project is under the MIT License.
