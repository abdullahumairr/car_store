CarMarket — Used Car Marketplace

CarMarket is a full-stack web application for buying and selling used cars.
The platform includes multiple user roles, secure authentication, car listing management, and a modern responsive UI.

Overview

CarMarket allows users to browse available cars, view details, and book a vehicle.
Sellers can manage their own listings, and admins can control the entire system.

This project consists of:

Frontend: React, Vite, TailwindCSS

Backend: Node.js, Express, MySQL, JWT

Image Handling: URL-based (no multer / no file upload)

Features
🔹 User

Browse all cars

View car details

Book a car (car will be removed from database)

🔹 Seller

Add new car listings

Update own listings

Delete own listings

Store up to 10 image URLs

🔹 Admin

Full CRUD on all cars

Manage all users

Access to admin dashboard

Tech Stack
Frontend

React + Vite

TailwindCSS

Axios

React Router

Lucide Icons

Backend

Express JS

MySQL (mysql2)

JWT Auth

Bcrypt

Express Middleware

Installation

CarMarket is separated into backend & frontend folders. Install both.

Backend Setup
1. Navigate to backend folder
cd backend

2. Install dependencies
npm install

3. Setup MySQL database
CREATE DATABASE carmarket;

4. Configure database connection

Edit the config file:

/src/config/db.js

5. Run backend server
npm run dev


The backend runs at:

http://localhost:7777

Frontend Setup
1. Navigate to frontend
cd frontend

2. Install dependencies
npm install

3. Start development server
npm run dev


Frontend runs at:

http://localhost:5173

Project Structure
Backend
backend/
 ├── controllers/
 ├── services/
 ├── routes/
 ├── middleware/
 ├── config/
 ├── server.js

Frontend
frontend/
 ├── components/
 ├── pages/
 ├── services/api.js
 ├── App.jsx
 ├── main.jsx

API Overview
Auth Routes
Method	Endpoint	Description
POST	/auth/register	Register account
POST	/auth/login	Login & get JWT
Car Routes
Method	Endpoint	Description
GET	/cars	Get all cars
GET	/cars/:id	Get car by ID
POST	/cars	Create car (seller/admin)
PUT	/cars/:id	Update car
DELETE	/cars/:id	Delete car (any role allowed for booking)
