# 🚀 Complete Render Deployment Guide

## **Pre-Deployment Checklist** ✅

### ✅ Code Ready
- [x] Backend server running on `0.0.0.0` (all interfaces)
- [x] Config.js handles dynamic API URLs
- [x] Admin login fixed and tested
- [x] Password validation working
- [x] CORS properly configured
- [x] Environment variables support
- [x] Debug logging for troubleshooting

### ✅ Files Verified
- package.json - Node 18.x specified
- Procfile - `web: node server.js` configured
- .gitignore - Excludes node_modules and .env
- data/ - All JSON database files included
- server.js - Listens on PORT env variable
- config.js - Handles local/production URLs

### ✅ Known Issues Fixed
- [x] Password comparison issue (plain text vs bcrypt)
- [x] Hardcoded Render domain removed from auth.js
- [x] CORS now uses environment variables
- [x] Server binds to 0.0.0.0 for Render compatibility

---

## **Step 1: Prepare GitHub Repository**

```powershell
# Navigate to project
cd c:\Users\saurabh\Desktop\project

# Initialize git (if not already done)
git init

# Create .gitignore (should already exist)
# Verify it excludes: node_modules, .env, dist/, build/

# Add all files
git add .

# Commit
git commit -m "GoCabn Go - Ready for Render deployment"

# Add GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/gocabn.git

# Push to GitHub
git push -u origin main
```

---

## **Step 2: Set Up on Render**

### **Option A: Monolithic (Backend + Frontend on Single Service)**

**1. Go to [render.com](https://render.com)**
- Sign up/Login with GitHub

**2. Create Web Service**
- Click **New +** → **Web Service**
- Select your GitHub repository
- Choose branch: `main`

**3. Configure Service**
```
Name: gocabn-go
Environment: Node
Branch: main
Build Command: npm install
Start Command: node server.js
Plan: Free (suitable for testing)
```

**4. Add Environment Variables**
Click **Advanced** → **Add Environment Variable**

```
KEY: PORT
VALUE: 3000

KEY: NODE_ENV
VALUE: production

KEY: JWT_SECRET
VALUE: [Generate a secure key - see below]

KEY: ALLOWED_ORIGINS
VALUE: https://gocabn-go.onrender.com
```

**5. Deploy**
- Click **Create Web Service**
- Wait 3-5 minutes for deployment
- Render assigns URL: `https://gocabn-go.onrender.com`

---

### **Option B: Separate Frontend & Backend (Advanced)**

**Backend Service:**
```
Name: gocabn-backend
Start Command: node server.js
Env Variables:
  - PORT: 3000
  - NODE_ENV: production
  - JWT_SECRET: [secure key]
  - ALLOWED_ORIGINS: https://gocabn-frontend.onrender.com
```

**Frontend Service:**
```
Name: gocabn-frontend
Start Command: npx serve -s . -l 5000
Env Variables:
  - VITE_API_URL: https://gocabn-backend.onrender.com
  - NODE_ENV: production
```

---

## **Step 3: Generate Secure JWT_SECRET**

Run this in terminal to generate a secure key:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Or use PowerShell:
```powershell
[Convert]::ToBase64String([byte[]]@((1..32 | % {[byte](Get-Random -Max 256)})))
```

Copy the output and add to Render environment variables.

---

## **Step 4: Post-Deployment Verification**

### **Test 1: Health Check**
```bash
curl https://gocabn-go.onrender.com/
```
Should return HTML or 404 (not connection error)

### **Test 2: API Response**
```bash
curl https://gocabn-go.onrender.com/api/hotels/list
```
Should return JSON with hotels list

### **Test 3: Admin Login**
```bash
curl -X POST https://gocabn-go.onrender.com/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"saurabh1435neha@gmail.com","password":"saurabhg"}'
```
Should return `{"success":true, "token":"...", "admin":{...}}`

### **Test 4: Frontend Login (Browser)**
1. Open `https://gocabn-go.onrender.com` in browser
2. Click "Admin Login"
3. Enter credentials:
   - Email: `saurabh1435neha@gmail.com`
   - Password: `saurabhg`
4. Should redirect to admin.html

---

## **Step 5: Update Frontend API URL**

After deployment, if using separate service:

**In config.js:**
```javascript
// Change this:
return 'https://hotelweb-1990.onrender.com';

// To your actual Render URL:
return 'https://gocabn-backend.onrender.com';
```

Or push to GitHub and redeploy.

---

## **Troubleshooting**

### ❌ **Connection Error on Login**
- Check if backend URL is correct
- Verify `ALLOWED_ORIGINS` includes your frontend domain
- Check browser DevTools → Network tab
- Restart service: Dashboard → Environment → Redeploy

### ❌ **CORS Error**
**Error:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**
1. Update `ALLOWED_ORIGINS` in Render dashboard:
   ```
   https://gocabn-go.onrender.com
   ```
2. Redeploy service

### ❌ **404 Not Found**
- Verify Render service is running
- Check if build succeeded: Dashboard → Logs
- Confirm `Procfile` exists and is correct

### ❌ **502 Bad Gateway**
- Service crashed during startup
- Check logs for error messages
- Verify all dependencies installed (npm install works)
- Check `server.js` for syntax errors

### ❌ **Login Still Shows "Connection error"**
1. Open browser DevTools (F12)
2. Check Console tab for actual error
3. Check Network tab - see actual request URL
4. Verify `config.js` is loading correctly
5. Check if `API_CONFIG` is globally available

---

## **Important Notes**

### 📝 **Database Persistence**
- Data is stored in JSON files (data/*.json)
- **Limitation:** Data persists only while service is running
- **Warning:** Free tier services sleep after 15 min inactivity = data loss
- **Solution:** Upgrade to Starter tier ($7/month) for production

### 🔐 **Security**
- Never commit `.env` file to GitHub
- Generate unique `JWT_SECRET` for your deployment
- Use HTTPS only (Render provides auto HTTPS)
- Update `ALLOWED_ORIGINS` to your domain only

### 🔄 **Redeploying**
```bash
# Make changes locally
git add .
git commit -m "Fix: Update API configuration"
git push origin main

# Render automatically redeploys on push
```

### 📊 **Monitoring**
- Dashboard → Logs: View server output
- Dashboard → Metrics: Check CPU, memory, requests
- Dashboard → Events: See deployment history

---

## **Credentials for Testing**

### Admin Login
```
Email: saurabh1435neha@gmail.com
Password: saurabhg
```

### Owner Accounts
```
Email: delhi@gocabingo.com
Password: pass123
```

### Customer Accounts
```
Email: customer@example.com
Password: pass123
```

---

## **Next Steps**

1. ✅ Deploy on Render
2. ✅ Test all endpoints (see Verification above)
3. ✅ Update API URLs if using separate service
4. ✅ Configure ALLOWED_ORIGINS with correct domains
5. ✅ Monitor logs for any errors
6. ✅ Plan upgrade to Paid tier for production

---

## **Support**

If issues occur:
1. Check Render Dashboard → Logs
2. Review browser DevTools → Console & Network
3. Verify environment variables are set correctly
4. Ensure .env files are NOT committed to git
5. Test locally first: `npm start`

**Deployment Status:** ✅ READY FOR RENDER
