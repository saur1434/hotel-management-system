import { Link } from 'react-router-dom'
import SearchBox from '../components/SearchBox'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-16 md:py-24">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your Perfect Hotel
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              Discover and book amazing hotels at the best prices
            </p>
          </div>
          <SearchBox />
        </div>
      </div>

      {/* Features Section */}
      <div className="container-responsive py-16 md:py-24">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose HotelHub?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card p-8 text-center hover:shadow-xl transition-all">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-3">Easy Search</h3>
            <p className="text-gray-600">Find hotels easily with our powerful search and filter options.</p>
          </div>
          <div className="card p-8 text-center hover:shadow-xl transition-all">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-semibold mb-3">Best Prices</h3>
            <p className="text-gray-600">Get the best rates guaranteed with price match promise.</p>
          </div>
          <div className="card p-8 text-center hover:shadow-xl transition-all">
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-xl font-semibold mb-3">Verified Reviews</h3>
            <p className="text-gray-600">Read honest reviews from verified travelers like you.</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-100 py-16 md:py-24">
        <div className="container-responsive">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-4">Are you a Hotel Owner?</h2>
              <p className="text-gray-600 mb-6">
                Join thousands of hotel owners earning more with HotelHub. List your property, manage bookings, and grow your business.
              </p>
              <Link
                to="/register?type=owner"
                className="btn-primary w-fit text-center"
              >
                List Your Hotel
              </Link>
            </div>
            <div className="bg-white rounded-lg p-8 shadow">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📊</span>
                  <span>Easy property management</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">💵</span>
                  <span>Competitive commission</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">👥</span>
                  <span>Dedicated support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Hotels Section */}
      <div className="container-responsive py-16 md:py-24">
        <h2 className="text-3xl font-bold mb-12">Popular Hotels</h2>
        <Link
          to="/search"
          className="btn-primary"
        >
          Explore All Hotels
        </Link>
      </div>
    </div>
  )
}
