import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

const CACHE_TTL_MS = Number(process.env.PRODUCTS_CACHE_TTL_MS || 2 * 60 * 1000);
let cachedProducts = null;
let cacheExpiry = 0;

const selectFields =
  'title description priceInCents imageUrl slug isFree category features notionUrl createdAt updatedAt';

const isCacheFresh = () => cachedProducts && cacheExpiry > Date.now();

// GET /api/products
router.get('/', async (_req, res) => {
  try {
    if (isCacheFresh()) {
      return res.set('X-Products-Cache', 'hit').json(cachedProducts);
    }

    const products = await Product.find({}, selectFields)
      .sort({ createdAt: -1 })
      .lean();

    cachedProducts = products;
    cacheExpiry = Date.now() + CACHE_TTL_MS;

    res.set('X-Products-Cache', 'miss').json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

export default router;





