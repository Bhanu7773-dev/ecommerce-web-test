# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Overview

This is an npm workspaces monorepo with two packages:
- frontend: React + Vite + Tailwind CSS SPA using react-router and Axios.
- backend: Node.js + Express + MongoDB (Mongoose), JWT auth via HTTP-only cookies, and Stripe PaymentIntents.

Important environment variables (see README.md):
- backend/.env: PORT, CLIENT_URL, MONGODB_URI, JWT_SECRET, STRIPE_SECRET_KEY
- frontend/.env: VITE_API_URL, VITE_STRIPE_PUBLIC_KEY

## Commands (Windows PowerShell examples)

Workspace install (run at repo root):
```sh path=null start=null
npm install --workspaces
```

Backend
- Dev server (nodemon):
```sh path=null start=null
npm run dev --workspace backend
```
- Start (node):
```sh path=null start=null
npm run start --workspace backend
```
- Seed sample data (products + admin user):
```sh path=null start=null
npm run seed --workspace backend
```

Frontend
- Dev server:
```sh path=null start=null
npm run dev --workspace frontend
```
- Lint:
```sh path=null start=null
npm run lint --workspace frontend
```
- Build and local preview:
```sh path=null start=null
npm run build --workspace frontend
npm run preview --workspace frontend
```

Tests
- There is currently no configured test runner in either workspace (no Jest/Vitest scripts or configs found).

## High-level architecture

Monorepo and package boundaries
- Root package.json defines workspaces: frontend and backend. Use npm --workspace to run package scripts from the repo root.

Backend (Express API)
- Entry: backend/server.js
  - Loads env via dotenv, sets up CORS with credentials for CLIENT_URL, JSON parsing, and cookie parsing.
  - Connects to MongoDB via mongoose (MONGODB_URI) and starts HTTP server on PORT.
  - Routes are mounted under /api:
    - /api/health: liveness.
    - /api/auth: signup, login, logout, me.
    - /api/products: list, read, and admin CRUD.
    - /api/orders: create (after payment), user history, admin list.
    - /api/checkout: Stripe PaymentIntent creation (test mode).
- Auth: backend/middleware/auth.js
  - auth: verifies JWT from cookie token or Bearer header, attaches req.user.
  - admin: ensures req.user.role === 'admin'.
- Data models: backend/models
  - Product.js: title/description/price/image/category/sizes/colors/stock with timestamps and indexes for filtering.
  - User.js: name/email/passwordHash/role with unique email; roles = user|admin.
  - Order.js: user ref, items (product/title/price/qty), amount, status, paymentIntentId, shipping, timestamps.
- Seeding: backend/seed/seed.js
  - Seeds sample products and ensures an admin user (admin@example.com / admin123) exists.

Frontend (React SPA)
- Build tool: Vite (frontend/vite.config.js) with @vitejs/plugin-react. Tailwind CSS used via PostCSS; styles imported in src/main.jsx (index.css).
- Routing: react-router (src/main.jsx) with nested layout (App.jsx) and routes for Home, Products, ProductDetails, Cart, Checkout, Login, Signup, Profile, AdminDashboard.
- State and API:
  - Axios instance (src/lib/api.js) preconfigured with baseURL from VITE_API_URL and withCredentials for cookie auth.
  - AuthContext (src/state/AuthContext.jsx) manages user session: fetches /auth/me on load; login/signup/logout call backend and set cookie-based session.
  - CartContext (src/state/CartContext.jsx) manages cart in localStorage; exposes add/update/remove/clear and computed totals.
- UI structure: Navbar/Footer layout (App.jsx), product listings and filters (Products.jsx), product details and add-to-cart (ProductDetails.jsx), simple Home hero and featured grid (Home.jsx).

## Notes and expectations for Warp
- Use npm workspaces from the repo root to run package scripts (e.g., npm run dev --workspace backend).
- Frontend expects the backend to be reachable at VITE_API_URL (default http://localhost:5000/api); backend CORS is configured for CLIENT_URL (default http://localhost:5173).
- Authentication relies on HTTP-only cookies; Axios is configured with withCredentials=true. When running locally, ensure both dev servers are on matching origins per .env.
- Payments are in Stripe test mode via PaymentIntents on the backend. Orders are created after payment confirmation via /api/orders.
