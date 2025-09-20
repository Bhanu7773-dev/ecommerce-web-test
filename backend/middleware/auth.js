import jwt from 'jsonwebtoken'

export function auth(req, res, next) {
  const token = req.cookies?.token || (req.headers.authorization || '').replace('Bearer ', '')
  if (!token) return res.status(401).json({ message: 'Unauthorized' })
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret')
    req.user = payload
    next()
  } catch {
    return res.status(401).json({ message: 'Invalid token' })
  }
}

export function admin(req, res, next) {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Forbidden' })
  next()
}
