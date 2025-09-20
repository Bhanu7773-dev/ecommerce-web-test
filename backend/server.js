import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'

import authRoutes from './routes/auth.js'
import productRoutes from './routes/products.js'
import orderRoutes from './routes/orders.js'
import checkoutRoutes from './routes/checkout.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173'

// Middleware
app.use(cors({ origin: CLIENT_URL, credentials: true }))
app.use(express.json())
app.use(cookieParser())

// Database
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/clothes_db'
mongoose
  .connect(MONGODB_URI, { dbName: process.env.MONGODB_DB || undefined })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err.message))

// Routes
app.get('/api/health', (_, res) => res.json({ ok: true }))
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/checkout', checkoutRoutes)

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
