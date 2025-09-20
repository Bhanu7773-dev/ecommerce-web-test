import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('cart')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  function add(product, qty = 1) {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i._id === product._id)
      if (idx >= 0) {
        const next = [...prev]
        next[idx] = { ...next[idx], qty: next[idx].qty + qty }
        return next
      }
      return [...prev, { ...product, qty }]
    })
  }

  function update(productId, qty) {
    setItems((prev) => prev.map((i) => (i._id === productId ? { ...i, qty } : i)))
  }

  function remove(productId) {
    setItems((prev) => prev.filter((i) => i._id !== productId))
  }

  function clear() {
    setItems([])
  }

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0)
    return { subtotal, itemCount: items.reduce((n, i) => n + i.qty, 0) }
  }, [items])

  return (
    <CartContext.Provider value={{ items, add, update, remove, clear, totals }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
