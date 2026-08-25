import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/auth-context.js'

function ProtectedRoute({ children, roles }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <div className="mx-auto max-w-7xl px-4 py-16 text-gray-600">Loading...</div>
  if (!user) return <Navigate to="/login" state={{ from: location.pathname }} replace />
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />
  return children
}

export default ProtectedRoute
