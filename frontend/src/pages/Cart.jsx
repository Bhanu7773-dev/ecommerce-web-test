import { useCart } from '../state/CartContext'
import { Link } from 'react-router-dom'

export default function Cart() {
  const { items, update, remove, totals } = useCart()

  return (
    <div>
      <h1 className="text-xl font-semibold">Shopping Cart</h1>
      {items.length === 0 ? (
        <p className="mt-4 text-gray-600">Your cart is empty. <Link to="/products" className="underline">Browse products</Link>.</p>
      ) : (
        <div className="mt-4 grid gap-6 md:grid-cols-[1fr_320px]">
          <ul className="space-y-4">
            {items.map((i) => (
              <li key={i._id} className="flex gap-4 rounded-lg border p-3">
                <img src={i.image} alt={i.title} className="h-24 w-24 rounded object-cover" />
                <div className="flex-1">
                  <h3 className="font-medium">{i.title}</h3>
                  <p className="text-sm text-gray-600">${i.price.toFixed(2)}</p>
                  <div className="mt-2 flex items-center gap-3">
                    <input type="number" min={1} value={i.qty} onChange={(e) => update(i._id, parseInt(e.target.value || '1'))} className="w-20 rounded-md border px-3 py-2 text-sm" />
                    <button onClick={() => remove(i._id)} className="text-sm text-red-600 hover:underline">Remove</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <aside className="rounded-lg border p-4">
            <h2 className="text-lg font-semibold">Order Summary</h2>
            <dl className="mt-3 space-y-1 text-sm">
              <div className="flex justify-between"><dt>Subtotal</dt><dd>${totals.subtotal.toFixed(2)}</dd></div>
              <div className="flex justify-between"><dt>Shipping</dt><dd>Calculated at checkout</dd></div>
            </dl>
            <Link to="/checkout" className="mt-4 block rounded-md bg-gray-900 px-4 py-2 text-center font-medium text-white hover:bg-black">Proceed to Checkout</Link>
          </aside>
        </div>
      )}
    </div>
  )
}
