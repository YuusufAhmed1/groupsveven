import { Html5QrcodeScanner } from 'html5-qrcode'
import { useCallback, useEffect, useRef, useState } from 'react'
import { getApiError } from '../../services/api.js'
import { verifyTicket } from '../../services/tickets.js'

function ScanQR() {
  const [qrToken, setQrToken] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [scannerKey, setScannerKey] = useState(0)
  const processing = useRef(false)

  const checkIn = useCallback(async (token) => {
    const cleanToken = token.trim()
    if (!cleanToken || processing.current) return
    processing.current = true
    setLoading(true)
    setResult(null)
    setError(null)
    try {
      setResult(await verifyTicket(cleanToken))
      setQrToken('')
    } catch (requestError) {
      setError({
        message: getApiError(requestError),
        status: requestError.response?.data?.status,
        ticket: requestError.response?.data?.ticket,
      })
    } finally {
      setLoading(false)
      processing.current = false
    }
  }, [])

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      `qr-reader-${scannerKey}`,
      { fps: 10, qrbox: { width: 240, height: 240 } },
      false,
    )
    scanner.render(async (decodedText) => {
      if (processing.current) return
      await scanner.clear().catch(() => {})
      await checkIn(decodedText)
    }, () => {})
    return () => { scanner.clear().catch(() => {}) }
  }, [checkIn, scannerKey])

  const submit = (event) => {
    event.preventDefault()
    checkIn(qrToken)
  }

  const scanAnother = () => {
    setResult(null)
    setError(null)
    setScannerKey((current) => current + 1)
  }

  const ticket = result?.ticket || error?.ticket

  return (
    <main className="bg-gray-50 py-15">
      <div className="mx-auto max-w-2xl px-4">
        <h1 className="text-3xl font-bold text-gray-900">Scan QR</h1>
        <p className="mt-2 text-gray-600">Kaamirada ku akhri QR code-ka tigidhka si loo xaqiijiyo loona check-in gareeyo.</p>

        <section className="mt-8 rounded-lg border bg-white p-4 shadow-sm sm:p-6">
          <h2 className="font-semibold text-gray-900">Camera Scanner</h2>
          <p className="mt-1 text-sm text-gray-600">U oggolow browser-ka inuu isticmaalo camera-ga, dabadeed QR code-ka hor dhig.</p>
          <div id={`qr-reader-${scannerKey}`} className="mt-4 overflow-hidden rounded-lg" />
          {(result || error) && <button type="button" onClick={scanAnother} className="mt-4 rounded-lg border border-blue-600 px-4 py-2 font-medium text-blue-600 hover:bg-blue-50">Scan Another Ticket</button>}
        </section>

        <form onSubmit={submit} className="mt-6 rounded-lg border bg-white p-6 shadow-sm">
          <label className="text-sm font-medium text-gray-900">QR Token<textarea required rows="3" value={qrToken} onChange={(event) => setQrToken(event.target.value)} className="mt-2 w-full rounded-lg border px-3 py-2" /></label>
          <button disabled={loading} className="mt-4 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60">{loading ? 'Checking...' : 'Check In'}</button>
        </form>

        {result && <section className="mt-6 rounded-lg border border-green-200 bg-green-50 p-6"><h2 className="text-xl font-bold text-green-700">Checked In Successfully</h2><p className="mt-2 text-green-700">{result.message}</p></section>}
        {error && <section className="mt-6 rounded-lg border border-red-200 bg-red-50 p-6"><h2 className="text-xl font-bold text-red-700">{error.status === 'already_used' ? 'Already Used' : error.status === 'invalid' ? 'Invalid QR' : 'Check-in Failed'}</h2><p className="mt-2 text-red-700">{error.message}</p></section>}
        {ticket && <section className="mt-6 rounded-lg border bg-white p-6 shadow-sm"><h2 className="font-semibold text-gray-900">Attendee Information</h2><dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2"><div><dt className="text-gray-500">Name</dt><dd className="font-medium">{ticket.attendee?.name}</dd></div><div><dt className="text-gray-500">Email</dt><dd className="font-medium">{ticket.attendee?.email}</dd></div><div><dt className="text-gray-500">Event</dt><dd className="font-medium">{ticket.event?.title}</dd></div><div><dt className="text-gray-500">Ticket</dt><dd className="font-medium">{ticket.ticketType}</dd></div></dl></section>}
      </div>
    </main>
  )
}

export default ScanQR
