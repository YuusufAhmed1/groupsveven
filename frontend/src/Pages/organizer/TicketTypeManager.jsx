import { useEffect, useState } from 'react'
import { getApiError } from '../../services/api.js'
import { createTicketType, deleteTicketType, getTicketTypes, updateTicketType } from '../../services/events.js'
import PageState from '../../components/common/PageState.jsx'

const emptyForm = { name: '', price: '', quantity: '' }

function TicketTypeManager({ eventId }) {
  const [types, setTypes] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const load = async () => {
    try {
      const data = await getTicketTypes(eventId)
      setTypes(data.ticketTypes || [])
    } catch (requestError) {
      setError(getApiError(requestError, 'Ticket types lama soo dejin karin.'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getTicketTypes(eventId)
      .then((data) => setTypes(data.ticketTypes || []))
      .catch((requestError) => setError(getApiError(requestError, 'Ticket types lama soo dejin karin.')))
      .finally(() => setLoading(false))
  }, [eventId])

  const submit = async (event) => {
    event.preventDefault()
    setSaving(true)
    setError('')
    try {
      const payload = { name: form.name, price: Number(form.price), quantity: Number(form.quantity) }
      if (editingId) await updateTicketType(editingId, payload)
      else await createTicketType({ eventId, ...payload })
      setForm(emptyForm)
      setEditingId(null)
      await load()
    } catch (requestError) {
      setError(getApiError(requestError, 'Ticket type lama kaydin karin.'))
    } finally {
      setSaving(false)
    }
  }

  const edit = (type) => {
    setForm({ name: type.name, price: type.price, quantity: type.quantity })
    setEditingId(type._id)
  }
  const remove = async (id) => {
    if (!window.confirm('Delete this ticket type?')) return
    try {
      await deleteTicketType(id)
      setTypes((items) => items.filter((item) => item._id !== id))
    } catch (requestError) {
      setError(getApiError(requestError, 'Ticket type lama tiri karin.'))
    }
  }

  if (loading) return <PageState message="Loading ticket types..." />

  return <section className="mt-8 rounded-lg border bg-white p-5 shadow-sm"><h2 className="text-xl font-semibold text-gray-900">Ticket Types</h2>{error && <p className="mt-4 rounded bg-red-50 p-3 text-sm text-red-700">{error}</p>}<div className="mt-4 space-y-3">{types.length ? types.map((type) => <div key={type._id} className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-medium text-gray-900">{type.name}</p><p className="text-sm text-gray-500">${type.price} · {type.remaining} of {type.quantity} available</p></div><div className="flex gap-2"><button type="button" onClick={() => edit(type)} className="rounded border px-3 py-2 text-sm">Edit</button><button type="button" onClick={() => remove(type._id)} className="rounded border border-red-200 px-3 py-2 text-sm text-red-600">Delete</button></div></div>) : <p className="text-sm text-gray-500">No ticket types yet.</p>}</div><form onSubmit={submit} className="mt-6 grid gap-3 border-t pt-5 sm:grid-cols-4"><input required placeholder="Name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="rounded-lg border px-3 py-2.5" /><input required type="number" min="0" step="0.01" placeholder="Price" value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} className="rounded-lg border px-3 py-2.5" /><input required type="number" min="1" step="1" placeholder="Quantity" value={form.quantity} onChange={(event) => setForm({ ...form, quantity: event.target.value })} className="rounded-lg border px-3 py-2.5" /><button disabled={saving} className="rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white disabled:opacity-60">{saving ? 'Saving...' : editingId ? 'Update Type' : 'Add Type'}</button></form>{editingId && <button type="button" onClick={() => { setEditingId(null); setForm(emptyForm) }} className="mt-3 text-sm text-gray-600 underline">Cancel edit</button>}</section>
}

export default TicketTypeManager
