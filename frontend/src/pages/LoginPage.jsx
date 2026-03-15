import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { authApi } from '../utils/api'
import { useAuthStore } from '../context/AuthContext'

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { setUser } = useAuthStore()
  const [userType, setUserType] = useState('customer')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({ email: '', password: '' })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = userType === 'owner'
        ? await authApi.ownerLogin(formData)
        : await authApi.customerLogin(formData)

      if (response.data.success) {
        localStorage.setItem('authToken', response.data.token)
        setUser(response.data.user, userType)
        
        const from = location.state?.from?.pathname || (userType === 'owner' ? '/owner/dashboard' : '/dashboard')
        navigate(from)
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 flex items-center">
      <div className="max-w-md mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        {/* Type Selector */}
        <div className="flex gap-2 mb-6">
          <button
            className={`flex-1 py-2 rounded-lg font-semibold transition ${
              userType === 'customer'
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => {
              setUserType('customer')
              setError('')
            }}
          >
            Traveler
          </button>
          <button
            className={`flex-1 py-2 rounded-lg font-semibold transition ${
              userType === 'owner'
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => {
              setUserType('owner')
              setError('')
            }}
          >
            Hotel Owner
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="card p-6 space-y-4">
          {error && (
            <div className="bg-red-50 text-danger p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="input-field"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3 font-semibold disabled:opacity-50"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>

          <div className="flex justify-between text-sm text-gray-600">
            <a href="#" className="hover:text-primary">Forgot Password?</a>
            <a href="/register" className="text-primary font-semibold hover:underline">
              Create Account
            </a>
          </div>
        </form>

        {/* Demo Credentials */}
        <div className="mt-6 card p-4 bg-blue-50">
          <p className="text-sm font-semibold text-blue-900 mb-2">Demo Credentials:</p>
          <p className="text-xs text-blue-800">Email: demo@example.com</p>
          <p className="text-xs text-blue-800">Password: password123</p>
        </div>
      </div>
    </div>
  )
}
