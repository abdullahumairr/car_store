CarMarket — Used Car Marketplace

CarMarket is a full-stack application for buying and selling used cars.
It includes user roles, car listings, booking system, and an admin dashboard — all built with a modern JavaScript stack.

Overview

CarMarket helps users browse available cars, view detailed information, and book vehicles.
Sellers can manage their own listings, while admins have full access to all data.

The app consists of:

Frontend: React, Vite, TailwindCSS
Backend: Node.js, Express, MySQL, JWT

Image Handling: URL-based (no multer)

Features
🔹 User
Browse all available cars
View car details
Book a car (car is removed from database)

🔹 Seller
Add new cars
Edit own cars
Delete own cars

Manage image URLs (up to 10 images)
🔹 Admin
Full CRUD on all cars
Manage users
Access all dashboards

Installation

CarMarket is designed for easy setup — you can install backend and frontend separately.

Backend Setup
Navigate to backend:

cd backend


Install dependencies:

npm install

Create MySQL database:
CREATE DATABASE carmarket;

Configure database connection in:
/src/config/db.js

Start the backend:

npm run dev

Backend runs on:

http://localhost:7777

Frontend Setup

Navigate to frontend:

cd frontend


Install packages:

npm install


Run the frontend:

npm run dev


Frontend runs on:

http://localhost:5173

Documentation

Full documentation includes:

Project structure

Authentication flow

CRUD car management

Booking logic

Role permissions

How to run backend & frontend

How image URLs are processed

Seller Dashboard & Admin Dashboard

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


Contributing

The main purpose of this repository is to practice full-stack development using React and Express.
You can contribute by improving code structure, adding validation, fixing bugs, or enhancing UI.

Good First Issues

If you want to expand the project, here are suggestions:

Add chat between seller & user

Add payment integration

Add image preview before upload

Add pagination & advanced filters

Convert project to TypeScript

License

This project is MIT licensed.