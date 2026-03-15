# Hotel Management System - React Frontend

A modern, mobile-responsive React frontend built with Tailwind CSS for the Hotel Management System.

## Features

✨ **User Features**
- Register & login with OTP verification (SMS + Email)
- Search and filter hotels
- View detailed hotel information
- Make hotel bookings
- Manage bookings and reservations
- User dashboard

✨ **Owner Features**
- Register hotel/hostel
- Manage property listings
- View bookings and reservations
- Owner dashboard with analytics
- Payment tracking

✨ **Admin Features**
- Admin dashboard
- Platform analytics
- User and hotel management

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite (⚡ Fast development)
- **Styling**: Tailwind CSS + Custom CSS
- **Routing**: React Router v6
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Mobile**: Fully responsive, mobile-first design

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update `.env` with your API URL:
```env
VITE_API_URL=http://localhost:3000
```

## Development

Start the development server:
```bash
npm run dev
```

The app will open at `http://localhost:5173`

**Features:**
- Hot module replacement (HMR)
- Auto-reload on file changes
- Proxy to backend API at `http://localhost:3000/api`

## Build

Build for production:
```bash
npm run build
```

This creates an optimized `dist/` folder ready for deployment.

## Project Structure

```
frontend/
├── src/
│   ├── components/        # Reusable components
│   │   ├── Navbar.jsx    # Top navigation bar
│   │   ├── Footer.jsx    # Footer
│   │   ├── HotelCard.jsx # Hotel listing card
│   │   ├── SearchBox.jsx # Search component
│   │   └── OTPModal.jsx  # OTP verification modal
│   ├── pages/            # Page components
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── SearchPage.jsx
│   │   ├── HotelDetailsPage.jsx
│   │   ├── UserDashboard.jsx
│   │   ├── OwnerDashboard.jsx
│   │   └── AdminDashboard.jsx
│   ├── context/          # State management
│   │   └── AuthContext.jsx
│   ├── utils/            # Utility functions
│   │   └── api.js       # API calls
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles with Tailwind
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
└── package.json         # Dependencies

```

## Mobile Responsive

The entire app is built mobile-first:
- **Breakpoints**: Mobile (default), Tablet (md: 768px), Desktop (lg: 1024px)
- **Touch-friendly**: Large buttons and spacing on mobile
- **Viewport**: Properly configured for mobile devices
- **Navigation**: Hamburger menu on mobile, full menu on desktop

## API Integration

The frontend connects to the backend API at `/api`:

### Authentication Endpoints
- `POST /api/customer/register` - Customer registration
- `POST /api/customer/login` - Customer login
- `POST /api/customer/verify-otp` - Verify OTP
- `POST /api/owner/register` - Owner registration
- `POST /api/owner/login` - Owner login
- `POST /api/owner/verify-otp` - Verify OTP

### Hotel Endpoints
- `GET /api/search` - Search hotels
- `GET /api/hotels` - Get all hotels
- `GET /api/hotels/:id` - Get hotel details

### Booking Endpoints
- `POST /api/bookings` - Create booking
- `GET /api/bookings/my` - Get user bookings
- `DELETE /api/bookings/:id` - Cancel booking

### Payment Endpoints
- `POST /api/payments` - Process payment
- `POST /api/payments/verify` - Verify payment

## Key Components

### Authentication Flow
1. User selects account type (Customer/Owner)
2. Fills registration form
3. Backend generates and sends OTP
4. User enters OTP
5. Account verified, user logged in
6. Redirected to appropriate dashboard

### Hotel Search
- Real-time location autocomplete
- Filter by price range
- Sort by rating
- Responsive grid layout

### Booking Process
1. Click "Book Now" on hotel
2. Select dates and room type
3. Complete payment
4. Booking confirmed
5. View in dashboard

## Styling

Custom Tailwind components defined in `src/index.css`:

```css
.btn-primary      /* Primary action button */
.btn-secondary    /* Secondary action button */
.btn-danger       /* Danger/delete button */
.input-field      /* Form input styling */
.card             /* Card component with shadow */
.container-responsive /* Responsive container */
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `http://localhost:3000` | Backend API URL |

## Deployment

### On Render (Production)

1. Connect GitHub repository
2. Set environment variable:
   - `VITE_API_URL=https://your-backend.onrender.com`
3. Build command: `npm run build`
4. Start command: `npm run preview` (or use Render's static site setup)

### On Vercel

1. Connect GitHub repository
2. Set environment variable: `VITE_API_URL`
3. Auto-deploys on each push

## Performance Optimizations

- ⚡ Vite for fast dev server (~100ms startup)
- 📦 Code splitting with React Router
- 🎨 Tailwind CSS minification in production
- 🖼️ Lazy-loaded images
- 🔄 Efficient state management with Zustand

## Browser Support

- Chrome/Edge 90+
- Safari 14+
- Firefox 88+
- Mobile browsers (iOS Safari 14+, Chrome Android)

## License

Proprietary - Hotel Management System

## Support

For issues or questions about the frontend, contact the development team.
