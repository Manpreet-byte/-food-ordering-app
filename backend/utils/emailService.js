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
      <td style="padding: 15px; border-bottom: 1px solid #eee;">
        <div style="display: flex; align-items: center; gap: 15px;">
          <img src="${item.image || item.imageUrl || 'https://via.placeholder.com/80x80?text=Food'}" 
               alt="${item.name}" 
               style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);" />
          <div>
            <strong style="display: block; font-size: 16px; color: #1f2937;">${item.name}</strong>
            <span style="color: #6b7280; font-size: 14px;">₹${item.price.toFixed(2)} each</span>
            ${item.category ? `<br/><span style="display: inline-block; margin-top: 4px; padding: 2px 8px; background: #fef3c7; color: #92400e; font-size: 11px; border-radius: 12px;">${item.category}</span>` : ''}
          </div>
        </div>
      </td>
      <td style="padding: 15px; border-bottom: 1px solid #eee; text-align: center; font-weight: bold; color: #4b5563;">
        ×${item.quantity}
      </td>
      <td style="padding: 15px; border-bottom: 1px solid #eee; text-align: right; font-weight: bold; color: #059669; font-size: 16px;">
        ₹${(item.price * item.quantity).toFixed(2)}
      </td>
    </tr>
  `).join('');

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
          line-height: 1.6; 
          color: #333; 
          margin: 0;
          padding: 0;
          background-color: #f3f4f6;
        }
        .container { 
          max-width: 650px; 
          margin: 20px auto; 
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .header { 
          background: linear-gradient(135deg, #f97316 0%, #dc2626 100%);
          color: white; 
          padding: 30px 20px; 
          text-align: center; 
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 700;
        }
        .content { 
          padding: 30px; 
        }
        .order-box { 
          background: #f9fafb; 
          padding: 25px; 
          border-radius: 8px; 
          margin: 20px 0; 
          border: 1px solid #e5e7eb;
        }
        .order-box h3 {
          margin-top: 0;
          color: #1f2937;
          font-size: 20px;
        }
        .order-box h4 {
          color: #374151;
          margin-top: 25px;
          margin-bottom: 15px;
          font-size: 16px;
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 8px;
        }
        .info-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
        }
        .info-label {
          color: #6b7280;
          font-weight: 500;
        }
        .info-value {
          color: #1f2937;
          font-weight: 600;
        }
        table { 
          width: 100%; 
          border-collapse: collapse; 
          margin-top: 15px;
          background: white;
          border-radius: 8px;
          overflow: hidden;
        }
        thead {
          background: #f3f4f6;
        }
        th {
          padding: 12px;
          text-align: left;
          font-weight: 600;
          color: #374151;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        tfoot {
          background: #fef3c7;
          border-top: 2px solid #f59e0b;
        }
        tfoot td {
          padding: 18px 15px;
          font-weight: 700;
          font-size: 18px;
        }
        .delivery-info {
          background: white;
          padding: 15px;
          border-radius: 8px;
          margin-top: 15px;
          border-left: 4px solid #f97316;
        }
        .delivery-info p {
          margin: 8px 0;
        }
        .badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
          margin-left: 8px;
        }
        .badge-success {
          background: #d1fae5;
          color: #065f46;
        }
        .badge-warning {
          background: #fef3c7;
          color: #92400e;
        }
        .footer { 
          text-align: center; 
          padding: 25px; 
          color: #6b7280; 
          font-size: 13px; 
          background: #f9fafb;
          border-top: 1px solid #e5e7eb;
        }
        .footer p {
          margin: 5px 0;
        }
        .emoji {
          font-size: 24px;
          margin-right: 8px;
        }
        @media only screen and (max-width: 600px) {
          .container {
            margin: 0;
            border-radius: 0;
          }
          .content {
            padding: 20px;
          }
          table {
            font-size: 14px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1><span class="emoji">🎉</span>Order Confirmed!</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.95;">Thank you for your order</p>
        </div>
        <div class="content">
          <h2 style="color: #1f2937; margin-top: 0;">Hi ${customerName}! 👋</h2>
          <p style="font-size: 15px; color: #4b5563;">We've received your order and our kitchen is getting it ready with love and care!</p>
          
          <div class="order-box">
            <h3>Order Summary</h3>
            <div class="info-row">
              <span class="info-label">Order ID:</span>
              <span class="info-value">#${orderId}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Estimated Delivery:</span>
              <span class="info-value">${deliveryTimeText}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Payment Method:</span>
              <span class="info-value">${paymentMethod === 'cash' ? 'Cash on Delivery 💵' : paymentMethod.toUpperCase()} ${paymentMethod !== 'cash' ? '<span class="badge badge-success">Paid</span>' : ''}</span>
            </div>
            
            <h4>🍽️ Your Delicious Items:</h4>
            <table>
              <thead>
                <tr>
                  <th style="width: 55%;">Item</th>
                  <th style="width: 20%; text-align: center;">Qty</th>
                  <th style="width: 25%; text-align: right;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsList}
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="2" style="color: #92400e;">
                    <strong>Total Amount</strong>
                  </td>
                  <td style="text-align: right; color: #f97316;">
                    ₹${totalAmount}
                  </td>
                </tr>
              </tfoot>
            </table>
            
            <h4>📍 Delivery Information:</h4>
            <div class="delivery-info">
              <p><strong style="color: #374151;">Address:</strong> ${address}</p>
              <p><strong style="color: #374151;">Phone:</strong> ${phone}</p>
            </div>
          </div>
          
          <div style="background: #ecfdf5; border-left: 4px solid #10b981; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <p style="margin: 0; color: #065f46; font-size: 14px;">
              <strong>✨ Order Status Updates:</strong> We'll keep you posted via email and SMS as your order progresses through preparation, cooking, and delivery!
            </p>
          </div>
          
          <p style="color: #4b5563; margin-top: 25px;">If you have any questions or special requests, feel free to contact us!</p>
          
          <p style="margin-top: 30px; font-size: 18px; color: #1f2937; font-weight: 600;">
            Enjoy your delicious meal! 🍕🍔🍝😋
          </p>
        </div>
        <div class="footer">
          <p style="font-weight: 600; color: #374151;">Food Ordering App</p>
          <p>© 2025 All rights reserved.</p>
          <p style="margin-top: 10px;">This is an automated email. Please do not reply directly to this message.</p>
          <p style="margin-top: 8px; font-size: 12px;">Questions? Contact us at ${process.env.EMAIL_USER || 'support@foodapp.com'}</p>
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
