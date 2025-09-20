import { Router } from 'express'
import Stripe from 'stripe'

const router = Router()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_12345')

// Create PaymentIntent (test mode)
router.post('/create-intent', async (req, res) => {
  const { items } = req.body
  const amount = (items || []).reduce((sum, i) => sum + 2000 * (i.qty || 1), 0) || 2000 // dummy $20/item
  try {
    const pi = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    })
    res.json({ clientSecret: pi.client_secret })
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
})

export default router
