# 🚀 Vercel Deployment Guide - FINAL VERSION

## ✅ Pre-Deployment Checklist

- [x] Code committed to Git
- [x] Code pushed to GitHub: https://github.com/Manpreet-byte/-food-ordering-app
- [x] MongoDB Atlas credentials ready
- [x] JWT secret generated
- [x] Email credentials configured
- [x] All features tested locally

---

## 📋 DEPLOYMENT CREDENTIALS

### MongoDB Atlas
- **Connection String**: `mongodb+srv://manpreet25:Manpreet098@cluster0.hm6o1n7.mongodb.net/food-ordering-app?retryWrites=true&w=majority&appName=Cluster0`
- **Username**: manpreet25
- **Password**: Manpreet098
- **Database**: food-ordering-app

### JWT Secret
```
3d7026843ee94783f4816e79cf02c2dc32cb02fe44f3a828f4af02028c819a6e
```

### Email Configuration
- **Host**: smtp.gmail.com
- **Port**: 587
- **User**: manpreet24@navgurukul.org
- **Password**: vipagravnkjphulu
- **Secure**: false

---

## 🎯 STEP-BY-STEP DEPLOYMENT

### STEP 1: Deploy Backend to Vercel

1. **Go to Vercel**: https://vercel.com
2. **Sign in** with GitHub
3. **Import Project** → Select `Manpreet-byte/-food-ordering-app`
4. **Configure Project**:
   - **Project Name**: `food-ordering-backend` (or your choice)
   - **Framework Preset**: Other
   - **Root Directory**: `backend` ⚠️ **IMPORTANT!**
   - **Build Command**: Leave empty
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

5. **Add Environment Variables** (Click "Environment Variables"):

   ```bash
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

6. **Deploy** → Wait for deployment to complete
7. **Copy Backend URL** (e.g., `https://food-ordering-backend.vercel.app`)

---

### STEP 2: Update Frontend Environment Variable

1. **Open your terminal** in the frontend folder
2. **Create/Update** `.env.production` file:

```bash
VITE_API_URL=https://your-backend-url.vercel.app/api
```

Replace `your-backend-url` with your actual backend URL from Step 1.

3. **Commit and Push**:

```bash
git add frontend/.env.production
git commit -m "Update production API URL"
git push origin main
```

---

### STEP 3: Deploy Frontend to Vercel

1. **Go to Vercel Dashboard** → **Add New Project**
2. **Import Same Repository**: `Manpreet-byte/-food-ordering-app`
3. **Configure Project**:
   - **Project Name**: `food-ordering-frontend` (or your choice)
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend` ⚠️ **IMPORTANT!**
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Add Environment Variable**:

   ```bash
   VITE_API_URL=https://your-backend-url.vercel.app/api
   ```
   
   Replace with your actual backend URL from Step 1.

5. **Deploy** → Wait for deployment to complete
6. **Copy Frontend URL** (e.g., `https://food-ordering-frontend.vercel.app`)

---

### STEP 4: Update Backend CORS

1. **Go to Backend Vercel Project** → **Settings** → **Environment Variables**
2. **Add New Variable**:

   ```bash
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```
   
   Replace with your actual frontend URL from Step 3.

3. **Redeploy Backend**:
   - Go to **Deployments** tab
   - Click **⋯** on the latest deployment
   - Click **Redeploy**

---

## 🧪 TESTING YOUR DEPLOYMENT

### Backend Health Check
Visit: `https://your-backend-url.vercel.app/api/health`

You should see:
```json
{
  "status": "ok",
  "timestamp": "...",
  "environment": "production"
}
```

### Frontend Application
Visit: `https://your-frontend-url.vercel.app`

Test flow:
1. ✅ Homepage loads with image carousels
2. ✅ Sign up for new account
3. ✅ Browse menu items
4. ✅ Click "View Details" → See image gallery
5. ✅ Add items to cart
6. ✅ Go to checkout
7. ✅ Place order
8. ✅ Check email for confirmation (with food images!)
9. ✅ Check order history
10. ✅ Admin login and view orders

---

## 🔧 TROUBLESHOOTING

### Backend Issues

**Problem**: 500 Internal Server Error
- **Solution**: Check Vercel logs → Functions → View logs
- Verify MongoDB connection string is correct
- Ensure all environment variables are set

**Problem**: CORS Error
- **Solution**: Make sure FRONTEND_URL is set in backend
- Redeploy backend after adding FRONTEND_URL

### Frontend Issues

**Problem**: API calls failing
- **Solution**: Check VITE_API_URL is correct
- Verify backend is deployed and accessible
- Check browser console for exact error

**Problem**: Build failed
- **Solution**: Make sure Root Directory is set to `frontend`
- Check that all dependencies are in package.json

---

## 📱 CUSTOM DOMAIN (Optional)

### For Frontend:
1. Go to Frontend Project → **Settings** → **Domains**
2. Add your domain (e.g., `foodorder.yourdomain.com`)
3. Update DNS records as instructed

### For Backend:
1. Go to Backend Project → **Settings** → **Domains**
2. Add your API domain (e.g., `api.yourdomain.com`)
3. Update VITE_API_URL in frontend with new domain
4. Redeploy frontend

---

## 🎉 SUCCESS CHECKLIST

After deployment, verify:

- [ ] Backend deployed successfully
- [ ] Backend health check returns 200 OK
- [ ] Frontend deployed successfully
- [ ] Frontend loads without errors
- [ ] User signup/login works
- [ ] Menu items display with images
- [ ] Image galleries work in modal
- [ ] Cart functionality works
- [ ] Checkout process completes
- [ ] Email confirmation sent (check spam folder)
- [ ] SMS notification sent (if applicable)
- [ ] Admin dashboard accessible
- [ ] Orders appear in admin panel

---

## 📞 SUPPORT

If you encounter issues:

1. Check Vercel deployment logs
2. Check browser console (F12)
3. Verify all environment variables
4. Check MongoDB Atlas network access (allow all IPs: 0.0.0.0/0)
5. Ensure email credentials have "Less secure app access" enabled or use App Password

---

## 🎊 YOUR DEPLOYED URLS

**Backend API**: `https://__________.vercel.app`

**Frontend App**: `https://__________.vercel.app`

**GitHub Repo**: https://github.com/Manpreet-byte/-food-ordering-app

---

**Deployment Date**: November 2, 2025
**Status**: Ready for Production ✅
