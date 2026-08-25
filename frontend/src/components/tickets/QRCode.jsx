import { QRCodeSVG } from 'qrcode.react'

function QRCode({ value }) {
  return <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4 text-center"><QRCodeSVG value={value} size={180} className="mx-auto max-w-full" level="M" /><p className="mt-3 text-xs font-semibold uppercase text-gray-500">Unique QR Ticket</p><code className="mt-2 block break-all text-xs text-gray-800">{value}</code></div>
}
export default QRCode
