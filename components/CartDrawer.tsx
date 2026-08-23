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
      <div className={`fixed inset-y-0 right-0 w-full sm:max-w-md bg-[#F0F7FF] shadow-2xl transform transition-transform duration-300 ease-in-out z-50 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#BFDBFE]">
          <h2 className="text-2xl font-nunito font-bold text-[#1E293B]">Sua Sacola de Insumos</h2>
          <button onClick={toggleCart} className="p-2 text-[#1E293B] hover:bg-[#93C5FD]/30 rounded-full">
            <X size={24} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="text-center py-20 text-[#1E293B]/50">
                <div className="mb-4 text-6xl">🧶</div>
                <p className="font-bold text-lg text-[#1E293B]">Sua sacola está vazia.</p>
                <p className="text-sm mt-1">Que tal escolher alguns fios de algodão ou kits de crochê?</p>
            </div>
          ) : (
            items.map((item) => {
              const matchedColorObj = item.colors?.find(c => c.name === item.selectedColor);
              const itemImage = matchedColorObj?.image || item.images?.[0] || '';
              const itemKey = `${item.id}-${item.selectedColor || 'default'}`;

              return (
                <div key={itemKey} className="flex gap-4 bg-white p-4 rounded-2xl shadow-sm border border-[#BFDBFE]/40">
                  <img src={itemImage} alt={item.name} className="w-20 h-20 object-cover rounded-xl shrink-0" />
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <h3 className="font-bold text-[#1E293B] text-sm leading-tight truncate">{item.name}</h3>
                      {item.selectedColor && (
                        <p className="text-xs text-gray-500 font-semibold mt-0.5 flex items-center gap-1.5">
                          {matchedColorObj?.hex && (
                            <span
                              className="w-2.5 h-2.5 rounded-full border border-gray-300 inline-block shrink-0"
                              style={{ backgroundColor: matchedColorObj.hex }}
                            />
                          )}
                          <span>Cor: {item.selectedColor}</span>
                        </p>
                      )}
                      <p className="text-xs text-[#2563EB] font-bold mt-1">R$ {item.price.toFixed(2).replace('.', ',')} un</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                       <div className="flex items-center bg-[#F0F7FF] rounded-full border border-[#BFDBFE] h-8">
                          <button 
                            onClick={() => updateQty(item.id, item.qty - 1, item.selectedColor)}
                            className="px-2 text-[#2563EB] hover:text-[#1E293B]"
                            disabled={item.qty <= 1}
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-[#1E293B]">{item.qty}</span>
                          <button 
                            onClick={() => updateQty(item.id, item.qty + 1, item.selectedColor)}
                            className="px-2 text-[#2563EB] hover:text-[#1E293B]"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id, item.selectedColor)}
                          className="text-gray-400 hover:text-red-400 p-1"
                          aria-label="Remover item"
                        >
                          <Trash2 size={16} />
                        </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 bg-white border-t border-[#BFDBFE]">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[#1E293B] font-lato">Subtotal</span>
              <span className="text-xl font-bold text-[#2563EB]">R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
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
