import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        title: String,
        price: Number,
        qty: Number,
      },
    ],
    amount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'paid', 'shipped', 'delivered'], default: 'pending' },
    paymentIntentId: { type: String },
    shipping: {
      address: String,
      city: String,
      country: String,
    },
  },
  { timestamps: true }
)

export default mongoose.model('Order', OrderSchema)
