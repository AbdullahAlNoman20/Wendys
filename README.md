
# 🍽️ Wendys Restaurant Website

A full-stack restaurant website built for **Wendys**, located in **Khulna**, Bangladesh. This project features a dynamic web platform with user-facing and admin-facing portals, a secure authentication system, and a fully integrated payment system.

---

## 🌐 Project Features

- 🧑‍🍳 **Customer Interface**:
  - Browse menu categories (e.g., Appetizers, Main Course, Desserts)
  - Add items to cart and place orders
  - Register/Login (with Firebase Authentication)
  - Secure payment using Stripe or SSLCOMMERZ
  - Order history and profile management

- 🔐 **Admin Panel**:
  - Dashboard to manage orders and inventory
  - Add/Edit/Delete menu items
  - View customer feedback and analytics
  - Role-based access control

- 💳 **Payment Integration**:
  - Stripe/SSLCOMMERZ for secure online payments
  - Order confirmation and billing history

---

## 🧰 Tech Stack

- **Frontend**: React.js + Tailwind CSS
- **Backend**: Node.js + Express.js
- **Authentication**: Firebase Auth
- **Database**: MongoDB (for orders, menu, users)
- **Payment**: Stripe (or local SSLCOMMERZ for BD)
- **Environment Management**: .env files

---

## 📂 Folder Structure

```
wendys-restaurant/
├── client/                   # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── context/
│   │   └── App.js
├── server/                   # Node.js backend
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── server.js
├── .env
└── README.md
```

---

## 🧪 Setup & Installation

### 📁 Clone the Repository

```bash
git clone https://github.com/your-username/wendys-restaurant.git
cd wendys-restaurant
```

### ⚙️ Install Client Dependencies

```bash
cd client
npm install
```

### 🛠️ Install Server Dependencies

```bash
cd ../server
npm install
```

### 🔐 Environment Setup

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
FIREBASE_API_KEY=your_firebase_key
```

---

## 🚀 Running the Project

### Run Backend:

```bash
cd server
npm run dev
```

### Run Frontend:

```bash
cd client
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

---

## 🛡️ Security & Auth

- Firebase Authentication used for user auth
- JWT used for secure route protection (admin-only APIs)
- `.env` used to secure API keys and secrets

---

## 🧑‍💼 Admin Access

- Login as admin to access `/dashboard`
- Role check in backend ensures only admins can modify menu or view analytics

---

## 🏦 Payment Workflow

1. User adds items to cart
2. Proceeds to checkout
3. Makes payment via Stripe or SSLCOMMERZ
4. Payment success triggers order confirmation

---

## 📍 Location

**Wendys Restaurant**  
Khulna, Bangladesh

---

## 👨‍💻 Author

**Abdullah Al Noman**  
Email: abdullah.noman.dev@gmail.com

---

## 📜 License

```
MIT License

Copyright (c) 2025 Abdullah Al Noman

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the “Software”), to deal
in the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.
```

---

> This platform was built with love for Wendys Restaurant in Khulna. Designed for performance, reliability, and excellent user experience.
