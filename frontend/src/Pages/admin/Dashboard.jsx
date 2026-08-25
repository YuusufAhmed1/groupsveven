import { useEffect, useState } from 'react'
import PageState from '../../components/common/PageState.jsx'
import { getAdminEvents, getAdminStats, getAdminTickets, getAdminUsers } from '../../services/tickets.js'

function AdminDashboard() {
  const [data, setData] = useState(null); const [error, setError] = useState('')
  useEffect(() => { Promise.all([getAdminStats(), getAdminUsers(), getAdminEvents(), getAdminTickets()]).then(([stats, users, events, tickets]) => setData({ stats: stats.stats, users: users.users, events: events.events, tickets: tickets.tickets })).catch(() => setError('Admin data lama soo qaadi karin.')) }, [])
  if (error) return <main className="mx-auto max-w-7xl px-4 py-12"><PageState tone="error" message={error} /></main>
  if (!data) return <main className="mx-auto max-w-7xl px-4 py-12"><PageState message="Loading admin dashboard..." /></main>
  return <main className="bg-gray-50 py-12"><div className="mx-auto max-w-7xl px-4"><h1 className="text-3xl font-bold">Admin Dashboard</h1><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{Object.entries(data.stats).map(([key, value]) => <div key={key} className="rounded-lg border bg-white p-5 shadow-sm"><p className="text-sm capitalize text-gray-500">{key.replace(/([A-Z])/g, ' $1')}</p><p className="mt-2 text-2xl font-bold">{value}</p></div>)}</div><section className="mt-8 rounded-lg border bg-white p-5 shadow-sm"><h2 className="text-xl font-semibold">Users</h2><div className="mt-4 overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr className="border-b"><th className="py-3">Name</th><th>Email</th><th>Role</th></tr></thead><tbody>{data.users.map((user) => <tr key={user._id} className="border-b"><td className="py-3">{user.name}</td><td>{user.email}</td><td>{user.role}</td></tr>)}</tbody></table></div></section><div className="mt-6 grid gap-6 md:grid-cols-2"><section className="rounded-lg border bg-white p-5 shadow-sm"><h2 className="font-semibold">Events</h2><p className="mt-2 text-3xl font-bold">{data.events.length}</p></section><section className="rounded-lg border bg-white p-5 shadow-sm"><h2 className="font-semibold">Tickets</h2><p className="mt-2 text-3xl font-bold">{data.tickets.length}</p></section></div></div></main>
}
export default AdminDashboard
