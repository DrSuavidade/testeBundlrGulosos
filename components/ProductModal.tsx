import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Plus, Minus, Info, Palette, AlertTriangle } from 'lucide-react';
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
    document.documentElement.style.overflow = 'hidden'; // Ensure html also doesn't scroll
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  const handleAdd = () => {
    addToCart(product, qty, selectedColor?.name);
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
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
        <div className="w-full md:w-1/2 h-56 sm:h-72 md:h-auto relative bg-[#F0F7FF] shrink-0 overflow-hidden flex items-center justify-center">
          <img 
            key={activeImage}
            src={activeImage}
            alt={selectedColor ? `${product.name} — ${selectedColor.name}` : product.name}
            className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-300"
          />
          {product.featured && (
            <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[#2563EB] text-white px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold shadow-md">
              Destaque Pedra Mania
            </span>
          )}
          {/* Color name badge */}
          {selectedColor && (
            <span className="absolute bottom-3 left-3 bg-black/60 text-white px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold backdrop-blur-sm flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full border border-white/60 inline-block shrink-0"
                style={{ backgroundColor: selectedColor.hex }}
              />
              {selectedColor.name}
            </span>
          )}
        </div>

        {/* Info Side */}
        <div className="w-full md:w-1/2 p-4 sm:p-5 md:p-8 flex flex-col overflow-y-auto">
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl font-nunito font-bold text-[#1E293B] mb-2 pr-8 leading-tight">{product.name}</h2>
            <div className="flex flex-wrap gap-1.5 mb-2.5">
              {product.tags.map(tag => (
                <span key={tag} className="text-[0.65rem] sm:text-[10px] font-extrabold uppercase tracking-wider text-[#2563EB] bg-[#F0F7FF] px-2 py-0.5 rounded-md border border-[#BFDBFE]">
                  {tag}
                </span>
              ))}
            </div>
            
            <p className="text-xs sm:text-sm text-[#1E293B]/80 font-lato leading-relaxed mb-3 sm:mb-4">
              {product.description}
            </p>

            {/* COLOR SELECTOR */}
            {hasColors && (
              <div className="mb-3 sm:mb-4">
                <div className="flex items-center gap-1.5 mb-2 text-[#1E293B]">
                  <Palette size={14} className="text-[#2563EB]" />
                  <span className="font-bold text-xs">
                    Cor: <span className="text-[#2563EB]">{selectedColor?.name}</span>
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.colors!.map((color) => {
                    const isSelected = selectedColor?.name === color.name;
                    return (
                      <button
                        key={color.name}
                        title={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={`relative w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#2563EB] ${
                          isSelected
                            ? 'border-[#2563EB] scale-110 shadow-md shadow-[#2563EB]/30'
                            : 'border-white shadow hover:scale-105 hover:border-gray-300'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        aria-label={`Cor: ${color.name}`}
                        aria-pressed={isSelected}
                      >
                        {isSelected && (
                          <span className="absolute inset-0 rounded-full border border-white/70 scale-75" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Weight & Composition */}
            {(product.weight || product.composition) && (
              <div className="mb-3 sm:mb-4 flex flex-wrap gap-2">
                {product.weight && (
                  <span className="inline-flex items-center gap-1 bg-[#F0F7FF] border border-[#BFDBFE] text-[#2563EB] text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full">
                    ⚖️ {product.weight}
                  </span>
                )}
                {product.composition && (
                  <span className="inline-flex items-center gap-1 bg-[#F0F7FF] border border-[#BFDBFE] text-[#2563EB] text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full">
                    🧵 {product.composition}
                  </span>
                )}
              </div>
            )}

            {product.allergens.length > 0 && (
              <div className="mb-3 p-2.5 sm:p-3 bg-[#F0F7FF] rounded-xl border border-[#BFDBFE]">
                <div className="flex items-center gap-1.5 mb-1 sm:mb-1.5 text-[#2563EB]">
                  <Info size={14} />
                  <span className="font-bold text-[10px] sm:text-xs">Especificações do Material</span>
                </div>
                <ul className="text-[10px] sm:text-xs text-[#1E293B] space-y-0.5 list-disc list-inside">
                  {product.allergens.map((spec, i) => (
                    <li key={i}>{spec}</li>
                  ))}
                </ul>
              </div>
            )}

          </div>

          <div className="mt-2 pt-3 sm:pt-4 border-t border-gray-100 shrink-0">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="flex flex-col">
                <span className={`text-lg sm:text-xl font-black ${product.stock <= 0 ? 'text-gray-400' : 'text-[#2563EB]'}`}>
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </span>
                {product.stock <= 0 && (
                  <span className="text-[10px] font-extrabold text-rose-600 mt-0.5 flex items-center gap-1">
                    <AlertTriangle size={11} /> Temporariamente indisponível
                  </span>
                )}
              </div>
              
              {product.stock > 0 && (
                <div className="flex items-center bg-[#F0F7FF] rounded-full border border-[#BFDBFE]">
                  <button 
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="p-1.5 sm:p-2 text-[#2563EB] hover:bg-white rounded-full transition-colors"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="w-5 sm:w-7 text-center text-xs sm:text-sm font-bold text-[#1E293B]">{qty}</span>
                  <button 
                    onClick={() => setQty(qty + 1)}
                    className="p-1.5 sm:p-2 text-[#2563EB] hover:bg-white rounded-full transition-colors"
                  >
                    <Plus size={13} />
                  </button>
                </div>
              )}
            </div>

            <Button
              fullWidth
              size="lg"
              disabled={product.stock <= 0}
              onClick={product.stock <= 0 ? undefined : handleAdd}
              className={`py-2.5 sm:py-3 text-xs sm:text-sm ${
                product.stock <= 0
                  ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed opacity-75'
                  : ''
              }`}
            >
              {product.stock <= 0
                ? 'Produto Temporariamente Indisponível'
                : `Adicionar — R$ ${(product.price * qty).toFixed(2).replace('.', ',')}`}
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
