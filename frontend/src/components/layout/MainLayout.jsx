import { Outlet } from 'react-router-dom'
import Footer from './Footer.jsx'
import Header from './Header.jsx'

function MainLayout() {
  return <div className="flex min-h-screen flex-col"><Header /><div className="flex-1"><Outlet /></div><Footer /></div>
}

export default MainLayout
