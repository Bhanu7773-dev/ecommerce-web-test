import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import Product from '../models/Product.js'
import User from '../models/User.js'

dotenv.config({ path: new URL('../.env', import.meta.url).pathname })

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/clothes_db'

const sampleProducts = [
  {
    title: 'Classic Tee',
    description: 'Soft cotton tee for everyday wear.',
    price: 2999 / 100,
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800&auto=format&fit=crop',
    category: 'men',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['black', 'white'],
    stock: 50,
  },
  {
    title: 'Denim Jacket',
    description: 'Timeless denim with modern cut.',
    price: 8999 / 100,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop',
    category: 'women',
    sizes: ['S', 'M', 'L'],
    colors: ['blue'],
    stock: 20,
  },
]

async function run() {
  await mongoose.connect(MONGODB_URI)
  console.log('Connected to MongoDB')

  await Product.deleteMany({})
  await Product.insertMany(sampleProducts)
  console.log('Seeded products')

  const adminEmail = 'admin@example.com'
  const existing = await User.findOne({ email: adminEmail })
  if (!existing) {
    const passwordHash = await bcrypt.hash('admin123', 10)
    await User.create({ name: 'Admin', email: adminEmail, passwordHash, role: 'admin' })
    console.log('Created admin user: admin@example.com / admin123')
  } else {
    console.log('Admin user already exists')
  }

  await mongoose.disconnect()
  console.log('Done.')
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
