import { useAuthStore } from '../context/AuthContext'

export default function AdminDashboard() {
  const { logout } = useAuthStore()

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-responsive">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage platform</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card p-6">
            <h3 className="font-semibold text-gray-600 mb-2">Total Hotels</h3>
            <p className="text-3xl font-bold text-primary">0</p>
          </div>
          <div className="card p-6">
            <h3 className="font-semibold text-gray-600 mb-2">Total Bookings</h3>
            <p className="text-3xl font-bold text-primary">0</p>
          </div>
          <div className="card p-6">
            <h3 className="font-semibold text-gray-600 mb-2">Revenue</h3>
            <p className="text-3xl font-bold text-primary">$0</p>
          </div>
          <div className="card p-6">
            <h3 className="font-semibold text-gray-600 mb-2">Users</h3>
            <p className="text-3xl font-bold text-primary">0</p>
          </div>
        </div>

        <button onClick={logout} className="btn-danger">
          Logout
        </button>
      </div>
    </div>
  )
}
