# 🚀 Quick Deployment Guide - Let's Deploy Your App!

## ✅ Step 1: Push to GitHub (5 minutes)

### 1.1 Create GitHub Repository

1. Go to: **https://github.com/new**
2. **Repository name:** `food-ordering-app`
3. **Description:** "Full-stack MERN food ordering app with SMS & Email notifications"
4. Choose **Public** or **Private**
5. **DO NOT** check "Add README" or any other files
6. Click **"Create repository"**

### 1.2 Push Your Code

GitHub will show you commands. Use these instead:

\`\`\`bash
cd /home/sama/perplexity

# Add your GitHub repository (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/food-ordering-app.git

# Push to GitHub
git push -u origin main
\`\`\`

**If it asks for credentials:**
- Username: Your GitHub username
- Password: Use a **Personal Access Token** (not your password)
  - Generate at: https://github.com/settings/tokens
  - Select: repo (full control)

---

## ✅ Step 2: Create MongoDB Atlas (10 minutes)

### 2.1 Sign Up for MongoDB Atlas

1. Go to: **https://www.mongodb.com/cloud/atlas**
2. Click **"Try Free"** or **"Sign Up"**
3. Sign up with Google or email
4. Fill in basic information

### 2.2 Create Cluster

1. Choose **FREE** tier (M0 Sandbox) - $0/month
2. Cloud Provider: **AWS** (recommended)
3. Region: Choose closest to you
4. Cluster Name: `food-ordering` (or leave default)
5. Click **"Create"** (takes 1-3 minutes)

### 2.3 Create Database User

1. Click **"Database Access"** (left sidebar)
2. Click **"+ ADD NEW DATABASE USER"**
3. **Authentication Method:** Password
4. **Username:** `foodapp-user`
5. **Password:** Click **"Autogenerate Secure Password"**
   - **IMPORTANT:** Click the **COPY** button! Save this password!
6. **Database User Privileges:** Atlas Admin
7. Click **"Add User"**

### 2.4 Allow Network Access

1. Click **"Network Access"** (left sidebar)
2. Click **"+ ADD IP ADDRESS"**
3. Click **"ALLOW ACCESS FROM ANYWHERE"**
   - This adds `0.0.0.0/0` (needed for Vercel)
4. Click **"Confirm"**

### 2.5 Get Connection String

1. Click **"Database"** (left sidebar)
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**
4. **Driver:** Node.js
5. **Version:** 5.5 or later
6. **Copy the connection string** - looks like:
   \`\`\`
   mongodb+srv://foodapp-user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   \`\`\`

7. **IMPORTANT:** Replace `<password>` with your actual password (from step 2.3)
8. **IMPORTANT:** Add database name before the `?`:
   \`\`\`
   mongodb+srv://foodapp-user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/food-ordering-app?retryWrites=true&w=majority
   \`\`\`

**Save this connection string! You'll need it for Vercel!**

---

## ✅ Step 3: Deploy Backend to Vercel (7 minutes)

### 3.1 Sign Up for Vercel

1. Go to: **https://vercel.com/signup**
2. Click **"Continue with GitHub"**
3. Authorize Vercel to access your GitHub

### 3.2 Import Backend Project

1. Click **"Add New..."** → **"Project"**
2. Find and select your `food-ordering-app` repository
3. Click **"Import"**

### 3.3 Configure Backend Settings

**IMPORTANT:** Configure these settings:

1. **Framework Preset:** Other
2. **Root Directory:** Click **"Edit"** → Select **`backend`**
3. **Build Command:** (leave empty)
4. **Output Directory:** (leave empty)
5. **Install Command:** `npm install`

### 3.4 Add Environment Variables

Click **"Environment Variables"** and add ALL of these:

| Name | Value |
|------|-------|
| `MONGO_URI` | Your MongoDB Atlas connection string (from Step 2.5) |
| `JWT_SECRET` | Run in terminal: `openssl rand -hex 32` and paste result |
| `PORT` | `5000` |
| `SMS_ENABLED` | `true` |
| `USE_TEXTBELT` | `true` |
| `EMAIL_ENABLED` | `true` |
| `EMAIL_HOST` | `smtp.gmail.com` |
| `EMAIL_PORT` | `587` |
| `EMAIL_SECURE` | `false` |
| `EMAIL_USER` | `manpreet24@navgurukul.org` |
| `EMAIL_PASSWORD` | `vipagravnkjphulu` |
| `FRONTEND_URL` | Leave empty for now (add later) |

**To generate JWT_SECRET:**
\`\`\`bash
openssl rand -hex 32
# Copy the output and paste as JWT_SECRET value
\`\`\`

### 3.5 Deploy!

1. Click **"Deploy"**
2. Wait 1-3 minutes
3. You'll see "Congratulations!" when done
4. **Copy your backend URL** - looks like:
   \`\`\`
   https://food-ordering-backend-xxx.vercel.app
   \`\`\`

### 3.6 Test Backend

Visit: `https://your-backend-url.vercel.app/api/health`

You should see:
\`\`\`json
{"status":"healthy","database":"connected"}
\`\`\`

✅ **Backend is deployed!**

---

## ✅ Step 4: Deploy Frontend to Vercel (5 minutes)

### 4.1 Update Frontend Environment

First, update the production environment file locally:

\`\`\`bash
cd /home/sama/perplexity

# Edit frontend/.env.production
nano frontend/.env.production
\`\`\`

Change to:
\`\`\`
VITE_API_URL=https://your-actual-backend-url.vercel.app
\`\`\`

Save and commit:
\`\`\`bash
git add frontend/.env.production
git commit -m "Update production API URL"
git push
\`\`\`

### 4.2 Import Frontend Project

1. Go back to Vercel dashboard
2. Click **"Add New..."** → **"Project"**
3. Select **SAME** repository again (`food-ordering-app`)
4. Click **"Import"**

### 4.3 Configure Frontend Settings

**IMPORTANT:** Configure these settings:

1. **Framework Preset:** Vite (should auto-detect)
2. **Root Directory:** Click **"Edit"** → Select **`frontend`**
3. **Build Command:** `npm run build`
4. **Output Directory:** `dist`
5. **Install Command:** `npm install`

### 4.4 Add Frontend Environment Variable

Click **"Environment Variables"** and add:

| Name | Value |
|------|-------|
| `VITE_API_URL` | Your backend URL (from Step 3.5) |

Example: `https://food-ordering-backend-xxx.vercel.app`

### 4.5 Deploy!

1. Click **"Deploy"**
2. Wait 1-3 minutes
3. **Copy your frontend URL** - looks like:
   \`\`\`
   https://food-ordering-app-xxx.vercel.app
   \`\`\`

---

## ✅ Step 5: Update Backend CORS (2 minutes)

### 5.1 Add Frontend URL to Backend

1. Go to your **backend** project on Vercel
2. Click **"Settings"** → **"Environment Variables"**
3. Find `FRONTEND_URL` (or add it)
4. Set value to your frontend URL:
   \`\`\`
   https://food-ordering-app-xxx.vercel.app
   \`\`\`
5. Click **"Save"**

### 5.2 Redeploy Backend

1. Click **"Deployments"** tab
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**
4. Wait 1-2 minutes

---

## ✅ Step 6: Test Your Live App! 🎉

### 6.1 Open Your App

Visit your frontend URL: `https://your-app.vercel.app`

### 6.2 Test Complete Flow

1. **Sign up** for a new account
2. **Browse menu** items
3. **Add items to cart**
4. **Go to checkout**
5. **Enter your email** (real email to test)
6. **Place order**
7. **Check your email inbox!**
8. **Login as admin** (if you have admin user)
9. **Test order management**

---

## 🎯 Quick Command Reference

### Generate JWT Secret:
\`\`\`bash
openssl rand -hex 32
\`\`\`

### Push code to GitHub:
\`\`\`bash
cd /home/sama/perplexity
git add .
git commit -m "Update"
git push
\`\`\`

### Check deployment status:
- Backend: Visit `https://your-backend.vercel.app/api/health`
- Frontend: Visit `https://your-frontend.vercel.app`

---

## ✅ Deployment Checklist

- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] Network access configured (0.0.0.0/0)
- [ ] Connection string obtained
- [ ] Backend deployed to Vercel
- [ ] All backend env vars added
- [ ] Backend health check passes
- [ ] Frontend .env.production updated
- [ ] Frontend deployed to Vercel
- [ ] Frontend env var added (VITE_API_URL)
- [ ] Backend CORS updated (FRONTEND_URL)
- [ ] Backend redeployed
- [ ] Full app tested (signup → order → email)

---

## 🆘 Troubleshooting

### "Database connection failed"
- Check MongoDB Atlas IP whitelist is 0.0.0.0/0
- Verify connection string format
- Check username/password are correct

### "CORS error" on frontend
- Make sure FRONTEND_URL is set in backend
- Redeploy backend after setting FRONTEND_URL
- Check URL has no trailing slash

### "Build failed"
- Check all dependencies in package.json
- Verify root directory is set correctly
- Check build logs for specific error

### Email not sending
- Make sure EMAIL_PASSWORD is your Gmail App Password
- Enable 2-Step Verification on Google Account
- Generate new App Password if needed

---

## 🎉 You're Done!

Your app is now live at:
- **Frontend:** https://your-app.vercel.app
- **Backend:** https://your-backend.vercel.app

**Share it with the world!** 🚀

---

## 📊 What You Get (Free Tier)

- **Vercel:** Unlimited bandwidth, auto-scaling
- **MongoDB Atlas:** 512 MB storage, shared cluster
- **TextBelt SMS:** 1 free SMS per day per number
- **Email:** Unlimited via Gmail SMTP

All **FREE** for hobby projects! 💯
