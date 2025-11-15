# Fix Razorpay Authentication Error (401)

## Error: "Authentication failed" or "BAD_REQUEST_ERROR"

This error means your Razorpay credentials are incorrect or don't match your account mode.

## Common Causes & Solutions

### 1. Wrong Credentials

**Issue**: The Key ID or Secret Key is incorrect

**Solution**:
1. Go to https://dashboard.razorpay.com
2. Click **Settings** → **API Keys**
3. Make sure you're in the correct mode (Test or Live)
4. **Copy the Key ID** - should start with `rzp_test_` for test mode or `rzp_live_` for live mode
5. Click **Reveal** next to Secret Key and copy it exactly
6. Update your `.env` file:

```env
RAZORPAY_KEY_ID=rzp_test_your_actual_key_id_here
RAZORPAY_KEY_SECRET=your_actual_secret_key_here
```

### 2. Test vs Live Mode Mismatch

**Issue**: Using test mode keys when account is in live mode, or vice versa

**Solution**:
- Make sure both keys are from the same mode (both test OR both live)
- Test mode keys start with `rzp_test_`
- Live mode keys start with `rzp_live_`
- You can switch between modes using the toggle in Razorpay Dashboard

### 3. Extra Spaces or Characters

**Issue**: Copy-paste might have included extra spaces or hidden characters

**Solution**:
- Check your `.env` file for any spaces before/after the values
- Make sure there are no quotes around the values unless they're part of the actual key
- Values should look like:
  ```
  RAZORPAY_KEY_ID=rzp_test_abc123xyz
  RAZORPAY_KEY_SECRET=secret123abc
  ```
  
  NOT like:
  ```
  RAZORPAY_KEY_ID="rzp_test_abc123xyz"  ❌ (remove quotes)
  RAZORPAY_KEY_ID = rzp_test_abc123xyz  ❌ (no spaces around =)
  ```

### 4. Wrong Key Secret

**Issue**: The Secret Key might be from a different key pair

**Solution**:
- Delete the old secret key if you regenerated it
- Make sure Key ID and Secret Key are from the same key pair
- If you regenerate keys, update both in your `.env` file

### 5. Account Not Activated

**Issue**: Razorpay account might not be fully activated

**Solution**:
- Check Razorpay Dashboard for any activation requirements
- Complete KYC if required
- Verify your account status

## Step-by-Step Fix

### Step 1: Verify Your Razorpay Account

1. Log in to https://dashboard.razorpay.com
2. Check if your account is active
3. Go to **Settings** → **API Keys**

### Step 2: Get Fresh Credentials

1. If keys don't work, you can regenerate them:
   - Click **Regenerate** next to Secret Key
   - Copy both Key ID and new Secret Key
   - ⚠️ **Note**: Old secret key will stop working

### Step 3: Update .env File

1. Open `server/.env` file
2. Update the credentials:
   ```env
   RAZORPAY_KEY_ID=rzp_test_your_new_key_id
   RAZORPAY_KEY_SECRET=your_new_secret_key
   ```
3. Save the file

### Step 4: Restart Server

```bash
# Stop the server (Ctrl+C)
# Then restart:
npm run dev
```

### Step 5: Test Again

1. Try to make a payment
2. Check if the error is resolved
3. If still failing, verify credentials are correct

## Verification Checklist

- [ ] Key ID starts with `rzp_test_` (test mode) or `rzp_live_` (live mode)
- [ ] Key ID and Secret Key are from the same mode
- [ ] No extra spaces or quotes in `.env` file
- [ ] `.env` file is in the `server` directory
- [ ] Server was restarted after updating `.env`
- [ ] Both credentials are from the same key pair

## Test Mode vs Live Mode

**Test Mode** (Recommended for development):
- Keys start with `rzp_test_`
- Free to use
- Doesn't process real payments
- Good for testing

**Live Mode** (Production):
- Keys start with `rzp_live_`
- Processes real payments
- Requires account activation
- Use only after testing

## Still Not Working?

1. **Double-check credentials** - Copy them fresh from Razorpay Dashboard
2. **Check server logs** - Look for the exact error message
3. **Verify .env file location** - Must be in `server/.env`
4. **Try regenerating keys** - Create new key pair in Razorpay Dashboard
5. **Check Razorpay account status** - Make sure account is active

## Need Help?

- Razorpay Support: https://razorpay.com/support/
- Razorpay Dashboard: https://dashboard.razorpay.com
- Check server console for detailed error messages

