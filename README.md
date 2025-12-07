📘 CarMarket — Platform Jual Beli Mobil Bekas

Full-Stack Web App (Node.js + Express + MySQL + React + TailwindCSS)

CarMarket adalah aplikasi web untuk menjual dan membeli mobil bekas.

Terdiri dari 3 role:

👤 User – Jelajah mobil & booking mobil

🏪 Seller – Upload mobil, kelola mobil saya

🛠️ Admin – Kelola semua mobil & semua user

🚀 Tech Stack

🧩 Backend

    Node.js
    Express.js
    MySQL + mysql2
    JSON Web Token (JWT)
    Middleware Authentication & Authorization
    Multer (upload file)
    bcrypt

🎨 Frontend

    React + Vite
    TailwindCSS
    Axios
    React Router DOM
    Lucide Icons

📦 Features

🔐 Authentication

    Register (user, seller)
    Login (JWT)
    Protected routes
    Auto authorization:
        Admin: kelola semua data
        Seller: kelola mobil sendiri
        User: booking mobil

🚗 Cars Module
Admin

    Lihat semua mobil
    Edit mobil
    Delete mobil

 Seller

    Upload mobil 
    Edit mobil
    Delete mobil
    Lihat "Mobil Saya"

 User

    Jelajah semua mobil
    Detail mobil (galeri foto, deskripsi, harga)
    Booking mobil (hapus dari database)

👤 Users Module (Admin)

    Lihat semua user
    Tambah user
    Edit user
    Delete user

🛠️ Backend Setup
1️⃣ Install dependencies

    npm install

2️⃣ Setup .env

    PORT=7777
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=yourpassword
    DB_NAME=carmarket
    JWT_SECRET=yourjwtsecret

3️⃣ Jalankan server

    npm run dev

Backend berjalan di:

http://localhost:7777

📁 Backend Folder Structure

    backend/
    │── config/
    │   └── db.js
    │── controllers/
    │── middlewares/
    │── routes/
    │── services/
    │── app.js
    │── server.js

🎨 Frontend Setup

1️⃣ Install dependencies

    npm install

2️⃣ Jalankan frontend

    npm run dev

Frontend berjalan di:

http://localhost:5173

📁 Frontend Structure

    frontend/
    │── src/
      ├── components/
      ├── pages/
      ├── services/api.js
      ├── routes/
      ├── App.jsx
      └── main.jsx
  

🔗 API Endpoints

    Auth
    | Method | Endpoint       | Description            |
    | ------ | -------------- | ---------------------- |
    | POST   | /auth/register | Register user & seller |
    | POST   | /auth/login    | Login & get JWT        |

    Cars
    | Method | Endpoint  | Role         | Description   |
    | ------ | --------- | ------------ | ------------- |
    | GET    | /cars     | All          | Get all cars  |
    | GET    | /cars/:id | All          | Get car by ID |
    | POST   | /cars     | Seller/Admin | Create car    |
    | PUT    | /cars/:id | Owner/Admin  | Update car    |
    | DELETE | /cars/:id | Owner/Admin  | Delete car    |

    Users (Admin Only)
    | Method | Endpoint   |
    | ------ | ---------- |
    | GET    | /users     |
    | POST   | /users     |
    | PUT    | /users/:id |
    | DELETE | /users/:id |


🧪 How to Test


👤 Login sebagai User:

    Jelajah mobil
    Booking mobil

🏪 Login sebagai Seller:

    Upload mobil
    Edit mobil
    Hapus mobil
    Lihat mobil saya

🛠️ Login sebagai Admin:

    Lihat semua mobil
    Hapus/Edit mobil
    Kelola user

📝 Environment Requirements

    Node v18+
    MySQL v8+
    NPM v9+
    Browser Chromium


