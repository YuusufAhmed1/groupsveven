import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PageState from '../../components/common/PageState.jsx'
import { getApiError } from '../../services/api.js'
import { getEvent, updateEvent } from '../../services/events.js'
import EventForm from './EventForm.jsx'

function EditEvent() {
  const { id } = useParams(); const navigate = useNavigate(); const [form, setForm] = useState(null); const [loading, setLoading] = useState(false); const [error, setError] = useState('')
  useEffect(() => { getEvent(id).then((data) => { const event = data.event; setForm({ title: event.title, description: event.description, category: event.category, date: event.date.slice(0, 10), startTime: event.startTime, endTime: event.endTime, location: event.location, image: event.image || '' }) }).catch((requestError) => setError(getApiError(requestError))) }, [id])
  const submit = async (event) => { event.preventDefault(); setLoading(true); setError(''); try { await updateEvent(id, form); navigate('/organizer/events') } catch (requestError) { setError(getApiError(requestError)) } finally { setLoading(false) } }
  return <main className="bg-gray-50 py-12"><div className="mx-auto max-w-3xl px-4"><h1 className="text-3xl font-bold">Edit Event</h1>{error && <p className="mt-5 rounded bg-red-50 p-3 text-red-700">{error}</p>}<div className="mt-8">{form ? <EventForm form={form} setForm={setForm} onSubmit={submit} loading={loading} submitLabel="Save Changes" /> : <PageState message="Loading event..." />}</div></div></main>
}
export default EditEvent
