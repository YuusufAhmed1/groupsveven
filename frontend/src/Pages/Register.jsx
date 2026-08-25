import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth-context.js'
import { getApiError } from '../services/api.js'

function Register() {
  const { register } = useAuth(); const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' }); const [error, setError] = useState(''); const [loading, setLoading] = useState(false)
  const submit = async (event) => { event.preventDefault(); setLoading(true); setError(''); try { await register(form); navigate('/login', { state: { registered: true } }) } catch (requestError) { setError(getApiError(requestError, 'Registration failed.')) } finally { setLoading(false) } }
  const field = (name) => ({ value: form[name], onChange: (e) => setForm({ ...form, [name]: e.target.value }) })
  return <main className="bg-gray-50 px-4 py-12"><form onSubmit={submit} className="mx-auto max-w-md rounded-lg border bg-white p-6 shadow-sm"><h1 className="text-2xl font-bold text-gray-900">Register</h1><p className="mt-2 text-gray-600">Samee akoon si aad u hesho adeegyada EventHub.</p>{error && <p className="mt-4 rounded bg-red-50 p-3 text-sm text-red-700">{error}</p>}<label className="mt-5 block text-sm font-medium text-gray-700">Name<input required {...field('name')} className="mt-2 w-full rounded-lg border px-3 py-2.5" /></label><label className="mt-4 block text-sm font-medium text-gray-700">Email<input type="email" required {...field('email')} className="mt-2 w-full rounded-lg border px-3 py-2.5" /></label><label className="mt-4 block text-sm font-medium text-gray-700">Password<input type="password" minLength="6" required {...field('password')} className="mt-2 w-full rounded-lg border px-3 py-2.5" /></label><label className="mt-4 block text-sm font-medium text-gray-700">Account Type<select {...field('role')} className="mt-2 w-full rounded-lg border px-3 py-2.5"><option value="user">Attendee</option><option value="organizer">Organizer</option></select></label><button disabled={loading} className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60">{loading ? 'Creating Account...' : 'Register'}</button><p className="mt-5 text-center text-sm text-gray-600">Akoon hore ma leedahay? <Link to="/login" className="font-semibold text-blue-600">Login</Link></p></form></main>
}
export default Register
