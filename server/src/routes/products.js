import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// GET /api/products
router.get('/', async (_req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 }).lean();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

export default router;





