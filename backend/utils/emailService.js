// Email Service - Send order confirmation emails
require('dotenv').config();
const nodemailer = require('nodemailer');

// Create email transporter
let transporter = null;
const EMAIL_ENABLED = process.env.EMAIL_ENABLED === 'true';

if (EMAIL_ENABLED) {
  try {
    // Check if using custom SMTP settings
    if (process.env.EMAIL_HOST) {
      // Custom SMTP configuration
      transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT) || 587,
        secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        },
        tls: {
          rejectUnauthorized: false // Allow self-signed certificates
        }
      });
      console.log(`✅ Email service initialized (Custom SMTP: ${process.env.EMAIL_HOST})`);
    } else {
      // Use preset service (Gmail, Outlook, Yahoo, etc.)
      transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE || 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      });
      console.log(`✅ Email service initialized (${process.env.EMAIL_SERVICE || 'gmail'})`);
    }
  } catch (error) {
    console.error('❌ Email initialization failed:', error.message);
  }
}

/**
 * Send email
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} html - HTML content
 */
const sendEmail = async (to, subject, html) => {
  try {
    if (!EMAIL_ENABLED) {
      console.log('\n📧 ===== EMAIL NOTIFICATION (DISABLED) =====');
      console.log(`To: ${to}`);
      console.log(`Subject: ${subject}`);
      console.log('==========================================\n');
      return {
        success: true,
        to: to,
        subject: subject,
        provider: 'disabled'
      };
    }

    if (!transporter) {
      console.log('\n📧 ===== EMAIL NOTIFICATION (DEV MODE) =====');
      console.log(`To: ${to}`);
      console.log(`Subject: ${subject}`);
      console.log(`Content: ${html.substring(0, 100)}...`);
      console.log('⚠️  Email not configured - Add credentials to .env');
      console.log('============================================\n');
      return {
        success: false,
        to: to,
        error: 'Email not configured'
      };
    }

    // Send real email
    const info = await transporter.sendMail({
      from: `"Food Ordering App" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      html: html
    });

    console.log('\n✅ ===== EMAIL SENT SUCCESSFULLY =====');
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message ID: ${info.messageId}`);
    console.log('======================================\n');

    return {
      success: true,
      to: to,
      subject: subject,
      messageId: info.messageId,
      provider: process.env.EMAIL_SERVICE || 'gmail'
    };
  } catch (error) {
    console.error('\n❌ ===== EMAIL SENDING FAILED =====');
    console.error(`To: ${to}`);
    console.error(`Error: ${error.message}`);
    console.error('===================================\n');
    
    return {
      success: false,
      to: to,
      error: error.message
    };
  }
};

/**
 * Send order confirmation email
 */
const sendOrderConfirmationEmail = async (email, orderDetails) => {
  const { orderId, customerName, items, totalAmount, address, phone, deliveryTime, paymentMethod } = orderDetails;
  
  const deliveryTimeText = deliveryTime === 'asap' ? '30-45 minutes' : 
                           deliveryTime === '1hour' ? '1 hour' :
                           deliveryTime === '2hours' ? '2 hours' :
                           deliveryTime === 'evening' ? 'this evening (6-8 PM)' : '30-45 minutes';

  const itemsList = items.map(item => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">$${(item.price * item.quantity).toFixed(2)}</td>
    </tr>
  `).join('');

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #10b981; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
        .order-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .button { background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        table { width: 100%; border-collapse: collapse; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Order Confirmed!</h1>
        </div>
        <div class="content">
          <h2>Hi ${customerName}! 👋</h2>
          <p>Thank you for your order! We've received it and are getting it ready.</p>
          
          <div class="order-box">
            <h3>Order Details</h3>
            <p><strong>Order ID:</strong> #${orderId}</p>
            <p><strong>Estimated Delivery:</strong> ${deliveryTimeText}</p>
            <p><strong>Payment Method:</strong> ${paymentMethod === 'cash' ? 'Cash on Delivery' : paymentMethod.toUpperCase()}</p>
            
            <h4 style="margin-top: 20px;">Items Ordered:</h4>
            <table>
              <thead>
                <tr style="background: #f3f4f6;">
                  <th style="padding: 10px; text-align: left;">Item</th>
                  <th style="padding: 10px; text-align: center;">Quantity</th>
                  <th style="padding: 10px; text-align: right;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsList}
              </tbody>
              <tfoot>
                <tr style="font-weight: bold; background: #f3f4f6;">
                  <td colspan="2" style="padding: 15px;">Total</td>
                  <td style="padding: 15px; text-align: right; color: #10b981; font-size: 18px;">$${totalAmount}</td>
                </tr>
              </tfoot>
            </table>
            
            <h4 style="margin-top: 20px;">Delivery Information:</h4>
            <p><strong>Address:</strong> ${address}</p>
            <p><strong>Phone:</strong> ${phone}</p>
          </div>
          
          <p>We'll send you updates as your order progresses.</p>
          <p>If you have any questions, feel free to contact us!</p>
          
          <p style="margin-top: 30px;">Enjoy your meal! 🍕😋</p>
        </div>
        <div class="footer">
          <p>© 2025 Food Ordering App. All rights reserved.</p>
          <p>This is an automated email. Please do not reply.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail(email, `Order Confirmation - #${orderId}`, html);
};

/**
 * Send order status update email
 */
const sendOrderStatusUpdateEmail = async (email, statusDetails) => {
  const { orderId, status, customerName } = statusDetails;
  
  let statusMessage = '';
  let statusColor = '#10b981';
  
  switch (status) {
    case 'Preparing':
      statusMessage = 'Your order is now being prepared by our chef! 👨‍🍳';
      statusColor = '#3b82f6';
      break;
    case 'Delivered':
      statusMessage = 'Your order has been delivered! Enjoy your meal! 😋';
      statusColor = '#10b981';
      break;
    default:
      statusMessage = `Your order status has been updated to: ${status}`;
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: ${statusColor}; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
        .status-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); text-align: center; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Order Update</h1>
        </div>
        <div class="content">
          <h2>Hi ${customerName}! 👋</h2>
          
          <div class="status-box">
            <h3>Order #${orderId}</h3>
            <p style="font-size: 18px; color: ${statusColor}; font-weight: bold;">${statusMessage}</p>
          </div>
          
          <p>Track your order anytime by logging into your account.</p>
          <p>Thank you for choosing us!</p>
        </div>
        <div class="footer">
          <p>© 2025 Food Ordering App. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail(email, `Order Update - #${orderId}`, html);
};

module.exports = {
  sendEmail,
  sendOrderConfirmationEmail,
  sendOrderStatusUpdateEmail
};
