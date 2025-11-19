# Email Setup Guide - Download Links

## Problem
After successful payment, customers are not receiving email with download links.

## Solution: Configure Email Settings

### Step 1: Get Gmail App Password

1. Go to your Google Account: https://myaccount.google.com
2. Click **Security** in the left sidebar
3. Enable **2-Step Verification** if not already enabled
4. Scroll down to **App passwords**
5. Click **App passwords**
6. Select **Mail** and **Other (Custom name)**
7. Enter name: "stackflow.dev"
8. Click **Generate**
9. **Copy the 16-character password** (you'll need this)

### Step 2: Set Environment Variables

On your server (Render/Railway/etc.), add these environment variables:

```env
EMAIL_FROM=your-email@gmail.com
EMAIL_PASSWORD=your-16-character-app-password
```

**Important:**
- Use the **App Password** (16 characters), NOT your regular Gmail password
- The email must be the same one you used to generate the App Password

### Step 3: Verify Configuration

After setting the environment variables:

1. **Redeploy your server**
2. Make a test purchase
3. Check server logs for:
   - `✅ Email sent successfully` = Working!
   - `⚠️ Email credentials not configured` = Check your env vars
   - `❌ Error sending email` = Check the error message

### Alternative: Custom SMTP

If you want to use a different email service (not Gmail):

```env
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_USER=your-email@yourdomain.com
SMTP_PASS=your-password
EMAIL_FROM=your-email@yourdomain.com
```

## Testing

1. Make a test purchase with ₹5 Advanced JavaScript Patterns
2. Check your email inbox (and spam folder)
3. You should receive an email with:
   - Subject: "Your Download Links - Order Confirmation"
   - Download links for each purchased product
   - Expiration time (15 minutes)

## Troubleshooting

### Email not sending?
- ✅ Check server logs for error messages
- ✅ Verify `EMAIL_FROM` and `EMAIL_PASSWORD` are set correctly
- ✅ Make sure you're using App Password, not regular password
- ✅ Check that 2-Step Verification is enabled on your Google Account

### Still not working?
- Check server logs: Look for email-related errors
- Test with a different email service
- Contact support if issues persist

## What Customers Receive

Customers will receive a professional email with:
- Order confirmation
- Download links for each product
- Expiration time (15 minutes)
- Contact information

The email is sent automatically after:
1. Payment is verified via Razorpay
2. Download token is generated
3. Order is marked as paid


