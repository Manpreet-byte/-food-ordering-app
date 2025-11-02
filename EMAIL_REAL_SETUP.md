# 📧 Real Email Setup Guide

## Why Emails Aren't Working

Your `.env` file has **placeholder credentials**:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

These need to be **replaced with real credentials** for emails to actually send.

---

## ✅ OPTION 1: Gmail (FREE & Easy - Recommended)

### Step 1: Enable Gmail App Passwords

1. **Go to your Google Account:**
   - Visit: https://myaccount.google.com/security

2. **Enable 2-Step Verification:**
   - Scroll to "How you sign in to Google"
   - Click "2-Step Verification"
   - Follow the setup process

3. **Generate App Password:**
   - Go to: https://myaccount.google.com/apppasswords
   - OR search "App passwords" in your Google account settings
   - Select app: **Mail**
   - Select device: **Other (Custom name)** → Type "Food App"
   - Click **Generate**
   - Copy the **16-character password** (e.g., `abcd efgh ijkl mnop`)

### Step 2: Update Backend .env File

Edit `/home/sama/perplexity/backend/.env`:

```env
# Email Configuration
EMAIL_ENABLED=true
EMAIL_SERVICE=gmail
EMAIL_USER=your-actual-email@gmail.com
EMAIL_PASSWORD=abcdefghijklmnop  # Your 16-char app password (no spaces)
```

**Example:**
```env
EMAIL_USER=john.doe@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop
```

### Step 3: Restart Backend Server

```bash
cd /home/sama/perplexity/backend
pkill -f "node.*server.js"
nohup node server.js > server.log 2>&1 &
```

### Step 4: Test

Place an order and check:
- ✅ Console should show: "✅ EMAIL SENT SUCCESSFULLY"
- ✅ Check the recipient's inbox (it should receive a real email!)

---

## ✅ OPTION 2: Other Email Providers

### Using Outlook/Hotmail

```env
EMAIL_SERVICE=hotmail
EMAIL_USER=your-email@outlook.com
EMAIL_PASSWORD=your-password
```

### Using Yahoo Mail

```env
EMAIL_SERVICE=yahoo
EMAIL_USER=your-email@yahoo.com
EMAIL_PASSWORD=your-app-password  # Generate from Yahoo account settings
```

### Using Custom SMTP

```env
EMAIL_SERVICE=smtp
EMAIL_HOST=smtp.yourprovider.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@domain.com
EMAIL_PASSWORD=your-password
```

---

## 🔍 Troubleshooting

### "Invalid login" error
- ✅ Make sure you're using an **App Password**, not your regular Gmail password
- ✅ Remove any spaces from the app password
- ✅ Enable 2-Step Verification first

### "Connection timeout" error
- ✅ Check your internet connection
- ✅ Some networks block SMTP ports - try a different network

### Emails going to Spam
- ✅ This is normal for development
- ✅ Check the spam/junk folder
- ✅ Mark as "Not Spam" to receive future emails in inbox

### Still not working?
1. Check backend logs: `tail -f /home/sama/perplexity/backend/server.log`
2. Look for error messages in the console
3. Verify EMAIL_ENABLED=true in .env
4. Make sure you restarted the backend after changing .env

---

## 📝 Security Tips

1. **Never commit .env to Git** - It's already in .gitignore
2. **Use App Passwords** instead of your main password
3. **Revoke App Passwords** if you stop using the app
4. **Different passwords** for development and production

---

## 🎯 Current Status

- ✅ Email service code: **Ready**
- ✅ HTML templates: **Professional and beautiful**
- ❌ Email credentials: **Need to be configured**

**Just add your Gmail credentials to `.env` and restart the backend!**

---

## 🚀 Quick Setup (30 seconds)

```bash
# 1. Generate Gmail App Password (follow steps above)

# 2. Edit .env file
nano /home/sama/perplexity/backend/.env

# 3. Replace these two lines:
#    EMAIL_USER=your-actual-email@gmail.com
#    EMAIL_PASSWORD=your-16-char-app-password

# 4. Restart backend
cd /home/sama/perplexity/backend
pkill -f "node.*server.js"
nohup node server.js > server.log 2>&1 &

# 5. Test by placing an order!
```

**That's it! Real emails will now be sent!** 📧✨
