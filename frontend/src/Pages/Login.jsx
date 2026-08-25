import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth-context.js'
import { getApiError } from '../services/api.js'

const destinationFor = (role )  =>  ({ user: '/user/dashboard', organizer: '/organizer/dashboard', admin: '/admin/dashboard' })[role] || '/'

function Login() {
  const { login } = useAuth(); const navigate = useNavigate(); const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' }); const [error, setError] = useState(''); const [loading, setLoading] = useState(false)
  const submit = async (event) => { event.preventDefault(); setLoading(true); setError(''); try { const user = await login(form); navigate(location.state?.from || destinationFor(user.role), { replace: true }) } catch (requestError) { setError(getApiError(requestError, 'Login failed.')) } finally { setLoading(false) } }
  return <main className="bg-gray-50 px-4 py-12"><form onSubmit={submit} className="mx-auto max-w-md rounded-lg border bg-white p-6 shadow-sm"><h1 className="text-2xl font-bold text-gray-900">Login</h1><p className="mt-2 text-gray-600">Geli akoonkaaga si aad u maamusho akoonkaaga.</p>{location.state?.registered && <p className="mt-4 rounded bg-green-50 p-3 text-sm text-green-700">Registration successful. Fadlan login samee.</p>}{error && <p className="mt-4 rounded bg-red-50 p-3 text-sm text-red-700">{error}</p>}<label className="mt-5 block text-sm font-medium text-gray-700">Email<input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-2 w-full rounded-lg border px-3 py-2.5" /></label><label className="mt-4 block text-sm font-medium text-gray-700">Password<input type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="mt-2 w-full rounded-lg border px-3 py-2.5" /></label><button disabled={loading} className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60">{loading ? 'Signing In...' : 'Login'}</button><p className="mt-5 text-center text-sm text-gray-600">Akoon ma lihid? <Link to="/register" className="font-semibold text-blue-600">Register</Link></p></form></main>
}
export default Login
