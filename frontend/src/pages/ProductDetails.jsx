import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../lib/api'
import { useCart } from '../state/CartContext'

export default function ProductDetails() {
  const { id } = useParams()
  const { add } = useCart()
  const [product, setProduct] = useState(null)
  const [qty, setQty] = useState(1)

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await api.get(`/products/${id}`)
        setProduct(res.data)
      } catch {
        setProduct({
          _id: id,
          title: 'Sample Product',
          description: 'A great product for demonstration.',
          price: 49.99,
          image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop',
          sizes: ['S', 'M', 'L'],
          colors: ['black', 'white'],
        })
      }
    }
    fetchProduct()
  }, [id])

  if (!product) return <p>Loading...</p>

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div>
        <img src={product.image} alt={product.title} className="w-full rounded-lg object-cover" />
      </div>
      <div>
        <h1 className="text-2xl font-semibold">{product.title}</h1>
        <p className="mt-2 text-gray-600">{product.description}</p>
        <p className="mt-3 text-xl font-semibold">${product.price.toFixed(2)}</p>
        <div className="mt-4 flex items-center gap-3">
          <label className="text-sm">Qty</label>
          <input type="number" min={1} value={qty} onChange={(e) => setQty(parseInt(e.target.value || '1'))} className="w-20 rounded-md border px-3 py-2 text-sm" />
        </div>
        <button onClick={() => add(product, qty)} className="mt-4 w-full rounded-md bg-gray-900 px-4 py-2 font-medium text-white hover:bg-black md:w-auto">Add to Cart</button>
      </div>
    </div>
  )
}
