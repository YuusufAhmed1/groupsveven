function PageState({ title, message, tone = 'default' }) {
  const toneClass = tone === 'error' ? 'border-red-200 bg-red-50 text-red-700' : 'border-gray-200 bg-white text-gray-600'
  return <div className={`rounded-lg border p-8 text-center shadow-sm ${toneClass}`}>{title && <h2 className="font-semibold text-gray-900">{title}</h2>}<p className={title ? 'mt-2' : ''}>{message}</p></div>
}

export default PageState
