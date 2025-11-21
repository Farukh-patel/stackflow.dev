import { useEffect, useState } from 'react';
import { fetchProducts, createCheckout, SERVER_URL } from '../services/api.js';
import { useCart } from '../context/CartContext.jsx';
import { SEO } from '../components/SEO.jsx';
import { CommandPalette } from '../components/CommandPalette.jsx';

export function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isPaletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchProducts();
        setProducts(data || []);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.response?.data?.error || err.message || 'Failed to load products. Please check server connection.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    const handleGlobalShortcut = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalShortcut);
    return () => window.removeEventListener('keydown', handleGlobalShortcut);
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

  // Skeleton loading component
  const ProductSkeleton = () => (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden bg-white dark:bg-gray-900/80 animate-pulse">
      <div className="w-full h-44 bg-gray-200 dark:bg-gray-800" />
      <div className="p-4 sm:p-5 space-y-3">
        <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6" />
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-4/6" />
        <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-full mt-4" />
      </div>
    </div>
  );

  if (loading) {
    return (
      <section>
        <SEO title="Products – stackflow.dev" description="Browse coding note packs across stacks and interviews." />
        <div className="bg-gradient-to-r from-indigo-100 via-purple-50 to-primary/10 dark:from-indigo-900/30 dark:via-purple-900/20 dark:to-primary/10 border border-primary/20 dark:border-primary/30 rounded-2xl p-5 sm:p-8 mb-6 sm:mb-10">
          <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/3 mb-3 animate-pulse" />
          <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-2/3 mb-2 animate-pulse" />
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full max-w-2xl animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <SEO title="Products – stackflow.dev" description="Browse coding note packs across stacks and interviews." />
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Available Notes</h2>
        <div className="p-4 bg-red-50 border border-red-200 rounded text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300">
          <p className="font-semibold mb-2">Error loading products</p>
          <p className="text-sm">{error}</p>
          <p className="text-sm mt-2 text-gray-400">Please check:</p>
          <ul className="text-sm mt-1 ml-4 list-disc text-gray-400">
            <li>Server is running and accessible</li>
            <li>Database is connected and seeded</li>
            <li>API endpoint is correct: {SERVER_URL}/api/products</li>
          </ul>
        </div>
      </section>
    );
  }

  const categories = ['All', ...Array.from(new Set(products.map((p) => (p.category || 'General').trim()))).sort((a, b) =>
    a.localeCompare(b)
  )];

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((p) => (p.category || 'General').trim() === selectedCategory);

  if (products.length === 0) {
    return (
      <section>
        <SEO title="Products – stackflow.dev" description="Browse coding note packs across stacks and interviews." />
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Available Notes</h2>
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded text-yellow-600 dark:bg-yellow-900/20 dark:border-yellow-700 dark:text-yellow-300">
          <p className="font-semibold mb-2">No products found</p>
          <p className="text-sm">The database appears to be empty. Products need to be seeded.</p>
          <p className="text-sm mt-2 text-gray-400">
            Run <code className="bg-gray-900 px-1 py-0.5 rounded">npm run seed</code> in the server directory to add products.
          </p>
        </div>
      </section>
    );
  }

  const focusProductCard = (slug) => {
    const element = document.getElementById(`product-${slug}`);
    if (!element) return;
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    element.classList.add('ring-2', 'ring-primary', 'shadow-primary/40');
    setTimeout(() => {
      element.classList.remove('ring-2', 'ring-primary', 'shadow-primary/40');
    }, 1500);
  };

  const handlePaletteSelect = (product) => {
    const targetCategory = (product.category || 'General').trim();
    if (selectedCategory !== targetCategory) {
      setSelectedCategory(targetCategory);
      // wait for render then focus
      setTimeout(() => focusProductCard(product.slug), 150);
    } else {
      focusProductCard(product.slug);
    }
    setPaletteOpen(false);
  };

  return (
    <section>
      <SEO title="Products – stackflow.dev" description="Browse coding note packs across stacks and interviews." />
      <CommandPalette
        items={products}
        open={isPaletteOpen}
        onClose={() => setPaletteOpen(false)}
        onSelect={handlePaletteSelect}
      />
      <div className="bg-gradient-to-r from-indigo-100 via-purple-50 to-primary/10 dark:from-indigo-900/30 dark:via-purple-900/20 dark:to-primary/10 border border-primary/20 dark:border-primary/30 rounded-2xl p-5 sm:p-8 mb-6 sm:mb-10">
        <p className="text-sm uppercase tracking-[0.3em] text-primary font-semibold mb-3">Curated learning tracks</p>
        <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white mb-2">Pick a category, unlock focused notes.</h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-gray-300 max-w-2xl">
          Switch between Python, AI & ML, DSA, JavaScript, Java, and more. Each category brings handpicked notes designed for quick wins.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  isActive
                    ? 'bg-primary text-gray-900 shadow-[0_10px_30px_rgba(34,211,238,0.35)]'
                    : 'bg-white text-slate-600 border border-gray-200 dark:bg-white/5 dark:text-gray-300 dark:border-white/10 hover:border-primary/50 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {category}
              </button>
            );
          })}
          <button
            onClick={() => setPaletteOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-slate-900 text-white border border-slate-800 dark:bg-white dark:text-gray-900 dark:border-white/20 hover:scale-105 transition"
          >
            <span>Quick Finder</span>
            <span className="text-xs opacity-70 border border-white/30 dark:border-gray-900 rounded-md px-2 py-0.5">
              Ctrl ⌘ K
            </span>
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between mb-3 sm:mb-5">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-gray-500 dark:text-gray-400">Collection</p>
          <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white">
            {selectedCategory === 'All' ? 'All premium notes' : `${selectedCategory} resources`}
          </h3>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">{filteredProducts.length} kits</span>
      </div>
      {filteredProducts.length === 0 ? (
        <div className="p-6 border border-yellow-200 dark:border-yellow-900/40 rounded-2xl bg-yellow-50 dark:bg-yellow-900/10 text-yellow-700 dark:text-yellow-300">
          <p className="font-semibold mb-1">No resources in this category yet.</p>
          <p className="text-sm text-yellow-600 dark:text-yellow-200">Check back soon—we’re curating more notes for {selectedCategory}.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredProducts.map((p) => (
            <article
              key={p._id}
              id={`product-${p.slug}`}
              className="border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden bg-white dark:bg-gray-900/80 hover:border-primary/60 transition group shadow-sm flex flex-col"
            >
              <div className="relative">
                <img src={`${SERVER_URL}${p.imageUrl}`} alt={p.title} className="w-full h-44 object-cover transition duration-500 group-hover:scale-[1.01]" />
                <span className="absolute top-3 left-3 bg-white/90 dark:bg-gray-900/80 text-xs uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200">
                  {(p.category || 'General').toUpperCase()}
                </span>
              </div>
              <div className="p-4 sm:p-5 flex flex-col gap-3 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold text-lg text-slate-900 dark:text-white">{p.title}</h3>
                  <span className="shrink-0 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 dark:bg-gray-800 dark:text-gray-100 border border-slate-200 dark:border-gray-700">
                    {p.isFree ? 'FREE' : `₹ ${(Number(p.priceInCents || 0) / 100).toFixed(0)}`}
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-gray-400 line-clamp-2 flex-1">{p.description}</p>
                {p.features && p.features.length > 0 && (
                  <div className="mt-2 space-y-1.5">
                    <p className="text-xs font-semibold text-slate-500 dark:text-gray-400 uppercase tracking-wide">What's inside:</p>
                    <ul className="space-y-1">
                      {p.features.slice(0, 4).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-gray-300">
                          <svg className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="flex-1">{feature}</span>
                        </li>
                      ))}
                      {p.features.length > 4 && (
                        <li className="text-xs text-primary font-medium pl-6">
                          +{p.features.length - 4} more topics
                        </li>
                      )}
                    </ul>
                  </div>
                )}
                <div className="text-xs text-slate-500 dark:text-gray-500 flex items-center gap-2 mt-2">
                  <span className="text-primary font-semibold">{getRandomCount(p.slug, p.isFree)}</span>
                  <span>{p.isFree ? 'downloads' : 'purchases'}</span>
                </div>
                <div className="mt-auto">
                  {p.isFree ? (
                    <button
                      onClick={() => onFreeDownload(p.slug)}
                      className="w-full px-4 py-2 rounded-lg border border-primary text-primary text-sm font-medium hover:bg-primary hover:text-gray-900 transition bg-white dark:bg-transparent"
                    >
                      Download instantly
                    </button>
                  ) : (() => {
                    const inCart = items.some((i) => i.slug === p.slug);
                    return (
                      <button
                        onClick={() => {
                          if (!inCart) addItem(p.slug);
                        }}
                        className={`w-full px-4 py-2 rounded-lg font-semibold text-sm transition ${
                          inCart
                            ? 'bg-gray-100 text-slate-500 border border-gray-200 cursor-default dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'
                            : 'bg-primary text-gray-900 hover:shadow-lg hover:shadow-primary/30'
                        }`}
                        aria-pressed={inCart}
                      >
                        {inCart ? 'Added to cart' : 'Add to cart'}
                      </button>
                    );
                  })()}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}


