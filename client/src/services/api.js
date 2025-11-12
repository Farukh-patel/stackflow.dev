import axios from 'axios';

export const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';

export async function fetchProducts() {
  const { data } = await axios.get(`${SERVER_URL}/api/products`);
  return data;
}

export async function createCheckout(email, items) {
  const { data } = await axios.post(`${SERVER_URL}/api/checkout/create-session`, { email, items });
  return data;
}

export async function verifyCheckout(sessionId) {
  const { data } = await axios.get(`${SERVER_URL}/api/checkout/verify`, { params: { session_id: sessionId } });
  return data;
}



