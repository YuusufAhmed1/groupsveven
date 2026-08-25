import { useState } from 'react'
import { FiCalendar, FiMapPin, FiUser } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const formatDate = (date) => new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(date))

function EventCard({ event }) {
  const [imageError, setImageError] = useState(false)

  return (
    <article className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      {event.image && !imageError ? <img src={event.image} alt={event.title} onError={() => setImageError(true)} className="h-44 w-full object-cover" /> : <div className="flex h-44 items-center justify-center bg-gray-100 text-gray-400"><FiCalendar className="text-4xl" /></div>}
      <div className="p-4">
        <p className="text-sm font-medium text-blue-600">{event.category}</p>
        <h2 className="mt-1 text-lg font-semibold text-gray-900">{event.title}</h2>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600">{event.description}</p>
        <div className="mt-4 space-y-2 text-sm text-gray-600">
          <p className="flex items-center gap-2"><FiUser className="shrink-0 text-blue-600" /><span>Organized by: <strong className="font-semibold text-gray-900">{event.organizer?.name || 'Organizer'}</strong></span></p>
          <p className="flex items-center gap-2"><FiCalendar /> {formatDate(event.date)} · {event.startTime}</p>
          <p className="flex items-center gap-2"><FiMapPin /> {event.location}</p>
        </div>
        <Link to={`/events/${event._id}`} className="mt-5 inline-flex rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">View Details</Link>
      </div>
    </article>
  )
}

export default EventCard
