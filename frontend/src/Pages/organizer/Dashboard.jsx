import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageState from '../../components/common/PageState.jsx'
import { useAuth } from '../../context/auth-context.js'
import { getOrganizerStats } from '../../services/tickets.js'

function OrganizerDashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    getOrganizerStats()
      .then((data) => setStats(data.stats))
      .catch(() => setError('Xogta lama soo heli karo.'))
  }, [])

  const cards = stats ? [
    ['Events', stats.totalEvents],
    ['Tickets Sold', stats.totalTicketsSold],
    ['Available', stats.totalAvailableTickets],
    ['Checked In', stats.checkedInAttendees],
    ['Revenue', `$${stats.totalRevenue}`],
  ] : []

  return <main className="bg-gray-50 py-12"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="flex flex-wrap items-end justify-between gap-4"><div><h1 className="text-3xl font-bold text-gray-900">Organizer Dashboard</h1><p className="mt-2 text-gray-600">Welcome, {user.name}. La soco munaasabadaha iyo xogta dhabta ah.</p></div><Link to="/organizer/events/create" className="rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white hover:bg-blue-700">Create Event</Link></div>{error ? <div className="mt-8"><PageState tone="error" message={error} /></div> : !stats ? <div className="mt-8"><PageState message="Soo dejinaya..." /></div> : <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">{cards.map(([label, value]) => <div key={label} className="rounded-lg border bg-white p-5 shadow-sm"><p className="text-sm text-gray-500">{label}</p><p className="mt-2 text-2xl font-bold text-gray-900">{value}</p></div>)}</div>}<div className="mt-8 flex flex-wrap gap-3"><Link to="/organizer/events" className="rounded-lg border bg-white px-4 py-2.5 font-semibold text-gray-700 hover:bg-gray-100">Manage Events</Link></div></div></main>
}
export default OrganizerDashboard
