import { useState, useEffect } from 'react'
import { hotelApi } from '../utils/api'
import HotelCard from '../components/HotelCard'

export default function SearchPage() {
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    searchTerm: '',
    minPrice: 0,
    maxPrice: 10000,
    rating: 0,
  })

  useEffect(() => {
    fetchHotels()
  }, [])

  const fetchHotels = async () => {
    try {
      setLoading(true)
      const response = await hotelApi.getHotels(filters)
      setHotels(response.data.hotels || [])
    } catch (error) {
      console.error('Failed to fetch hotels:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  const handleSearch = (e) => {
    e.preventDefault()
    fetchHotels()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-responsive">
        <h1 className="text-3xl font-bold mb-8">Search Hotels</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="md:col-span-1">
            <div className="card p-6 sticky top-20">
              <h3 className="font-semibold mb-4">Filters</h3>

              <form onSubmit={handleSearch} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Search</label>
                  <input
                    type="text"
                    name="searchTerm"
                    value={filters.searchTerm}
                    onChange={handleFilterChange}
                    className="input-field"
                    placeholder="Hotel name..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Price Range: ${filters.minPrice} - ${filters.maxPrice}
                  </label>
                  <input
                    type="range"
                    name="maxPrice"
                    min="0"
                    max="10000"
                    step="100"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    className="w-full"
                  />
                </div>

                <button type="submit" className="btn-primary w-full">
                  Search
                </button>
              </form>
            </div>
          </div>

          {/* Hotels Grid */}
          <div className="md:col-span-3">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Loading hotels...</p>
              </div>
            ) : hotels.length === 0 ? (
              <div className="card p-8 text-center">
                <p className="text-gray-600 mb-4">No hotels found</p>
                <p className="text-sm text-gray-500">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {hotels.map(hotel => (
                  <HotelCard key={hotel.id} hotel={hotel} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
