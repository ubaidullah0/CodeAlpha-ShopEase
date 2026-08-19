# 🛒 ShopEase — Modern E-Commerce Platform

<div align="center">

[![HTML5](https://img.shields.io/badge/Frontend-HTML5%20%7C%20CSS3%20%7C%20JS-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/)
[![NodeJS](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL%20(Neon)-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://neon.tech/)
[![Vercel](https://img.shields.io/badge/Deployment-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![Render](https://img.shields.io/badge/Deployment-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com/)

**A full-stack, responsive, and secure E-commerce web application built for the CodeAlpha Internship Program.**

[🚀 Live Demo](https://codealpha-shop-ease-eight.vercel.app/) • [⚡ Backend API](https://codealpha-shopease-lic7.onrender.com/api/products) • [📂 GitHub Repository](https://github.com/ubaidullah0/CodeAlpha-ShopEase)

</div>

---

## 📖 Table of Contents
- [Overview](#-overview)
- [Key Features](#-key-features)
- [Live Deployments](#-live-deployments)
- [Tech Stack](#-tech-stack)
- [Architecture & Folder Structure](#-architecture--folder-structure)
- [Database Schema](#-database-schema)
- [REST API Endpoints](#-rest-api-endpoints)
- [Security Hardening](#-security-hardening)
- [Local Installation & Setup](#-local-installation--setup)
- [Author & Acknowledgments](#-author--acknowledgments)

---

## 🌟 Overview
**ShopEase** is a lightweight, high-performance e-commerce platform designed with a clean separation of concerns:
- **Client-Side:** Pure Vanilla HTML5, modern CSS3 (Flexbox & Grid), and asynchronous JavaScript without heavy frontend frameworks.
- **Server-Side:** RESTful Node.js + Express.js API equipped with JWT authentication, parameterized SQL queries, and robust security middleware.
- **Cloud Database:** Hosted serverless PostgreSQL via Neon Tech.

---

## 🚀 Key Features

- 📱 **Fully Responsive UI:** Seamless user experience across mobile phones, tablets, and desktop displays.
- 📦 **Product Catalog & Details:** Browse curated categories, check product stock in real time, and view detailed product specs.
- 🛒 **Persistent Shopping Cart:** LocalStorage-powered cart with instant price calculations and quantity increments/decrements.
- 🔐 **User Authentication & Authorization:**
  - Secure registration & login with password hashing via `bcryptjs`.
  - Stateless authentication with JSON Web Tokens (JWT).
  - Password visibility toggle (Show/Hide).
- 💳 **Transactional Checkout & Order Management:**
  - ACID-compliant SQL transactions (`BEGIN`, `COMMIT`, `ROLLBACK`) preventing partial writes or race conditions.
  - Server-side price calculation to prevent client-side price tampering.
  - Automatic inventory/stock deduction upon order completion.
- 📜 **Customer Order History:** Authenticated customers can view their previous orders, dates, and order statuses.
- 🛡️ **Comprehensive Security:** Protected with HTTP security headers (`helmet`), rate limiting (`express-rate-limit`), and payload size constraints.

---

## 🌐 Live Deployments

| Component | Platform | URL |
| :--- | :--- | :--- |
| **Frontend Web App** | Vercel | [https://codealpha-shop-ease-eight.vercel.app](https://codealpha-shop-ease-eight.vercel.app) |
| **Backend REST API** | Render | [https://codealpha-shopease-lic7.onrender.com](https://codealpha-shopease-lic7.onrender.com) |
| **Database** | Neon (AWS US-East-2) | PostgreSQL Serverless |

---

## 🛠️ Tech Stack

### Frontend
- **HTML5 & Modern Semantic Markup**
- **CSS3:** Custom Variables, Flexbox, CSS Grid, Responsive Breakpoints
- **Vanilla JavaScript (ES6+):** Fetch API, DOM Manipulation, LocalStorage

### Backend
- **Node.js:** Runtime Environment
- **Express.js:** Web Framework for REST APIs
- **pg (node-postgres):** PostgreSQL client with connection pooling
- **bcryptjs:** Password hashing (Salt rounds: 10)
- **jsonwebtoken (JWT):** Token-based authentication
- **helmet:** Secure HTTP headers
- **express-rate-limit:** Brute-force & DDoS mitigation
- **cors & dotenv:** Cross-Origin Resource Sharing & Environment management

### Database
- **PostgreSQL:** Relational database with Foreign Key constraints & Indexing

---

## 📁 Architecture & Folder Structure

```text
shopease-ecommerce/
├── .github/
│   ├── dependabot.yml           # Automated dependency update scanner
│   └── workflows/
│       └── secret-scan.yml      # Automated TruffleHog secret scanning
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js            # PostgreSQL Pool Configuration
│   │   ├── controllers/
│   │   │   ├── authController.js    # Register & Login Logic
│   │   │   ├── orderController.js   # Transactional Checkout & History
│   │   │   └── productController.js # Product Catalog Queries
│   │   ├── middleware/
│   │   │   └── auth.js          # JWT Verification Middleware
│   │   ├── routes/
│   │   │   ├── authRoutes.js    # Auth Endpoints (/api/auth)
│   │   │   ├── orderRoutes.js   # Order Endpoints (/api/orders)
│   │   │   └── productRoutes.js # Product Endpoints (/api/products)
│   │   └── server.js            # Express Entry Point & Middleware
│   ├── .env.example             # Safe template for env variables
│   └── package.json             # Backend dependencies & scripts
├── database/
│   └── schema.sql               # PostgreSQL tables & initial seed data
├── frontend/
│   ├── css/
│   │   └── style.css            # Clean, modern responsive stylesheet
│   ├── js/
│   │   ├── api.js               # API fetch helper & environment config
│   │   ├── auth.js              # Auth forms & password toggle logic
│   │   ├── cart.js              # Cart state management
│   │   ├── checkout.js          # Order submission handler
│   │   ├── orders.js            # Order history renderer
│   │   └── products.js          # Product grid & details renderer
│   ├── cart.html
│   ├── checkout.html
│   ├── index.html
│   ├── login.html
│   ├── order-success.html
│   ├── orders.html
│   ├── product-details.html
│   ├── products.html
│   └── register.html
├── start-project.bat            # One-click Windows runner script
├── .gitignore
└── README.md
```

---

## 🗄️ Database Schema

```mermaid
erDiagram
    USERS ||--o{ ORDERS : places
    ORDERS ||--|{ ORDER_ITEMS : contains
    PRODUCTS ||--o{ ORDER_ITEMS : ordered_as

    USERS {
        serial id PK
        varchar name
        varchar email UK
        varchar password_hash
        timestamp created_at
    }

    PRODUCTS {
        serial id PK
        varchar name
        text description
        numeric price
        varchar image_url
        varchar category
        int stock
        timestamp created_at
    }

    ORDERS {
        serial id PK
        int user_id FK
        numeric total_amount
        varchar shipping_address
        varchar status
        timestamp created_at
    }

    ORDER_ITEMS {
        serial id PK
        int order_id FK
        int product_id FK
        int quantity
        numeric price
    }
```

---

## 📡 REST API Endpoints

### 🔐 Authentication (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user | ❌ No (Rate-Limited) |
| `POST` | `/api/auth/login` | Login and receive JWT | ❌ No (Rate-Limited) |

### 📦 Products (`/api/products`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/products` | Get list of all products | ❌ No |
| `GET` | `/api/products/:id` | Get single product details | ❌ No |

### 🧾 Orders (`/api/orders`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/orders` | Place a new order with stock validation | ✅ Yes (`Bearer <token>`) |
| `GET` | `/api/orders/my-orders` | Fetch authenticated user's order history | ✅ Yes (`Bearer <token>`) |

---

## 🛡️ Security Hardening

- **Zero-Secret Commits:** Audited Git patch history ensuring zero database credentials or JWT keys were committed.
- **SQL Injection Prevention:** 100% parameterized queries via `pg`.
- **Brute Force Protection:** Strict IP rate limiting applied to login and registration endpoints.
- **Security Headers:** Integrated `helmet` to mitigate XSS, Clickjacking, and sniffing attacks.
- **DDoS Mitigation:** Request payload limits capped at 10KB.
- **Automated CI/CD Checks:** TruffleHog automated secret scanning and GitHub Dependabot security alerts.

---

## 💻 Local Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [PostgreSQL](https://www.postgresql.org/) (or a cloud PostgreSQL provider like [Neon.tech](https://neon.tech/))
- [Git](https://git-scm.com/)

### 1. Clone the Repository
```bash
git clone https://github.com/ubaidullah0/CodeAlpha-ShopEase.git
cd CodeAlpha-ShopEase
```

### 2. Configure Backend Environment
Create a `.env` file in the `backend` directory:
```bash
cd backend
cp .env.example .env
```
Update `backend/.env` with your credentials:
```env
PORT=3000
DATABASE_URL=postgresql://username:password@localhost:5432/shopease
JWT_SECRET=your_super_secret_jwt_key
```

### 3. Initialize Database
Execute `database/schema.sql` inside your PostgreSQL database to create tables and seed default products:
```bash
psql -d shopease -f ../database/schema.sql
```

### 4. Run the Application
#### Windows One-Click Start:
Simply double-click the `start-project.bat` file in the root folder. It will launch both frontend and backend servers automatically!

#### Manual Start:
**Backend:**
```bash
cd backend
npm install
npm start
```
**Frontend:**
Open `frontend/index.html` directly in your browser or run a static server:
```bash
cd frontend
npx serve -p 5500
```
Visit `http://localhost:5500` in your web browser.

---

## 👨‍💻 Author & Acknowledgments

- **Developer:** [Ubaidullah Khan](https://github.com/ubaidullah0)
- **Project:** CodeAlpha Simple E-Commerce Store Internship Project
- **Special Thanks:** [CodeAlpha](https://www.codealpha.tech/) for providing the internship task guidelines and development requirements.

---

<div align="center">
  <sub>© 2026 ShopEase. Built with ❤️ for CodeAlpha.</sub>
</div>
