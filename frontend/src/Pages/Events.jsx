import { useEffect, useMemo, useState } from 'react'
import EventFilters from '../components/events/EventFilters.jsx'
import EventGrid from '../components/events/EventGrid.jsx'
import PageState from '../components/common/PageState.jsx'
import { getEvents } from '../services/events.js'

function Events() {
  const [events, setEvents] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  useEffect(() => {
    getEvents()
      .then((data) => setEvents(Array.isArray(data.events) ? data.events : []))
      .catch(() => {
        setEvents([])
        setError('Events-ka lama soo dejin karin.')
      })
      .finally(() => setLoading(false))
  }, [])
  const categories = useMemo(() => [...new Set(events.map((event) => event.category))], [events])
  const filtered = events.filter((event) => (!category || event.category === category) && `${event.title} ${event.location} ${event.description}`.toLowerCase().includes(search.toLowerCase()))
  return <main className="bg-gray-50 py-12">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  <h1 className="text-3xl font-bold text-gray-900">Events
  </h1><p className="mt-2 text-gray-600">Soo hel munaasabadda kugu habboon.
  </p><div className="mt-8"><EventFilters search={search} onSearch={setSearch} category={category} onCategory={setCategory} categories={categories} /></div><div className="mt-8">{loading ? <PageState message="Soo dejinaya events..." /> : error ? <PageState tone="error" message={error} /> : filtered.length ? <EventGrid events={filtered} /> : <PageState title="No events found" message="Wax events ah lama helin." />}
  </div></div></main>
}
export default Events
