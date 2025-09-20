import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { auth } from '../middleware/auth.js'

const router = Router()

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' })
  const exists = await User.findOne({ email })
  if (exists) return res.status(400).json({ message: 'Email already in use' })
  const passwordHash = await bcrypt.hash(password, 10)
  const user = await User.create({ name, email, passwordHash })
  const token = jwt.sign({ id: user._id, role: user.role, email: user.email }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' })
  res.cookie('token', token, { httpOnly: true, sameSite: 'lax' })
  res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } })
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) return res.status(401).json({ message: 'Invalid credentials' })
  const ok = await bcrypt.compare(password, user.passwordHash)
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' })
  const token = jwt.sign({ id: user._id, role: user.role, email: user.email }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' })
  res.cookie('token', token, { httpOnly: true, sameSite: 'lax' })
  res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } })
})

router.post('/logout', auth, (req, res) => {
  res.clearCookie('token')
  res.json({ ok: true })
})

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user.id).select('name email role')
  res.json(user)
})

export default router
