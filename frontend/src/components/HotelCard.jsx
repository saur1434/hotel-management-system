import { Link } from 'react-router-dom'

export default function HotelCard({ hotel }) {
  return (
    <Link to={`/hotel/${hotel.id}`}>
      <div className="card overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        {/* Image */}
        <div className="relative overflow-hidden h-48 bg-gray-200">
          {hotel.image ? (
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-secondary text-white text-4xl">
              🏨
            </div>
          )}
          {hotel.featured && (
            <div className="absolute top-2 right-2 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
              Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 line-clamp-2">{hotel.name}</h3>
          <p className="text-gray-600 text-sm mb-3">{hotel.location}</p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-yellow-500">⭐</span>
            <span className="font-semibold">{hotel.rating ? `${hotel.rating}/5` : 'New'}</span>
            {hotel.reviewCount && (
              <span className="text-gray-500 text-sm">({hotel.reviewCount})</span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {hotel.description || 'A wonderful place to stay'}
          </p>

          {/* Price */}
          <div className="flex justify-between items-center">
            <div>
              <span className="text-2xl font-bold text-primary">${hotel.price}</span>
              <span className="text-gray-600 text-sm">/night</span>
            </div>
            <button className="btn-primary text-sm px-4 py-2">
              View Details
            </button>
          </div>

          {/* Amenities preview */}
          {hotel.amenities && hotel.amenities.length > 0 && (
            <div className="mt-4 pt-4 border-t text-xs text-gray-600 space-y-1">
              {hotel.amenities.slice(0, 2).map((amenity, i) => (
                <div key={i}>✓ {amenity}</div>
              ))}
              {hotel.amenities.length > 2 && (
                <div className="text-primary font-semibold">+{hotel.amenities.length - 2} more</div>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
