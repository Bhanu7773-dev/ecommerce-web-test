import { Link, NavLink } from 'react-router-dom'
import { ShoppingCartIcon, UserIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const navItems = [
  { to: '/products?category=men', label: 'Men' },
  { to: '/products?category=women', label: 'Women' },
  { to: '/products?category=kids', label: 'Kids' },
  { to: '/products?category=accessories', label: 'Accessories' },
]

export default function Navbar() {
  return (
    <header className="border-b bg-white/80 backdrop-blur">
      <div className="container mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="text-xl font-bold">FashionX</Link>
        <nav className="hidden gap-6 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm ${isActive ? 'font-semibold text-gray-900' : 'text-gray-600 hover:text-gray-900'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <MagnifyingGlassIcon className="pointer-events-none absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search products..."
              className="w-56 rounded-md border border-gray-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-gray-400"
            />
          </div>
          <Link to="/profile" className="rounded p-2 hover:bg-gray-100">
            <UserIcon className="h-6 w-6" />
          </Link>
          <Link to="/cart" className="rounded p-2 hover:bg-gray-100">
            <ShoppingCartIcon className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </header>
  )
}
