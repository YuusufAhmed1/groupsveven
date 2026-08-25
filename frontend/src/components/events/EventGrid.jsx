import EventCard from './EventCard.jsx'

function EventGrid({ events }) {
  return <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{events.map((event) => <EventCard key={event._id} event={event} />)}</div>
}
export default EventGrid
