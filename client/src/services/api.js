import axios from 'axios';

// Prefer environment variable; otherwise auto-pick a sensible default per environment
const defaultServerUrl = import.meta.env.PROD
  ? 'https://stackflow-dev-1.onrender.com'
  : 'http://localhost:5000';
export const SERVER_URL = import.meta.env.VITE_SERVER_URL || defaultServerUrl;

// Debug logging (only in development or if explicitly enabled)
if (import.meta.env.DEV || import.meta.env.VITE_DEBUG) {
  console.log('🔧 API Configuration:', {
    isProduction: import.meta.env.PROD,
    viteServerUrl: import.meta.env.VITE_SERVER_URL,
    defaultServerUrl,
    finalServerUrl: SERVER_URL
  });
}

export async function fetchProducts() {
  const url = `${SERVER_URL}/api/products`;
  if (import.meta.env.DEV || import.meta.env.VITE_DEBUG) {
    console.log('📡 Fetching products from:', url);
  }
  try {
    const { data } = await axios.get(url);
    if (import.meta.env.DEV || import.meta.env.VITE_DEBUG) {
      console.log('✅ Products fetched:', data?.length || 0, 'products');
    }
  return data;
  } catch (error) {
    if (import.meta.env.DEV || import.meta.env.VITE_DEBUG) {
      console.error('❌ Error fetching products:', {
        url,
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
    }
    throw error;
  }
}

export async function createCheckout(email, items) {
  const { data } = await axios.post(`${SERVER_URL}/api/checkout/create-session`, { email, items });
  return data;
}

export async function verifyCheckout(sessionId) {
  const { data } = await axios.get(`${SERVER_URL}/api/checkout/verify`, { params: { session_id: sessionId } });
  return data;
}



