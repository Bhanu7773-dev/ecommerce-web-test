import { Router } from 'express'
import Order from '../models/Order.js'
import Product from '../models/Product.js'
import { auth, admin } from '../middleware/auth.js'

const router = Router()

// Create order (after payment confirmation)
router.post('/', auth, async (req, res) => {
  const { items, shipping, paymentIntentId } = req.body
  const amount = items.reduce((sum, it) => sum + it.price * it.qty, 0)
  const order = await Order.create({
    user: req.user.id,
    items: items.map((i) => ({ product: i.product, title: i.title, price: i.price, qty: i.qty })),
    amount,
    shipping,
    paymentIntentId,
    status: 'paid',
  })
  res.status(201).json(order)
})

// User order history
router.get('/me', auth, async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 })
  res.json(orders)
})

// Admin: list all orders
router.get('/', auth, admin, async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 })
  res.json(orders)
})

export default router
