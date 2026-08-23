import React, { useEffect, useState } from 'react';
import { Product, StoreCategory } from '../types';
import { api } from '../services/mockApi';
import { Button } from './ui/Button';
import { Eye, Search, Heart } from 'lucide-react';
import { ProductModal } from './ProductModal';
import { useCart } from '../context/CartContext';

import { ShopeeMigrationBanner } from './ShopeeMigrationBanner';
import { ShopByCategory } from './ShopByCategory';

interface ProductsPageProps {
  compact?: boolean;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ compact = false }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<StoreCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [prods, cats] = await Promise.all([api.getProducts(), api.getCategories()]);
        setProducts(prods);
        setCategories(cats);
      } catch (err) {
        console.error('Failed to load products/categories', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const filteredProducts = products.filter(p => {
    if (!p.active) return false;
    const matchesCategory = activeCategory === 'todos' || p.category === activeCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredProducts = products.filter(p => p.featured && p.active).slice(0, 2);

  const getCategoryName = (slug: string) =>
    categories.find(c => c.id === slug)?.name ?? slug;

  return (
    <div className="min-h-screen bg-[#F0F7FF] pb-20">

      {!compact && <ShopeeMigrationBanner />}

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${compact ? 'mt-0' : 'mt-12 sm:mt-20'} relative z-10`}>

        {/* Featured / Suggestions */}
        {!compact && (
          <div className="mb-12 sm:mb-16">
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 justify-center md:justify-start">
              <div className="bg-[#2563EB] p-2.5 sm:p-3 rounded-full text-white shadow-lg">
                <Heart size={24} fill="currentColor" className="sm:w-7 sm:h-7" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-nunito font-extrabold text-[#1E293B]">Sugestões Pedra Mania</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {featuredProducts.map(product => (
                <div
                  key={product.id}
                  className="bg-white rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-6 shadow-xl border border-[#BFDBFE]/50 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 transform hover:-translate-y-2 transition-transform cursor-pointer group"
                  onClick={() => setSelectedProduct(product)}
                >
                  {/* Fixed-size image — object-cover keeps proportions */}
                  <div className="w-full sm:w-36 sm:h-36 md:w-44 md:h-44 h-48 rounded-[1.5rem] overflow-hidden shrink-0">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="w-full text-center sm:text-left">
                    <span className="bg-[#2563EB] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block shadow-sm">Destaque</span>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#1E293B] leading-tight mb-2 font-nunito">{product.name}</h3>
                    <p className="text-[#2563EB] font-black text-lg sm:text-xl">R$ {product.price.toFixed(2).replace('.', ',')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {compact && <ShopByCategory compact categories={categories} onSelect={setActiveCategory} />}

        {/* Filters & Search */}
        <div id="products-section" className="sticky top-20 sm:top-24 z-30 bg-white/95 backdrop-blur-md p-3 sm:p-4 mb-6 sm:mb-8 border border-[#CBD5E1] shadow-md rounded-2xl transition-all space-y-3">

          {/* Search Bar */}
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Buscar por nome do produto, fios, miçangas, agulhas, kits..."
              className="w-full pl-11 pr-6 py-2.5 sm:py-3 rounded-xl border border-[#CBD5E1] focus:border-[#2563EB] focus:ring-2 focus:ring-[#BFDBFE] outline-none bg-white text-[#1E293B] text-sm sm:text-base font-semibold placeholder:font-normal placeholder:text-[#94A3B8] transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#2563EB]" size={20} />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 px-2.5 py-1 rounded-full font-bold"
              >
                Limpar
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex items-center overflow-x-auto gap-2 py-1 px-0.5 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <button
              onClick={() => setActiveCategory('todos')}
              className={`px-3.5 sm:px-4 py-2 rounded-lg font-bold whitespace-nowrap transition-all text-xs sm:text-sm tracking-wide cursor-pointer border ${
                activeCategory === 'todos'
                  ? 'bg-[#2563EB] border-[#2563EB] text-white shadow-sm'
                  : 'bg-white border-[#E2E8F0] text-[#475569] hover:border-[#93C5FD] hover:text-[#2563EB]'
              }`}
            >
              Todos os Produtos
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 sm:px-4 py-2 rounded-lg font-bold whitespace-nowrap transition-all text-xs sm:text-sm tracking-wide cursor-pointer border ${
                  activeCategory === cat.id
                    ? 'bg-[#2563EB] border-[#2563EB] text-white shadow-sm'
                    : 'bg-white border-[#E2E8F0] text-[#475569] hover:border-[#93C5FD] hover:text-[#2563EB]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white rounded-3xl h-72 sm:h-80 animate-pulse shadow-sm"></div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 sm:py-32 opacity-70">
            <p className="text-4xl sm:text-5xl mb-3 sm:mb-4">🧶</p>
            <p className="text-xl sm:text-2xl font-nunito font-bold text-[#1E293B]">Nenhum item encontrado.</p>
            <p className="font-lato text-sm sm:text-base mt-1">Tente mudar a categoria ou o termo da busca.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className={`group bg-white ${compact ? 'rounded-xl' : 'rounded-[2rem]'} overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 flex flex-col justify-between`}
              >
                {/* Fixed-height image area — object-cover, never distorted */}
                <div className={`relative ${compact ? 'h-36 sm:h-44' : 'h-52 sm:h-60'} overflow-hidden bg-gray-100 shrink-0`}>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="bg-white p-3 rounded-full text-[#1E293B] hover:bg-[#2563EB] hover:text-white transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl"
                    >
                      <Eye size={20} />
                    </button>
                  </div>
                  {/* Color swatches */}
                  {product.colors && product.colors.length > 0 && (
                    <div className="absolute bottom-2 left-3 flex gap-1.5 z-10">
                      {product.colors.slice(0, 5).map(c => (
                        <span
                          key={c.name}
                          title={c.name}
                          className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                          style={{ backgroundColor: c.hex }}
                        />
                      ))}
                    </div>
                  )}
                  {/* Category badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-white/90 backdrop-blur-sm text-[#2563EB] text-[9px] sm:text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-sm uppercase tracking-wide">
                      {getCategoryName(product.category)}
                    </span>
                  </div>
                </div>

                <div className={`${compact ? 'p-3 sm:p-4' : 'p-5 sm:p-6'} flex flex-col flex-1`}>
                  <div className="mb-2">
                    <h3 className={`font-nunito font-bold ${compact ? 'text-sm sm:text-base' : 'text-lg sm:text-xl'} text-[#1E293B] leading-tight group-hover:text-[#2563EB] transition-colors`}>
                      {product.name}
                    </h3>
                  </div>
                  <p className={`${compact ? 'hidden' : 'block'} text-gray-500 text-xs sm:text-sm font-lato line-clamp-2 mb-4 sm:mb-5 flex-1`}>
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-2 sm:pt-3 border-t border-gray-100 gap-2">
                    <div className="flex flex-col min-w-0">
                      <span className={`${compact ? 'text-sm sm:text-base' : 'text-lg sm:text-xl'} font-black ${product.stock <= 0 ? 'text-gray-400' : 'text-[#2563EB]'}`}>
                        R$ {product.price.toFixed(2).replace('.', ',')}
                      </span>
                      {product.stock <= 0 && (
                        <span className="text-[10px] sm:text-[11px] font-extrabold text-rose-600 leading-tight">
                          Temporariamente indisponível
                        </span>
                      )}
                    </div>

                    <Button
                      size="sm"
                      variant={product.stock <= 0 ? 'ghost' : 'secondary'}
                      disabled={product.stock <= 0}
                      className={product.stock <= 0
                        ? "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed font-bold text-xs px-2.5 py-1 opacity-75 shrink-0"
                        : "group-hover:bg-[#2563EB] group-hover:text-white text-xs px-3 sm:px-4 py-1.5 shrink-0"}
                      onClick={product.stock <= 0 ? undefined : () => addToCart(product)}
                    >
                      {product.stock <= 0 ? 'Esgotado' : '+ Add'}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};
