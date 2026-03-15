import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { hotelApi } from '../utils/api'

export default function SearchBox() {
  const navigate = useNavigate()
  const [hotels, setHotels] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [formData, setFormData] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 1
  })

  useEffect(() => {
    if (searchTerm.length > 2) {
      searchHotels()
    }
  }, [searchTerm])

  const searchHotels = async () => {
    try {
      const response = await hotelApi.searchHotels({ search: searchTerm })
      setHotels(response.data.hotels || [])
      setShowSuggestions(true)
    } catch (error) {
      console.error('Search failed:', error)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    navigate('/search', { state: formData })
  }

  const handleLocationSelect = (hotelName) => {
    setFormData({ ...formData, location: hotelName })
    setShowSuggestions(false)
  }

  return (
    <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Location */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700">Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => {
              setFormData({ ...formData, location: e.target.value })
              setSearchTerm(e.target.value)
            }}
            className="input-field"
            placeholder="City or hotel name"
            autoComplete="off"
          />
          {showSuggestions && hotels.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg mt-1 shadow-lg z-10">
              {hotels.slice(0, 5).map(hotel => (
                <button
                  key={hotel.id}
                  type="button"
                  onClick={() => handleLocationSelect(hotel.name)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                >
                  {hotel.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Check-in */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Check-in</label>
          <input
            type="date"
            value={formData.checkIn}
            onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
            className="input-field"
          />
        </div>

        {/* Check-out */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Check-out</label>
          <input
            type="date"
            value={formData.checkOut}
            onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
            className="input-field"
          />
        </div>

        {/* Guests */}
        <div className="flex flex-col justify-end">
          <label className="block text-sm font-medium mb-2 text-gray-700">Guests</label>
          <input
            type="number"
            min="1"
            value={formData.guests}
            onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
            className="input-field"
          />
        </div>
      </div>

      <button type="submit" className="btn-primary mt-6 w-full md:w-auto">
        🔍 Search Hotels
      </button>
    </form>
  )
}
