import Razorpay from 'razorpay';

/**
 * Get Razorpay instance
 */
export function getRazorpay() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  
  if (!keyId || !keySecret) {
    throw new Error('RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET must be set in environment variables');
  }
  
  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret
  });
}

/**
 * Create a Razorpay order
 * @param {Object} orderData - Order data
 * @returns {Promise<Object>} Order response
 */
export async function createOrder(orderData) {
  try {
    const razorpay = getRazorpay();
    const order = await razorpay.orders.create(orderData);
    return order;
  } catch (error) {
    console.error('Razorpay create order error:', error);
    throw new Error(error.description || error.message || 'Failed to create Razorpay order');
  }
}

/**
 * Get order details from Razorpay
 * @param {string} orderId - Razorpay order ID
 * @returns {Promise<Object>} Order details
 */
export async function getOrder(orderId) {
  try {
    const razorpay = getRazorpay();
    const order = await razorpay.orders.fetch(orderId);
    return order;
  } catch (error) {
    console.error('Razorpay get order error:', error);
    throw new Error(error.description || error.message || 'Failed to get Razorpay order');
  }
}

/**
 * Create a Razorpay payment link
 * @param {Object} paymentLinkData - Payment link data
 * @returns {Promise<Object>} Payment link response
 */
export async function createPaymentLink(paymentLinkData) {
  try {
    const razorpay = getRazorpay();
    const paymentLink = await razorpay.paymentLink.create(paymentLinkData);
    return paymentLink;
  } catch (error) {
    console.error('Razorpay create payment link error:', error);
    throw new Error(error.description || error.message || 'Failed to create Razorpay payment link');
  }
}


