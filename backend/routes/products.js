import { Router } from 'express'
import Product from '../models/Product.js'
import { auth, admin } from '../middleware/auth.js'

const router = Router()

// List products with basic filters and sort
router.get('/', async (req, res) => {
  const { category, size, color, minPrice, maxPrice, sort } = req.query
  const q = {}
  if (category) q.category = category
  if (size) q.sizes = size
  if (color) q.colors = color
  if (minPrice || maxPrice) q.price = {}
  if (minPrice) q.price.$gte = Number(minPrice)
  if (maxPrice) q.price.$lte = Number(maxPrice)

  let cursor = Product.find(q)
  if (sort === 'price_asc') cursor = cursor.sort({ price: 1 })
  else if (sort === 'price_desc') cursor = cursor.sort({ price: -1 })
  else cursor = cursor.sort({ createdAt: -1 })

  const items = await cursor.limit(40)
  res.json({ items })
})

// Get single product
router.get('/:id', async (req, res) => {
  const p = await Product.findById(req.params.id)
  if (!p) return res.status(404).json({ message: 'Not found' })
  res.json(p)
})

// Admin: create product
router.post('/', auth, admin, async (req, res) => {
  const p = await Product.create(req.body)
  res.status(201).json(p)
})

// Admin: update product
router.put('/:id', auth, admin, async (req, res) => {
  const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if (!p) return res.status(404).json({ message: 'Not found' })
  res.json(p)
})

// Admin: delete product
router.delete('/:id', auth, admin, async (req, res) => {
  const p = await Product.findByIdAndDelete(req.params.id)
  if (!p) return res.status(404).json({ message: 'Not found' })
  res.json({ ok: true })
})

export default router
