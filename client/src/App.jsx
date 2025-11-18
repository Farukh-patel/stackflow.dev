import { Routes, Route, Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Home } from './pages/Home.jsx';
import { Products } from './pages/Products.jsx';
import { About } from './pages/About.jsx';
import { Checkout } from './pages/Checkout.jsx';
import { Success } from './pages/Success.jsx';
import { Terms } from './pages/Terms.jsx';
import { RefundPolicy } from './pages/RefundPolicy.jsx';
import { PrivacyPolicy } from './pages/PrivacyPolicy.jsx';
import { Contact } from './pages/Contact.jsx';
import { Logo } from './components/Logo.jsx';
import { useCart } from './context/CartContext.jsx';

const THEME_KEY = 'stackflow-theme';

const getInitialTheme = () => {
  if (typeof window === 'undefined') return { value: 'dark', persisted: false };
  const stored = window.localStorage.getItem(THEME_KEY);
  if (stored === 'light' || stored === 'dark') {
    return { value: stored, persisted: true };
  }
  const bootstrapped = window.__STACKFLOW_THEME__;
  if (bootstrapped === 'light' || bootstrapped === 'dark') {
    return { value: bootstrapped, persisted: false };
  }
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return { value: prefersDark ? 'dark' : 'light', persisted: false };
};

export default function App() {
  const [{ value: theme, persisted }, setThemeState] = useState(getInitialTheme);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    window.__STACKFLOW_THEME__ = theme;
    if (persisted) {
      localStorage.setItem(THEME_KEY, theme);
    } else {
      localStorage.removeItem(THEME_KEY);
    }
  }, [theme, persisted]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event) => {
      setThemeState((current) => {
        if (current.persisted) return current;
        return { value: event.matches ? 'dark' : 'light', persisted: false };
      });
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    setThemeState((prev) => ({
      value: prev.value === 'dark' ? 'light' : 'dark',
      persisted: true
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 dark:bg-gray-950 dark:text-gray-100 font-inter transition-colors duration-300">
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      {/* Floating Checkout for mobile users */}
      <FloatingCheckout />
      <Footer />
    </div>
  );
}

function Navbar({ theme, onToggleTheme }) {
  const { items } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const count = items.reduce((s, i) => s + i.quantity, 0);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <header className="border-b border-gray-200/70 dark:border-gray-800/60 bg-white/80 dark:bg-gray-950/70 sticky top-0 backdrop-blur z-20 transition-colors">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Logo />
          <span className="text-base sm:text-lg font-semibold text-slate-900 dark:text-gray-100">stackflow.dev</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-5">
          <NavLink className={({ isActive }) => `text-base hover:text-primary transition-colors ${isActive ? 'text-primary' : 'text-slate-600 dark:text-gray-300'}`} to="/">Home</NavLink>
          <NavLink className={({ isActive }) => `text-base hover:text-primary transition-colors ${isActive ? 'text-primary' : 'text-slate-600 dark:text-gray-300'}`} to="/products">Products</NavLink>
          <NavLink className={({ isActive }) => `text-base hover:text-primary transition-colors ${isActive ? 'text-primary' : 'text-slate-600 dark:text-gray-300'}`} to="/about">About</NavLink>
          <NavLink className={({ isActive }) => `text-base hover:text-primary transition-colors ${isActive ? 'text-primary' : 'text-slate-600 dark:text-gray-300'}`} to="/contact">Contact</NavLink>
          <NavLink className={({ isActive }) => `text-base hover:text-primary transition-colors ${isActive ? 'text-primary' : 'text-slate-600 dark:text-gray-300'}`} to="/checkout">
            <span className="flex items-center gap-1">
              Cart 
              {count > 0 && <span className="bg-primary text-gray-900 rounded-full px-2 py-0.5 text-xs font-bold">{count}</span>}
            </span>
          </NavLink>
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-full border border-gray-200 dark:border-gray-800 text-slate-700 dark:text-gray-200 hover:border-primary transition-colors"
            aria-label="Toggle color theme"
          >
            {theme === 'dark' ? (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M7.05 16.95l-1.414 1.414m0-11.314l1.414 1.414m11.314 11.314l-1.414-1.414M12 7a5 5 0 100 10 5 5 0 000-10z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
              </svg>
            )}
          </button>
          {count > 0 && (
            <Link to="/checkout" className="px-3 py-1.5 rounded-md bg-primary text-gray-900 font-medium">
              Checkout
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button + Quick Checkout */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-full border border-gray-200 dark:border-gray-800 text-slate-700 dark:text-gray-200 hover:border-primary transition-colors"
            aria-label="Toggle color theme"
          >
            {theme === 'dark' ? (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M7.05 16.95l-1.414 1.414m0-11.314l1.414 1.414m11.314 11.314l-1.414-1.414M12 7a5 5 0 100 10 5 5 0 000-10z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
              </svg>
            )}
          </button>
          {count > 0 && (
            <Link to="/checkout" className="px-3 py-1.5 rounded-md bg-primary text-gray-900 font-medium text-sm">
              Checkout
            </Link>
          )}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-gray-200 dark:border-gray-800 animate-fade-in duration-200 bg-white/90 dark:bg-gray-950/90 backdrop-blur">
          <div className="mx-auto max-w-6xl px-4 py-3 space-y-2">
            <NavLink 
              className={({ isActive }) => `block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${isActive ? 'text-primary bg-gray-100 dark:bg-gray-800' : ''}`} 
              to="/"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink 
              className={({ isActive }) => `block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${isActive ? 'text-primary bg-gray-100 dark:bg-gray-800' : ''}`} 
              to="/products"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </NavLink>
            <NavLink 
              className={({ isActive }) => `block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${isActive ? 'text-primary bg-gray-100 dark:bg-gray-800' : ''}`} 
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </NavLink>
            <NavLink 
              className={({ isActive }) => `block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${isActive ? 'text-primary bg-gray-100 dark:bg-gray-800' : ''}`} 
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </NavLink>
            <NavLink 
              className={({ isActive }) => `block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${isActive ? 'text-primary bg-gray-100 dark:bg-gray-800' : ''}`} 
              to="/checkout"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="flex items-center justify-between">
                Cart
                {count > 0 && <span className="bg-primary text-gray-900 rounded-full px-2 py-0.5 text-xs font-bold">{count}</span>}
              </span>
            </NavLink>
          </div>
        </nav>
      )}
    </header>
  );
}

function FloatingCheckout() {
  const { items } = useCart();
  const count = items.reduce((s, i) => s + i.quantity, 0);
  if (count === 0) return null;
  return (
    <Link
      to="/checkout"
      className="md:hidden fixed bottom-4 right-4 px-4 py-3 rounded-full bg-primary text-gray-900 font-semibold shadow-lg shadow-black/30"
      aria-label="Go to checkout"
    >
      Checkout • {count}
    </Link>
  );
}

function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 py-8 mt-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <p className="text-sm text-slate-500 dark:text-gray-400">© {new Date().getFullYear()} stackflow.dev</p>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-500 dark:text-gray-400">
          <Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link>
          <Link to="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link>
          <Link to="/refund-policy" className="hover:text-primary transition-colors">Refund Policy</Link>
          <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
        </nav>
      </div>
    </footer>
  );
}



