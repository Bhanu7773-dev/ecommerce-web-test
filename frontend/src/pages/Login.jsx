import { useState } from 'react'
import { useAuth } from '../state/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await login(email, password)
    } catch (e) {
      setError('Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-xl font-semibold">Login</h1>
      <form onSubmit={onSubmit} className="mt-4 space-y-3">
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full rounded-md border px-3 py-2 text-sm" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full rounded-md border px-3 py-2 text-sm" />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button disabled={loading} className="w-full rounded-md bg-gray-900 px-4 py-2 font-medium text-white hover:bg-black">{loading ? 'Signing in...' : 'Login'}</button>
      </form>
    </div>
  )
}
