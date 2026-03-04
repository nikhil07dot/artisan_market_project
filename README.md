# 🛍️ Artisan Market Project

A full-stack e-commerce web application designed to showcase and sell handmade artisan products.
Built with modern web technologies, featuring authentication, admin dashboard, product management, cart system, and more.

---

## 🚀 Live Demo

*(Add your deployed frontend link here once deployed)*

---

## 📌 Features

### 👤 User Features

* User Authentication (Login / Signup)
* Google Authentication
* Browse Products
* Product Filters
* Product Detail View
* Add to Cart
* Wishlist System
* Profile Page
* Toast Notifications
* Protected Routes

### 🛠️ Admin Features

* Admin Login
* Admin Dashboard
* Add / Edit / Delete Products
* Product Manager Panel
* User Activity Logs
* Protected Admin Routes

---

## 🧱 Tech Stack

### 🌐 Frontend

* React (Vite)
* Tailwind CSS
* Context API (State Management)
* Firebase Authentication

### ⚙️ Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### 🔐 Authentication

* Firebase Auth
* Protected Routes (Frontend + Backend)

---

## 📂 Project Structure

```
artisan_market_project/
│
├── artisan-backend/        # Express Backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── src/                    # React Frontend
│   ├── components/
│   ├── admin/
│   ├── context/
│   ├── hooks/
│   └── main.jsx
│
└── public/
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/nikhil07dot/artisan_market_project.git
cd artisan_market_project
```

---

### 2️⃣ Setup Backend

```bash
cd artisan-backend
npm install
```

Create a `.env` file inside `artisan-backend`:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Start backend:

```bash
npm start
```

---

### 3️⃣ Setup Frontend

Go back to root folder:

```bash
cd ..
npm install
npm run dev
```

---

## 🖼️ Screenshots

*(Add screenshots of your Home page, Product page, Admin dashboard here for better presentation.)*

---

## 🎯 Learning Outcomes

* Full-stack MERN application architecture
* Authentication & Authorization
* REST API Design
* State Management using Context API
* Admin Dashboard Implementation
* Deployment-ready project structure

---

## 📈 Future Improvements

* Payment Gateway Integration
* Order History
* Admin Analytics Dashboard
* Product Reviews & Ratings
* Cloud Image Upload (Cloudinary)

---

## 👨‍💻 Author

**Nikhil**
GitHub: https://github.com/nikhil07dot

---

## 📄 License

This project is built for educational and internship purposes.
