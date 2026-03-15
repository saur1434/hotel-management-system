import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken')
      localStorage.removeItem('userData')
      window.location.href = '/'
    }
    return Promise.reject(error)
  }
)

// Auth API
export const authApi = {
  customerRegister: (data) => api.post('/customer/register', data),
  customerLogin: (data) => api.post('/customer/login', data),
  customerVerifyOTP: (data) => api.post('/customer/verify-otp', data),
  ownerRegister: (data) => api.post('/owner/register', data),
  ownerLogin: (data) => api.post('/owner/login', data),
  ownerVerifyOTP: (data) => api.post('/owner/verify-otp', data),
}

// Hotel API
export const hotelApi = {
  searchHotels: (params) => api.get('/search', { params }),
  getHotels: (params) => api.get('/hotels', { params }),
  getHotelDetails: (id) => api.get(`/hotels/${id}`),
}

// Booking API
export const bookingApi = {
  createBooking: (data) => api.post('/bookings', data),
  getMyBookings: () => api.get('/bookings/my'),
  cancelBooking: (id) => api.delete(`/bookings/${id}`),
}

// Payment API
export const paymentApi = {
  processPayment: (data) => api.post('/payments', data),
  verifyPayment: (data) => api.post('/payments/verify', data),
}

export default api
