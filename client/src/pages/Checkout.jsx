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
    <section className="space-y-6 text-slate-800 dark:text-gray-100">
      <SEO title="Checkout – stackflow.dev" description="Complete purchase and receive secure downloads." />
      <h2 className="text-2xl font-semibold mb-2">Checkout</h2>
      <p className="text-sm text-slate-500 dark:text-gray-400 mb-4">Secure payments powered by Razorpay.</p>
      <div className="grid md:grid-cols-3 gap-6 md:gap-8">
        <div className="md:col-span-2 space-y-4">
          {cartDetails.length === 0 ? (
            <p className="text-slate-500 dark:text-gray-400">Your cart is empty. Add items from the Products page.</p>
          ) : (
            cartDetails.map(({ product, quantity }) => (
              <div key={product.slug} className="flex items-center gap-3 sm:gap-4 p-4 border border-gray-200 dark:border-gray-800 rounded-2xl bg-white dark:bg-gray-900/70">
                <img src={`${SERVER_URL}${product.imageUrl}`} alt={product.title} className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm sm:text-base truncate">{product.title}</p>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-gray-400">₹ {(product.priceInCents / 100).toFixed(0)}</p>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-gray-400">
                  <span className="font-semibold text-slate-700 dark:text-gray-100">x{quantity}</span>
                  <button className="text-red-500 dark:text-red-400 text-sm sm:text-base whitespace-nowrap" onClick={() => removeItem(product.slug)}>Remove</button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 h-max bg-white dark:bg-gray-900/70 shadow-sm space-y-3">
          <label className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-gray-400">Email</label>
          <input 
            className="mt-1 w-full px-3 py-2.5 rounded-xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-sm sm:text-base text-slate-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/70" 
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
            <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300 text-sm">
              {error}
              {error.includes('RAZORPAY_KEY_ID') && (
                <div className="mt-2 text-xs text-slate-500 dark:text-gray-400">
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
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="uppercase tracking-[0.35em] text-slate-500 dark:text-gray-400">Total</span>
            <span className="text-2xl font-semibold text-slate-900 dark:text-white">₹ {(total / 100).toFixed(0)}</span>
          </div>
          <button 
            onClick={pay} 
            disabled={loading || cartDetails.length === 0}
            className="mt-5 w-full px-4 py-3 rounded-xl bg-primary text-gray-900 font-semibold text-base disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_15px_35px_rgba(34,211,238,0.35)]"
          >
            {loading ? 'Processing...' : 'Pay with Card / UPI'}
          </button>
          <button 
            onClick={() => clear()} 
            disabled={loading}
            className="mt-2 w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 text-sm sm:text-base text-slate-600 dark:text-gray-300 disabled:opacity-50"
          >
            Clear Cart
          </button>
          <p className="text-xs text-slate-500 dark:text-gray-500 mt-3">Need help? <a href="/contact" className="text-primary">Contact us</a>.</p>
        </div>
      </div>
    </section>
  );
}


