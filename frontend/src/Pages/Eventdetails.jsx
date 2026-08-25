import { useEffect, useMemo, useState } from 'react'
import { FiCalendar, FiClock, FiMapPin, FiUser } from 'react-icons/fi'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/auth-context.js'
import { getApiError } from '../services/api.js'
import { createBooking } from '../services/bookings.js'
import { getEvent, getTicketTypes } from '../services/events.js'

function EventDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  const [event, setEvent] = useState(null)
  const [ticketTypes, setTicketTypes] = useState([])
  const [typeId, setTypeId] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [loadError, setLoadError] = useState('')
  const [ticketError, setTicketError] = useState('')
  const [bookingError, setBookingError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    let active = true

    const loadEvent = async () => {
      try {
        const eventData = await getEvent(id)
        if (!active) return
        setEvent(eventData.event)

        try {
          const ticketData = await getTicketTypes(id)
          if (!active) return
          setTicketTypes(ticketData.ticketTypes)
          const firstAvailable = ticketData.ticketTypes.find((type) => type.remaining > 0)
          if (firstAvailable) setTypeId(firstAvailable._id)
        } catch {
          if (active) setTicketError('Ticket options-ka lama soo dejin karin.')
        }
      } catch (requestError) {
        if (!active) return
        if (requestError.response?.status === 404) setNotFound(true)
        else setLoadError('Event-ka lama soo heli karin.')
      } finally {
        if (active) setLoading(false)
      }
    }

    loadEvent()
    return () => { active = false }
  }, [id])

  const selectedType = useMemo(
    () => ticketTypes.find((type) => type._id === typeId),
    [ticketTypes, typeId],
  )
  const numericQuantity = Number(quantity)
  const quantityIsValid = selectedType && Number.isInteger(numericQuantity) && numericQuantity >= 1 && numericQuantity <= selectedType.remaining
  const total = quantityIsValid ? selectedType.price * numericQuantity : 0

  const buy = async () => {
    if (!user) {
      navigate('/login', { state: { from: location.pathname } })
      return
    }
    if (!selectedType || !quantityIsValid) {
      setBookingError('Dooro quantity sax ah oo aan ka badnayn tickets-ka la heli karo.')
      return
    }

    setSubmitting(true)
    setBookingError('')
    try {
      const result = await createBooking({
        eventId: id,
        ticketTypeId: selectedType._id,
        quantity: numericQuantity,
      })
      navigate('/user/checkout', {
        state: { booking: result.booking, event, ticketType: selectedType },
      })
    } catch (requestError) {
      setBookingError(getApiError(requestError))
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <main className="mx-auto max-w-7xl px-4 py-16 text-center text-gray-600">Soo dejinaya event-ka...</main>
  }

  if (notFound) {
    return <main className="mx-auto max-w-3xl px-4 py-16 text-center"><h1 className="text-2xl font-bold text-gray-900">Event-kan lama helin.</h1><Link to="/events" className="mt-6 inline-flex rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white hover:bg-blue-700">Back to Events</Link></main>
  }

  if (loadError || !event) {
    return <main className="mx-auto max-w-3xl px-4 py-16 text-center"><h1 className="text-2xl font-bold text-gray-900">Event-ka lama soo heli karin.</h1><Link to="/events" className="mt-6 inline-flex rounded-lg border border-gray-300 bg-white px-4 py-2.5 font-semibold text-gray-700 hover:bg-gray-50">Back to Events</Link></main>
  }

  return (
    <main className="bg-gray-50 py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link to="/events" className="text-sm font-semibold text-blue-600 hover:text-blue-700">← Back to Events</Link>

        <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
          <article className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            {event.image && !imageError ? (
              <img src={event.image} alt={event.title} onError={() => setImageError(true)} className="h-64 w-full object-cover sm:h-80" />
            ) : (
              <div className="flex h-64 items-center justify-center bg-gray-100 text-gray-400 sm:h-80"><FiCalendar className="text-5xl" aria-hidden="true" /></div>
            )}

            <div className="p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-3"><span className="text-sm font-semibold text-blue-600">{event.category}</span><span className="rounded bg-gray-100 px-2 py-1 text-xs font-medium capitalize text-gray-600">{event.status}</span></div>
              <h1 className="mt-3 text-3xl font-bold text-gray-900">{event.title}</h1>
              <div className="mt-6 grid gap-4 text-sm text-gray-600 sm:grid-cols-2">
                <p className="flex items-center gap-2"><FiCalendar className="text-blue-600" />{new Date(event.date).toLocaleDateString()}</p>
                <p className="flex items-center gap-2"><FiClock className="text-blue-600" />{event.startTime} – {event.endTime}</p>
                <p className="flex items-center gap-2"><FiMapPin className="text-blue-600" />{event.location}</p>
                <p className="flex items-center gap-2"><FiUser className="text-blue-600" />{event.organizer?.name || 'Organizer'}</p>
              </div>
              <section className="mt-8 border-t border-gray-200 pt-6"><h2 className="text-xl font-semibold text-gray-900">About this event</h2><p className="mt-3 whitespace-pre-line leading-7 text-gray-600">{event.description}</p></section>
            </div>
          </article>

          <aside className="h-fit rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-xl font-semibold text-gray-900">Ticket Options</h2>
            {ticketError ? <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{ticketError}</p> : ticketTypes.length ? (
              <>
                <div className="mt-5 space-y-3">
                  {ticketTypes.map((type) => (
                    <label key={type._id} className={`flex items-center justify-between gap-3 rounded-lg border p-4 ${type.remaining > 0 ? 'cursor-pointer' : 'cursor-not-allowed bg-gray-50 opacity-70'}`}>
                      <span><span className="block font-medium text-gray-900">{type.name}</span><span className="mt-1 block text-sm text-gray-500">{type.remaining} of {type.quantity} available</span></span>
                      <span className="font-semibold text-gray-900">${type.price}</span>
                      <input type="radio" name="ticketType" value={type._id} disabled={type.remaining === 0} checked={typeId === type._id} onChange={() => { setTypeId(type._id); setQuantity(1) }} />
                    </label>
                  ))}
                </div>

                {selectedType && event.status === 'published' && (
                  <><label className="mt-5 block text-sm font-medium text-gray-700">Quantity<input type="number" min="1" max={selectedType.remaining} step="1" value={quantity} onChange={(input) => setQuantity(input.target.value)} className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5" /></label><dl className="mt-5 space-y-3 border-t border-gray-200 pt-4 text-sm"><div className="flex justify-between"><dt className="text-gray-500">Price</dt><dd className="font-medium">${selectedType.price}</dd></div><div className="flex justify-between"><dt className="text-gray-500">Subtotal</dt><dd className="font-medium">${total}</dd></div><div className="flex justify-between text-base"><dt className="font-semibold">Total</dt><dd className="font-bold">${total}</dd></div></dl>{bookingError && <p className="mt-3 text-sm text-red-600">{bookingError}</p>}<button type="button" onClick={buy} disabled={submitting || !quantityIsValid} className="mt-5 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60">{submitting ? 'Processing...' : 'Buy Ticket'}</button></>
                )}
              </>
            ) : <p className="mt-4 text-gray-600">Tigidh la heli karo ma jiro.</p>}
          </aside>
        </div>
      </div>
    </main>
  )
}

export default EventDetails
