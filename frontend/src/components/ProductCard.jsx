import { Link } from 'react-router-dom'

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="group rounded-lg border p-3 transition hover:shadow">
      <Link to={`/products/${product._id}`} className="block overflow-hidden rounded">
        <img
          src={product.image}
          alt={product.title}
          className="aspect-square w-full object-cover transition group-hover:scale-105"
        />
      </Link>
      <div className="mt-3">
        <Link to={`/products/${product._id}`} className="line-clamp-1 font-medium hover:underline">
          {product.title}
        </Link>
        <p className="mt-1 text-sm text-gray-600">${product.price.toFixed(2)}</p>
      </div>
      <button
        onClick={() => onAdd?.(product)}
        className="mt-3 w-full rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-black"
      >
        Add to Cart
      </button>
    </div>
  )
}
