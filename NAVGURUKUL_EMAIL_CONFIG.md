# 📧 NavGurukul Email Configuration - Complete Guide

## ✅ **Already Configured!**

Your email is now set up with these settings:

```env
EMAIL_ENABLED=true
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=manpreet24@navgurukul.org
EMAIL_PASSWORD=vipagravnkjphulu
```

**Server Status:** ✅ Email service initialized (Custom SMTP: smtp.gmail.com)

---

## 🔑 **IMPORTANT: App Password Required!**

The password `vipagravnkjphulu` needs to be a **Gmail App Password**, not your regular password.

### **How to Generate Gmail App Password:**

1. **Visit Google Account Security:**
   ```
   https://myaccount.google.com/security
   ```
   Sign in with: `manpreet24@navgurukul.org`

2. **Enable 2-Step Verification** (Required):
   - Find "2-Step Verification"
   - Click and complete setup
   - This MUST be enabled first

3. **Generate App Password:**
   ```
   https://myaccount.google.com/apppasswords
   ```
   - Select App: **Mail**
   - Select Device: **Other (Custom)** → "Food App"
   - Click **Generate**
   - Copy the **16-character password** (example: `abcd efgh ijkl mnop`)

4. **Update .env file:**
   ```bash
   nano /home/sama/perplexity/backend/.env
   ```
   
   Change:
   ```env
   EMAIL_PASSWORD=vipagravnkjphulu
   ```
   
   To (remove spaces):
   ```env
   EMAIL_PASSWORD=abcdefghijklmnop
   ```

5. **Restart Backend:**
   ```bash
   cd /home/sama/perplexity/backend
   pkill -f "node.*server.js"
   nohup node server.js > server.log 2>&1 &
   ```

---

## 🧪 **Test Email Sending**

1. **Open your app:** http://localhost:3000
2. **Login/Signup**
3. **Add items to cart**
4. **Go to checkout**
5. **Enter recipient email** (where you want to receive the test)
6. **Place order**
7. **Check inbox!** (might be in Spam folder)

---

## 📋 **Check Email Logs:**

```bash
# View real-time logs
tail -f /home/sama/perplexity/backend/server.log

# Filter email logs
grep -i email /home/sama/perplexity/backend/server.log
```

**Success looks like:**
```
✅ ===== EMAIL SENT SUCCESSFULLY =====
To: customer@example.com
Subject: Order Confirmation - #12345
Message ID: <abc@gmail.com>
======================================
```

**Failure looks like:**
```
❌ ===== EMAIL SENDING FAILED =====
To: customer@example.com
Error: Invalid login
===================================
```

---

## ⚠️ **Common Issues & Solutions**

| Problem | Solution |
|---------|----------|
| "Invalid login" | Use App Password, not regular password |
| "Authentication failed" | Enable 2-Step Verification first |
| Email in Spam folder | Normal for testing, mark as "Not Spam" |
| Connection timeout | Check internet, try port 465 instead |
| Not receiving emails | Verify App Password, check Spam folder |

---

## 🔧 **Alternative Port (if 587 doesn't work):**

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_USER=manpreet24@navgurukul.org
EMAIL_PASSWORD=your-app-password
```

Then restart:
```bash
pkill -f "node.*server.js"
cd /home/sama/perplexity/backend && nohup node server.js > server.log 2>&1 &
```

---

## ✅ **Current Setup Summary:**

- ✅ Custom SMTP configured
- ✅ NavGurukul email address set
- ✅ Backend server running
- ✅ Email service initialized
- ⚠️ **Action needed:** Verify you're using a Gmail App Password

**Once you confirm you have the correct App Password, real emails will be sent!** 📧🎉
