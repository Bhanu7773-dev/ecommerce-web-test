import { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { useCart } from '../state/CartContext'
import { api } from '../lib/api'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_12345')

export default function Checkout() {
  const { items, totals, clear } = useCart()
  const [billing, setBilling] = useState({ name: '', email: '' })
  const [shipping, setShipping] = useState({ address: '', city: '', country: '' })
  const [loading, setLoading] = useState(false)

  async function onPay() {
    setLoading(true)
    try {
      const res = await api.post('/checkout/create-intent', {
        items: items.map((i) => ({ id: i._id, qty: i.qty })),
        billing,
        shipping,
      })
      const stripe = await stripePromise
      const { clientSecret } = res.data
      // Dummy redirect in test mode (would use elements/confirmPayment in a real flow)
      alert(`Stripe client secret (test): ${clientSecret}`)
      clear()
    } catch (e) {
      alert('Payment failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_360px]">
      <section className="space-y-4">
        <h1 className="text-xl font-semibold">Checkout</h1>
        <div>
          <h2 className="font-medium">Billing</h2>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            <input className="rounded-md border px-3 py-2 text-sm" placeholder="Full name" value={billing.name} onChange={(e) => setBilling({ ...billing, name: e.target.value })} />
            <input className="rounded-md border px-3 py-2 text-sm" placeholder="Email" value={billing.email} onChange={(e) => setBilling({ ...billing, email: e.target.value })} />
          </div>
        </div>
        <div>
          <h2 className="font-medium">Shipping</h2>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            <input className="rounded-md border px-3 py-2 text-sm" placeholder="Address" value={shipping.address} onChange={(e) => setShipping({ ...shipping, address: e.target.value })} />
            <input className="rounded-md border px-3 py-2 text-sm" placeholder="City" value={shipping.city} onChange={(e) => setShipping({ ...shipping, city: e.target.value })} />
            <input className="rounded-md border px-3 py-2 text-sm sm:col-span-2" placeholder="Country" value={shipping.country} onChange={(e) => setShipping({ ...shipping, country: e.target.value })} />
          </div>
        </div>
        <button onClick={onPay} disabled={loading || items.length === 0} className="rounded-md bg-gray-900 px-4 py-2 font-medium text-white hover:bg-black disabled:cursor-not-allowed disabled:opacity-50">
          {loading ? 'Processing...' : 'Pay with Stripe (Test)'}
        </button>
      </section>
      <aside className="rounded-lg border p-4">
        <h2 className="text-lg font-semibold">Order Summary</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {items.map((i) => (
            <li key={i._id} className="flex justify-between">
              <span>{i.title} × {i.qty}</span>
              <span>${(i.price * i.qty).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex justify-between font-medium">
          <span>Subtotal</span>
          <span>${totals.subtotal.toFixed(2)}</span>
        </div>
      </aside>
    </div>
  )
}
