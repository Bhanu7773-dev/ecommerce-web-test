# Clothes E-Commerce

A full-stack clothes e-commerce website.

Tech Stack
- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express + MongoDB (Mongoose)
- Auth: JWT (HTTP-only cookie)
- Payments: Stripe (test mode)

Getting Started

1) Backend
- Copy backend/.env.example to backend/.env and set values.
- Install packages and run dev server:
  npm install --workspaces
  npm run dev --workspace backend

2) Frontend
- Copy frontend/.env.example to frontend/.env and set values.
- Start frontend dev server:
  npm run dev --workspace frontend

Seed Data
- Seed sample products and an admin user:
  npm run seed --workspace backend

Environment Variables
- backend/.env
  PORT=5000
  CLIENT_URL=http://localhost:5173
  MONGODB_URI=mongodb://127.0.0.1:27017/clothes_db
  JWT_SECRET=change_me
  STRIPE_SECRET_KEY=sk_test_...

- frontend/.env
  VITE_API_URL=http://localhost:5000/api
  VITE_STRIPE_PUBLIC_KEY=pk_test_...

Notes
- This project uses npm workspaces. All installs can be done from the repo root: npm install --workspaces
- Do not commit real secrets. Use .env files locally.
