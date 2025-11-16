# Fix: Products Not Showing in Production

## Quick Diagnosis Steps

### Step 1: Test Your API Endpoint Directly

Open your browser and visit:
```
https://your-server-url.com/api/products
```

**What to look for:**
- If you see `[]` (empty array) → **Database is empty** (go to Step 2)
- If you see an error or nothing loads → **Server/API issue** (go to Step 3)
- If you see products → **Frontend issue** (go to Step 4)

Replace `your-server-url.com` with your actual server URL (e.g., `https://stackflow-dev-1.onrender.com`)

---

## Step 2: Seed Your Production Database (MOST COMMON FIX)

**The Problem:** Your production database is empty. Products need to be seeded.

**The Solution:** Run the seed script on your production server.

### Option A: Using Your Deployment Platform's Console/Shell

1. **Render:**
   - Go to your service → Click "Shell" button
   - Run: `cd server && npm run seed`

2. **Railway:**
   - Go to your service → Click "Deployments" → "View Logs"
   - Or use Railway CLI: `railway run npm run seed --service server`

3. **Heroku:**
   - Run: `heroku run npm run seed --app your-app-name`

4. **Vercel/Netlify:**
   - These are serverless, you'll need to create an API route or use MongoDB directly
   - Or use MongoDB Compass to connect and run the seed script

5. **Manual Server (SSH):**
   ```bash
   ssh your-server
   cd /path/to/your/app/server
   npm run seed
   ```

### Option B: Create a One-Time Seed Endpoint (Temporary)

If you can't access the console, temporarily add this to your server:

```javascript
// In server/src/index.js (TEMPORARY - remove after seeding)
app.post('/api/seed', async (req, res) => {
  try {
    // Import and run seed logic
    const Product = require('./models/Product');
    // ... seed code here
    res.json({ message: 'Seeded successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

Then visit: `https://your-server.com/api/seed` once, then remove this endpoint.

---

## Step 3: Check Environment Variables

### Server Environment Variables (Required)

Make sure these are set in your deployment platform:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
CLIENT_URL=https://your-frontend-domain.com
PORT=5000
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
```

**Where to set:**
- **Render:** Dashboard → Your Service → Environment
- **Railway:** Your Service → Variables tab
- **Heroku:** `heroku config:set KEY=value`
- **Vercel:** Project Settings → Environment Variables

### Frontend Environment Variables (Required)

For your frontend build, set:

```env
VITE_SERVER_URL=https://your-server-url.com
```

**Important:** 
- Vite environment variables must start with `VITE_`
- Rebuild your frontend after setting this variable
- The default in `api.js` is `https://stackflow-dev-1.onrender.com` - make sure this matches your actual server URL

**Where to set:**
- **Vercel:** Project Settings → Environment Variables → Add `VITE_SERVER_URL`
- **Netlify:** Site Settings → Environment Variables
- **Other platforms:** Check their documentation for build-time environment variables

---

## Step 4: Check Browser Console

1. Open your production site
2. Press `F12` to open DevTools
3. Go to the **Console** tab
4. Look for errors like:
   - `Failed to fetch` → API endpoint not accessible
   - `CORS error` → CORS configuration issue
   - `404 Not Found` → Wrong API URL

5. Go to the **Network** tab
6. Refresh the page
7. Look for the request to `/api/products`
   - If it's red/failed → Check the error message
   - If it returns 200 but empty `[]` → Database is empty (Step 2)

---

## Step 5: Verify CORS Configuration

Your server needs to allow requests from your frontend domain.

**Check `server/src/index.js`:**
```javascript
app.use(cors({ origin: process.env.CLIENT_URL?.split(',') || '*', credentials: true }));
```

**Make sure `CLIENT_URL` is set correctly:**
- Must match your frontend URL exactly (including `https://`)
- Example: `CLIENT_URL=https://your-frontend.com`
- No trailing slash

---

## Step 6: Check Server Logs

View your server logs to see if there are errors:

**Common errors:**
- `MongoDB connection error` → Check `MONGODB_URI`
- `Error fetching products` → Database query issue
- `MONGODB_URI not set` → Environment variable missing

**Where to check:**
- **Render:** Dashboard → Your Service → Logs
- **Railway:** Your Service → Deployments → View Logs
- **Heroku:** `heroku logs --tail`

---

## Quick Checklist

Before asking for help, verify:

- [ ] **Database is seeded** - Test: `curl https://your-server.com/api/products` should return products, not `[]`
- [ ] **MONGODB_URI is set** - Check server logs for "MongoDB connected"
- [ ] **CLIENT_URL is set** - Matches your frontend domain exactly
- [ ] **VITE_SERVER_URL is set** - Matches your server URL exactly
- [ ] **Server is running** - Check server logs, no errors
- [ ] **API endpoint works** - Test directly in browser: `https://your-server.com/api/products`
- [ ] **No CORS errors** - Check browser console
- [ ] **Frontend rebuilt** - After setting `VITE_SERVER_URL`, rebuild and redeploy

---

## Most Likely Solution

**90% of the time, the issue is:** Your production database is empty.

**Fix:** Run `npm run seed` in your production server's `server` directory.

---

## Still Not Working?

1. **Test API directly:**
   ```bash
   curl https://your-server.com/api/products
   ```

2. **Check what SERVER_URL your frontend is using:**
   - Open browser console on production site
   - Type: `window.location.origin`
   - Check Network tab to see what URL is being called

3. **Verify database connection:**
   - Check server logs for "MongoDB connected successfully"
   - If not, check `MONGODB_URI` environment variable

4. **Compare local vs production:**
   - Does `http://localhost:5000/api/products` work locally?
   - Does `https://your-server.com/api/products` work in production?
   - If local works but production doesn't → Database or environment variable issue

