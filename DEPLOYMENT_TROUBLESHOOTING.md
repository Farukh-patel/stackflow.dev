# Deployment Troubleshooting Guide

## Products Not Visible After Deployment

If products are not showing on your deployed site, follow these steps:

### 1. Check Database Connection

**Issue**: Database not connected or wrong connection string

**Solution**:
- Verify `MONGODB_URI` is set in your deployment environment variables
- Test the connection string format:
  - Local: `mongodb://localhost:27017/database`
  - MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/database`
- Check server logs for connection errors

**How to check**:
```bash
# On your deployment platform, check environment variables
# Server should log: "MongoDB connected" on startup
```

### 2. Seed the Database

**Issue**: Database is empty (no products)

**Solution**: Run the seed script to populate products

```bash
# Navigate to server directory
cd server

# Make sure MONGODB_URI is set in .env or environment variables
# Then run:
npm run seed
```

**For production deployments**:
- Most platforms (Render, Vercel, Railway, etc.) allow running one-off commands
- SSH into your server or use the platform's console/terminal
- Run: `node seed.js` or `npm run seed`

**Expected output**:
```
MongoDB connected
Seeded products
```

### 3. Check API Endpoint

**Issue**: Frontend can't reach backend API

**Solution**:
- Verify `VITE_SERVER_URL` is set in frontend environment variables
- Or check `SERVER_URL` in `client/src/services/api.js`
- Test the API endpoint directly: `https://your-server.com/api/products`
- Should return JSON array of products

**Check browser console**:
- Open browser DevTools (F12)
- Check Network tab for failed requests to `/api/products`
- Look for CORS errors or 404 errors

### 4. Verify CORS Configuration

**Issue**: CORS blocking frontend requests

**Solution**: 
- Check `CLIENT_URL` is set in server environment variables
- Verify it matches your frontend domain exactly (including `https://`)
- Server should allow your frontend domain

**Example**:
```env
# In server .env
CLIENT_URL=https://your-frontend-domain.com
```

### 5. Check Server Logs

**Issue**: Server errors preventing product fetch

**How to check**:
- View server logs in your deployment platform
- Look for errors like:
  - "MongoDB connection error"
  - "Error fetching products"
  - Connection timeout errors

### 6. Verify Product Files Exist

**Issue**: Product images/files not accessible

**Solution**:
- Ensure `server/uploads` directory is deployed
- Images should be accessible at: `https://your-server.com/uploads/samples/*.png`
- PDFs should be in `server/uploads/samples/*.pdf`

**If using platforms like Render/Railway**:
- Static files might need special configuration
- Check if uploads folder is included in deployment

### 7. Test API Endpoint Directly

**Test in browser or terminal**:
```bash
# Replace with your actual server URL
curl https://your-server.com/api/products

# Should return JSON array like:
# [{"_id":"...","title":"MERN Complete Notes",...}, ...]
```

If this returns empty array `[]`, the database is empty (see Step 2).

### 8. Quick Fix Checklist

- [ ] MongoDB connection string is set and correct
- [ ] Database is seeded (run `npm run seed`)
- [ ] Server is running and accessible
- [ ] `CLIENT_URL` matches your frontend domain
- [ ] `SERVER_URL` or `VITE_SERVER_URL` is set in frontend
- [ ] Server logs show "MongoDB connected"
- [ ] API endpoint `/api/products` returns data
- [ ] No CORS errors in browser console
- [ ] Uploads folder is deployed with images/files

## Common Deployment Platform Issues

### Render
- Set environment variables in Dashboard → Environment
- Run seed command via Render Shell or add it to build script
- Check logs in Dashboard → Logs

### Railway
- Set environment variables in Variables tab
- Use Railway CLI or Web Terminal to run seed
- Check logs in Deployments tab

### Vercel
- Serverless functions have limitations
- Consider using MongoDB Atlas
- Run seed separately or use API route

### Heroku
- Set config vars: `heroku config:set MONGODB_URI=...`
- Run seed: `heroku run npm run seed`
- Check logs: `heroku logs --tail`

## Testing Locally Before Deploying

1. **Test database connection**:
   ```bash
   cd server
   node -e "require('dotenv').config(); console.log(process.env.MONGODB_URI)"
   ```

2. **Seed database**:
   ```bash
   npm run seed
   ```

3. **Start server**:
   ```bash
   npm run dev
   ```

4. **Test API**:
   ```bash
   curl http://localhost:5000/api/products
   ```

5. **Test frontend**:
   - Start frontend: `cd client && npm run dev`
   - Visit `http://localhost:5173/products`
   - Check browser console for errors

## Still Not Working?

1. Check browser console for specific error messages
2. Check server logs for error messages
3. Verify all environment variables are set correctly
4. Test API endpoint directly with curl or Postman
5. Ensure database is seeded with products

## Need Help?

If products still don't show after following these steps:
1. Check the error message shown on the products page
2. Check browser console (F12) for detailed errors
3. Check server logs for database/API errors
4. Verify your deployment platform's specific requirements

