import React, { useEffect, useState } from 'react';
import { Product, Category } from '../types';
import { api } from '../services/mockApi';
import { Button } from './ui/Button';
import { Eye, Search, Heart } from 'lucide-react';
import { ProductModal } from './ProductModal';
import { useCart } from '../context/CartContext';
import { WavyDivider } from './ui/WavyDivider';

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

  const categories: (Category | 'todos')[] = ['todos', 'pães', 'bolos', 'doces', 'salgados', 'kits'];

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'todos' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredProducts = products.filter(p => p.featured).slice(0, 2);

  return (
    <div className="min-h-screen bg-[#FFF6F1] pb-20">
      
      {/* Header Section */}
      <section className="relative pt-32 pb-32 bg-[#F6B9C3]">
        <WavyDivider className="absolute top-0 left-0 w-full -translate-y-[99%] z-10" color="#F6B9C3" variant="flow" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
          <h1 className="text-6xl md:text-7xl font-pacifico text-white mb-6 drop-shadow-md">Nosso Cardápio</h1>
          <p className="text-white/90 font-bold text-xl max-w-2xl mx-auto leading-relaxed">
            Explore a nossa seleção completa de delícias artesanais, feitas para adoçar o seu dia.
          </p>
        </div>
        <WavyDivider className="absolute bottom-0 left-0 w-full translate-y-[99%] rotate-180 z-10" color="#F6B9C3" variant="gentle" />
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 relative z-10">
        
        {/* Featured / Suggestions */}
        <div className="mb-16">
           <div className="flex items-center gap-4 mb-8 justify-center md:justify-start">
             <div className="bg-[#D87085] p-3 rounded-full text-white shadow-lg">
                <Heart size={28} fill="currentColor" />
             </div>
             <h2 className="text-3xl font-nunito font-extrabold text-[#4A3B32]">Sugestões do Chef</h2>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredProducts.map(product => (
                 <div key={product.id} className="bg-white rounded-[2.5rem] p-6 shadow-xl border border-[#F2D0B6]/50 flex items-center gap-6 transform hover:-translate-y-2 transition-transform cursor-pointer group" onClick={() => setSelectedProduct(product)}>
                    <img src={product.images[0]} alt={product.name} className="w-28 h-28 md:w-40 md:h-40 rounded-[1.5rem] object-cover shadow-md group-hover:scale-105 transition-transform" />
                    <div>
                       <span className="bg-[#D87085] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block shadow-sm">Destaque</span>
                       <h3 className="text-2xl font-bold text-[#4A3B32] leading-tight mb-2 font-nunito">{product.name}</h3>
                       <p className="text-[#D87085] font-black text-xl">{product.price.toFixed(2)} €</p>
                    </div>
                 </div>
              ))}
           </div>
        </div>

        {/* Filters & Search */}
        <div className="sticky top-24 z-30 bg-[#FFF6F1]/95 backdrop-blur-md py-6 mb-10 border-b border-[#F2D0B6] shadow-sm rounded-xl px-4 transition-all">
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              
              {/* Category Pills */}
              <div className="flex overflow-x-auto pb-2 md:pb-0 gap-3 no-scrollbar scroll-smooth">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2.5 rounded-full font-bold whitespace-nowrap transition-all shadow-sm text-sm uppercase tracking-wide ${
                      activeCategory === cat 
                        ? 'bg-[#D87085] text-white shadow-md transform scale-105' 
                        : 'bg-white text-[#4A3B32] hover:bg-[#F2D0B6] hover:text-[#4A3B32]'
                    }`}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-80">
                <input 
                  type="text" 
                  placeholder="Buscar delícias..." 
                  className="w-full pl-12 pr-6 py-3 rounded-full border-2 border-[#F2D0B6] focus:border-[#D87085] focus:ring-4 focus:ring-[#F6B9C3]/30 outline-none bg-white text-[#4A3B32] shadow-inner transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#D87085]" size={20} />
              </div>
           </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white rounded-3xl h-80 animate-pulse shadow-sm"></div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-32 opacity-60">
             <p className="text-4xl mb-4">🍪</p>
             <p className="text-2xl font-nunito font-bold text-[#4A3B32]">Nenhuma gostosura encontrada.</p>
             <p className="font-lato">Tente mudar a categoria ou sua busca.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="group bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button 
                      onClick={() => setSelectedProduct(product)}
                      className="bg-white p-3 rounded-full text-[#4A3B32] hover:bg-[#F6B9C3] hover:text-white transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl"
                    >
                      <Eye size={22} />
                    </button>
                  </div>
                  {product.category === activeCategory && (
                     <div className="absolute top-3 left-3">
                       <span className="bg-[#D87085] text-white text-[10px] font-extrabold px-3 py-1 rounded-full shadow-md uppercase">
                         {product.category}
                       </span>
                     </div>
                  )}
                </div>

                <div className="p-6 flex flex-col h-full">
                  <div className="mb-2">
                     <h3 className="font-nunito font-bold text-xl text-[#4A3B32] leading-tight group-hover:text-[#D87085] transition-colors">
                      {product.name}
                    </h3>
                  </div>
                  <p className="text-gray-500 text-sm font-lato line-clamp-2 mb-6 flex-1">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <span className="text-xl font-black text-[#D87085]">
                      {product.price.toFixed(2).replace('.', ',')} €
                    </span>
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      className="group-hover:bg-[#F6B9C3] group-hover:text-white text-xs px-5 py-2"
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
