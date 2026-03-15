import { useAuthStore } from '../context/AuthContext'

export default function OwnerDashboard() {
  const { user, logout } = useAuthStore()

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-responsive">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome, {user?.hostelName}!</h1>
          <p className="text-gray-600">Manage your hotel bookings and reviews</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card p-6">
            <div className="text-4xl mb-2">📊</div>
            <h3 className="font-semibold text-lg mb-2">Total Bookings</h3>
            <p className="text-3xl font-bold text-primary">0</p>
          </div>
          <div className="card p-6">
            <div className="text-4xl mb-2">💰</div>
            <h3 className="font-semibold text-lg mb-2">Revenue</h3>
            <p className="text-3xl font-bold text-primary">$0</p>
          </div>
          <div className="card p-6">
            <div className="text-4xl mb-2">⭐</div>
            <h3 className="font-semibold text-lg mb-2">Rating</h3>
            <p className="text-3xl font-bold text-primary">0</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card p-6">
            <h2 className="text-xl font-bold mb-4">Recent Bookings</h2>
            <p className="text-gray-600">No bookings yet</p>
          </div>

          <div className="card p-6">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <button className="w-full btn-primary text-left">
                ✎ Edit Hotel Details
              </button>
              <button className="w-full btn-secondary text-left">
                📸 Manage Photos
              </button>
              <button onClick={logout} className="w-full btn-danger text-left">
                🚪 Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
