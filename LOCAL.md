# Local Development Guide

Quick start guide for running GoCabn Go locally before deploying.

## Prerequisites
- Node.js v14+ (download from nodejs.org)
- npm (comes with Node.js)
- Code editor (VS Code recommended)
- Live Server extension (for serving frontend on port 5500)

## 🚀 Quick Start (5 minutes)

### 1. Install Dependencies
```bash
cd c:\Users\saurabh\Desktop\project
npm install
```

### 2. Start Backend
```bash
npm start
```

You should see:
```
� GoCabn Go API Server running on http://localhost:3000
📁 Data stored in: c:\Users\saurabh\Desktop\project\data
```

### 3. Start Frontend

**Option A: VS Code Live Server**
1. Install "Live Server" extension (by Ritwick Dey)
2. Right-click `index.html` → "Open with Live Server"
3. Browser opens at `http://127.0.0.1:5500`

**Option B: Python (if available)**
```bash
python -m http.server 5500
# or
python -m SimpleHTTPServer 5500
```

### 4. Test the Website

Open `http://127.0.0.1:5500` in your browser and try:
- ✅ Click "Owner" button → Register as hotel owner
- ✅ Click "Login" button → Register as customer
- ✅ Enter OTP from backend console
- ✅ Book a room and test payment
- ✅ Chat with bot in bottom-right corner

---

## 🔍 Troubleshooting

### Error: "Port 3000 already in use"
```bash
# Find process using port 3000
netstat -ano | findstr :3000

# Kill it (replace PID with the number)
taskkill /PID <PID> /F

# Start server again
npm start
```

### Error: "Cannot find module 'express'"
```bash
npm install
```

### Error: "Connection error" when logging in
1. Check backend is running on port 3000
2. Check `config.js` has correct API URL
3. Open DevTools (F12) → Network → Check API response

### Payment not working locally
- Use test card: `4532 1234 5678 9010`
- Any future expiry date
- Any 3-digit CVV
- Data saves to `/data/payments.json`

### Data not persisting
- Check `/data/` folder exists
- Check write permissions on folder
- Look for errors in backend console

---

## 📁 File Structure

```
project/
├── index.html              # Main website
├── style.css               # All styling
├── config.js               # API URL configuration
├── auth.js                 # Authentication logic
├── payment.js              # Payment system
├── chatbot.js              # Chat assistant
├── server.js               # Backend API
├── package.json            # Dependencies
├── Procfile                # For deployment
├── netlify.toml            # Netlify config
├── .gitignore              # Git ignore rules
├── DEPLOY.md               # Deployment guide
├── SETUP.md                # Setup guide
├── LOCAL.md                # This file
├── data/
│   ├── users.json          # Customer data
│   ├── owners.json         # Owner data
│   └── payments.json       # Payment history
└── image/
    └── *.jpg               # Hotel images
```

---

## 🧪 API Testing

### Test Customer Registration
```bash
curl -X POST http://localhost:3000/api/customer/register \
  -H "Content-Type: application/json" \
  -d {
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "password": "password123",
    "confirmPassword": "password123"
  }
```

### Test Payment
```bash
curl -X POST http://localhost:3000/api/payment/process \
  -H "Content-Type: application/json" \
  -d {
    "paymentMethod": "card",
    "amount": 5000,
    "cardName": "John Doe",
    "cardEmail": "john@example.com",
    "cardNumber": "1234"
  }
```

### View All Users
```
http://localhost:3000/api/admin/users
```

### View All Payments
```
http://localhost:3000/api/admin/payments
```

### View All Owners
```
http://localhost:3000/api/admin/owners
```

---

## 🔧 Common Tasks

### Add New API Endpoint
1. Edit `server.js`
2. Add new `app.post()` or `app.get()` function
3. Test with curl or Postman
4. Restart server: `npm start`

### Change Database
- Currently: JSON files in `/data/`
- To upgrade:
  1. Install MongoDB driver: `npm install mongodb`
  2. Create MongoDB Atlas account
  3. Replace file operations with MongoDB queries

### Add Email Notifications
1. Install: `npm install nodemailer`
2. Add to server.js:
```javascript
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: 'your@gmail.com', pass: 'YOUR_PASSWORD' }
});
transporter.sendMail({ /* options */ });
```

### Use Environment Variables
1. Install: `npm install dotenv`
2. Create `.env` file:
```
API_URL=http://localhost:3000
DATABASE_URL=mongodb://...
EMAIL_PASSWORD=your_password
```
3. In server.js:
```javascript
require('dotenv').config();
const db = process.env.DATABASE_URL;
```

---

## 📊 Monitoring

### Check Memory Usage
```bash
node --max-old-space-size=4096 server.js
```

### Enable Debug Logs
```bash
DEBUG=* npm start
```

### Performance Testing
```bash
# Using Apache Bench
ab -n 1000 -c 10 http://localhost:3000/api/admin/users
```

---

## 🚀 Build for Production

### 1. Minimize Frontend
```bash
npm install -g terser
terser auth.js -o auth.min.js
terser payment.js -o payment.min.js
terser chatbot.js -o chatbot.min.js
```

### 2. Update Script Tags in HTML
```html
<script src="auth.min.js"></script>
<script src="payment.min.js"></script>
<script src="chatbot.min.js"></script>
```

### 3. Test Everything
```bash
npm start
# Open browser and test all features
```

### 4. Deploy
```bash
git add .
git commit -m "Ready for production"
git push origin main
```

---

## 📚 Learning Resources

- **Node.js**: nodejs.org/en/docs/
- **Express**: expressjs.com
- **JavaScript**: developer.mozilla.org/en-US/docs/Web/JavaScript/
- **APIs**: restfulapi.net
- **Testing**: postman.com

---

## 💡 Tips & Tricks

1. **Auto-reload backend on file changes**
   ```bash
   npm install -g nodemon
   nodemon server.js
   ```

2. **Better logging**
   ```javascript
   console.log('🔄', message); // Rotating arrow
   console.log('✅', success);  // Check mark
   console.log('❌', error);    // Cross mark
   ```

3. **Quick API testing in browser console**
   ```javascript
   fetch('http://localhost:3000/api/admin/users').then(r => r.json()).then(d => console.log(d))
   ```

4. **View API response headers**
   ```javascript
   fetch('http://localhost:3000/api/admin/users')
     .then(r => { console.log(r.headers); return r.json(); })
     .then(d => console.log(d))
   ```

---

## 🎯 Next Steps

1. ✅ Get backend running locally
2. ✅ Test all features
3. ✅ Read DEPLOY.md for production
4. ✅ Deploy to Netlify + Render
5. ✅ Set up custom domain
6. ✅ Monitor logs
7. ✅ Improve performance
8. ✅ Add more features

Good luck developing! 🚀
