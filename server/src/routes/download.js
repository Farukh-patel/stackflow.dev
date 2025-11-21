import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { generateWatermarkedPdf } from '../utils/watermark.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Free downloads without token (must be before the token route)
router.get('/free/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug, isFree: true });
    if (!product) return res.status(404).json({ error: 'Free product not found' });
    const absolutePath = path.join(__dirname, '../..', 'uploads', product.filePath);
    res.download(absolutePath, `${product.slug}.pdf`);
  } catch (error) {
    console.error('Error downloading free product:', error);
    res.status(500).json({ error: 'Failed to download file' });
  }
});

// GET /api/download/:token/:slug  -> streams file if token valid and not expired
router.get('/:token/:slug', async (req, res) => {
  try {
    const { token, slug } = req.params;
    const order = await Order.findOne({ downloadToken: token, paid: true }).populate('products.productId');
    if (!order) return res.status(404).json({ error: 'Invalid token' });
    if (!order.tokenExpiresAt || order.tokenExpiresAt.getTime() < Date.now()) {
      return res.status(410).json({ error: 'Token expired' });
    }

    const hasProduct = order.products.find((p) => p.productId.slug === slug);
    if (!hasProduct) return res.status(403).json({ error: 'Not authorized for this file' });

    const product = await Product.findOne({ slug });
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const absolutePath = path.join(__dirname, '../..', 'uploads', product.filePath);

    const buffer = await generateWatermarkedPdf({
      sourcePath: absolutePath,
      buyerName: order.buyerName,
      email: order.email,
      orderId: order.razorpayOrderId,
      antiPiracyCode: order.antiPiracyCode || order._id.toString(),
      productTitle: product.title
    });

    const downloadHistoryEntry = {
      productSlug: slug,
      downloadedAt: new Date(),
      ipAddress: req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.ip,
      userAgent: req.get('user-agent')
    };
    order.downloadHistory = Array.isArray(order.downloadHistory) ? order.downloadHistory : [];
    order.downloadHistory.push(downloadHistoryEntry);
    // keep last 20 events
    if (order.downloadHistory.length > 20) {
      order.downloadHistory = order.downloadHistory.slice(-20);
    }
    await order.save();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${product.slug}-secure-${order.antiPiracyCode || 'watermarked'}.pdf"`
    );
    res.send(Buffer.from(buffer));
  } catch (error) {
    console.error('Error downloading product:', error);
    res.status(500).json({ error: 'Failed to download file' });
  }
});

export default router;




