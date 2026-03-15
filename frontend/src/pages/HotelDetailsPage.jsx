import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { hotelApi, bookingApi } from '../utils/api'

export default function HotelDetailsPage() {
  const { id } = useParams()
  const [hotel, setHotel] = useState(null)
  const [loading, setLoading] = useState(true)
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    roomType: 'standard'
  })

  useEffect(() => {
    fetchHotelDetails()
  }, [id])

  const fetchHotelDetails = async () => {
    try {
      setLoading(true)
      const response = await hotelApi.getHotelDetails(id)
      setHotel(response.data.hotel)
    } catch (error) {
      console.error('Failed to fetch hotel details:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleBooking = async (e) => {
    e.preventDefault()
    try {
      const response = await bookingApi.createBooking({
        hotelId: id,
        ...bookingData
      })
      if (response.data.success) {
        alert('Booking created successfully!')
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Booking failed')
    }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!hotel) {
    return <div className="min-h-screen flex items-center justify-center">Hotel not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-responsive">
        {/* Hotel Header */}
        <div className="card mb-8 overflow-hidden">
          {hotel.image && (
            <img src={hotel.image} alt={hotel.name} className="w-full h-96 object-cover" />
          )}
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-2">{hotel.name}</h1>
            <p className="text-gray-600 mb-4">{hotel.location}</p>
            <div className="flex gap-4">
              <span className="text-yellow-500">⭐ {hotel.rating || 'N/A'}</span>
              <span className="text-gray-600">${hotel.price}/night</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Details */}
          <div className="md:col-span-2">
            <div className="card p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4">About</h2>
              <p className="text-gray-600">{hotel.description}</p>
            </div>

            <div className="card p-6">
              <h2 className="text-2xl font-bold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 gap-4">
                {hotel.amenities?.map((amenity, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span>✓</span>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div>
            <div className="card p-6 sticky top-20">
              <h3 className="text-xl font-bold mb-4">Book Now</h3>
              <form onSubmit={handleBooking} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Check-in</label>
                  <input
                    type="date"
                    name="checkIn"
                    value={bookingData.checkIn}
                    onChange={(e) => setBookingData({ ...bookingData, checkIn: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Check-out</label>
                  <input
                    type="date"
                    name="checkOut"
                    value={bookingData.checkOut}
                    onChange={(e) => setBookingData({ ...bookingData, checkOut: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Guests</label>
                  <input
                    type="number"
                    min="1"
                    value={bookingData.guests}
                    onChange={(e) => setBookingData({ ...bookingData, guests: parseInt(e.target.value) })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Room Type</label>
                  <select
                    value={bookingData.roomType}
                    onChange={(e) => setBookingData({ ...bookingData, roomType: e.target.value })}
                    className="input-field"
                  >
                    <option value="standard">Standard</option>
                    <option value="deluxe">Deluxe</option>
                    <option value="suite">Suite</option>
                  </select>
                </div>

                <button type="submit" className="btn-primary w-full py-3">
                  Book Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
