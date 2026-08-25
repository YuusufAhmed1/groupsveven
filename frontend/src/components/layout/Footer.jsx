import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:px-8">
        <div>
          <p className="text-lg font-bold text-gray-900">Event<span className="text-blue-600">Hub</span></p>
          <p className="mt-2 max-w-md text-sm leading-6 text-gray-600">Soo hel munaasabadaha, iibso tigidhada, kuna maamul dhammaan hal meel.</p>
        </div>
        <nav className="flex gap-5 text-sm sm:justify-end" aria-label="Footer navigation">
          <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
          <Link to="/events" className="text-gray-600 hover:text-gray-900">Events</Link>
          <Link to="/login" className="text-gray-600 hover:text-gray-900">Login</Link>
        </nav>
      </div>
      <div className="border-t border-gray-100 px-4 py-4 text-center text-sm text-gray-500">© {new Date().getFullYear()} EventHub. All rights reserved.</div>
    </footer>
  )
}

export default Footer
