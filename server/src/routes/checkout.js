import express from 'express';
import { getStripe } from '../utils/stripe.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// POST /api/checkout/create-session
// body: { email, items: [{ slug, quantity }] }
router.post('/create-session', async (req, res) => {
  try {
    const { email, items } = req.body || {};
    if (!email || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Invalid payload' });
    }

    const slugs = items.map((i) => i.slug);
    const products = await Product.find({ slug: { $in: slugs } }).lean();
    if (!products.length) return res.status(400).json({ error: 'No products' });

    const stripe = getStripe();
    const line_items = products.map((p) => ({
      price_data: {
        currency: 'inr',
        product_data: { name: p.title, description: p.description },
        unit_amount: p.priceInCents
      },
      quantity: items.find((i) => i.slug === p.slug)?.quantity || 1
    }));

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: email,
      // Enable Card and UPI (India) payments
      payment_method_types: ['card', 'upi'],
      line_items,
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/checkout?canceled=1`
    });

    const orderProducts = products.map((p) => ({ productId: p._id, priceInCents: p.priceInCents }));
    await Order.create({
      email,
      products: orderProducts,
      stripeSessionId: session.id,
      paid: false
    });

    res.json({ id: session.id, url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

// GET /api/checkout/verify?session_id=...
// If paid, issues a short-lived download token
router.get('/verify', async (req, res) => {
  try {
    const { session_id } = req.query;
    if (!session_id) return res.status(400).json({ error: 'Missing session_id' });

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(session_id);
    if (!session || session.payment_status !== 'paid') {
      return res.status(400).json({ error: 'Payment not confirmed' });
    }

    const order = await Order.findOne({ stripeSessionId: session_id }).populate('products.productId');
    if (!order) return res.status(404).json({ error: 'Order not found' });

    // Issue short-lived token (15 minutes)
    const token = uuidv4();
    const expires = new Date(Date.now() + 15 * 60 * 1000);
    order.downloadToken = token;
    order.tokenExpiresAt = expires;
    order.paid = true;
    await order.save();

    const downloads = order.products.map((op) => ({
      title: op.productId.title,
      slug: op.productId.slug,
      url: `${process.env.SERVER_URL}/api/download/${token}/${op.productId.slug}`
    }));

    res.json({ downloads, expiresAt: expires.toISOString() });
  } catch (error) {
    console.error('Error verifying checkout:', error);
    res.status(500).json({ error: 'Failed to verify checkout' });
  }
});

export default router;





