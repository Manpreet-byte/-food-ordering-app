# 🚀 Vercel Deployment Guide - Food Ordering App

## Overview
This guide will help you deploy both the **frontend** and **backend** of your Food Ordering App to Vercel.

---

## 📋 Prerequisites

1. **Vercel Account** - Sign up at https://vercel.com
2. **GitHub Account** - Create account at https://github.com
3. **MongoDB Atlas Account** - Sign up at https://www.mongodb.com/cloud/atlas
4. **Git installed** - Check with `git --version`

---

## Part 1: Set Up MongoDB Atlas (Cloud Database)

### Step 1: Create MongoDB Atlas Cluster

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up / Log in
3. Click **"Build a Database"**
4. Choose **FREE** tier (M0 Sandbox)
5. Select cloud provider (AWS recommended)
6. Choose region (closest to you)
7. Name your cluster (e.g., "food-ordering")
8. Click **"Create"**

### Step 2: Create Database User

1. Go to **Database Access** (left sidebar)
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Username: `foodapp-admin`
5. Password: Click **"Autogenerate Secure Password"** → **Copy it!**
6. Database User Privileges: **"Atlas Admin"**
7. Click **"Add User"**

### Step 3: Allow Network Access

1. Go to **Network Access** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for Vercel)
4. Click **"Confirm"**

### Step 4: Get Connection String

1. Go to **Database** (left sidebar)
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string (looks like):
   ```
   mongodb+srv://foodapp-admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual password
6. Add database name before `?`: `/food-ordering-app?`
   
   Final string:
   ```
   mongodb+srv://foodapp-admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/food-ordering-app?retryWrites=true&w=majority
   ```

---

## Part 2: Push Code to GitHub

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `food-ordering-app`
3. Description: "Full-stack food ordering application"
4. Choose **Public** or **Private**
5. **DO NOT** initialize with README
6. Click **"Create repository"**

### Step 2: Create .gitignore Files

Already created! Make sure these files exist:

**Backend .gitignore:**
```
node_modules/
.env
.env.local
.env.production
server.log
*.log
.DS_Store
```

**Frontend .gitignore:**
```
node_modules/
dist/
.env
.env.local
.env.production
.DS_Store
```

### Step 3: Initialize Git and Push

```bash
cd /home/sama/perplexity

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Food ordering app with backend and frontend"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/food-ordering-app.git

# Push to GitHub
git push -u origin main
```

If it asks for `master` instead of `main`:
```bash
git branch -M main
git push -u origin main
```

---

## Part 3: Deploy Backend to Vercel

### Step 1: Import Backend Project

1. Go to https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**
3. Click **"Import Git Repository"**
4. Select your `food-ordering-app` repository
5. Vercel detects it - click **"Import"**

### Step 2: Configure Backend Build Settings

1. **Framework Preset:** Other
2. **Root Directory:** Click **"Edit"** → Select `backend`
3. **Build Command:** Leave empty (not needed)
4. **Output Directory:** Leave empty
5. **Install Command:** `npm install`

### Step 3: Add Environment Variables

Click **"Environment Variables"** and add these:

| Name | Value |
|------|-------|
| `MONGO_URI` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | Generate random string (e.g., `openssl rand -hex 32`) |
| `PORT` | `5000` |
| `SMS_ENABLED` | `true` |
| `USE_TEXTBELT` | `true` |
| `EMAIL_ENABLED` | `true` |
| `EMAIL_HOST` | `smtp.gmail.com` |
| `EMAIL_PORT` | `587` |
| `EMAIL_SECURE` | `false` |
| `EMAIL_USER` | `manpreet24@navgurukul.org` |
| `EMAIL_PASSWORD` | `vipagravnkjphulu` (or your App Password) |
| `FRONTEND_URL` | `https://your-frontend-app.vercel.app` (add later) |

**Generate JWT Secret:**
```bash
openssl rand -hex 32
# Copy the output
```

### Step 4: Deploy Backend

1. Click **"Deploy"**
2. Wait 1-2 minutes for deployment
3. Once done, you'll get a URL like: `https://food-ordering-backend-xxx.vercel.app`
4. **Copy this URL!**

### Step 5: Test Backend

Visit:
```
https://your-backend-url.vercel.app/api/health
```

You should see:
```json
{
  "status": "healthy",
  "database": "connected"
}
```

---

## Part 4: Deploy Frontend to Vercel

### Step 1: Update Frontend Environment

1. Edit `frontend/.env.production`:
   ```env
   VITE_API_URL=https://your-backend-url.vercel.app
   ```
   Replace with your actual backend URL from Part 3!

2. Commit and push:
   ```bash
   git add frontend/.env.production
   git commit -m "Update production API URL"
   git push
   ```

