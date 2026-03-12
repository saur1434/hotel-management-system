// Initialize data on server startup
const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'data');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Initialize admin.json with default admin
const adminFile = path.join(dataDir, 'admin.json');
if (!fs.existsSync(adminFile) || fs.readFileSync(adminFile, 'utf8').trim() === '[]') {
  const defaultAdmins = [
    {
      "id": 1771503146669,
      "name": "Saurabh",
      "email": "saurabh1435neha@gmail.com",
      "phone": "9103674693",
      "password": "saurabhg",
      "role": "super_admin",
      "registeredAt": "2026-02-19T12:12:26.669Z",
      "verified": true,
      "lastLogin": null
    },
    {
      "id": 1771650825000,
      "name": "Priyansh Goyal",
      "email": "priyanshugoyal609@gmail.com",
      "phone": "9876543210",
      "password": "saurabhg@1",
      "role": "admin",
      "registeredAt": "2026-02-20T17:30:00.000Z",
      "verified": true,
      "lastLogin": null
    }
  ];
  fs.writeFileSync(adminFile, JSON.stringify(defaultAdmins, null, 2));
  console.log('✅ Admin data initialized');
}

// Initialize hotels.json with sample hotels
const hotelsFile = path.join(dataDir, 'hotels.json');
if (!fs.existsSync(hotelsFile) || fs.readFileSync(hotelsFile, 'utf8').trim() === '[]') {
  const defaultHotels = [
    {
      "id": 1771564508824,
      "hostelName": "Patna Heritage Resort",
      "ownerEmail": "saurabhsingham1435kumar@gmail.com",
      "phone": "9103674693",
      "location": "Patna, Bihar",
      "registeredAt": "2026-02-20T05:15:08.824Z"
    },
    {
      "id": 1771700000000,
      "hostelName": "Delhi Luxury Villas",
      "ownerEmail": "delhi@gocabingo.com",
      "phone": "9876543210",
      "location": "New Delhi, India",
      "registeredAt": "2026-02-20T10:00:00.000Z"
    },
    {
      "id": 1771700000001,
      "hostelName": "Mumbai Beach Resort",
      "ownerEmail": "mumbai@gocabingo.com",
      "phone": "9123456789",
      "location": "Mumbai, Maharashtra",
      "registeredAt": "2026-02-21T10:00:00.000Z"
    }
  ];
  fs.writeFileSync(hotelsFile, JSON.stringify(defaultHotels, null, 2));
  console.log('✅ Hotels data initialized');
}

// Initialize other empty files with sample data
const emptyFiles = [
  { file: 'users.json', name: 'Users' },
  { file: 'owners.json', name: 'Owners' },
  { file: 'bookings.json', name: 'Bookings' },
  { file: 'payments.json', name: 'Payments' },
  { file: 'tokens.json', name: 'Tokens' }
];

emptyFiles.forEach(({ file, name }) => {
  const filePath = path.join(dataDir, file);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 2));
  }
});

// Initialize reviews.json with sample reviews
const reviewsFile = path.join(dataDir, 'reviews.json');
if (!fs.existsSync(reviewsFile) || fs.readFileSync(reviewsFile, 'utf8').trim() === '[]') {
  const defaultReviews = [
    {
      "id": 1,
      "hotelId": 1771564508824,
      "hotelName": "Patna Heritage Resort",
      "reviewerName": "Rajesh Kumar",
      "reviewerEmail": "rajesh@example.com",
      "rating": 5,
      "title": "Excellent Stay!",
      "review": "Great location, clean rooms, and friendly staff. Highly recommended!",
      "createdAt": "2026-03-05T10:30:00.000Z"
    },
    {
      "id": 2,
      "hotelId": 1771700000000,
      "hotelName": "Delhi Luxury Villas",
      "reviewerName": "Priya Singh",
      "reviewerEmail": "priya@example.com",
      "rating": 5,
      "title": "Luxurious and Comfortable",
      "review": "Amazing rooms with great view. Service is exceptional!",
      "createdAt": "2026-03-04T14:20:00.000Z"
    },
    {
      "id": 3,
      "hotelId": 1771700000001,
      "hotelName": "Mumbai Beach Resort",
      "reviewerName": "Amit Verma",
      "reviewerEmail": "amit@example.com",
      "rating": 5,
      "title": "Perfect Beach Getaway",
      "review": "Beautiful beachfront location. Great food and service!",
      "createdAt": "2026-03-03T09:15:00.000Z"
    }
  ];
  fs.writeFileSync(reviewsFile, JSON.stringify(defaultReviews, null, 2));
  console.log('✅ Reviews data initialized');
}

// Initialize photos.json with sample photos
const photosFile = path.join(dataDir, 'photos.json');
if (!fs.existsSync(photosFile) || fs.readFileSync(photosFile, 'utf8').trim() === '[]') {
  const defaultPhotos = [
    {
      "id": 1,
      "hotelId": 1771564508824,
      "hotelName": "Patna Heritage Resort",
      "photoUrl": "https://images.unsplash.com/photo-1566677617378-cbf4dd32fdf0?w=600&h=400&fit=crop",
      "caption": "Luxurious Room View",
      "type": "room",
      "uploadedBy": "owner_patna_1"
    },
    {
      "id": 2,
      "hotelId": 1771564508824,
      "hotelName": "Patna Heritage Resort",
      "photoUrl": "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&h=400&fit=crop",
      "caption": "Reception Area",
      "type": "lobby",
      "uploadedBy": "owner_patna_1"
    },
    {
      "id": 3,
      "hotelId": 1771700000000,
      "hotelName": "Delhi Luxury Villas",
      "photoUrl": "https://images.unsplash.com/photo-1571003123670-860bda76d87e?w=600&h=400&fit=crop",
      "caption": "Luxury Suite",
      "type": "room",
      "uploadedBy": "owner_delhi"
    },
    {
      "id": 4,
      "hotelId": 1771700000000,
      "hotelName": "Delhi Luxury Villas",
      "photoUrl": "https://images.unsplash.com/photo-1514432324607-2e467f4af445?w=600&h=400&fit=crop",
      "caption": "Garden View",
      "type": "amenity",
      "uploadedBy": "owner_delhi"
    },
    {
      "id": 5,
      "hotelId": 1771700000001,
      "hotelName": "Mumbai Beach Resort",
      "photoUrl": "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=600&h=400&fit=crop",
      "caption": "Beachfront Room",
      "type": "room",
      "uploadedBy": "owner_mumbai"
    },
    {
      "id": 6,
      "hotelId": 1771700000001,
      "hotelName": "Mumbai Beach Resort",
      "photoUrl": "https://images.unsplash.com/photo-1455587519802-0a3df3a5ca27?w=600&h=400&fit=crop",
      "caption": "Beach View",
      "type": "amenity",
      "uploadedBy": "owner_mumbai"
    }
  ];
  fs.writeFileSync(photosFile, JSON.stringify(defaultPhotos, null, 2));
  console.log('✅ Photos data initialized');
}
