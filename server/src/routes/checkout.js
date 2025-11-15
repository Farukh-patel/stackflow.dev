import express from 'express';
import { createOrder, getOrder, createPaymentLink } from '../utils/razorpay.js';
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

    // Validate CLIENT_URL is set
    if (!process.env.CLIENT_URL) {
      return res.status(500).json({ error: 'CLIENT_URL is not configured. Please set CLIENT_URL in your server environment variables.' });
    }

    // Validate SERVER_URL is set (needed for webhook)
    if (!process.env.SERVER_URL) {
      return res.status(500).json({ error: 'SERVER_URL is not configured. Please set SERVER_URL in your server environment variables.' });
    }

    // Calculate total amount in paise (Razorpay uses paise)
    const totalAmount = products.reduce((sum, p) => {
      const quantity = items.find((i) => i.slug === p.slug)?.quantity || 1;
      return sum + (p.priceInCents * quantity); // priceInCents is already in paise
    }, 0);

    // Generate unique order ID
    const orderId = `order_${uuidv4().replace(/-/g, '')}`;

    // Create order products array for database
    const orderProducts = products.map((p) => ({ productId: p._id, priceInCents: p.priceInCents }));

    // Create order in database first
    const dbOrder = await Order.create({
      email,
      products: orderProducts,
      razorpayOrderId: orderId,
      paymentStatus: 'PENDING',
      paid: false
    });

    // Prepare order notes
    const orderNotes = products.map((p) => {
      const quantity = items.find((i) => i.slug === p.slug)?.quantity || 1;
      return `${p.title} x${quantity}`;
    }).join(', ');

    // Create Razorpay order
    const razorpayOrderData = {
      amount: totalAmount, // Amount in paise
      currency: 'INR',
      receipt: orderId,
      notes: {
        email: email,
        order_notes: orderNotes
      }
    };

    const razorpayOrder = await createOrder(razorpayOrderData);

    // Create payment link for Razorpay hosted checkout
    const paymentLinkData = {
      amount: totalAmount,
      currency: 'INR',
      description: `Order for ${email}`,
      customer: {
        name: email.split('@')[0], // Use email prefix as name
        email: email,
        contact: '' // Optional: Add phone if available
      },
      notify: {
        sms: false,
        email: true
      },
      reminder_enable: true,
      callback_url: `${process.env.CLIENT_URL}/success?session_id=${razorpayOrder.id}`,
      callback_method: 'get',
      notes: {
        order_id: orderId,
        email: email
      }
    };

    const paymentLink = await createPaymentLink(paymentLinkData);

    // Update order with Razorpay order ID and payment link ID
    dbOrder.razorpayOrderId = razorpayOrder.id;
    dbOrder.razorpayPaymentLinkId = paymentLink.id;
    await dbOrder.save();

    // Return payment URL
    res.json({
      id: razorpayOrder.id,
      url: paymentLink.short_url || paymentLink.url || paymentLink.id
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Failed to create checkout session';
    let statusCode = 500;
    
    if (error.message.includes('RAZORPAY_KEY_ID') || error.message.includes('RAZORPAY_KEY_SECRET')) {
      errorMessage = 'Razorpay is not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in your server environment variables.';
      statusCode = 500;
    } else if (error.message.includes('authentication failed') || error.message.includes('Authentication failed')) {
      errorMessage = 'Razorpay authentication failed. Please verify your RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET are correct and match your Razorpay account (test/live mode).';
      statusCode = 401;
    } else if (error.message.includes('CLIENT_URL')) {
      errorMessage = 'CLIENT_URL is not configured. Please set CLIENT_URL in your server environment variables.';
      statusCode = 500;
    } else if (error.message.includes('SERVER_URL')) {
      errorMessage = 'SERVER_URL is not configured. Please set SERVER_URL in your server environment variables.';
      statusCode = 500;
    } else {
      errorMessage = error.message || 'Failed to create checkout session';
    }
    
    res.status(statusCode).json({ error: errorMessage });
  }
});

