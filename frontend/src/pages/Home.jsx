import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'

const hero = 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop'

export default function Home() {
  const featured = [
    { _id: '1', title: 'Classic Tee', price: 29.99, image: hero },
    { _id: '2', title: 'Denim Jacket', price: 89.99, image: hero },
    { _id: '3', title: 'Summer Dress', price: 59.99, image: hero },
    { _id: '4', title: 'Kids Hoodie', price: 34.99, image: hero },
  ]

  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-2xl bg-gray-100">
        <div className="relative">
          <img src={hero} alt="Fashion" className="h-80 w-full object-cover" />
          <div className="absolute inset-0 flex items-center bg-black/30">
            <div className="px-6 text-white">
              <h1 className="text-3xl font-bold md:text-5xl">Elevate Your Style</h1>
              <p className="mt-2 max-w-xl text-sm text-gray-200">Discover modern, minimal pieces for Men, Women, and Kids.</p>
              <div className="mt-6">
                <Link to="/products" className="rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-900">Shop Now</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Featured Products</h2>
          <Link to="/products" className="text-sm text-gray-600 hover:underline">View all</Link>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      </section>
    </div>
  )
}
