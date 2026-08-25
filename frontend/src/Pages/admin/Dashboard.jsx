import { useEffect, useState } from 'react'
import PageState from '../../components/common/PageState.jsx'
import { getAdminEvents, getAdminStats, getAdminTickets, getAdminUsers } from '../../services/tickets.js'

const formatLabel = (value) => value.replace(/([A-Z])/g, ' $1')
const formatDate = (value) => value ? new Date(value).toLocaleDateString() : '-'

function AdminDashboard() {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([getAdminStats(), getAdminUsers(), getAdminEvents(), getAdminTickets()])
      .then(([stats, users, events, tickets]) => setData({ stats: stats.stats, users: users.users || [], events: events.events || [], tickets: tickets.tickets || [] }))
      .catch(() => setError('Admin data lama soo qaadi karin.'))
  }, [])

  if (error) return <main className="mx-auto max-w-7xl px-4 py-12"><PageState tone="error" message={error} /></main>
  if (!data) return <main className="mx-auto max-w-7xl px-4 py-12"><PageState message="Loading admin dashboard..." /></main>

  const organizers = data.users.filter((user) => user.role === 'organizer')
  const tableState = (items, message) => items.length ? null : <p className="py-6 text-sm text-gray-500">{message}</p>

  return (
    <main className="bg-gray-50 py-12"><div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
      <div><h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1><p className="mt-2 text-gray-600">Real-time system data from the backend.</p></div>
      <section aria-label="Overview" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{Object.entries(data.stats).map(([key, value]) => <div key={key} className="rounded-lg border bg-white p-5 shadow-sm"><p className="text-sm capitalize text-gray-500">{formatLabel(key)}</p><p className="mt-2 text-2xl font-bold text-gray-900">{value}</p></div>)}</section>
      <section aria-label="Users" className="rounded-lg border bg-white p-5 shadow-sm"><h2 className="text-xl font-semibold text-gray-900">Users</h2><div className="mt-4 overflow-x-auto">{tableState(data.users, 'No users found.') || <table className="w-full min-w-[520px] text-left text-sm"><thead><tr className="border-b text-gray-500"><th className="py-3">Name</th><th>Email</th><th>Role</th><th>Joined</th></tr></thead><tbody>{data.users.map((user) => <tr key={user._id} className="border-b last:border-0"><td className="py-3 font-medium text-gray-900">{user.name}</td><td>{user.email}</td><td className="capitalize">{user.role}</td><td>{formatDate(user.createdAt)}</td></tr>)}</tbody></table>}</div></section>
      <section aria-label="Organizers" className="rounded-lg border bg-white p-5 shadow-sm"><h2 className="text-xl font-semibold text-gray-900">Organizers</h2><div className="mt-4 overflow-x-auto">{tableState(organizers, 'No organizers found.') || <table className="w-full min-w-[460px] text-left text-sm"><thead><tr className="border-b text-gray-500"><th className="py-3">Name</th><th>Email</th><th>Joined</th></tr></thead><tbody>{organizers.map((organizer) => <tr key={organizer._id} className="border-b last:border-0"><td className="py-3 font-medium text-gray-900">{organizer.name}</td><td>{organizer.email}</td><td>{formatDate(organizer.createdAt)}</td></tr>)}</tbody></table>}</div></section>
      <section aria-label="Events" className="rounded-lg border bg-white p-5 shadow-sm"><h2 className="text-xl font-semibold text-gray-900">Events</h2><div className="mt-4 overflow-x-auto">{tableState(data.events, 'No events found.') || <table className="w-full min-w-[680px] text-left text-sm"><thead><tr className="border-b text-gray-500"><th className="py-3">Title</th><th>Organizer</th><th>Category</th><th>Date</th><th>Status</th><th>Tickets</th></tr></thead><tbody>{data.events.map((event) => <tr key={event.id} className="border-b last:border-0"><td className="py-3 font-medium text-gray-900">{event.title}</td><td>{event.organizer?.name || 'Unknown'}</td><td>{event.category}</td><td>{formatDate(event.date)}</td><td className="capitalize">{event.status}</td><td>{event.ticketTypes?.reduce((total, type) => total + type.quantity, 0) || 0}</td></tr>)}</tbody></table>}</div></section>
      <section aria-label="Tickets" className="rounded-lg border bg-white p-5 shadow-sm"><h2 className="text-xl font-semibold text-gray-900">Tickets</h2><div className="mt-4 overflow-x-auto">{tableState(data.tickets, 'No tickets found.') || <table className="w-full min-w-[620px] text-left text-sm"><thead><tr className="border-b text-gray-500"><th className="py-3">Ticket ID</th><th>Attendee</th><th>Event</th><th>Status</th><th>Checked in</th></tr></thead><tbody>{data.tickets.map((ticket) => <tr key={ticket._id} className="border-b last:border-0"><td className="py-3 font-medium text-gray-900">{ticket.ticketId}</td><td>{ticket.user?.name || '-'}</td><td>{ticket.event?.title || '-'}</td><td className="capitalize">{ticket.status}</td><td>{ticket.checkedIn ? 'Yes' : 'No'}</td></tr>)}</tbody></table>}</div></section>
    </div></main>
  )
}

export default AdminDashboard
