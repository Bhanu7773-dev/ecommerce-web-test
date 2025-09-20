import { useState } from 'react'
import { useAuth } from '../state/AuthContext'

export default function Signup() {
  const { signup } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function onSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await signup(form)
    } catch (e) {
      setError('Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-xl font-semibold">Create Account</h1>
      <form onSubmit={onSubmit} className="mt-4 space-y-3">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full rounded-md border px-3 py-2 text-sm" />
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full rounded-md border px-3 py-2 text-sm" />
        <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" className="w-full rounded-md border px-3 py-2 text-sm" />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button disabled={loading} className="w-full rounded-md bg-gray-900 px-4 py-2 font-medium text-white hover:bg-black">{loading ? 'Creating...' : 'Sign up'}</button>
      </form>
    </div>
  )
}