### Step 2: Import Frontend Project

1. Go back to Vercel dashboard
2. Click **"Add New..."** → **"Project"**
3. Import the same repository again
4. This time for frontend

### Step 3: Configure Frontend Build Settings

1. **Framework Preset:** Vite
2. **Root Directory:** Click **"Edit"** → Select `frontend`
3. **Build Command:** `npm run build`
4. **Output Directory:** `dist`
5. **Install Command:** `npm install`

### Step 4: Add Frontend Environment Variables

Click **"Environment Variables"** and add:

| Name | Value |
|------|-------|
| `VITE_API_URL` | `https://your-backend-url.vercel.app` |

### Step 5: Deploy Frontend

1. Click **"Deploy"**
2. Wait 1-2 minutes
3. You'll get a URL like: `https://food-ordering-app-xxx.vercel.app`
4. **Copy this URL!**

### Step 6: Update Backend CORS

1. Go to your backend project on Vercel
2. Go to **Settings** → **Environment Variables**
3. Add/Update:
   - `FRONTEND_URL` = `https://your-frontend-url.vercel.app`
4. Go to **Deployments**
5. Click **"Redeploy"** on latest deployment

---

## Part 5: Seed Production Database

### Option 1: Via MongoDB Atlas Interface

1. Go to MongoDB Atlas dashboard
2. Click **"Browse Collections"**
3. Create collections manually: `users`, `menuitems`, `orders`
4. Add menu items via **"Insert Document"**

### Option 2: Via Backend API (Recommended)

Create a seed script or use the signup endpoint to create admin user, then add menu items via admin dashboard.

---

## Part 6: Test Your Live App! 🎉

1. **Visit your frontend URL:** `https://your-app.vercel.app`
2. **Sign up** for an account
3. **Browse menu** items
4. **Add to cart** and **place an order**
5. **Check email** for order confirmation!

---

## 🔧 Troubleshooting

### Backend not connecting to MongoDB
- Check MongoDB Atlas IP whitelist (should be 0.0.0.0/0)
- Verify connection string format
- Check username/password

### Frontend can't reach backend
- Check CORS configuration
- Verify `VITE_API_URL` is correct
- Check backend is deployed and healthy

### Environment variables not working
- Redeploy after adding new variables
- Variables must be added before deployment
- Check spelling and values

### Build fails
- Check Node.js version (16.x or higher)
- Verify all dependencies are in package.json
- Check build logs for errors

---

## 📝 Post-Deployment Checklist

- [ ] Backend deployed and healthy
- [ ] Frontend deployed and accessible
- [ ] MongoDB Atlas connected
- [ ] Environment variables configured
- [ ] CORS properly set
- [ ] Test signup/login
- [ ] Test menu display
- [ ] Test order placement
- [ ] Test email notifications
- [ ] Custom domain (optional)

---

## 🎨 Optional: Add Custom Domain

### For Frontend:
1. Go to frontend project on Vercel
2. Settings → Domains
3. Add your domain (e.g., `foodorder.com`)
4. Follow DNS configuration instructions

### For Backend:
1. Go to backend project on Vercel
2. Settings → Domains
3. Add subdomain (e.g., `api.foodorder.com`)
4. Update frontend `VITE_API_URL`

---

## 🔒 Security Best Practices

1. **Use strong JWT secret** (min 32 characters)
2. **Enable HTTPS only** (Vercel does this automatically)
3. **Restrict CORS** to your frontend domain
4. **Use MongoDB Atlas IP whitelist** (specific IPs if possible)
5. **Use Gmail App Passwords** not regular passwords
6. **Never commit .env files** to Git
7. **Rotate secrets** regularly

---

## 📊 Monitoring

### Vercel Dashboard:
- View deployment logs
- Monitor function execution
- Check analytics
- View error logs

### MongoDB Atlas:
- Monitor database performance
- Check connection logs
- View query patterns

---

## 🚀 Continuous Deployment

Every time you push to GitHub:
1. Vercel automatically detects changes
2. Builds and deploys new version
3. Zero downtime deployment

To deploy changes:
```bash
git add .
git commit -m "Your changes"
git push
```

---

## 💡 Tips

1. **Test locally first** before deploying
2. **Use environment-specific configs** (.env.development vs .env.production)
3. **Monitor logs** for errors
4. **Set up alerts** in Vercel for failures
5. **Keep dependencies updated**

---

## 🎉 Congratulations!

Your Food Ordering App is now live on Vercel! 🚀

**Share your app:**
- Frontend: `https://your-app.vercel.app`
- Backend API: `https://your-api.vercel.app`

---

## 📞 Need Help?

- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/
- GitHub Help: https://docs.github.com/

Good luck! 🍕🍔🍝
