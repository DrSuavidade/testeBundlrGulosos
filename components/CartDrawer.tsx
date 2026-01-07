import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from './ui/Button';

interface CartDrawerProps {
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onCheckout }) => {
  const { isOpen, items, toggleCart, removeFromCart, updateQty, cartTotal } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleCart}
      />
      
      {/* Drawer */}
      <div className={`fixed inset-y-0 right-0 max-w-md w-full bg-[#FFF6F1] shadow-2xl transform transition-transform duration-300 ease-in-out z-50 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#F2D0B6]">
          <h2 className="text-2xl font-nunito font-bold text-[#4A3B32]">Seu Pedido</h2>
          <button onClick={toggleCart} className="p-2 text-[#4A3B32] hover:bg-[#F6B9C3]/20 rounded-full">
            <X size={24} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="text-center py-20 text-[#4A3B32]/50">
                <div className="mb-4 text-6xl">🥯</div>
                <p>Sua cesta está vazia.</p>
                <p className="text-sm">Que tal escolher algo gostoso?</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 bg-white p-4 rounded-2xl shadow-sm">
                <img src={item.images[0]} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-[#4A3B32] text-sm leading-tight">{item.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{item.price.toFixed(2)} € un</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                     <div className="flex items-center bg-[#FFF6F1] rounded-full border border-[#F2D0B6] h-8">
                        <button 
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          className="px-2 text-[#D87085] hover:text-[#4A3B32]"
                          disabled={item.qty <= 1}
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-[#4A3B32]">{item.qty}</span>
                        <button 
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="px-2 text-[#D87085] hover:text-[#4A3B32]"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-400"
                      >
                        <Trash2 size={16} />
                      </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 bg-white border-t border-[#F2D0B6]">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[#4A3B32] font-lato">Subtotal</span>
              <span className="text-xl font-bold text-[#4A3B32]">{cartTotal.toFixed(2).replace('.', ',')} €</span>
            </div>
            <Button 
                fullWidth 
                size="lg" 
                onClick={() => {
                    toggleCart();
                    onCheckout();
                }}
                className="flex items-center justify-center gap-2"
            >
              Finalizar Pedido <ArrowRight size={20} />
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
