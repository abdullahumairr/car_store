📘 CarMarket — Platform Jual Beli Mobil Bekas

Full-Stack Web App (Node.js + Express + MySQL + React + TailwindCSS)

CarMarket adalah aplikasi web untuk menjual dan membeli mobil bekas.

Terdiri dari 3 role:

👤 User – Jelajah mobil & booking mobil

🏪 Seller – Upload mobil, kelola mobil saya

🛠️ Admin – Kelola semua mobil & semua user

🚀 Tech Stack

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

🛠️ Frontend Setup

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



