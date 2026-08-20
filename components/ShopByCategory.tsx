import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { StoreCategory } from '../types';

interface ShopByCategoryProps {
  categories: StoreCategory[];
  onSelect: (categoryId: string) => void;
  compact?: boolean;
}

export const ShopByCategory: React.FC<ShopByCategoryProps> = ({ categories, onSelect, compact = false }) => (
  <section className={`relative z-50 bg-transparent ${compact ? 'pt-8 sm:pt-10 pb-1 sm:pb-2' : 'py-16 sm:py-20'}`} aria-labelledby="shop-by-category-title">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        {categories.map(({ id, name, color, image }) => (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className="relative overflow-hidden group text-left rounded-2xl flex flex-col justify-end bg-gray-200 shadow-md hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
            style={{ minHeight: compact ? '8rem' : '11rem' }}
          >
            {/* Background image — cropped to fill, never distorted */}
            <img
              src={image}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Gradient overlay */}
            <div
              className="absolute inset-0 opacity-70 group-hover:opacity-80 transition-opacity"
              style={{ background: `linear-gradient(to top, ${color}dd 0%, ${color}55 60%, transparent 100%)` }}
            />
            {/* Arrow top-right */}
            <div className="absolute top-3 right-3 z-10">
              <ArrowUpRight size={16} className="text-white/70 group-hover:text-white transition-colors" />
            </div>
            {/* Text at bottom */}
            <div className="relative z-10 p-4 sm:p-5">
              <h3 className="font-nunito font-extrabold text-sm sm:text-base text-white leading-tight drop-shadow-sm">
                {name}
              </h3>
            </div>
          </button>
        ))}
      </div>
    </div>
  </section>
);