// GET /api/checkout/verify?session_id=...
// If paid, issues a short-lived download token
router.get('/verify', async (req, res) => {
  try {
    const { session_id } = req.query;
    if (!session_id) return res.status(400).json({ error: 'Missing session_id' });

    // Find order in database by Razorpay order ID
    const order = await Order.findOne({ razorpayOrderId: session_id }).populate('products.productId');
    if (!order) return res.status(404).json({ error: 'Order not found' });

    // Check if already paid and token exists
    if (order.paid && order.downloadToken && order.tokenExpiresAt && order.tokenExpiresAt.getTime() > Date.now()) {
      const downloads = order.products.map((op) => ({
        title: op.productId.title,
        slug: op.productId.slug,
        url: `${process.env.SERVER_URL}/api/download/${order.downloadToken}/${op.productId.slug}`
      }));

      return res.json({ downloads, expiresAt: order.tokenExpiresAt.toISOString() });
    }

    // Verify payment status with Razorpay
    const razorpayOrder = await getOrder(session_id);
    
    // Razorpay order status: created, attempted, paid
    // Payment status is checked via payments array
    if (razorpayOrder.status === 'paid') {
      // Issue short-lived token (15 minutes)
      const token = uuidv4();
      const expires = new Date(Date.now() + 15 * 60 * 1000);
      order.downloadToken = token;
      order.tokenExpiresAt = expires;
      order.paid = true;
      order.paymentStatus = 'SUCCESS';
      if (razorpayOrder.payments && razorpayOrder.payments.length > 0) {
        order.razorpayPaymentId = razorpayOrder.payments[0].id;
      }
      await order.save();

      const downloads = order.products.map((op) => ({
        title: op.productId.title,
        slug: op.productId.slug,
        url: `${process.env.SERVER_URL}/api/download/${token}/${op.productId.slug}`
      }));

      return res.json({ downloads, expiresAt: expires.toISOString() });
    }

    // Payment not successful
    return res.status(400).json({ 
      error: 'Payment not confirmed', 
      status: razorpayOrder.status || 'PENDING' 
    });
  } catch (error) {
    console.error('Error verifying checkout:', error);
    res.status(500).json({ error: 'Failed to verify checkout' });
  }
});

// POST /api/checkout/webhook
// Razorpay webhook handler for payment status updates
router.post('/webhook', async (req, res) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('RAZORPAY_WEBHOOK_SECRET not set');
      // Still return 200 for now (webhook secret is optional for testing)
    }

    const signature = req.headers['x-razorpay-signature'];

    // Verify webhook signature if secret is set
    if (webhookSecret && signature) {
      const crypto = await import('crypto');
      // Razorpay webhook signature verification
      // The signature is calculated using HMAC SHA256 with the webhook secret
      const webhookBody = JSON.stringify(req.body);
      const expectedSignature = crypto.default
        .createHmac('sha256', webhookSecret)
        .update(webhookBody)
        .digest('hex');

      if (expectedSignature !== signature) {
        console.error('Invalid webhook signature');
        return res.status(400).json({ error: 'Invalid signature' });
      }
    }

    const webhookData = req.body;
    console.log('Razorpay webhook received:', JSON.stringify(webhookData, null, 2));

    // Handle different webhook events
    const event = webhookData.event;
    const payload = webhookData.payload;

    if (event === 'payment_link.paid' || event === 'payment.captured') {
      // Payment successful
      const paymentEntity = payload.payment?.entity || payload.payment_link?.entity;
      const orderId = paymentEntity?.order_id;
      
      if (!orderId) {
        console.error('Missing order_id in webhook:', JSON.stringify(webhookData, null, 2));
        return res.status(400).json({ error: 'Missing order_id in webhook' });
      }

      // Find order by Razorpay order ID
      const order = await Order.findOne({ razorpayOrderId: orderId });
      if (!order) {
        console.error('Order not found for webhook:', orderId);
        // Return 200 to prevent Razorpay from retrying
        return res.status(200).json({ received: true, error: 'Order not found' });
      }

      // Only issue token if not already issued
      if (!order.downloadToken) {
        const token = uuidv4();
        const expires = new Date(Date.now() + 15 * 60 * 1000);
        order.downloadToken = token;
        order.tokenExpiresAt = expires;
      }
      order.paid = true;
      order.paymentStatus = 'SUCCESS';
      if (paymentEntity?.id) {
        order.razorpayPaymentId = paymentEntity.id;
      }
      await order.save();
      console.log('Order marked as paid:', orderId);

    } else if (event === 'payment.failed') {
      // Payment failed
      const paymentEntity = payload.payment?.entity;
      const orderId = paymentEntity?.order_id;
      
      if (orderId) {
        const order = await Order.findOne({ razorpayOrderId: orderId });
        if (order) {
          order.paymentStatus = 'FAILED';
          await order.save();
          console.log('Order marked as failed:', orderId);
        }
      }

    } else if (event === 'payment_link.cancelled') {
      // Payment cancelled
      const paymentLinkEntity = payload.payment_link?.entity;
      const orderId = paymentLinkEntity?.notes?.order_id;
      
      if (orderId) {
        const order = await Order.findOne({ razorpayOrderId: orderId });
        if (order) {
          order.paymentStatus = 'CANCELLED';
          await order.save();
          console.log('Order marked as cancelled:', orderId);
        }
      }
    }

    // Return 200 OK to Razorpay
    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    // Still return 200 to prevent Razorpay from retrying
    res.status(200).json({ received: true, error: error.message });
  }
});

export default router;
