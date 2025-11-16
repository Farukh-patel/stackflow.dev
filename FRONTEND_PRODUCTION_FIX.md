# Fix: Products Not Showing in Production Frontend

## ✅ Good News: Your Backend is Working!

I tested your backend API and it's working perfectly:
- ✅ Server is running: `https://stackflow-dev-1.onrender.com`
- ✅ API endpoint is accessible: `/api/products`
- ✅ Products are in the database

**The issue is in your frontend configuration.**

---

## Most Common Issues & Fixes

### Issue 1: CORS Error (Most Likely)

**Problem:** Your backend is blocking requests from your frontend domain.

**Fix:** Set `CLIENT_URL` environment variable on your backend (Render).

1. Go to **Render Dashboard** → Your Backend Service
2. Click **Environment** tab
3. Add/Update: `CLIENT_URL` = `https://your-frontend-domain.com`
   - Replace with your actual frontend URL (e.g., `https://stackflow.dev` or `https://your-app.vercel.app`)
   - **Important:** Include `https://` and no trailing slash
4. **Redeploy** your backend service

**Example:**
```
CLIENT_URL=https://stackflow.dev
```

If you have multiple frontend domains, separate with commas:
```
CLIENT_URL=https://stackflow.dev,https://www.stackflow.dev
```

---

### Issue 2: Frontend Using Wrong Server URL

**Problem:** Your frontend might be using `localhost:5000` instead of the production URL.

**Fix:** Set `VITE_SERVER_URL` in your frontend deployment.

**For Vercel:**
1. Go to **Project Settings** → **Environment Variables**
2. Add: `VITE_SERVER_URL` = `https://stackflow-dev-1.onrender.com`
3. Make sure it's set for **Production** environment
4. **Redeploy** your frontend

**For Netlify:**
1. Go to **Site Settings** → **Environment Variables**
2. Add: `VITE_SERVER_URL` = `https://stackflow-dev-1.onrender.com`
3. **Redeploy** your site

**For Other Platforms:**
- Check their documentation for setting build-time environment variables
- Variables must start with `VITE_` to be accessible in Vite

---

### Issue 3: Frontend Not Built in Production Mode

**Problem:** Frontend might be running in development mode.

**Fix:** Make sure you're building for production:

```bash
cd client
npm run build
```

Then deploy the `dist` folder (not the source files).

---

## Quick Diagnostic Steps

### Step 1: Check Browser Console

1. Open your production site
2. Press `F12` to open DevTools
3. Go to **Console** tab
4. Look for errors:
   - `CORS policy` → CORS issue (Fix Issue 1)
   - `Failed to fetch` → Network/URL issue (Fix Issue 2)
   - `localhost:5000` → Wrong URL (Fix Issue 2)

### Step 2: Check Network Tab

1. In DevTools, go to **Network** tab
2. Refresh the page
3. Look for request to `/api/products` or `stackflow-dev-1.onrender.com`
4. Click on it to see:
   - **Status:** Should be `200 OK`
   - **Request URL:** Should be `https://stackflow-dev-1.onrender.com/api/products`
   - **Response:** Should show products array

### Step 3: Test API Directly

Open in browser:
```
https://stackflow-dev-1.onrender.com/api/products
```

If you see products → Backend is fine, issue is frontend configuration.

---

## Debug Mode (Temporary)

I've added debug logging to help identify the issue. To enable it:

1. In your frontend environment variables, add:
   ```
   VITE_DEBUG=true
   ```
2. Rebuild and redeploy
3. Check browser console for debug messages showing:
   - Which server URL is being used
   - API request details
   - Any errors

**Remove `VITE_DEBUG` after fixing the issue.**

---

## Complete Checklist

Before asking for help, verify:

- [ ] **Backend `CLIENT_URL` is set** - Matches your frontend domain exactly
- [ ] **Frontend `VITE_SERVER_URL` is set** - Set to `https://stackflow-dev-1.onrender.com`
- [ ] **Frontend rebuilt** - After setting environment variables
- [ ] **Backend redeployed** - After setting `CLIENT_URL`
- [ ] **No CORS errors** - Check browser console
- [ ] **Network request succeeds** - Check Network tab in DevTools
- [ ] **API URL is correct** - Should be `https://stackflow-dev-1.onrender.com/api/products`

---

## What to Check Right Now

1. **Open your production site**
2. **Open browser console (F12)**
3. **Check for errors** - What error message do you see?
4. **Check Network tab** - What URL is being called?
5. **Share the error** - This will help identify the exact issue

---

## Still Not Working?

If you've tried everything above:

1. **Share the browser console error** - Copy the exact error message
2. **Share the Network tab details** - What URL is being called and what's the response?
3. **Confirm your frontend URL** - What's your frontend domain?
4. **Check Render logs** - Any errors in backend logs?

The most common fix is setting `CLIENT_URL` on the backend to match your frontend domain!

