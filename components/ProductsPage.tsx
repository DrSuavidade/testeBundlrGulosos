import React, { useEffect, useState } from 'react';
import { Product, Category } from '../types';
import { api } from '../services/mockApi';
import { Button } from './ui/Button';
import { Eye, Search, Heart, Sparkles } from 'lucide-react';
import { ProductModal } from './ProductModal';
import { useCart } from '../context/CartContext';
import { WavyDivider } from './ui/WavyDivider';

import { ShopeeMigrationBanner } from './ShopeeMigrationBanner';

export const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category | 'todos'>('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.getProducts();
        setProducts(data);
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categoryLabels: Record<Category | 'todos', string> = {
    'todos': '✨ Todos os Produtos',
    'linhas-fios': '🧶 Linhas & Fios',
    'kits': '🎨 Kits Criativos',
    'bijuterias-pecas': '💎 Bijuterias & Peças',
    'materias-primas': '✨ Matérias-Primas',
    'decor-ferramentas': '✂️ Decor & Ferramentas'
  };

  const categories: (Category | 'todos')[] = [
    'todos', 
    'linhas-fios', 
    'kits', 
    'bijuterias-pecas', 
    'materias-primas', 
    'decor-ferramentas'
  ];

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'todos' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredProducts = products.filter(p => p.featured).slice(0, 2);

  return (
    <div className="min-h-screen bg-[#F0F7FF] pb-20">
      
      {/* Top Banner with Shopee Proof & Stats */}
      <ShopeeMigrationBanner />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-20 relative z-10">
        
        {/* Featured / Suggestions */}
        <div className="mb-12 sm:mb-16">
           <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 justify-center md:justify-start">
             <div className="bg-[#2563EB] p-2.5 sm:p-3 rounded-full text-white shadow-lg">
                <Heart size={24} fill="currentColor" className="sm:w-7 sm:h-7" />
             </div>
             <h2 className="text-2xl sm:text-3xl font-nunito font-extrabold text-[#1E293B]">Sugestões Pedra Mania</h2>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {featuredProducts.map(product => (
                 <div key={product.id} className="bg-white rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-6 shadow-xl border border-[#BFDBFE]/50 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 transform hover:-translate-y-2 transition-transform cursor-pointer group" onClick={() => setSelectedProduct(product)}>
                    <img src={product.images[0]} alt={product.name} className="w-full sm:w-32 sm:h-32 md:w-40 md:h-40 h-48 rounded-[1.5rem] object-cover shadow-md group-hover:scale-105 transition-transform" />
                    <div className="w-full text-center sm:text-left">
                       <span className="bg-[#2563EB] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block shadow-sm">Destaque</span>
                       <h3 className="text-xl sm:text-2xl font-bold text-[#1E293B] leading-tight mb-2 font-nunito">{product.name}</h3>
                       <p className="text-[#2563EB] font-black text-lg sm:text-xl">R$ {product.price.toFixed(2).replace('.', ',')}</p>
                    </div>
                 </div>
              ))}
           </div>
        </div>

        {/* Filters & Search - Search Bar in its own row */}
        <div className="sticky top-20 sm:top-24 z-30 bg-white/95 backdrop-blur-md p-4 sm:p-6 mb-8 sm:mb-10 border border-[#BFDBFE] shadow-lg rounded-3xl transition-all space-y-4">
           
           {/* Row 1: Search Bar in dedicated full-width line */}
           <div className="relative w-full">
             <input 
               type="text" 
               placeholder="Buscar por nome do produto, fios, miçangas, agulhas, kits..." 
               className="w-full pl-12 pr-6 py-3 sm:py-3.5 rounded-2xl border-2 border-[#BFDBFE] focus:border-[#2563EB] focus:ring-4 focus:ring-[#93C5FD]/30 outline-none bg-[#F0F7FF]/60 text-[#1E293B] text-sm sm:text-base font-bold placeholder:font-normal placeholder:text-gray-400 shadow-inner transition-all"
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

           {/* Row 2: Category Pills with Hidden Scrollbar */}
           <div className="flex items-center overflow-x-auto gap-2 sm:gap-3 py-1 px-1 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
             {categories.map(cat => (
               <button
                 key={cat}
                 onClick={() => setActiveCategory(cat)}
                 className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl font-extrabold whitespace-nowrap transition-all text-xs sm:text-sm tracking-wide cursor-pointer ${
                   activeCategory === cat 
                     ? 'bg-[#2563EB] text-white shadow-lg shadow-[#2563EB]/25 transform scale-105 ring-2 ring-[#BFDBFE]' 
                     : 'bg-[#F0F7FF] text-[#1E293B] hover:bg-[#BFDBFE]/60 hover:text-[#2563EB]'
                 }`}
               >
                 {categoryLabels[cat]}
               </button>
             ))}
           </div>

        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
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
                className="group bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 flex flex-col justify-between"
              >
                <div className="relative h-48 sm:h-56 overflow-hidden bg-gray-100">
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button 
                      onClick={() => setSelectedProduct(product)}
                      className="bg-white p-3 rounded-full text-[#1E293B] hover:bg-[#2563EB] hover:text-white transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl"
                    >
                      <Eye size={20} />
                    </button>
                  </div>
                  {product.category === activeCategory && (
                     <div className="absolute top-3 left-3">
                       <span className="bg-[#2563EB] text-white text-[9px] sm:text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-md uppercase">
                         {categoryLabels[product.category]}
                       </span>
                     </div>
                  )}
                </div>

                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  <div className="mb-2">
                     <h3 className="font-nunito font-bold text-lg sm:text-xl text-[#1E293B] leading-tight group-hover:text-[#2563EB] transition-colors">
                      {product.name}
                    </h3>
                  </div>
                  <p className="text-gray-500 text-xs sm:text-sm font-lato line-clamp-2 mb-4 sm:mb-6 flex-1">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-3 sm:pt-4 border-t border-gray-100">
                    <span className="text-lg sm:text-xl font-black text-[#2563EB]">
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </span>
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      className="group-hover:bg-[#2563EB] group-hover:text-white text-xs px-4 sm:px-5 py-1.5 sm:py-2"
                      onClick={() => addToCart(product)}
                    >
                      + Add
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
