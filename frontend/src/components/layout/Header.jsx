import { useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/auth-context.js'

const navLinkClass = ({ isActive }) =>
  `font-medium transition-colors ${
    isActive ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
  }`

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const closeMenu = () => setIsMenuOpen(false)
  const dashboardPath = user?.role === 'organizer' ? '/organizer/dashboard' : user?.role === 'admin' ? '/admin/dashboard' : '/user/dashboard'
  const navigation = user?.role === 'organizer'
    ? [{ label: 'Events', to: '/events' }, { label: 'Dashboard', to: dashboardPath }, { label: 'My Events', to: '/organizer/events' }, { label: 'Create Event', to: '/organizer/events/create' }, { label: 'Scan Ticket', to: '/organizer/scan' }]
    : user?.role === 'admin'
      ? [{ label: 'Events', to: '/events' }, { label: 'Dashboard', to: dashboardPath }]
      : user
        ? [{ label: 'Events', to: '/events' }, { label: 'Dashboard', to: dashboardPath }, { label: 'My Tickets', to: '/user/tickets' }]
        : [{ label: 'Home', to: '/' }, { label: 'Events', to: '/events' }, { label: 'Login', to: '/login' }]
  const handleLogout = () => { logout(); closeMenu() }

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <NavLink to="/" onClick={closeMenu} className="text-xl font-bold text-gray-900">
            Event<span className="text-blue-600">Hub</span>
          </NavLink>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
            {navigation.map((item) => (
              <NavLink key={item.to} to={item.to} className={navLinkClass}>
                {item.label}
              </NavLink>
            ))}
            {user ? <button type="button" onClick={handleLogout} className="font-medium text-gray-600 hover:text-gray-900">Logout</button> : <NavLink to="/register" className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">Register</NavLink>}
          </nav>

          <button
            type="button"
            onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
            className="inline-flex items-center justify-center rounded p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 md:hidden"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
          </button>
        </div>

        {isMenuOpen && (
          <nav
            id="mobile-navigation"
            className="border-t border-gray-200 py-4 md:hidden"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-4">
              {navigation.map((item) => (
                <NavLink key={item.to} to={item.to} onClick={closeMenu} className={navLinkClass}>
                  {item.label}
                </NavLink>
              ))}
              {user ? <button type="button" onClick={handleLogout} className="text-left font-medium text-gray-600 hover:text-gray-900">Logout</button> : <NavLink to="/register" onClick={closeMenu} className="rounded-lg bg-blue-600 px-4 py-2 text-center font-semibold text-white hover:bg-blue-700">Register</NavLink>}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header
