const Order = require('../models/Order');
const User = require('../models/User');
const MenuItem = require('../models/MenuItem');
const { sendOrderConfirmation, sendOrderStatusUpdate } = require('../utils/smsService');
const { sendOrderConfirmationEmail, sendOrderStatusUpdateEmail } = require('../utils/emailService');

exports.createOrder = async (req, res) => {
  try {
    const { items, totalAmount, address, phone, email, paymentMethod, deliveryTime } = req.body;
    const userId = req.user.userId;

    const newOrder = new Order({
      user: userId,
      items,
      totalAmount,
      address: address || '',
      phone: phone || '',
      email: email || '',
      paymentMethod: paymentMethod || 'cash',
      deliveryTime: deliveryTime || 'asap',
      status: 'Pending',
      paymentConfirmed: false,
    });

    await newOrder.save();
    
    const user = await User.findById(userId);
    const orderIdShort = newOrder._id.toString().slice(-8).toUpperCase();
    
    // Send SMS confirmation
    if (phone) {
      await sendOrderConfirmation(phone, {
        orderId: orderIdShort,
        totalAmount: totalAmount.toFixed(2),
        deliveryTime: deliveryTime,
        customerName: user?.name || 'Customer'
      });
    }
    
    // Send Email confirmation
    if (email) {
      // Populate items for email
      const populatedOrder = await Order.findById(newOrder._id).populate('items.menuItem');
      const itemsForEmail = populatedOrder.items.map(item => ({
        name: item.menuItem.name,
        quantity: item.quantity,
        price: item.menuItem.price
      }));
      
      await sendOrderConfirmationEmail(email, {
        orderId: orderIdShort,
        customerName: user?.name || 'Customer',
        items: itemsForEmail,
        totalAmount: totalAmount.toFixed(2),
        address: address,
        phone: phone,
        deliveryTime: deliveryTime,
        paymentMethod: paymentMethod
      });
    }
    
    res.status(201).json(newOrder);
  } catch (err) {
    console.error('Order creation error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user.userId;
    const orders = await Order.find({ user: userId }).populate('items.menuItem').sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user').populate('items.menuItem').sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, paymentConfirmed } = req.body;

    const order = await Order.findById(id).populate('user');
    if (!order) return res.status(404).json({ message: 'Order not found' });

    const previousStatus = order.status;
    
    if (status) order.status = status;
    if (typeof paymentConfirmed === 'boolean') order.paymentConfirmed = paymentConfirmed;

    await order.save();
    
    const orderIdShort = order._id.toString().slice(-8).toUpperCase();
    
    // Send notifications when status changes to Preparing or Delivered
    if (status && status !== previousStatus) {
      if (status === 'Preparing' || status === 'Delivered') {
        // Send SMS notification
        if (order.phone) {
          await sendOrderStatusUpdate(order.phone, {
            orderId: orderIdShort,
            status: status
          });
        }
        
        // Send Email notification
        if (order.email) {
          await sendOrderStatusUpdateEmail(order.email, {
            orderId: orderIdShort,
            status: status,
            customerName: order.user?.name || 'Customer'
          });
        }
      }
    }
    
    res.json(order);
  } catch (err) {
    console.error('Order status update error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
