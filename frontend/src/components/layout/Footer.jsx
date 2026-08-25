import { Link } from 'react-router-dom'
import { useAuth } from '../../context/auth-context.js'

function Footer() {
  const { user } = useAuth()

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          <div className="lg:col-span-1">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-extrabold text-gray-900">
                Event<span className="text-blue-600">Hub</span>
              </span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-gray-600">
              Soo hel munaasabadaha xiisaha leh, iibso tigidhadaada,
              kuna maamul dhammaan hal meel.
            </p>

            <div className="mt-5 flex gap-3">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-600 transition hover:bg-blue-600 hover:text-white">
                f
              </a>

              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-600 transition hover:bg-blue-600 hover:text-white" >
                X
              </a>

              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-600 transition hover:bg-blue-600 hover:text-white"
              >
                in
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              Explore
            </h3>

            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-sm text-gray-600 transition hover:text-blue-600"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/events"
                  className="text-sm text-gray-600 transition hover:text-blue-600"
                >
                  Browse Events
                </Link>
              </li>

              <li>
                <Link
                  to="/events"
                  className="text-sm text-gray-600 transition hover:text-blue-600"
                >
                  Upcoming Events
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              Organizers
            </h3>

            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  to="/organizer"
                  className="text-sm text-gray-600 transition hover:text-blue-600"
                >
                  Organizer Dashboard
                </Link>
              </li>

              <li>
                <Link
                  to="/organizer/events/create"
                  className="text-sm text-gray-600 transition hover:text-blue-600"
                >
                  Create Event
                </Link>
              </li>

              <li>
                <Link
                  to="/organizer/events"
                  className="text-sm text-gray-600 transition hover:text-blue-600"
                >
                  Manage Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              Account
            </h3>

            <ul className="mt-4 space-y-3">
              {!user ? (
                <>
                  <li>
                    <Link
                      to="/login"
                      className="text-sm text-gray-600 transition hover:text-blue-600"
                    >
                      Login
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/register"
                      className="text-sm text-gray-600 transition hover:text-blue-600"
                    >
                      Create Account
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/profile"
                      className="text-sm text-gray-600 transition hover:text-blue-600"
                    >
                      My Profile
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/my-tickets"
                      className="text-sm text-gray-600 transition hover:text-blue-600"
                    >
                      My Tickets
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-center text-sm text-gray-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8 md:text-left">
          <p>
            © {new Date().getFullYear()} EventHub. All rights reserved.
          </p>

          <div className="flex justify-center gap-5">
            <Link
              to="/privacy"
              className="transition hover:text-gray-900"
            >
              Privacy
            </Link>

            <Link
              to="/terms"
              className="transition hover:text-gray-900"
            >
              Terms
            </Link>

            <Link
              to="/contact"
              className="transition hover:text-gray-900"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer