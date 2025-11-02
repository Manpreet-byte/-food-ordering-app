# ✅ Pre-Deployment Checklist

## Before You Deploy

### 1. Project Files Ready ✅
- [x] Backend vercel.json created
- [x] Frontend vercel.json created
- [x] .gitignore files created (backend, frontend, root)
- [x] CORS configured for production
- [x] Health check endpoints added
- [x] MongoDB deprecated options removed
- [x] Environment variable templates ready

### 2. Documentation ✅
- [x] VERCEL_DEPLOYMENT_GUIDE.md - Complete deployment guide
- [x] README.md - Project overview and setup
- [x] NAVGURUKUL_EMAIL_CONFIG.md - Email configuration guide
- [x] EMAIL_REAL_SETUP.md - Email setup instructions

### 3. Code Quality ✅
- [x] No syntax errors
- [x] All dependencies listed in package.json
- [x] Environment variables using process.env
- [x] Sensitive data not hardcoded

---

## Deployment Steps (Do These Now)

### Step 1: Set Up MongoDB Atlas
- [ ] Create MongoDB Atlas account
- [ ] Create free cluster (M0)
- [ ] Create database user
- [ ] Whitelist all IPs (0.0.0.0/0)
- [ ] Get connection string
- [ ] Test connection

### Step 2: Create GitHub Repository
- [ ] Create new repository on GitHub
- [ ] Initialize git locally
- [ ] Commit all files
- [ ] Push to GitHub

### Step 3: Deploy Backend
- [ ] Import project to Vercel
- [ ] Select backend folder as root
- [ ] Add environment variables:
  - [ ] MONGO_URI
  - [ ] JWT_SECRET
  - [ ] EMAIL_HOST
  - [ ] EMAIL_PORT
  - [ ] EMAIL_SECURE
  - [ ] EMAIL_USER
  - [ ] EMAIL_PASSWORD
  - [ ] SMS_ENABLED
  - [ ] USE_TEXTBELT
  - [ ] EMAIL_ENABLED
- [ ] Deploy
- [ ] Copy backend URL
- [ ] Test: https://your-backend.vercel.app/api/health

### Step 4: Deploy Frontend
- [ ] Update frontend/.env.production with backend URL
- [ ] Commit and push changes
- [ ] Import project to Vercel (same repo)
- [ ] Select frontend folder as root
- [ ] Add environment variable: VITE_API_URL
- [ ] Deploy
- [ ] Copy frontend URL

### Step 5: Update Backend CORS
- [ ] Add FRONTEND_URL environment variable to backend
- [ ] Redeploy backend

### Step 6: Test Live App
- [ ] Visit frontend URL
- [ ] Sign up for account
- [ ] Browse menu
- [ ] Add items to cart
- [ ] Place order
- [ ] Check email for confirmation
- [ ] Test admin dashboard (if admin user)

---

## Environment Variables Summary

### Backend (Vercel):
\`\`\`
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/food-ordering-app?retryWrites=true&w=majority
JWT_SECRET=<generate with: openssl rand -hex 32>
PORT=5000
SMS_ENABLED=true
USE_TEXTBELT=true
EMAIL_ENABLED=true
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=manpreet24@navgurukul.org
EMAIL_PASSWORD=vipagravnkjphulu
FRONTEND_URL=https://your-frontend.vercel.app
\`\`\`

### Frontend (Vercel):
\`\`\`
VITE_API_URL=https://your-backend.vercel.app
\`\`\`

---

## Quick Commands

### Generate JWT Secret:
\`\`\`bash
openssl rand -hex 32
\`\`\`

### Initialize Git:
\`\`\`bash
cd /home/sama/perplexity
git init
git add .
git commit -m "Initial commit: Food ordering app"
git remote add origin https://github.com/YOUR_USERNAME/food-ordering-app.git
git push -u origin main
\`\`\`

### Test Local Build:
\`\`\`bash
# Backend
cd backend
npm install
npm start

# Frontend
cd ../frontend
npm install
npm run build
npm run preview
\`\`\`

---

## Troubleshooting Quick Fixes

### Backend won't deploy:
- Check vercel.json is in backend folder
- Verify all dependencies in package.json
- Check environment variables are set

### Frontend won't build:
- Run `npm run build` locally to test
- Check for TypeScript errors
- Verify VITE_API_URL is set

### Database connection fails:
- Check MongoDB Atlas IP whitelist
- Verify connection string format
- Ensure password doesn't have special characters (URL encode if needed)

### CORS errors:
- Add FRONTEND_URL to backend env vars
- Redeploy backend after adding variable
- Check frontend URL is exactly correct (no trailing slash)

---

## Success Indicators

✅ Backend deployed: https://your-backend.vercel.app
✅ Backend health check: Returns {"status":"healthy","database":"connected"}
✅ Frontend deployed: https://your-frontend.vercel.app  
✅ Frontend loads: Shows homepage with carousels
✅ Can signup/login: No CORS errors
✅ Can browse menu: Items display correctly
✅ Can place order: Order goes through
✅ Email received: Check inbox/spam
✅ Admin dashboard works: Can update order status

---

## Post-Deployment

### Monitor:
- Check Vercel dashboard for errors
- Monitor MongoDB Atlas for connections
- Test email notifications
- Test SMS notifications (1 free per day)

### Share:
- Share frontend URL with users
- Document API endpoints
- Create user guide if needed

### Maintain:
- Update dependencies regularly
- Monitor logs for errors
- Back up database
- Rotate secrets periodically

---

## 🎉 Ready to Deploy!

Everything is configured and ready. Just follow the steps in:
**VERCEL_DEPLOYMENT_GUIDE.md**

Good luck! 🚀
