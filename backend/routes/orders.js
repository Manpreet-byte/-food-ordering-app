const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

function adminCheck(req, res, next) {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
}

// User routes - MUST come before admin routes to avoid conflicts
router.post('/', authMiddleware, orderController.createOrder);
router.get('/my-orders', authMiddleware, orderController.getUserOrders);

// Admin routes to view and update all orders
router.get('/', authMiddleware, adminCheck, orderController.getAllOrders);
router.put('/:id', authMiddleware, adminCheck, orderController.updateOrderStatus);

module.exports = router;

