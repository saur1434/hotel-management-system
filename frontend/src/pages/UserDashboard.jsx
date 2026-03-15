import { useState, useEffect } from 'react'
import { useAuthStore } from '../context/AuthContext'
import { bookingApi } from '../utils/api'

export default function UserDashboard() {
  const { user, logout } = useAuthStore()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('bookings')

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      setLoading(true)
      const response = await bookingApi.getMyBookings()
      setBookings(response.data.bookings || [])
    } catch (error) {
      console.error('Failed to fetch bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Cancel this booking?')) return

    try {
      await bookingApi.cancelBooking(bookingId)
      fetchBookings()
      alert('Booking cancelled successfully')
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to cancel booking')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-responsive">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome, {user?.fullName}!</h1>
          <p className="text-gray-600">Manage your bookings and account</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b">
          <button
            className={`px-4 py-2 font-semibold border-b-2 transition ${
              activeTab === 'bookings'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('bookings')}
          >
            My Bookings
          </button>
          <button
            className={`px-4 py-2 font-semibold border-b-2 transition ${
              activeTab === 'profile'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
        </div>

        {/* Content */}
        <div>
          {activeTab === 'bookings' && (
            <div>
              {loading ? (
                <p>Loading bookings...</p>
              ) : bookings.length === 0 ? (
                <div className="card p-8 text-center">
                  <p className="text-gray-600 mb-4">No bookings yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map(booking => (
                    <div key={booking.id} className="card p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold">{booking.hotelName}</h3>
                          <p className="text-gray-600">Check-in: {new Date(booking.checkIn).toLocaleDateString()}</p>
                          <p className="text-gray-600">Check-out: {new Date(booking.checkOut).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">${booking.totalPrice}</p>
                          <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${
                            booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                      </div>
                      {booking.status === 'confirmed' && (
                        <button
                          onClick={() => handleCancelBooking(booking.id)}
                          className="mt-4 text-danger hover:underline text-sm"
                        >
                          Cancel Booking
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="card p-6 max-w-md">
              <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
              <div className="space-y-3 text-gray-600">
                <div>
                  <span className="font-medium">Name:</span> {user?.fullName}
                </div>
                <div>
                  <span className="font-medium">Email:</span> {user?.email}
                </div>
                <div>
                  <span className="font-medium">Phone:</span> {user?.phone}
                </div>
              </div>
              <button
                onClick={logout}
                className="mt-6 btn-danger w-full"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
