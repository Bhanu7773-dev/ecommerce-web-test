import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { api } from '../lib/api'

const categories = ['men', 'women', 'kids', 'accessories']
const sizes = ['XS', 'S', 'M', 'L', 'XL']
const colors = ['black', 'white', 'blue', 'red', 'green']

export default function Products() {
  const loc = useLocation()
  const params = new URLSearchParams(loc.search)

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  const [filters, setFilters] = useState({
    category: params.get('category') || '',
    size: '',
    color: '',
    minPrice: '',
    maxPrice: '',
    sort: 'newest',
  })

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      try {
        const res = await api.get('/products', { params: filters })
        setItems(res.data.items || [])
      } catch {
        // fallback demo items
        const demo = Array.from({ length: 8 }).map((_, i) => ({
          _id: String(i + 1),
          title: `Product ${i + 1}`,
          price: 19.99 + i,
          image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800&auto=format&fit=crop',
        }))
        setItems(demo)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [filters])

  const queryCount = useMemo(() => items.length, [items])

  function handleChange(e) {
    const { name, value } = e.target
    setFilters((f) => ({ ...f, [name]: value }))
  }

  return (
    <div className="grid gap-6 md:grid-cols-[240px_1fr]">
      <aside className="space-y-4">
        <div>
          <label className="text-sm font-medium">Category</label>
          <select name="category" value={filters.category} onChange={handleChange} className="mt-1 w-full rounded-md border px-3 py-2 text-sm">
            <option value="">All</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium">Size</label>
          <select name="size" value={filters.size} onChange={handleChange} className="mt-1 w-full rounded-md border px-3 py-2 text-sm">
            <option value="">Any</option>
            {sizes.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium">Color</label>
          <select name="color" value={filters.color} onChange={handleChange} className="mt-1 w-full rounded-md border px-3 py-2 text-sm">
            <option value="">Any</option>
            {colors.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <input name="minPrice" value={filters.minPrice} onChange={handleChange} placeholder="Min $" className="rounded-md border px-3 py-2 text-sm" />
          <input name="maxPrice" value={filters.maxPrice} onChange={handleChange} placeholder="Max $" className="rounded-md border px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium">Sort</label>
          <select name="sort" value={filters.sort} onChange={handleChange} className="mt-1 w-full rounded-md border px-3 py-2 text-sm">
            <option value="newest">Newest</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </aside>
      <section>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Products</h1>
          <p className="text-sm text-gray-600">{loading ? 'Loading...' : `${queryCount} results`}</p>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      </section>
    </div>
  )
}
