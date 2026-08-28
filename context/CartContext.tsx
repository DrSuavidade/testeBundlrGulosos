import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { CartItem, Product } from '../types';

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  addToCart: (product: Product, qty?: number, selectedColor?: string) => void;
  removeFromCart: (productId: string, selectedColor?: string) => void;
  updateQty: (productId: string, qty: number, selectedColor?: string) => void;
  toggleCart: () => void;
  clearCart: () => void;
  cartTotal: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

const CART_STORAGE_KEY = 'pedra_mania_cart';

const getInitialCart = (): CartItem[] => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(getInitialCart);
  const [isOpen, setIsOpen] = useState(false);

  const [lastAddedItem, setLastAddedItem] = useState<{name: string, timestamp: number} | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [items]);

  useEffect(() => {
    if (!lastAddedItem) return;
    const timer = setTimeout(() => {
      setLastAddedItem(null);
    }, 3000);
    return () => clearTimeout(timer);
  }, [lastAddedItem]);

  const addToCart = (product: Product, qty = 1, selectedColor?: string) => {
    if (product.stock <= 0) {
      alert(`O produto "${product.name}" está temporariamente indisponível.`);
      return;
    }

    setItems(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedColor === selectedColor);
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && item.selectedColor === selectedColor)
            ? { ...item, qty: Math.min(product.stock, item.qty + qty) }
            : item
        );
      }
      return [...prev, { ...product, qty: Math.min(product.stock, qty), selectedColor }];
    });
    
    // Instead of opening drawer, show a toast
    setLastAddedItem({ name: product.name, timestamp: Date.now() });
  };

  const removeFromCart = (productId: string, selectedColor?: string) => {
    setItems(prev => prev.filter(item => !(item.id === productId && item.selectedColor === selectedColor)));
  };

  const updateQty = (productId: string, qty: number, selectedColor?: string) => {
    if (qty < 1) return;
    setItems(prev => prev.map(item => 
      (item.id === productId && item.selectedColor === selectedColor) ? { ...item, qty } : item
    ));
  };

  const toggleCart = () => setIsOpen(prev => !prev);
  const clearCart = () => setItems([]);

  const cartTotal = items.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const itemCount = items.reduce((acc, item) => acc + item.qty, 0);

  return (
    <CartContext.Provider value={{ 
      items, isOpen, addToCart, removeFromCart, updateQty, toggleCart, clearCart, cartTotal, itemCount 
    }}>
      {children}
      {/* Toast Notification for Adding Items */}
      <div 
        className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[9999] transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${
          lastAddedItem ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95 pointer-events-none'
        }`}
      >
        {lastAddedItem && (
          <div className="bg-[#1E293B] text-white px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl shadow-xl flex items-center gap-3 border border-white/10">
            <div className="w-8 h-8 rounded-full bg-[#2563EB]/20 flex items-center justify-center shrink-0">
              <span className="text-[#93C5FD]">✓</span>
            </div>
            <div>
              <p className="text-[10px] sm:text-xs font-bold text-[#93C5FD] uppercase tracking-wider mb-0.5">Adicionado</p>
              <p className="text-xs sm:text-sm font-medium pr-2 max-w-[150px] sm:max-w-[200px] truncate">{lastAddedItem.name}</p>
            </div>
            <button 
              onClick={() => setLastAddedItem(null)}
              className="p-1 hover:bg-white/10 rounded-full transition-colors shrink-0 -mr-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/60 hover:text-white"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        )}
      </div>
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};