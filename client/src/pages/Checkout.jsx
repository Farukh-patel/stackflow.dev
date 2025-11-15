import { useEffect, useMemo, useState } from 'react';
import { fetchProducts, createCheckout, SERVER_URL } from '../services/api.js';
import { SEO } from '../components/SEO.jsx';
import { useCart } from '../context/CartContext.jsx';

export function Checkout() {
  const [products, setProducts] = useState([]);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { items, removeItem, clear } = useCart();

  useEffect(() => {
    (async () => {
      const data = await fetchProducts();
      setProducts(data);
    })();
  }, []);

  const cartDetails = useMemo(() => {
    const bySlug = new Map(products.map((p) => [p.slug, p]));
    return items
      .map((ci) => ({ product: bySlug.get(ci.slug), quantity: ci.quantity }))
      .filter((x) => x.product && !x.product.isFree);
  }, [items, products]);

  const total = cartDetails.reduce((sum, x) => sum + x.product.priceInCents * x.quantity, 0);

  const pay = async () => {
    setError('');
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    if (cartDetails.length === 0) {
      setError('Your cart is empty');
      return;
    }
    
    setLoading(true);
    
    try {
      const payload = cartDetails.map((x) => ({ slug: x.product.slug, quantity: x.quantity }));
      const session = await createCheckout(email, payload);
      
      if (session?.url) {
        window.location.href = session.url;
      } else {
        setError('Failed to create checkout session. Please try again.');
        setLoading(false);
      }
    } catch (err) {
      console.error('Checkout error:', err);
      const errorMessage = err.response?.data?.error || err.message || 'Failed to process payment. Please check your server configuration.';
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <section>
      <SEO title="Checkout – stackflow.dev" description="Complete purchase and receive secure downloads." />
      <h2 className="text-2xl font-semibold mb-6">Checkout</h2>
      <div className="grid md:grid-cols-3 gap-6 md:gap-8">
        <div className="md:col-span-2 space-y-4">
          {cartDetails.length === 0 ? (
            <p className="text-gray-400">Your cart is empty. Add items from the Products page.</p>
          ) : (
            cartDetails.map(({ product, quantity }) => (
              <div key={product.slug} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border border-gray-800 rounded-md">
                <img src={`${SERVER_URL}${product.imageUrl}`} alt={product.title} className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm sm:text-base truncate">{product.title}</p>
                  <p className="text-xs sm:text-sm text-gray-400">₹ {(product.priceInCents / 100).toFixed(0)}</p>
                </div>
                <button className="ml-2 sm:ml-4 text-red-400 text-sm sm:text-base whitespace-nowrap" onClick={() => removeItem(product.slug)}>Remove</button>
              </div>
            ))
          )}
        </div>
        <div className="border border-gray-800 rounded-md p-4 h-max">
          <label className="text-sm text-gray-400">Email</label>
          <input 
            className="mt-1 w-full px-3 py-2 rounded-md bg-gray-900 border border-gray-800 text-sm sm:text-base" 
            value={email} 
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }} 
            placeholder="you@example.com"
            type="email"
            disabled={loading}
          />
          {error && (
            <div className="mt-2 p-2 bg-red-900/20 border border-red-800 rounded text-red-400 text-sm">
              {error}
              {error.includes('RAZORPAY_KEY_ID') && (
                <div className="mt-2 text-xs text-gray-400">
                  <p>To fix this:</p>
                  <ol className="list-decimal list-inside ml-2 mt-1 space-y-1">
                    <li>Create a <code>.env</code> file in the <code>server</code> directory</li>
                    <li>Add your Razorpay credentials from the template</li>
                    <li>Restart your server</li>
                  </ol>
                </div>
              )}
            </div>
          )}
          <div className="mt-4 flex items-center justify-between">
            <span>Total</span>
            <span className="text-primary font-semibold">₹ {(total / 100).toFixed(0)}</span>
          </div>
          <button 
            onClick={pay} 
            disabled={loading || cartDetails.length === 0}
            className="mt-4 w-full px-4 py-2 rounded-md bg-primary text-gray-900 font-medium text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 'Pay with Card / UPI'}
          </button>
          <button 
            onClick={() => clear()} 
            disabled={loading}
            className="mt-2 w-full px-4 py-2 rounded-md border border-gray-700 text-sm sm:text-base disabled:opacity-50"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </section>
  );
}


