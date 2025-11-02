# 🍕 Food Ordering App

A full-stack MERN food ordering application with real-time SMS & email notifications, beautiful UI, and admin dashboard.

## ✨ Features

### Customer Features:
- 🏠 **Beautiful Homepage** with auto-scrolling image carousel
- 🍽️ **Browse Menu** - 7 categories (Pizza, Burger, Pasta, Salad, Dessert, Beverage, Asian)
- 🔍 **Search & Filter** - Find your favorite dishes easily
- 🛒 **Shopping Cart** - Add items with quantity controls
- 📦 **Order Tracking** - Real-time order status with timeline
- 📧 **Email Notifications** - Beautiful HTML email confirmations
- 📱 **SMS Alerts** - Order confirmations via TextBelt (free)
- 💳 **Multiple Payment Options** - Cash, Card, UPI
- ⏰ **Delivery Time Selection** - ASAP, 1hr, 2hrs, Evening
- 📜 **Order History** - View all past orders with details

### Admin Features:
- 📊 **Admin Dashboard** - Manage all orders
- ✏️ **Order Management** - Update order status (Pending → Preparing → Delivered)
- 👥 **Customer View** - See all customer information
- 📈 **Real-time Updates** - Automatic notifications on status changes

### Technical Features:
- 🔐 **JWT Authentication** - Secure login/signup
- 🎨 **Responsive Design** - Works on all devices
- ⚡ **Fast Performance** - React + Vite for optimal speed
- 🌈 **Modern UI** - Tailwind CSS with beautiful components
- 🔔 **Real Notifications** - SMS (TextBelt) + Email (Nodemailer)
- 🗄️ **MongoDB Database** - Scalable data storage

---

## 🚀 Tech Stack

### Frontend:
- **React 18** - UI Library
- **Vite** - Build tool
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **React Slick** - Carousels
- **Axios** - API calls
- **React Toastify** - Notifications

### Backend:
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Nodemailer** - Email service
- **TextBelt API** - SMS service
- **bcryptjs** - Password hashing

---

## 📦 Installation

### Prerequisites:
- Node.js 16+ installed
- MongoDB running locally or Atlas account
- Gmail account (for email notifications)

### Clone Repository:
\`\`\`bash
git clone https://github.com/YOUR_USERNAME/food-ordering-app.git
cd food-ordering-app
\`\`\`

### Backend Setup:
\`\`\`bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Edit .env with your credentials:
# - MongoDB URI
# - JWT Secret
# - Email credentials (Gmail App Password)
\`\`\`

### Frontend Setup:
\`\`\`bash
cd ../frontend
npm install

# Create .env file
cp .env.example .env

# Edit .env:
# VITE_API_URL=http://localhost:5000
\`\`\`

---

## 🎬 Running Locally

### Start Backend:
\`\`\`bash
cd backend
npm run dev
# Server runs on http://localhost:5000
\`\`\`

### Start Frontend:
\`\`\`bash
cd frontend
npm run dev
# App runs on http://localhost:3000
\`\`\`

### Open Browser:
Visit http://localhost:3000

---

## 🌐 Deployment to Vercel

See **[VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md)** for complete step-by-step instructions!

Quick steps:
1. Set up MongoDB Atlas
2. Push to GitHub
3. Deploy backend to Vercel
4. Deploy frontend to Vercel
5. Configure environment variables
6. Test live app!

---

## 📧 Email Configuration

See **[NAVGURUKUL_EMAIL_CONFIG.md](./NAVGURUKUL_EMAIL_CONFIG.md)** for email setup.

Quick setup:
1. Generate Gmail App Password
2. Update \`.env\`:
   \`\`\`env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-16-char-app-password
   \`\`\`
3. Restart backend

---

## 📱 SMS Configuration

Using **TextBelt** (FREE - no signup required):
- 1 free SMS per day per phone number
- Already configured in the app
- Automatically falls back to console logging

For production, upgrade to Twilio (paid).

---

## 🗂️ Project Structure

\`\`\`
food-ordering-app/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Business logic
│   ├── middleware/      # Auth middleware
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── utils/           # Email & SMS services
│   ├── server.js        # Entry point
│   ├── vercel.json      # Vercel config
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── context/     # State management
│   │   ├── pages/       # Page components
│   │   ├── App.jsx      # Main app
│   │   └── main.jsx     # Entry point
│   ├── vercel.json      # Vercel config
│   └── package.json
└── README.md
\`\`\`

---

## 🔑 Environment Variables

### Backend (.env):
\`\`\`env
MONGO_URI=mongodb://localhost:27017/food-ordering-app
JWT_SECRET=your_super_secret_key
PORT=5000
SMS_ENABLED=true
USE_TEXTBELT=true
EMAIL_ENABLED=true
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
FRONTEND_URL=http://localhost:3000
\`\`\`

### Frontend (.env):
\`\`\`env
VITE_API_URL=http://localhost:5000
\`\`\`

---

## 🎯 API Endpoints

### Authentication:
- \`POST /api/auth/signup\` - Register new user
- \`POST /api/auth/login\` - Login user

### Menu:
- \`GET /api/menu\` - Get all menu items
- \`POST /api/menu\` - Add menu item (admin)

### Orders:
- \`POST /api/orders\` - Create new order
- \`GET /api/orders\` - Get user orders
- \`GET /api/orders/all\` - Get all orders (admin)
- \`PUT /api/orders/:id/status\` - Update order status (admin)

### Health:
- \`GET /\` - API status
- \`GET /api/health\` - Health check

---

## 👥 Default Users

After deployment, create users via signup. First user can be made admin manually in database.

---

## 📸 Screenshots

### Homepage:
- Hero carousel with 15 food images
- 7 category carousels
- Feature highlights

### Menu Page:
- Search & filter
- Sort options
- Add to cart

### Checkout:
- Cart summary
- Delivery details
- Payment options

### Order History:
- Status timeline
- Order details
- Time tracking

### Admin Dashboard:
- All orders view
- Status management
- Customer information

---

## 🐛 Known Issues & Solutions

### MongoDB Warnings:
- \`useNewUrlParser\` and \`useUnifiedTopology\` warnings are safe to ignore
- Already removed from production code

### Tailwind CSS Warnings:
- CSS linter warnings about @tailwind are normal
- Already configured to suppress in VS Code

### Email Not Sending:
- Use Gmail App Password, not regular password
- Enable 2-Step Verification first
- Check spam folder

---

## 🔮 Future Enhancements

- [ ] Payment gateway integration (Stripe/Razorpay)
- [ ] Real-time order tracking with websockets
- [ ] Customer ratings & reviews
- [ ] Restaurant menu item ratings
- [ ] Coupon/discount system
- [ ] Multiple restaurant support
- [ ] Advanced admin analytics
- [ ] Push notifications
- [ ] Mobile app (React Native)

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit changes (\`git commit -m 'Add AmazingFeature'\`)
4. Push to branch (\`git push origin feature/AmazingFeature\`)
5. Open Pull Request

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- [Unsplash](https://unsplash.com) - Beautiful food images
- [TextBelt](https://textbelt.com) - Free SMS service
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Cloud database
- [Vercel](https://vercel.com) - Hosting platform

---

## 📞 Support

For support, email your.email@example.com or create an issue in this repository.

---

**⭐ Star this repo if you find it helpful!**

Made with ❤️ and ☕
