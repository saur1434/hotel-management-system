import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { authApi } from '../utils/api'
import { useAuthStore } from '../context/AuthContext'
import OTPModal from '../components/OTPModal'

export default function RegisterPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { setUser } = useAuthStore()
  const userType = searchParams.get('type') || 'customer'

  const [step, setStep] = useState('register') // register, otp, success
  const [showOTPModal, setShowOTPModal] = useState(false)
  const [tempId, setTempId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [otpSent, setOtpSent] = useState({ email: false, sms: false })

  const [formData, setFormData] = useState(
    userType === 'owner'
      ? { hostelName: '', ownerEmail: '', phone: '', location: '', password: '', confirmPassword: '' }
      : { fullName: '', email: '', phone: '', password: '', confirmPassword: '' }
  )

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const endpoint = userType === 'owner' ? '/api/owner/register' : '/api/customer/register'
      const response = await (userType === 'owner'
        ? authApi.ownerRegister(formData)
        : authApi.customerRegister(formData)
      )

      if (response.data.success) {
        setTempId(response.data.tempId)
        setOtpSent({
          email: response.data.emailSent,
          sms: response.data.smsSent
        })
        setShowOTPModal(true)
        setStep('otp')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleOTPVerify = async (otp) => {
    if (!otp || otp.length !== 6) {
      setError('Please enter a 6-digit OTP')
      return
    }

    setLoading(true)
    setError('')

    try {
      const endpoint = userType === 'owner' ? '/api/owner/verify-otp' : '/api/customer/verify-otp'
      const response = await (userType === 'owner'
        ? authApi.ownerVerifyOTP({ tempId, otp })
        : authApi.customerVerifyOTP({ tempId, otp })
      )

      if (response.data.success) {
        localStorage.setItem('authToken', response.data.token)
        setUser(response.data.user, userType)
        setShowOTPModal(false)
        setStep('success')
        
        setTimeout(() => {
          navigate(userType === 'owner' ? '/owner/dashboard' : '/dashboard')
        }, 2000)
      }
    } catch (err) {
      setError(err.response?.data?.message || 'OTP verification failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {userType === 'owner' ? 'List Your Hotel' : 'Sign Up'}
          </h1>
          <p className="text-gray-600">
            {userType === 'owner'
              ? 'Join HotelHub and start earning'
              : 'Create your account to start booking'
            }
          </p>
        </div>

        {/* Type Selector */}
        <div className="flex gap-2 mb-6">
          <button
            className={`flex-1 py-2 rounded-lg font-semibold transition ${
              userType === 'customer'
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => navigate('/register?type=customer')}
          >
            Traveler
          </button>
          <button
            className={`flex-1 py-2 rounded-lg font-semibold transition ${
              userType === 'owner'
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => navigate('/register?type=owner')}
          >
            Hotel Owner
          </button>
        </div>

        {/* Register Form */}
        {step === 'register' && (
          <form onSubmit={handleRegister} className="card p-6 space-y-4">
            {error && (
              <div className="bg-red-50 text-danger p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {userType === 'owner' ? (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Hostel/Hotel Name</label>
                  <input
                    type="text"
                    name="hostelName"
                    value={formData.hostelName}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="ownerEmail"
                    value={formData.ownerEmail}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>
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
              </>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="input-field"
                placeholder="+1234567890"
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

            <div>
              <label className="block text-sm font-medium mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
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
              {loading ? 'Creating Account...' : 'Continue'}
            </button>

            <p className="text-center text-gray-600 text-sm">
              Already have an account?{' '}
              <a href="/login" className="text-primary font-semibold hover:underline">
                Sign In
              </a>
            </p>
          </form>
        )}

        {/* Success Message */}
        {step === 'success' && (
          <div className="card p-6 text-center space-y-4">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-xl font-bold">Account Created!</h2>
            <p className="text-gray-600">Welcome to HotelHub. Redirecting...</p>
          </div>
        )}
      </div>

      <OTPModal
        isOpen={showOTPModal}
        onClose={() => setShowOTPModal(false)}
        onSubmit={handleOTPVerify}
        loading={loading}
        error={error}
        otpSent={otpSent}
      />
    </div>
  )
}
