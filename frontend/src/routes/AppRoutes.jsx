import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from '../components/common/ProtectedRoute.jsx'
import MainLayout from '../components/layout/MainLayout.jsx'
import { useAuth } from '../context/auth-context.js'
import AdminDashboard from '../pages/admin/Dashboard.jsx'
import EventDetails from '../pages/EventDetails.jsx'
import Events from '../pages/Events.jsx'
import Home from '../pages/Home.jsx'
import Login from '../pages/Login.jsx'
import Register from '../pages/Register.jsx'
import CreateEvent from '../pages/organizer/CreateEvent.jsx'
import OrganizerDashboard from '../pages/organizer/Dashboard.jsx'
import EditEvent from '../pages/organizer/EditEvent.jsx'
import OrganizerEvents from '../pages/organizer/Events.jsx'
import ScanQR from '../pages/organizer/ScanQR.jsx'
import Checkout from '../pages/user/Checkout.jsx'
import UserDashboard from '../pages/user/Dashboard.jsx'
import MyTickets from '../pages/user/MyTickets.jsx'

const guard = (element, roles) => <ProtectedRoute roles={roles}>{element}</ProtectedRoute>

function DashboardRedirect() {
  const { user, loading } = useAuth()
  if (loading) return <main className="mx-auto max-w-7xl px-4 py-16 text-gray-600">Soo dejinaya...</main>
  if (!user) return <Navigate to="/login" replace />
  if (user.role === 'admin') return <Navigate to="/admin/dashboard" replace />
  if (user.role === 'organizer') return <Navigate to="/organizer/dashboard" replace />
  return <Navigate to="/user/dashboard" replace />
}

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="events" element={<Events />} />
        <Route path="events/:id" element={<EventDetails />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="dashboard" element={<DashboardRedirect />} />
        <Route path="user/dashboard" element={guard(<UserDashboard />, ['user'])} />
        <Route path="my-tickets" element={guard(<MyTickets />, ['user'])} />
        <Route path="user/tickets" element={guard(<MyTickets />, ['user'])} />
        <Route path="user/checkout" element={guard(<Checkout />, ['user'])} />
        <Route path="organizer/dashboard" element={guard(<OrganizerDashboard />, ['organizer'])} />
        <Route path="organizer/events" element={guard(<OrganizerEvents />, ['organizer'])} />
        <Route path="organizer/events/create" element={guard(<CreateEvent />, ['organizer'])} />
        <Route path="organizer/events/:id/edit" element={guard(<EditEvent />, ['organizer'])} />
        <Route path="organizer/scan" element={guard(<ScanQR />, ['organizer'])} />
        <Route path="admin/dashboard" element={guard(<AdminDashboard />, ['admin'])} />
        <Route path="*" element={<main className="mx-auto max-w-7xl px-4 py-16"><h1 className="text-3xl font-bold">Page Not Found</h1><p className="mt-2 text-gray-600">Boggan lama helin.</p></main>} />
      </Route>
    </Routes>
  )
}
export default AppRoutes
