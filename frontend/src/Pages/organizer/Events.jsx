import { useCallback, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import PageState from '../../components/common/PageState.jsx'
import { getApiError } from '../../services/api.js'
import { deleteEvent, getMyEvents, publishEvent } from '../../services/events.js'

function OrganizerEvents() {
  const location = useLocation()
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [message, setMessage] = useState(location.state?.message || '')

  const load = useCallback(async () => {
    setError('')
    try {
      const data = await getMyEvents()
      setEvents(data.events)
    } catch (requestError) {
      setError(getApiError(requestError, 'Xogta lama soo heli karo.'))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    getMyEvents()
      .then((data) => setEvents(data.events))
      .catch((requestError) => setError(getApiError(requestError, 'Xogta lama soo heli karin.')))
      .finally(() => setLoading(false))
  }, [])

  const publish = async (id) => {
    setError('')
    try {
      await publishEvent(id)
      setMessage('Event published successfully.')
      await load()
    } catch (requestError) {
      setError(getApiError(requestError))
    }
  }

  const remove = async (id) => {
    if (!window.confirm('Delete this event?')) return
    setError('')
    try {
      await deleteEvent(id)
      setEvents((items) => items.filter((item) => item._id !== id))
      setMessage('Event deleted successfully.')
    } catch (requestError) {
      setError(getApiError(requestError))
    }
  }

  return <main className="bg-gray-50 py-12"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="flex flex-wrap justify-between gap-4"><div><h1 className="text-3xl font-bold text-gray-900">Manage Events</h1><p className="mt-2 text-gray-600">Maamul events-kaaga dhabta ah.</p></div><Link to="/organizer/events/create" className="rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white hover:bg-blue-700">Create Event</Link></div>{message && <p className="mt-6 rounded-lg bg-green-50 p-3 text-green-700">{message}</p>}{error && <p className="mt-6 rounded-lg bg-red-50 p-3 text-red-700">{error}</p>}<div className="mt-8">{loading ? <PageState message="Soo dejinaya..." /> : events.length ? <div className="space-y-4">{events.map((event) => <article key={event._id} className="flex flex-col justify-between gap-4 rounded-lg border bg-white p-5 shadow-sm sm:flex-row sm:items-center"><div><h2 className="font-semibold text-gray-900">{event.title}</h2><p className="mt-1 text-sm capitalize text-gray-500">{new Date(event.date).toLocaleDateString()} · {event.status}</p></div><div className="flex flex-wrap gap-2"><Link to={`/events/${event._id}`} className="rounded border px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">View</Link>{event.status === 'draft' && <button type="button" onClick={() => publish(event._id)} className="rounded border px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">Publish</button>}<Link to={`/organizer/events/${event._id}/edit`} className="rounded border px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">Edit</Link><button type="button" onClick={() => remove(event._id)} className="rounded border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50">Delete</button></div></article>)}</div> : <PageState title="No events" message="Wax xog ah lama helin." />}</div></div></main>
}
export default OrganizerEvents
