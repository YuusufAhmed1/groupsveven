import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import PageState from '../../components/common/PageState.jsx'
import TicketCard from '../../components/tickets/TicketCard.jsx'
import { useAuth } from '../../context/auth-context.js'
import { getMyTickets } from '../../services/tickets.js'

function MyTickets() {
  const location = useLocation()
  const { user } = useAuth(); const [tickets, setTickets] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState('')
  useEffect(() => {
    getMyTickets()
      .then((data) => setTickets(Array.isArray(data.tickets) ? data.tickets : []))
      .catch((requestError) => setError(requestError.response?.data?.message || 'Tigidhada lama soo qaadi karin.'))
      .finally(() => setLoading(false))
  }, [])
  return <main className="bg-gray-50 py-12"><div className="mx-auto max-w-7xl px-4"><h1 className="text-3xl font-bold text-gray-900">My Tickets</h1><p className="mt-2 text-gray-600">Tigidh kasta wuxuu leeyahay QR backend-ku u sameeyey oo gaar ah.</p>{location.state?.paymentSuccess && <p className="mt-5 rounded-lg bg-green-50 p-3 text-green-700">Payment successful. Ticket-kaaga waa la sameeyey.</p>}<div className="mt-8">{loading ? <PageState message="Soo dejinaya..." /> : error ? <PageState tone="error" message={error} /> : tickets.length ? <div className="grid gap-6 lg:grid-cols-2">{tickets.map((ticket) => <TicketCard key={ticket._id} ticket={ticket} attendee={user} />)}</div> : <PageState title="No tickets" message="Wax xog ah lama helin." />}</div></div></main>
}
export default MyTickets
