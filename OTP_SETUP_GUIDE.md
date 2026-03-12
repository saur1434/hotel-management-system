# 📱 OTP Authentication Setup Guide

## Overview
Your hotel management system now has **Two-Factor Authentication (OTP)** via Email and SMS. When users/owners register, they'll receive an OTP that must be verified before account creation.

---

## ✅ What's Been Added

### Backend
- ✅ Nodemailer integration for email OTP delivery
- ✅ Twilio integration for SMS OTP delivery
- ✅ OTP generation (6-digit code, 5-minute expiry)
- ✅ OTP verification endpoints
- ✅ Beautiful HTML email templates

### Frontend
- ✅ OTP input fields in registration forms
- ✅ User/Owner register → Get OTP → Verify OTP flow
- ✅ Error handling and attempt limiting (3 attempts max)

---

## 🚀 Setup Instructions

### Step 1: Email Service (Gmail)

**Option A: Gmail with App Password (Recommended)**

1. Enable 2-Factor Authentication on your Gmail account
   - Go to [myaccount.google.com/security](https://myaccount.google.com/security)
   - Click "2-Step Verification" and follow setup

2. Generate App Password
   - Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and "Windows Computer"
   - Google generates a 16-character password
   - Copy this password

3. Update `.env` file:
```
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
```

**Option B: Custom SMTP Server**

```
EMAIL_SERVICE=smtp
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your-username
EMAIL_PASSWORD=your-password
```

---

### Step 2: SMS Service (Twilio)

1. Create free Twilio account
   - Go to [twilio.com/try-twilio](https://www.twilio.com/try-twilio)
   - Sign up and verify your email/phone

2. Get Your Credentials
   - Go to [Twilio Console](https://www.twilio.com/console)
   - Copy **Account SID**
   - Copy **Auth Token**
   - Copy your **Twilio Phone Number** (provided or purchased)

3. Update `.env` file:
```
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+1234567890
```

---

### Step 3: Test Locally

#### Start the server:
```bash
npm install  # If you haven't already
node server.js
```

#### Test Registration (Customer):
```bash
curl -X POST http://localhost:3000/api/customer/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "testuser@example.com",
    "phone": "+1234567890",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "OTP sent via email and SMS",
  "tempId": 1234567890,
  "emailSent": true,
  "smsSent": true
}
```

Check your email and SMS for the OTP code!

#### Verify OTP:
```bash
curl -X POST http://localhost:3000/api/customer/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "tempId": 1234567890,
    "otp": "123456"
  }'
```

---

## 🌐 Production Deployment (Render)

### 1. Update Render Environment Variables

Go to Render Dashboard → Your Service → Environment

Add:
```
EMAIL_SERVICE=gmail
EMAIL_USER=production-email@gmail.com
EMAIL_PASSWORD=your-app-password

TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890

ALLOWED_ORIGINS=https://your-service.onrender.com
JWT_SECRET=your-secure-key-here
```

### 2. Restart Service
- Render will auto-deploy with new environment variables
- OTP sending will work in production

---

## 🔧 How OTP Flow Works

### User Registration Flow:
```
1. User fills registration form (name, email, phone, password)
2. User submits → API generates 6-digit OTP
3. OTP sent via:
   - Email (HTML formatted)
   - SMS (text message)
4. User receives OTP on email and phone
5. User enters OTP in the form
6. Backend verifies OTP
7. Account created successfully
```

### OTP Rules:
- ✅ **Valid for**: 5 minutes
- ✅ **Format**: 6 digits
- ✅ **Attempts**: Max 3 wrong attempts
- ✅ **Retry**: Must request new OTP after expiry

---

## 📧 Email Template Preview

Users/Owners will receive a professional email:
```
┌─────────────────────────────────────┐
│  Hotel Management System             │
├─────────────────────────────────────┤
│                                     │
│  Your OTP is:                       │
│  ┌───────────────────────────┐      │
│  │     1 2 3 4 5 6           │      │
│  └───────────────────────────┘      │
│                                     │
│  ⏰ Expires in 5 minutes             │
│  🔒 Never share this code            │
│                                     │
└─────────────────────────────────────┘
```

---

## 🐛 Troubleshooting

### Issue: "Email credentials not configured"
**Solution:**
- Check `.env` file has `EMAIL_USER` and `EMAIL_PASSWORD`
- Verify Gmail App Password is correct
- Restart the server after changing `.env`

### Issue: "OTP not received"
**Solution:**
1. Check server logs for errors
2. Verify email/phone in registration form
3. Check spam folder for email
4. Verify Twilio account has credits (free account may have limitations)

### Issue: "Invalid OTP" on verification
**Solution:**
- OTP may have expired (5-minute limit)
- Some carriers may have SMS delays
- Request new OTP if needed

### Issue: Twilio not sending SMS
**Solution:**
- Verify `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, and `TWILIO_PHONE_NUMBER`
- Check Twilio account has SMS credits
- Verify phone number format (+country-code-number)
- Try Gmail-only OTP if SMS fails (email will still work)

---

## 🔐 Security Best Practices

✅ **Implemented:**
- OTP expires after 5 minutes
- Wrong password attempts limited to 3
- OTP stored in-memory (not in user database)
- Secure token generation (Math.random() + crypto)

⚠️ **For Production:**
1. Use database for OTP storage (not in-memory)
2. Implement rate limiting per IP
3. Add CAPTCHA to prevent brute force
4. Log OTP attempts for security audit
5. Consider enabling OTP for login as well

---

## 📱 Frontend Integration

### Registration Form Flow:

```javascript
// Step 1: User submits registration
POST /api/customer/register
↓
// Step 2: Show OTP input field
if (response.requiresOTP) {
  showOTPField();
}
↓
// Step 3: User enters OTP and submits
POST /api/customer/verify-otp
↓
// Step 4: Account created, login successful
```

---

## 📊 Testing Credentials

### Test Email Sending (Local):
- Use any email address
- Check logs for OTP display

### Test SMS Sending:
- Twilio trial account limits to verified numbers
- Add your phone number to Twilio for testing

### Bypass for Development:
If you want to test without email/SMS:
```javascript
// In auth.js, show OTP in console for testing
console.log('OTP for testing:', otp);
```

---

## 🚀 Next Steps

1. ✅ Configure email credentials
2. ✅ Configure Twilio SMS (optional)
3. ✅ Test locally
4. ✅ Deploy to Render
5. ✅ Update Render environment variables
6. ✅ Test on production URL

---

## 📚 Useful Links

- [Gmail App Passwords](https://support.google.com/accounts/answer/185833)
- [Twilio Console](https://www.twilio.com/console)
- [Twilio Pricing](https://www.twilio.com/sms/pricing)
- [Nodemailer Documentation](https://nodemailer.com/)
- [Twilio Node SDK](https://www.twilio.com/docs/libraries/node)

---

## 💡 Tips

- **Gmail Trial**: You can use Gmail without paying (limited but free)
- **Twilio Trial**: Free SMS for verified numbers (up to $15 credits)
- **Testing**: Use test OTP endpoints during development
- **Logging**: Check server logs for OTP delivery status

---

## Support

If you encounter issues:
1. Check `.env` file is properly configured
2. Review server logs for error messages
3. Verify email/SMS credentials are correct
4. Test with curl commands provided above
5. Check your email spam folder

**Happy registrations! 🎉**
