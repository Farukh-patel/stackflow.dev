# Quick Setup: Create .env File

## Problem
Your app is crashing because Razorpay credentials are not configured.

## Solution: Create .env File

### Step 1: Create the .env file

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```

2. Copy the template file:
   ```bash
   copy env.template .env
   ```
   
   Or manually create a new file named `.env`

### Step 2: Add Your Razorpay Credentials

1. **Get Razorpay Credentials:**
   - Go to https://dashboard.razorpay.com
   - Sign in or create an account
   - Go to **Settings** → **API Keys**
   - Copy your **Key ID** (starts with `rzp_test_` for test mode)
   - Click "Reveal" and copy your **Key Secret**

2. **Edit the .env file** and replace the placeholders:
   ```env
   RAZORPAY_KEY_ID=rzp_test_your_actual_key_id_here
   RAZORPAY_KEY_SECRET=your_actual_secret_key_here
   CLIENT_URL=http://localhost:5173
   SERVER_URL=http://localhost:5000
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```

### Step 3: Restart Your Server

After creating/editing the `.env` file, restart your server:
```bash
npm run dev
```

## Example .env File

```env
# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_1234567890abcdef
RAZORPAY_KEY_SECRET=abcdef1234567890abcdef1234567890

# Application URLs
CLIENT_URL=http://localhost:5173
SERVER_URL=http://localhost:5000

# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# Server Configuration
PORT=5000
```

## Important Notes

1. **Never commit .env file** - It should already be in `.gitignore`
2. **Test mode keys** start with `rzp_test_` and don't process real payments
3. **Live mode keys** start with `rzp_live_` and process real payments
4. For production, set environment variables in your deployment platform

## Still Having Issues?

- Check that `.env` file is in the `server` directory (not root)
- Verify credentials are correct (no extra spaces)
- Make sure you restarted the server after creating `.env`
- Check server console for error messages

