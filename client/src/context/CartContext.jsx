import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'cart_v1';

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const api = useMemo(() => ({
    items,
    addItem: (slug) => {
      setItems((prev) => {
        // Don't add duplicates - users buy notes once
        if (prev.find((i) => i.slug === slug)) {
          return prev;
        }
        return [...prev, { slug, quantity: 1 }];
      });
    },
    removeItem: (slug) => {
      setItems((prev) => prev.filter((i) => i.slug !== slug));
    },
    clear: () => setItems([])
  }), [items]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}



