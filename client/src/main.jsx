import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles/index.css';
import { CartProvider } from './context/CartContext.jsx';

const THEME_KEY = 'stackflow-theme';

function ensureInitialTheme() {
  if (typeof window === 'undefined') return;
  try {
    const storedTheme = window.localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = storedTheme || (prefersDark ? 'dark' : 'light');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    window.__STACKFLOW_THEME__ = theme;
  } catch (error) {
    console.warn('Failed to set initial theme', error);
  }
}

ensureInitialTheme();

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);




