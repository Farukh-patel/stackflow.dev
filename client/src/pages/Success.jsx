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

  if (error) {
    return (
      <section className="text-slate-800 dark:text-gray-100">
        <SEO title="Payment Status – stackflow.dev" />
        <div className="p-6 border border-red-200 dark:border-red-800 rounded-2xl bg-red-50 dark:bg-red-900/20">
          <h2 className="text-xl font-semibold text-red-700 dark:text-red-300 mb-2">Payment Verification Issue</h2>
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <p className="text-sm text-slate-600 dark:text-gray-300">
            Don't worry! If your payment was successful, you should receive an email with download links shortly. 
            Please check your email inbox (and spam folder) for the confirmation email.
          </p>
          <p className="text-sm text-slate-600 dark:text-gray-300 mt-2">
            If you don't receive an email within a few minutes, please contact us at{' '}
            <a href="mailto:stackflowdotdev@gmail.com" className="text-primary underline">stackflowdotdev@gmail.com</a> with your order details.
          </p>
        </div>
      </section>
    );
  }

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


