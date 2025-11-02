# SMS Notification Integration Guide

## Current Status
The app currently **simulates** SMS notifications by logging them to the console. In production, you can integrate with real SMS services.

## Features Implemented

### 1. Order Confirmation SMS
When a customer places an order, they receive:
- Order ID
- Total amount
- Estimated delivery time
- Payment method
- Delivery address confirmation

### 2. Order Status Update SMS
When admin updates order status to "Preparing" or "Delivered":
- Customer receives automatic notification
- Personalized message based on status
- Order tracking information

## Console Output Example
```
📱 ===== SMS NOTIFICATION =====
To: +1234567890
Message: Hi John! 🎉 Your order #A1B2C3D4 is confirmed! Total: $45.99. Estimated delivery: 30-45 minutes. Track your order in the app. Thank you! 🍕
==============================
```

## Integration with Real SMS Services

### Option 1: Twilio (Recommended)
```bash
npm install twilio
```

```javascript
// In smsService.js
const twilio = require('twilio');
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendSMS = async (phoneNumber, message) => {
  const result = await client.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phoneNumber
  });
  return result;
};
```

### Option 2: AWS SNS
```bash
npm install aws-sdk
```

```javascript
const AWS = require('aws-sdk');
const sns = new AWS.SNS({ region: 'us-east-1' });

const sendSMS = async (phoneNumber, message) => {
  const params = {
    Message: message,
    PhoneNumber: phoneNumber
  };
  return await sns.publish(params).promise();
};
```

### Option 3: Firebase Cloud Messaging
```bash
npm install firebase-admin
```

## Environment Variables Required

Add to `.env`:
```
# Twilio
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# OR AWS SNS
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_REGION=us-east-1

# Enable SMS in production
SMS_ENABLED=true
```

## Testing

1. **Development Mode**: Messages appear in backend console
2. **Production Mode**: Replace the `sendSMS` function in `smsService.js` with real provider code

## Phone Number Format
- Use international format: `+1234567890`
- Validate before sending
- Store in E.164 format

## Rate Limiting
Consider implementing:
- Max SMS per customer per day
- Cooldown period between messages
- Verification for new phone numbers

## Cost Considerations
- Twilio: ~$0.0075 per SMS in USA
- AWS SNS: ~$0.00645 per SMS
- Budget accordingly for your user base
