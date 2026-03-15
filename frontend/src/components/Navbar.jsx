import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../context/AuthContext'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { isAuthenticated, user, userType, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsOpen(false)
  }

  return (
    <nav className="bg-gradient-to-r from-primary to-secondary text-white sticky top-0 z-50 shadow-lg">
      <div className="container-responsive">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 font-bold text-xl hover:opacity-90 transition">
            <span className="text-2xl">🏨</span>
            <span>HotelHub</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:opacity-80 transition">Home</Link>
            <Link to="/search" className="hover:opacity-80 transition">Search Hotels</Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm">Hi, {user?.fullName || user?.hostelName || 'User'}</span>
                {userType === 'customer' && (
                  <Link to="/dashboard" className="hover:opacity-80 transition">Dashboard</Link>
                )}
                {userType === 'owner' && (
                  <Link to="/owner/dashboard" className="hover:opacity-80 transition">My Hostel</Link>
                )}
                <button onClick={handleLogout} className="btn-primary !px-3 !py-1 text-sm">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="hover:opacity-80 transition">Login</Link>
                <Link to="/register" className="btn-primary !px-3 !py-1 text-sm">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/" className="block hover:opacity-80 transition py-2">Home</Link>
            <Link to="/search" className="block hover:opacity-80 transition py-2">Search Hotels</Link>

            {isAuthenticated ? (
              <>
                <span className="block text-sm py-2">Hi, {user?.fullName || user?.hostelName || 'User'}</span>
                {userType === 'customer' && (
                  <Link to="/dashboard" className="block hover:opacity-80 transition py-2">Dashboard</Link>
                )}
                {userType === 'owner' && (
                  <Link to="/owner/dashboard" className="block hover:opacity-80 transition py-2">My Hostel</Link>
                )}
                <button onClick={handleLogout} className="block w-full btn-primary text-center py-2">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block hover:opacity-80 transition py-2">Login</Link>
                <Link to="/register" className="block btn-primary text-center py-2">
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
