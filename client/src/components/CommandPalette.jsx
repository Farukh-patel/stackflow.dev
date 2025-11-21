import { useEffect, useMemo, useState } from 'react';

export function CommandPalette({ items = [], open, onClose, onSelect }) {
  const [query, setQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  useEffect(() => {
    if (open) {
      setQuery('');
      setHighlightedIndex(0);
    }
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items.slice(0, 8);
    return items
      .filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.category?.toLowerCase().includes(q) ||
          item.description?.toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [items, query]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        setHighlightedIndex((prev) => (prev + 1) % Math.max(filtered.length, 1));
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setHighlightedIndex((prev) =>
          prev === 0 ? Math.max(filtered.length - 1, 0) : prev - 1
        );
      } else if (event.key === 'Enter') {
        event.preventDefault();
        const item = filtered[highlightedIndex];
        if (item) {
          onSelect(item);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, filtered, highlightedIndex, onClose, onSelect]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm px-4 py-16">
      <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-slate-900/80 shadow-2xl shadow-primary/30">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
          <span className="text-sm text-primary font-semibold tracking-widest">CMD K</span>
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a stack, topic, or vibe…"
            className="flex-1 bg-transparent text-white text-base placeholder:text-gray-500 outline-none"
          />
          <button
            onClick={onClose}
            className="text-xs uppercase tracking-[0.3em] text-gray-400 hover:text-white transition"
          >
            ESC
          </button>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {filtered.length === 0 ? (
            <p className="px-5 py-6 text-sm text-gray-400">No kits match “{query}”. Try another keyword.</p>
          ) : (
            filtered.map((item, idx) => (
              <button
                key={item.slug}
                onClick={() => onSelect(item)}
                className={`w-full text-left px-5 py-4 transition ${
                  highlightedIndex === idx ? 'bg-primary/10 text-white' : 'text-gray-200 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-base font-semibold">{item.title}</p>
                    <p className="text-xs uppercase tracking-[0.3em] text-primary mt-1">
                      {item.category || 'General'}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-primary bg-primary/10 border border-primary/40 rounded-full px-3 py-1">
                    {item.isFree ? 'FREE' : `₹ ${(Number(item.priceInCents || 0) / 100).toFixed(0)}`}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mt-2 line-clamp-2">{item.description}</p>
              </button>
            ))
          )}
        </div>
        <div className="flex items-center justify-between px-5 py-3 text-xs text-gray-400 border-t border-white/5">
          <span>Quick jumps for the impatient dev generation</span>
          <span>↑↓ navigate • Enter open • Esc close</span>
        </div>
      </div>
    </div>
  );
}

