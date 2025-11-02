# ✅ DEPLOYMENT CHECKLIST

Print this and check off as you go! 📋

---

## 📦 PRE-DEPLOYMENT

- [x] All code committed to Git
- [x] All code pushed to GitHub
- [x] MongoDB Atlas database created
- [x] Email credentials ready
- [x] JWT secret generated
- [x] Local testing completed

---

## 🔧 BACKEND DEPLOYMENT

### Go to https://vercel.com/new

- [ ] Click "Import Project"
- [ ] Select GitHub repository: `Manpreet-byte/-food-ordering-app`
- [ ] Set **Root Directory**: `backend` ⚠️ CRITICAL!
- [ ] Set **Framework Preset**: Other
- [ ] Click "Environment Variables"
- [ ] Add all 11 environment variables (copy from QUICK_DEPLOY.md)
  - [ ] MONGO_URI
  - [ ] JWT_SECRET
  - [ ] PORT
  - [ ] SMS_ENABLED
  - [ ] USE_TEXTBELT
  - [ ] EMAIL_ENABLED
  - [ ] EMAIL_HOST
  - [ ] EMAIL_PORT
  - [ ] EMAIL_SECURE
  - [ ] EMAIL_USER
  - [ ] EMAIL_PASSWORD
  - [ ] NODE_ENV
- [ ] Click "Deploy"
- [ ] Wait for deployment to finish (2-3 minutes)
- [ ] **COPY BACKEND URL**: _________________________________

---

## 🎨 FRONTEND SETUP

### In Your Terminal

```bash
# Replace YOUR_BACKEND_URL with the URL you just copied above
echo "VITE_API_URL=YOUR_BACKEND_URL/api" > frontend/.env.production

# Example:
# echo "VITE_API_URL=https://food-ordering-backend.vercel.app/api" > frontend/.env.production
```

- [ ] Created `.env.production` file in frontend folder
- [ ] Verified the URL is correct
- [ ] Run: `git add frontend/.env.production`
- [ ] Run: `git commit -m "Add production API URL"`
- [ ] Run: `git push origin main`

---

## 🌐 FRONTEND DEPLOYMENT

### Go to https://vercel.com/new (again)

- [ ] Click "Import Project"
- [ ] Select SAME repository: `Manpreet-byte/-food-ordering-app`
- [ ] Set **Root Directory**: `frontend` ⚠️ CRITICAL!
- [ ] Set **Framework Preset**: Vite
- [ ] Verify **Build Command**: `npm run build`
- [ ] Verify **Output Directory**: `dist`
- [ ] Click "Environment Variables"
- [ ] Add variable:
  - Name: `VITE_API_URL`
  - Value: `YOUR_BACKEND_URL/api` (use the backend URL from above)
- [ ] Click "Deploy"
- [ ] Wait for deployment to finish (2-3 minutes)
- [ ] **COPY FRONTEND URL**: _________________________________

---

## 🔄 BACKEND UPDATE (CORS)

### Go to Backend Vercel Project

- [ ] Click on backend project in Vercel dashboard
- [ ] Go to **Settings** tab
- [ ] Click **Environment Variables**
- [ ] Click **Add New**
  - Name: `FRONTEND_URL`
  - Value: (paste your frontend URL from above)
- [ ] Click **Save**
- [ ] Go to **Deployments** tab
- [ ] Click **⋯** (three dots) on latest deployment
- [ ] Click **Redeploy**
- [ ] Wait for redeployment (1-2 minutes)

---

## 🧪 TESTING

### Backend Health Check

- [ ] Visit: `YOUR_BACKEND_URL/api/health`
- [ ] Should see: `{"status":"ok","timestamp":"...","environment":"production"}`

### Frontend Application

- [ ] Visit: `YOUR_FRONTEND_URL`
- [ ] Homepage loads ✅
- [ ] Image carousels work ✅
- [ ] Click "Sign Up" ✅
- [ ] Create account ✅
- [ ] Browse menu items ✅
- [ ] Click "View Details" on any item ✅
- [ ] Image gallery works (3-4 images per item) ✅
- [ ] Click navigation arrows ✅
- [ ] Add to cart ✅
- [ ] Go to checkout ✅
- [ ] Fill order form ✅
- [ ] Place order ✅
- [ ] Check email for confirmation ✅
- [ ] Email has food images ✅
- [ ] Check order history ✅

### Admin Testing

- [ ] Login with admin account
- [ ] View orders in admin dashboard ✅
- [ ] Update order status ✅

---

## 📱 OPTIONAL: Custom Domain

### If you have a domain:

- [ ] Frontend: Settings → Domains → Add domain
- [ ] Backend: Settings → Domains → Add API subdomain
- [ ] Update DNS records as instructed
- [ ] Update VITE_API_URL in frontend
- [ ] Redeploy frontend

---

## 🎊 FINAL CHECKLIST

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Both URLs saved somewhere safe
- [ ] All features tested and working
- [ ] Email notifications working
- [ ] SMS notifications working (optional)
- [ ] Admin panel accessible
- [ ] App is production-ready!

---

## 📝 MY DEPLOYMENT URLS

**Backend API**: _______________________________________________

**Frontend App**: ______________________________________________

**GitHub Repo**: https://github.com/Manpreet-byte/-food-ordering-app

**Deployment Date**: ___________________________________________

---

## 🎉 CONGRATULATIONS!

Your food ordering app is now live! 🚀

Share it with friends and family! 🎊

---

## 💡 Next Steps

- [ ] Share app URL with users
- [ ] Monitor Vercel dashboard for errors
- [ ] Check MongoDB Atlas for data
- [ ] Set up custom domain (optional)
- [ ] Add more menu items
- [ ] Customize branding
- [ ] Add payment gateway integration
- [ ] Mobile app version

---

**Need Help?**

Check:
1. Vercel deployment logs
2. Browser console (F12)
3. FINAL_DEPLOYMENT_GUIDE.md for detailed troubleshooting
4. MongoDB Atlas network access settings

**Good luck! 🍀**
