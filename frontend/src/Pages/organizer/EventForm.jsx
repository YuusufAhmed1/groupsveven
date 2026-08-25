const fields = ['title', 'category', 'date', 'startTime', 'endTime', 'location', 'image']

function EventForm({ form, setForm, onSubmit, loading, submitLabel, children }) {
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value })
  return <form onSubmit={onSubmit} className="rounded-lg border bg-white p-6 shadow-sm"><div className="grid gap-4 sm:grid-cols-2">{fields.map((field) => <label key={field} className={`text-sm font-medium text-gray-700 ${field === 'image' ? 'sm:col-span-2' : ''}`}>{field === 'image' ? 'Image URL' : field.replace(/([A-Z])/g, ' $1').replace(/^./, (letter) => letter.toUpperCase())}<input name={field} type={field === 'date' ? 'date' : field.toLowerCase().includes('time') ? 'time' : 'text'} required={field !== 'image'} value={form[field] || ''} onChange={update} className="mt-2 w-full rounded-lg border px-3 py-2.5" /></label>)}<label className="text-sm font-medium text-gray-700 sm:col-span-2">Description<textarea name="description" required rows="5" value={form.description || ''} onChange={update} className="mt-2 w-full rounded-lg border px-3 py-2.5" /></label></div>{children}<button disabled={loading} className="mt-6 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60">{loading ? 'Saving...' : submitLabel}</button></form>
}
export default EventForm
