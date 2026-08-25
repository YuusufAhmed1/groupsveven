import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getApiError } from '../../services/api.js'
import { createEvent, createTicketType, publishEvent } from '../../services/events.js'
import EventForm from './EventForm.jsx'

function CreateEvent() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ title: '', description: '', category: '', date: '', startTime: '', endTime: '', location: '', image: '' })
  const [ticket, setTicket] = useState({ name: '', price: '', quantity: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (event) => {
    event.preventDefault()
    setError('')

    const hasPartialTicket = ticket.name || ticket.price !== '' || ticket.quantity !== ''
    if (hasPartialTicket && (!ticket.name || ticket.price === '' || !ticket.quantity)) {
      setError('Buuxi dhammaan ticket type fields-ka ama ka tag dhammaantood madhan.')
      return
    }

    setLoading(true)
    try {
      const result = await createEvent(form)
      await publishEvent(result.event._id)
      if (hasPartialTicket) {
        await createTicketType({ eventId: result.event._id, name: ticket.name, price: Number(ticket.price), quantity: Number(ticket.quantity) })
      }
      navigate('/organizer/events', { state: { message: 'Event created and published successfully.' } })
    } catch (requestError) {
      setError(getApiError(requestError))
    } finally {
      setLoading(false)
    }
  }

  return <main className="bg-gray-100 py-12"><div className="mx-auto max-w-3xl px-4"><h1 className="text-3xl font-bold text-gray-900">Create Event</h1><p className="mt-2 text-gray-600">Geli xogta backend-ku taageerayo. Image-ku waa URL sababtoo ah upload endpoint ma jiro.</p>{error && <p className="mt-5 rounded-lg bg-red-50 p-3 text-red-700">{error}</p>}<div className="mt-8"><EventForm form={form} setForm={setForm} onSubmit={submit} loading={loading} submitLabel="Create Event"><section className="mt-6 border-t border-gray-200 pt-6"><h2 className="text-lg font-semibold text-gray-900">Initial Ticket Type (optional)</h2><div className="mt-4 grid gap-4 sm:grid-cols-3">{['name', 'price', 'quantity'].map((field) => <label key={field} className="text-sm font-medium capitalize text-gray-700">{field}<input type={field === 'name' ? 'text' : 'number'} min={field === 'price' ? '0' : '1'} step={field === 'price' ? '0.01' : '1'} value={ticket[field]} onChange={(input) => setTicket({ ...ticket, [field]: input.target.value })} className="mt-2 w-full rounded-lg border px-3 py-2" /></label>)}</div></section></EventForm></div></div></main>
}
export default CreateEvent
