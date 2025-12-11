# CarMarket

CarMarket is a full-stack web application for buying and selling used cars.
The platform includes multiple user roles, secure authentication, car listing management, and a modern responsive UI.

## Overview

CarMarket allows users to browse available cars, view details, and book a vehicle.
Sellers can manage their own listings, and admins can control the entire system.

This project consists of:

* Frontend: React, Vite, TailwindCSS, Lucide, Axios

* Backend: Node.js, Express, MySQL, JWT, Bcrypt, Cors, Zod, Mysql2, Dotenv

* Image Handling: URL-based

##  Features
🔹 User

* Browse all cars

* View car details

* Book a car (car will be removed from database)

🔹 Seller

* Add new car listings

* Update own listings

* Delete own listings

🔹 Admin

* Full CRUD on all cars

* Manage all users

* Access to admin dashboard

## Getting Started

To run the project locally, follow the steps below.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/abdullahumairr/car_store.git
   cd buy_car
   ```
2. Install dependencies for both backend and frontend
   ```sh
   cd backend && npm install
   cd frontend && npm install
   ```
3. Add environment variables by copying `.env.example`
   ```sh
   cd ..
   cp backend/.env.example backend/.env
   ```
4. Start development servers  
   Backend:
   ```sh
   cd backend
   npm start
   ```
   Frontend:
   ```sh
   cd frontend
   npm run dev
   ```

### Importing the Database

A SQL dump file is included in the project for quick setup. _yea ik i shouldve used prisma, but this is for assignment's purposes_  
Make sure you already created a MariaDB/MySQL database. I'll assume you're using `mariadb`, change if necessary

1. Login to MariaDB

   ```sh
   mariadb -u root 
   ```

2. Create the database (if not already created)

   ```sql
   CREATE DATABASE car_store;
   ```

3. Exit MariaDB and import the dump
   ```sh< ./car_store.sql
   mariadb -u root car_store 
   ```

After importing, the database will contain all required tables.

## Usage

1. Visit the frontend in your browser:

   ```
   http://localhost:3000
   ```

2. Register an account and log into it

3. You can now use it for:
   - Create recipes
   - Upload recipe images
   - Edit and delete recipes
   - View your recipe collection
  
## API Overview

### Auth Routes
  
| Method  | Endpoint || Description |
| -------- | ------- || ------- |
| POST  | /auth/register   || Register account    |
| POST | /auth/login     || Login & get JWT    |

### Car Routes
  
| Method  | Endpoint || Description |
| -------- | ------- || ------- |
| POST  | /auth/register   || Register account    |
| POST | /cars/:id || Login & get JWT    |


## License

Distributed under the GPL-v3 License. See `LICENSE` for more information.
