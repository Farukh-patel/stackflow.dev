# Razorpay Payment - Quick Start Guide

## Quick Setup

### 1. Get Razorpay Credentials

1. Go to https://razorpay.com and create an account
2. Navigate to Settings → API Keys
3. Copy your Key ID and Key Secret

### 2. Configure Environment Variables

Create `server/.env` file:

```env
RAZORPAY_KEY_ID=rzp_test_your_key_id_here
RAZORPAY_KEY_SECRET=your_secret_key_here
CLIENT_URL=http://localhost:5173
SERVER_URL=http://localhost:5000
MONGODB_URI=your_mongodb_uri
```

### 3. Install Dependencies

```bash
cd server
npm install
```

### 4. Start Server

```bash
npm run dev
```

### 5. Test Payment

1. Start frontend: `cd client && npm run dev`
2. Add products to cart
3. Go to checkout
4. Enter email and click "Pay with Card / UPI"
5. Use test card: `4111 1111 1111 1111` with any future expiry and CVV

## Webhook Setup (Optional for testing, recommended for production)

Use ngrok for local development:

```bash
ngrok http 5000
```

Update `SERVER_URL` in `.env` with ngrok URL.

Configure webhook in Razorpay Dashboard:
- Webhook URL: `https://your-ngrok-url.ngrok.io/api/checkout/webhook`
- Events: `payment.captured`, `payment.failed`, `payment_link.paid`

## Production Deployment

1. Switch to live mode in Razorpay Dashboard
2. Get live API keys
3. Update `.env` with live keys
4. Set production `CLIENT_URL` and `SERVER_URL`
5. Configure webhook with production URL

For more details, see `RAZORPAY_SETUP_GUIDE.md`.


