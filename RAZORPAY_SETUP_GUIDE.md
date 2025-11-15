# Razorpay Payment Setup Guide

This guide will help you set up Razorpay payment functionality for your online shopping application.

## Prerequisites

1. A Razorpay account (free to create at https://razorpay.com)
2. Node.js and npm installed
3. MongoDB database (local or MongoDB Atlas)

## Step 1: Create a Razorpay Account

1. Go to https://razorpay.com and sign up for a free account
2. Complete the account setup and KYC verification
3. You'll have access to both **Test Mode** and **Live Mode**

## Step 2: Get Your Razorpay API Keys

1. Log in to your Razorpay Dashboard: https://dashboard.razorpay.com
2. Click on **Settings** → **API Keys**
3. You'll see two keys:
   - **Key ID** (starts with `rzp_test_` for test mode)
   - **Key Secret** (click "Reveal" to see it)

4. **Copy both keys** - you'll need them for the next step

## Step 3: Configure Environment Variables

1. Navigate to the `server` directory in your project
2. Create a `.env` file (copy from `env.template` if it exists):

```bash
cd server
copy env.template .env
```

Or create a new `.env` file with the following content:

```env
# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_your_razorpay_key_id_here
RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here

# Razorpay Webhook Secret (optional for testing, recommended for production)
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret_here

# Application URLs
CLIENT_URL=http://localhost:5173
SERVER_URL=http://localhost:5000

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/onlineshopping

# Server Configuration
PORT=5000
```

3. **Replace `rzp_test_your_razorpay_key_id_here`** with your actual Razorpay Key ID from Step 2
4. **Replace `your_razorpay_key_secret_here`** with your actual Razorpay Key Secret from Step 2
5. **Update `CLIENT_URL`** to match your frontend URL:
   - For local development: `http://localhost:5173` (or whatever port your Vite dev server uses)
   - For production: `https://yourdomain.com`
6. **Update `SERVER_URL`** with your server URL:
   - For local development: `http://localhost:5000` (or use ngrok for webhooks)
   - For production: `https://your-server-domain.com`
7. **Update `MONGODB_URI`** with your MongoDB connection string

## Step 4: Install Dependencies

```bash
cd server
npm install
```

This will install the `razorpay` package and other dependencies.

## Step 5: Configure Webhooks (Recommended)

1. Log in to Razorpay Dashboard
2. Go to **Settings** → **Webhooks**
3. Click **Add New Webhook**
4. Enter your webhook URL: `https://your-server-domain.com/api/checkout/webhook`
   - For local development, use ngrok: `https://your-ngrok-url.ngrok.io/api/checkout/webhook`
5. Select the following events:
   - `payment.captured`
   - `payment.failed`
   - `payment_link.paid`
   - `payment_link.cancelled`
6. Copy the **Webhook Secret** and add it to your `.env` file as `RAZORPAY_WEBHOOK_SECRET`

### Using Ngrok for Local Development

For local development, use ngrok to expose your server:

```bash
# Install ngrok (if not already installed)
# Download from https://ngrok.com/

# Start your server
cd server
npm run dev

# In another terminal, start ngrok
ngrok http 5000

# Copy the ngrok URL (e.g., https://abc123.ngrok.io)
# Use this URL as SERVER_URL in your .env file
# Use this URL + /api/checkout/webhook as webhook URL in Razorpay dashboard
```

## Step 6: Restart Your Server

After creating/updating the `.env` file, restart your server:

```bash
cd server
npm run dev
```

The server should start without errors. Check the console for any error messages.

## Step 7: Test the Payment Flow

1. Start your frontend development server:
   ```bash
   cd client
   npm run dev
   ```

2. Open your browser and navigate to your application
3. Add some products to your cart
4. Go to the checkout page
5. Enter your email address
6. Click "Pay with Card / UPI"

### Testing with Razorpay Test Cards

When you're redirected to Razorpay Checkout, you can use these test card numbers:

- **Successful payment**: `4111 1111 1111 1111`
- **Declined payment**: `5104 0600 0000 0008`

For all test cards:
- **Expiry date**: Any future date (e.g., `12/34`)
- **CVV**: Any 3 digits (e.g., `123`)
- **Name**: Any name

## Troubleshooting

### Error: "RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET must be set"

**Solution**: Make sure you've created a `.env` file in the `server` directory with your Razorpay keys.

### Error: "Razorpay is not configured"

**Solution**: 
1. Check that your `.env` file is in the `server` directory
2. Verify the `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` are correct
3. Restart your server after adding/updating the `.env` file

### Error: "CLIENT_URL is not configured"

**Solution**: Add `CLIENT_URL` to your `.env` file. For local development, use `http://localhost:5173` (or your frontend port).

### Error: "SERVER_URL is not configured"

**Solution**: Add `SERVER_URL` to your `.env` file. For local development, use `http://localhost:5000` or your ngrok URL.

### Payment button does nothing / No error message

**Solution**: 
1. Check your browser's console (F12) for errors
2. Check your server console for errors
3. Make sure both frontend and backend servers are running
4. Verify the `SERVER_URL` in your frontend matches your backend URL

### Webhook not receiving events

**Solution**:
1. Verify webhook URL is accessible (use ngrok for local development)
2. Check webhook configuration in Razorpay Dashboard
3. Check server logs for webhook requests
4. Verify `SERVER_URL` is set correctly in `.env`
5. Make sure webhook secret is configured correctly

### CORS Errors

**Solution**: Make sure `CLIENT_URL` in your server's `.env` file matches your frontend URL exactly (including the protocol `http://` or `https://`).

## Production Deployment

When you're ready to go live:

1. **Switch to Live Mode** in Razorpay Dashboard
2. Get your **Live API Keys** (starts with `rzp_live_`)
3. Update your `.env` file with the live keys
4. Update `CLIENT_URL` to your production domain
5. Update `SERVER_URL` to your production server domain
6. Configure webhook in Razorpay Dashboard with production URL
7. Set `RAZORPAY_WEBHOOK_SECRET` for security

## Important Notes

- **Never commit your `.env` file** to version control (it should already be in `.gitignore`)
- **Test mode keys** work with test cards and don't process real payments
- **Live mode keys** process real payments - be careful!
- Razorpay test mode allows you to test the entire payment flow without using real money
- Webhook signature verification is recommended for production security

## Additional Resources

- Razorpay Documentation: https://razorpay.com/docs/
- Razorpay Dashboard: https://dashboard.razorpay.com
- Razorpay Test Cards: https://razorpay.com/docs/payments/test-cards/
- Razorpay Webhooks: https://razorpay.com/docs/webhooks/

## Need Help?

If you're still having issues:

1. Check the error messages in your browser console and server logs
2. Verify all environment variables are set correctly
3. Make sure your Razorpay account is in the correct mode (test/live)
4. Check that your server is running and accessible
5. Contact Razorpay support: https://razorpay.com/support/

The improved error handling in the checkout page will now show specific error messages to help you diagnose issues.


