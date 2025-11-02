# 🚀 QUICK DEPLOYMENT REFERENCE

## ⚡ Fast Track Deployment

### 1️⃣ Deploy Backend (5 minutes)

Go to: **https://vercel.com/new**

```
Repository: Manpreet-byte/-food-ordering-app
Root Directory: backend ⚠️
Framework: Other
```

**Environment Variables** (Copy-paste all):
```env
MONGO_URI=mongodb+srv://manpreet25:Manpreet098@cluster0.hm6o1n7.mongodb.net/food-ordering-app?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=3d7026843ee94783f4816e79cf02c2dc32cb02fe44f3a828f4af02028c819a6e
PORT=5000
SMS_ENABLED=true
USE_TEXTBELT=true
EMAIL_ENABLED=true
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=manpreet24@navgurukul.org
EMAIL_PASSWORD=vipagravnkjphulu
NODE_ENV=production
```

→ **Deploy** → **Copy Backend URL** 📋

---

### 2️⃣ Update Frontend Config (1 minute)

```bash
# Create production environment file
echo "VITE_API_URL=YOUR_BACKEND_URL/api" > frontend/.env.production

# Replace YOUR_BACKEND_URL with actual URL from step 1

# Commit and push
git add frontend/.env.production
git commit -m "Add production API URL"
git push origin main
```

---

### 3️⃣ Deploy Frontend (5 minutes)

Go to: **https://vercel.com/new**

```
Repository: Manpreet-byte/-food-ordering-app (same repo)
Root Directory: frontend ⚠️
Framework: Vite
Build Command: npm run build
Output Directory: dist
```

**Environment Variable**:
```env
VITE_API_URL=YOUR_BACKEND_URL/api
```

→ **Deploy** → **Copy Frontend URL** 📋

---

### 4️⃣ Final Backend Update (2 minutes)

**Backend Vercel Project** → **Settings** → **Environment Variables** → **Add**:

```env
FRONTEND_URL=YOUR_FRONTEND_URL
```

**Deployments** → Latest → **Redeploy** ♻️

---

## ✅ Test Your App

1. Visit: `YOUR_BACKEND_URL/api/health` → Should return `{"status":"ok"}`
2. Visit: `YOUR_FRONTEND_URL` → App should load
3. Sign up → Browse → Order → Check email 📧

---

## 🔑 Important Notes

- ⚠️ **Root Directory** must be set correctly (backend or frontend)
- 🔄 Always redeploy backend after adding FRONTEND_URL
- 📧 Check spam folder for order confirmation emails
- 🌐 MongoDB Atlas must allow connections from all IPs (0.0.0.0/0)

---

## 📊 What You'll Get

✨ **Live Backend API**: Orders, Auth, Menu, Email & SMS
✨ **Live Frontend**: Beautiful UI with image galleries
✨ **Auto-scaling**: Handles any traffic
✨ **SSL/HTTPS**: Secure by default
✨ **CDN**: Fast worldwide

---

## 🎯 Total Time: ~15 minutes

**Ready? Let's go!** 🚀

Visit: https://vercel.com/new
