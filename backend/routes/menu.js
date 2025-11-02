const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const authMiddleware = require('../middleware/authMiddleware');

// CRUD routes, protected by admin auth middleware
router.post('/', authMiddleware, createAdminCheck, menuController.createMenuItem);
router.get('/', authMiddleware, menuController.getAllMenuItems);
router.put('/:id', authMiddleware, createAdminCheck, menuController.updateMenuItem);
router.delete('/:id', authMiddleware, createAdminCheck, menuController.deleteMenuItem);

module.exports = router;

// Helper function to check if user is admin
function createAdminCheck(req, res, next) {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
}
