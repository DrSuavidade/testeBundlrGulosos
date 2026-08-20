import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Plus, Minus, Info, Palette } from 'lucide-react';
import { Product, ProductColor } from '../types';
import { Button } from './ui/Button';
import { useCart } from '../context/CartContext';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  // Determine initial color (first color or null)
  const hasColors = product.colors && product.colors.length > 0;
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(
    hasColors ? product.colors![0] : null
  );

  // Active image: color-specific image, or first of images[]
  const activeImage = selectedColor?.image ?? product.images[0];

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleAdd = () => {
    addToCart(product, qty);
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl max-w-4xl w-full flex flex-col md:flex-row max-h-[92vh] md:max-h-[600px] z-10 animate-slide-up">
        
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 bg-white/80 rounded-full hover:bg-white transition-colors shadow-md text-[#1E293B]"
          aria-label="Fechar"
        >
          <X size={20} />
        </button>

        {/* Image Side */}
        <div className="w-full md:w-1/2 h-48 sm:h-64 md:h-full bg-[#BFDBFE] relative shrink-0 overflow-hidden">
          <img 
            key={activeImage}
            src={activeImage}
            alt={selectedColor ? `${product.name} — ${selectedColor.name}` : product.name}
            className="w-full h-full object-cover transition-opacity duration-300"
          />
          {product.featured && (
            <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[#2563EB] text-white px-2.5 py-1 rounded-full text-xs sm:text-sm font-bold shadow-md">
              Destaque Pedra Mania
            </span>
          )}
          {/* Color name badge */}
          {selectedColor && (
            <span className="absolute bottom-3 left-3 bg-black/55 text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm flex items-center gap-1.5">
              <span
                className="w-3 h-3 rounded-full border border-white/60 inline-block shrink-0"
                style={{ backgroundColor: selectedColor.hex }}
              />
              {selectedColor.name}
            </span>
          )}
        </div>

        {/* Info Side */}
        <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-10 flex flex-col overflow-y-auto">
          <div className="flex-1">
            <h2 className="text-xl sm:text-3xl font-nunito font-bold text-[#1E293B] mb-2 pr-8">{product.name}</h2>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
              {product.tags.map(tag => (
                <span key={tag} className="text-[0.65rem] sm:text-xs font-extrabold uppercase tracking-wider text-[#2563EB] bg-[#F0F7FF] px-2.5 py-0.5 sm:py-1 rounded-md border border-[#BFDBFE]">
                  {tag}
                </span>
              ))}
            </div>
            
            <p className="text-xs sm:text-base text-[#1E293B]/80 font-lato leading-relaxed mb-4 sm:mb-5">
              {product.description}
            </p>

            {/* COLOR SELECTOR */}
            {hasColors && (
              <div className="mb-4 sm:mb-5">
                <div className="flex items-center gap-2 mb-2.5 text-[#1E293B]">
                  <Palette size={15} className="text-[#2563EB]" />
                  <span className="font-bold text-xs sm:text-sm">
                    Cor disponível: <span className="text-[#2563EB]">{selectedColor?.name}</span>
                  </span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {product.colors!.map((color) => {
                    const isSelected = selectedColor?.name === color.name;
                    return (
                      <button
                        key={color.name}
                        title={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={`relative w-9 h-9 rounded-full border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2563EB] ${
                          isSelected
                            ? 'border-[#2563EB] scale-110 shadow-md shadow-[#2563EB]/30'
                            : 'border-white shadow hover:scale-105 hover:border-gray-300'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        aria-label={`Cor: ${color.name}`}
                        aria-pressed={isSelected}
                      >
                        {isSelected && (
                          <span className="absolute inset-0 rounded-full border-2 border-white/70 scale-75" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Weight & Composition */}
            {(product.weight || product.composition) && (
              <div className="mb-4 sm:mb-5 flex flex-wrap gap-2">
                {product.weight && (
                  <span className="inline-flex items-center gap-1.5 bg-[#F0F7FF] border border-[#BFDBFE] text-[#2563EB] text-xs font-bold px-3 py-1.5 rounded-full">
                    ⚖️ {product.weight}
                  </span>
                )}
                {product.composition && (
                  <span className="inline-flex items-center gap-1.5 bg-[#F0F7FF] border border-[#BFDBFE] text-[#2563EB] text-xs font-bold px-3 py-1.5 rounded-full">
                    🧵 {product.composition}
                  </span>
                )}
              </div>
            )}

            {product.allergens.length > 0 && (
              <div className="mb-4 sm:mb-5 p-3 sm:p-4 bg-[#F0F7FF] rounded-xl border border-[#BFDBFE]">
                <div className="flex items-center gap-2 mb-1.5 sm:mb-2 text-[#2563EB]">
                  <Info size={16} />
                  <span className="font-bold text-xs sm:text-sm">Especificações do Material</span>
                </div>
                <ul className="text-xs sm:text-sm text-[#1E293B] space-y-1 list-disc list-inside">
                  {product.allergens.map((spec, i) => (
                    <li key={i}>{spec}</li>
                  ))}
                </ul>
              </div>
            )}

          </div>

          <div className="mt-2 sm:mt-4 pt-4 sm:pt-6 border-t border-gray-100 shrink-0">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <span className="text-xl sm:text-2xl font-black text-[#2563EB]">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </span>
              
              <div className="flex items-center bg-[#F0F7FF] rounded-full border border-[#BFDBFE]">
                <button 
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="p-2 sm:p-3 text-[#2563EB] hover:bg-white rounded-full transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="w-6 sm:w-8 text-center text-xs sm:text-base font-bold text-[#1E293B]">{qty}</span>
                <button 
                  onClick={() => setQty(qty + 1)}
                  className="p-2 sm:p-3 text-[#2563EB] hover:bg-white rounded-full transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            <Button fullWidth size="lg" onClick={handleAdd} className="py-3 sm:py-3.5 text-sm sm:text-lg">
              Adicionar ao Pedido — R$ {(product.price * qty).toFixed(2).replace('.', ',')}
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
