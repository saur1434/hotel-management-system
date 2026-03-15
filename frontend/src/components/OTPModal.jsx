import { useState } from 'react'

export default function OTPModal({ isOpen, onClose, onSubmit, loading, error, otpSent }) {
  const [otp, setOtp] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(otp)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-4">Verify Your Account</h2>
        <p className="text-gray-600 mb-6">
          Enter the 6-digit code sent to your email and phone
        </p>

        {/* OTP Status */}
        <div className="flex gap-4 mb-6 text-sm">
          {otpSent.email && (
            <div className="flex items-center gap-2 text-green-600">
              <span>✓</span>
              <span>Email</span>
            </div>
          )}
          {otpSent.sms && (
            <div className="flex items-center gap-2 text-green-600">
              <span>✓</span>
              <span>SMS</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 text-danger p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">6-Digit Code</label>
            <input
              type="text"
              maxLength="6"
              inputMode="numeric"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              className="input-field text-center text-2xl kern tracking-widest"
              placeholder="000000"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="w-full btn-primary py-3 font-semibold disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Verify Code'}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full text-gray-600 hover:text-gray-900 py-2 font-semibold"
          >
            Close
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-4">
          Code expires in 5 minutes
        </p>
      </div>
    </div>
  )
}
