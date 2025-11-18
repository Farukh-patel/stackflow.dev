import { useEffect, useState } from 'react';
import { verifyCheckout } from '../services/api.js';
import { SEO } from '../components/SEO.jsx';
import { useCart } from '../context/CartContext.jsx';

export function Success() {
  const [downloads, setDownloads] = useState([]);
  const [expiresAt, setExpiresAt] = useState('');
  const [error, setError] = useState('');
  const { clear } = useCart();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const session_id = params.get('session_id');
    if (!session_id) {
      setError('Missing session id');
      return;
    }
    (async () => {
      try {
        const data = await verifyCheckout(session_id);
        setDownloads(data.downloads || []);
        setExpiresAt(data.expiresAt || '');
        clear();
      } catch (e) {
        console.error('Verification error:', e);
        setError(e.response?.data?.error || 'Payment verification failed');
      }
    })();
  }, []);

  if (error) return <p className="text-red-500 dark:text-red-400">{error}</p>;

  return (
    <section className="text-slate-800 dark:text-gray-100">
      <SEO title="Success – stackflow.dev" description="Payment successful. Download your purchased notes." />
      <h2 className="text-xl sm:text-2xl font-semibold mb-2">Payment Successful</h2>
      <p className="text-sm sm:text-base text-slate-500 dark:text-gray-400">Your download links are below. They expire at: {expiresAt ? new Date(expiresAt).toLocaleString() : '-'}</p>
      <ul className="mt-4 space-y-3">
        {downloads.map((d) => (
          <li key={d.slug} className="flex items-center justify-between gap-2 sm:gap-4 p-4 border border-gray-200 dark:border-gray-800 rounded-2xl bg-white dark:bg-gray-900/70">
            <div>
              <span className="block font-semibold text-sm sm:text-base">{d.title}</span>
              <span className="text-xs text-slate-500 dark:text-gray-400">{d.slug}</span>
            </div>
            <a className="px-3 py-1 rounded-md bg-primary text-gray-900 text-xs sm:text-sm whitespace-nowrap" href={d.url}>Download</a>
          </li>
        ))}
      </ul>
    </section>
  );
}


