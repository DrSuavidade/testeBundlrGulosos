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

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [items]);

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
    setIsOpen(true);
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
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};