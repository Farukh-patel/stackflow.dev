import { Routes, Route, Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Home } from './pages/Home.jsx';
import { Products } from './pages/Products.jsx';
import { About } from './pages/About.jsx';
import { Checkout } from './pages/Checkout.jsx';
import { Success } from './pages/Success.jsx';
import { Logo } from './components/Logo.jsx';
import { useCart } from './context/CartContext.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-inter">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </main>
      {/* Floating Checkout for mobile users */}
      <FloatingCheckout />
      <Footer />
    </div>
  );
}

function Navbar() {
  const { items } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const count = items.reduce((s, i) => s + i.quantity, 0);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <header className="border-b border-gray-800/60 bg-gray-950/60 sticky top-0 backdrop-blur z-20">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Logo />
          <span className="text-base sm:text-lg font-semibold">stackflow.dev</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLink className={({ isActive }) => `text-base hover:text-primary transition-colors ${isActive ? 'text-primary' : ''}`} to="/">Home</NavLink>
          <NavLink className={({ isActive }) => `text-base hover:text-primary transition-colors ${isActive ? 'text-primary' : ''}`} to="/products">Products</NavLink>
          <NavLink className={({ isActive }) => `text-base hover:text-primary transition-colors ${isActive ? 'text-primary' : ''}`} to="/about">About</NavLink>
          <NavLink className={({ isActive }) => `text-base hover:text-primary transition-colors ${isActive ? 'text-primary' : ''}`} to="/checkout">
            <span className="flex items-center gap-1">
              Cart 
              {count > 0 && <span className="bg-primary text-gray-900 rounded-full px-2 py-0.5 text-xs font-bold">{count}</span>}
            </span>
          </NavLink>
          {count > 0 && (
            <Link to="/checkout" className="px-3 py-1.5 rounded-md bg-primary text-gray-900 font-medium">
              Checkout
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button + Quick Checkout */}
        <div className="md:hidden flex items-center gap-2">
        {count > 0 && (
          <Link to="/checkout" className="px-3 py-1.5 rounded-md bg-primary text-gray-900 font-medium text-sm">
            Checkout
          </Link>
        )}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 rounded-md hover:bg-gray-800 transition-colors"
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
        <nav className="md:hidden border-t border-gray-800/60 animate-fade-in duration-200">
          <div className="mx-auto max-w-6xl px-4 py-3 space-y-2">
            <NavLink 
              className={({ isActive }) => `block px-3 py-2 rounded-md hover:bg-gray-800/50 transition-colors ${isActive ? 'text-primary bg-gray-800/50' : ''}`} 
              to="/"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink 
              className={({ isActive }) => `block px-3 py-2 rounded-md hover:bg-gray-800/50 transition-colors ${isActive ? 'text-primary bg-gray-800/50' : ''}`} 
              to="/products"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </NavLink>
            <NavLink 
              className={({ isActive }) => `block px-3 py-2 rounded-md hover:bg-gray-800/50 transition-colors ${isActive ? 'text-primary bg-gray-800/50' : ''}`} 
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </NavLink>
            <NavLink 
              className={({ isActive }) => `block px-3 py-2 rounded-md hover:bg-gray-800/50 transition-colors ${isActive ? 'text-primary bg-gray-800/50' : ''}`} 
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
    <footer className="border-t border-gray-800/60 py-8 mt-16">
      <div className="mx-auto max-w-6xl px-4 text-sm text-gray-400 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>© {new Date().getFullYear()} stackflow.dev</p>
        <p>Built with React, Tailwind, Stripe</p>
      </div>
    </footer>
  );
}



