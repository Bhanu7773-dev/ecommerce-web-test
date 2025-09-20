import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, index: true },
    sizes: [{ type: String }],
    colors: [{ type: String }],
    stock: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default mongoose.model('Product', ProductSchema)
