import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { 
  Home, 
  Calendar, 
  CheckCircle, 
  User, 
  Book,
  Clock
} from 'lucide-react'
import './Layout.css'

const Layout = ({ children }) => {
  const location = useLocation()

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/plans', icon: Book, label: 'Plans' },
    { path: '/todo', icon: CheckCircle, label: 'Todo' },
    { path: '/calendar', icon: Calendar, label: 'Calendar' },
    { path: '/timetable', icon: Clock, label: 'Profile' }
  ]

  return (
    <div className="layout">
      <div className="desktop-container">
        <main className="main-content">
          {children}
        </main>
        
        <nav className="bottom-nav">
          {navItems.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              className={`nav-item ${location.pathname === path ? 'active' : ''}`}
            >
              <Icon size={24} />
              <span className="nav-label">{label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default Layout