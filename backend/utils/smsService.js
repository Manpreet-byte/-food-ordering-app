// SMS Service - FREE SMS with TextBelt + Twilio option
require('dotenv').config();
const twilio = require('twilio');
const https = require('https');

// Initialize Twilio client
let twilioClient = null;
const SMS_ENABLED = process.env.SMS_ENABLED === 'true';
const USE_TEXTBELT = process.env.USE_TEXTBELT === 'true'; // FREE option, no account needed!

if (SMS_ENABLED && !USE_TEXTBELT && process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
  try {
    twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    console.log('✅ Twilio SMS service initialized');
  } catch (error) {
    console.error('❌ Twilio initialization failed:', error.message);
  }
}

if (USE_TEXTBELT) {
  console.log('✅ TextBelt FREE SMS service enabled (no account needed)');
}

/**
 * Send SMS via TextBelt (FREE, no account needed)
 * Limited to 1 SMS per day per phone number on free tier
 */
const sendViaTextBelt = (phoneNumber, message) => {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      phone: phoneNumber,
      message: message,
      key: 'textbelt' // Free tier key - 1 SMS/day per number
    });

    const options = {
      hostname: 'textbelt.com',
      port: 443,
      path: '/text',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          const result = JSON.parse(responseData);
          if (result.success) {
            console.log('\n✅ ===== REAL SMS SENT VIA TEXTBELT (FREE) =====');
            console.log(`To: ${phoneNumber}`);
            console.log(`Message: ${message}`);
            console.log(`TextID: ${result.textId}`);
            console.log(`Quota Remaining: ${result.quotaRemaining}`);
            console.log('===============================================\n');
            resolve({
              success: true,
              to: phoneNumber,
              message: message,
              provider: 'TextBelt (FREE)',
              textId: result.textId,
              quotaRemaining: result.quotaRemaining
            });
          } else {
            console.error('\n❌ TextBelt Error:', result.error);
            console.error(`Quota: ${result.quotaRemaining}\n`);
            reject(new Error(result.error || 'TextBelt API error'));
          }
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(data);
    req.end();
  });
};

/**
 * Send SMS notification
 */
const sendSMS = async (phoneNumber, message) => {
  try {
    // Option 1: TextBelt (FREE, no account needed!)
    if (USE_TEXTBELT) {
      return await sendViaTextBelt(phoneNumber, message);
    }

    // Option 2: Check if SMS is disabled
    if (!SMS_ENABLED) {
      console.log('\n📱 ===== SMS NOTIFICATION (DISABLED) =====');
      console.log(`To: ${phoneNumber}`);
      console.log(`Message: ${message}`);
      console.log('==============================\n');
      return {
        success: true,
        to: phoneNumber,
        message: message,
        timestamp: new Date(),
        provider: 'disabled'
      };
    }

    // Option 3: Twilio (requires account)
    if (!twilioClient) {
      console.log('\n📱 ===== SMS NOTIFICATION (DEV MODE) =====');
      console.log(`To: ${phoneNumber}`);
      console.log(`Message: ${message}`);
      console.log('⚠️  Twilio not configured');
      console.log('💡 Set USE_TEXTBELT=true in .env for FREE real SMS!');
      console.log('==============================\n');
      return {
        success: false,
        to: phoneNumber,
        message: message,
        timestamp: new Date(),
        provider: 'console-log',
        error: 'Twilio not configured'
      };
    }

    // Send real SMS via Twilio
    const result = await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber
    });

    console.log('\n✅ ===== REAL SMS SENT VIA TWILIO =====');
    console.log(`To: ${phoneNumber}`);
    console.log(`Message: ${message}`);
    console.log(`SID: ${result.sid}`);
    console.log(`Status: ${result.status}`);
    console.log('======================================\n');

    return {
      success: true,
      to: phoneNumber,
      message: message,
      timestamp: new Date(),
      provider: 'Twilio',
      sid: result.sid,
      status: result.status
    };
  } catch (error) {
    console.error('\n❌ ===== SMS SENDING FAILED =====');
    console.error(`To: ${phoneNumber}`);
    console.error(`Error: ${error.message}`);
    console.error('==============================\n');
    
    return {
      success: false,
      to: phoneNumber,
      error: error.message,
      timestamp: new Date()
    };
  }
};

/**
 * Send order confirmation SMS
 */
const sendOrderConfirmation = async (phone, orderDetails) => {
  const { orderId, totalAmount, deliveryTime, customerName } = orderDetails;
  
  const deliveryTimeText = deliveryTime === 'asap' ? '30-45 minutes' : 
                           deliveryTime === '1hour' ? '1 hour' :
                           deliveryTime === '2hours' ? '2 hours' :
                           deliveryTime === 'evening' ? 'this evening' : '30-45 minutes';
  
  const message = `Hi ${customerName}! Your order #${orderId} is confirmed! Total: $${totalAmount}. Estimated delivery: ${deliveryTimeText}. Thank you!`;
  
  return await sendSMS(phone, message);
};

/**
 * Send order status update SMS
 */
const sendOrderStatusUpdate = async (phone, statusDetails) => {
  const { orderId, status } = statusDetails;
  
  let message = '';
  switch (status) {
    case 'Preparing':
      message = `Order #${orderId} is being prepared! Your food will be ready soon.`;
      break;
    case 'Delivered':
      message = `Order #${orderId} has been delivered! Enjoy your meal!`;
      break;
    default:
      message = `Order #${orderId} status: ${status}`;
  }
  
  return await sendSMS(phone, message);
};

module.exports = {
  sendSMS,
  sendOrderConfirmation,
  sendOrderStatusUpdate
};
