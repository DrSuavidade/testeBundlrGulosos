import React, { useState } from 'react';
import { X, Plus, Minus, Info } from 'lucide-react';
import { Product } from '../types';
import { Button } from './ui/Button';
import { useCart } from '../context/CartContext';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(product, qty);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl max-w-4xl w-full flex flex-col md:flex-row max-h-[90vh] md:max-h-[600px] animate-slide-up">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/50 rounded-full hover:bg-white transition-colors"
        >
          <X className="text-[#4A3B32]" />
        </button>

        {/* Image Side */}
        <div className="w-full md:w-1/2 h-64 md:h-full bg-[#F2D0B6] relative">
           <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover"
           />
           {product.featured && (
             <span className="absolute top-4 left-4 bg-[#D87085] text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
               Destaque
             </span>
           )}
        </div>

        {/* Info Side */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col overflow-y-auto">
          <div className="flex-1">
            <h2 className="text-3xl font-nunito font-bold text-[#4A3B32] mb-2">{product.name}</h2>
            <div className="flex gap-2 mb-4">
              {product.tags.map(tag => (
                <span key={tag} className="text-xs font-bold uppercase tracking-wider text-[#D87085] bg-[#FFF6F1] px-2 py-1 rounded-md">
                  {tag}
                </span>
              ))}
            </div>
            
            <p className="text-[#4A3B32]/80 font-lato leading-relaxed mb-6">
              {product.description}
            </p>

            {product.allergens.length > 0 && (
              <div className="mb-6 p-4 bg-[#FFF6F1] rounded-xl border border-[#F2D0B6]">
                <div className="flex items-center gap-2 mb-2 text-[#D87085]">
                  <Info size={16} />
                  <span className="font-bold text-sm">Alérgenos</span>
                </div>
                <p className="text-sm text-[#4A3B32]">{product.allergens.join(', ')}.</p>
              </div>
            )}
          </div>

          <div className="mt-4 pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <span className="text-2xl font-bold text-[#4A3B32]">
                {product.price.toFixed(2).replace('.', ',')} €
              </span>
              
              <div className="flex items-center bg-[#FFF6F1] rounded-full border border-[#F2D0B6]">
                <button 
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="p-3 text-[#D87085] hover:bg-white rounded-full transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center font-bold text-[#4A3B32]">{qty}</span>
                <button 
                  onClick={() => setQty(qty + 1)}
                  className="p-3 text-[#D87085] hover:bg-white rounded-full transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <Button fullWidth size="lg" onClick={handleAdd}>
              Adicionar ao Pedido - {(product.price * qty).toFixed(2).replace('.', ',')} €
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
