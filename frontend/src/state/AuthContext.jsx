import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Attempt to fetch current user on load (if session cookie is set)
    async function fetchMe() {
      try {
        const res = await api.get('/auth/me')
        setUser(res.data)
      } catch (_) {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    fetchMe()
  }, [])

  async function login(email, password) {
    const res = await api.post('/auth/login', { email, password })
    setUser(res.data.user)
    return res.data
  }

  async function signup(payload) {
    const res = await api.post('/auth/signup', payload)
    setUser(res.data.user)
    return res.data
  }

  async function logout() {
    await api.post('/auth/logout')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
