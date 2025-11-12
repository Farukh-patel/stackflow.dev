import { useEffect, useState } from 'react';
import { fetchProducts, createCheckout, SERVER_URL } from '../services/api.js';
import { useCart } from '../context/CartContext.jsx';
import { SEO } from '../components/SEO.jsx';

export function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const { addItem, items } = useCart();

  // Generate consistent random number based on product slug
  const getRandomCount = (slug, isFree) => {
    let hash = 0;
    for (let i = 0; i < slug.length; i++) {
      hash = slug.charCodeAt(i) + ((hash << 5) - hash);
    }
    const seed = Math.abs(hash);
    // Free products: 200-1500 downloads (more popular)
    // Paid products: 50-500 purchases
    let count;
    if (isFree) {
      count = seed % (1500 - 200 + 1) + 200;
    } else {
      count = seed % (500 - 50 + 1) + 50;
    }

    // Bucket to nearest lower 50 for readability: 100–149 => 100+, 150–199 => 150+
    if (count < 1000) {
      const base = Math.floor(count / 50) * 50;
      return `${base}+`;
    }
    // For 1000 and above, use k notation with one decimal
    const kValue = (Math.floor(count / 100) / 10).toFixed(1); // e.g., 1530 -> 1.5k+
    return `${kValue}k+`;
  };

  const onFreeDownload = (slug) => {
    window.location.href = `${SERVER_URL}/api/download/free/${slug}`;
  };

  if (loading) return <p>Loading...</p>;

  return (
    <section>
      <SEO title="Products – stackflow.dev" description="Browse coding note packs across stacks and interviews." />
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Available Notes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {products.map((p) => (
          <article key={p._id} className="border border-gray-800 rounded-lg overflow-hidden">
            <img src={`${SERVER_URL}${p.imageUrl}`} alt={p.title} className="w-full h-40 object-cover" />
            <div className="p-3 sm:p-4">
              <h3 className="font-semibold text-sm sm:text-base">{p.title}</h3>
              <p className="text-xs sm:text-sm text-gray-400 mt-1 line-clamp-2">{p.description}</p>
              <p className="text-xs text-gray-500 mt-2">
                {getRandomCount(p.slug, p.isFree)} {p.isFree ? 'downloads' : 'purchased'}
              </p>
              <div className="mt-3 flex items-center justify-between gap-2">
                <p className="text-primary font-medium text-sm sm:text-base">{p.isFree ? 'Free' : `₹ ${(p.priceInCents / 100).toFixed(0)}`}</p>
                {p.isFree ? (
                  <button onClick={() => onFreeDownload(p.slug)} className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-md border border-primary text-primary text-xs sm:text-sm whitespace-nowrap">Download</button>
                ) : (
                  (() => {
                    const inCart = items.some((i) => i.slug === p.slug);
                    return (
                      <button
                        onClick={() => { if (!inCart) addItem(p.slug); }}
                        className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-md font-medium text-xs sm:text-sm ${inCart ? 'bg-gray-800 text-gray-300 border border-gray-700 cursor-default' : 'bg-primary text-gray-900'}`}
                        aria-pressed={inCart}
                      >
                        {inCart ? 'Added' : 'Add to Cart'}
                      </button>
                    );
                  })()
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}


