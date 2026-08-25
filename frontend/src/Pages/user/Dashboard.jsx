import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PageState from '../../components/common/PageState.jsx'
import { useAuth } from '../../context/auth-context.js'
import { getMyBookings } from '../../services/bookings.js'
import { getMyTickets } from '../../services/tickets.js'

function UserDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([getMyBookings(), getMyTickets()])
      .then(([bookings, tickets]) => setData({ bookings: bookings.count, tickets: tickets.count }))
      .catch(() => setError('Xogta lama soo heli karin.'))
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <main className="bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><h1 className="text-3xl font-bold text-gray-900">Welcome, {user.name}</h1><p className="mt-2 text-gray-600">Ka eeg akoonkaaga, booking-yada iyo tickets-kaaga.</p></div><button type="button" onClick={handleLogout} className="w-fit rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-100">Logout</button></div>
        <section className="mt-8 rounded-lg border border-gray-200 bg-white p-5 shadow-sm"><h2 className="font-semibold text-gray-900">Account Information</h2><dl className="mt-4 grid gap-4 text-sm sm:grid-cols-3"><div><dt className="text-gray-500">Name</dt><dd className="mt-1 font-medium text-gray-900">{user.name}</dd></div><div><dt className="text-gray-500">Email</dt><dd className="mt-1 font-medium text-gray-900">{user.email}</dd></div><div><dt className="text-gray-500">Role</dt><dd className="mt-1 font-medium capitalize text-gray-900">{user.role}</dd></div></dl></section>
        {error ? <div className="mt-6"><PageState tone="error" message={error} /></div> : !data ? <div className="mt-6"><PageState message="Soo dejinaya..." /></div> : <div className="mt-6 grid gap-5 sm:grid-cols-2"><div className="rounded-lg border bg-white p-6 shadow-sm"><p className="text-gray-500">Bookings</p><p className="mt-2 text-3xl font-bold text-gray-900">{data.bookings}</p></div><div className="rounded-lg border bg-white p-6 shadow-sm"><p className="text-gray-500">My Tickets</p><p className="mt-2 text-3xl font-bold text-gray-900">{data.tickets}</p>{data.tickets === 0 && <p className="mt-2 text-sm text-gray-500">Weli ma lihid tickets.</p>}</div></div>}
        <div className="mt-8 flex flex-wrap gap-3"><Link to="/events" className="rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white hover:bg-blue-700">Browse Events</Link><Link to="/user/tickets" className="rounded-lg border bg-white px-4 py-2.5 font-semibold text-gray-700 hover:bg-gray-100">My Tickets</Link></div>
      </div>
    </main>
  )
}
export default UserDashboard
