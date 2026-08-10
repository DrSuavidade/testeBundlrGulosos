import React, { useEffect, useState } from 'react';
import { Product } from '../types';
import { api } from '../services/mockApi';
import { Button } from './ui/Button';
import { Eye } from 'lucide-react';
import { ProductModal } from './ProductModal';
import { useCart } from '../context/CartContext';
import { WavyDivider } from './ui/WavyDivider';

export const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.getFeaturedProducts();
        setProducts(data);
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section id="products" className="relative bg-[#93C5FD] pb-28 md:pb-40 pt-6 sm:pt-10">
      {/* Top Divider */}
      <WavyDivider className="absolute top-0 left-0 w-full -translate-y-[99%] z-20" color="#93C5FD" variant="swoop" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 sm:mb-16 pt-6 sm:pt-10">
          <span className="bg-white/30 text-[#1E293B] px-3 py-1 sm:px-4 sm:py-1.5 rounded-full font-extrabold tracking-wider uppercase text-[0.65rem] sm:text-xs backdrop-blur-sm shadow-sm inline-block">
            Kits Prontos & Linhas Mais Vendidas
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-pacifico text-white mt-3 sm:mt-4 drop-shadow-sm leading-tight">
            Kits da <span className="text-[#1E293B]">Semana</span>
          </h2>
          <div className="w-24 sm:w-32 h-1.5 sm:h-2 bg-white/40 rounded-full mx-auto mt-4 sm:mt-6"></div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white/50 rounded-3xl h-80 sm:h-96 animate-pulse shadow-sm"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="group bg-white rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col justify-between"
              >
                <div className="relative h-60 sm:h-72 overflow-hidden bg-gray-100">
                  <div className="absolute inset-0 bg-[#1E293B]/5 z-10 group-hover:bg-transparent transition-colors"></div>
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black/10 z-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button 
                      onClick={() => setSelectedProduct(product)}
                      className="bg-white p-3.5 sm:p-4 rounded-full text-[#1E293B] hover:bg-[#2563EB] hover:text-white transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 shadow-xl"
                    >
                      <Eye size={22} />
                    </button>
                  </div>
                  {/* Badges */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-col gap-2 z-20">
                    {product.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="bg-white/95 backdrop-blur-md text-[#2563EB] text-[0.65rem] sm:text-xs font-extrabold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-sm uppercase tracking-wide">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                     <h3 className="font-nunito font-extrabold text-xl sm:text-2xl text-[#1E293B] leading-tight flex-1 pr-2">
                      {product.name}
                    </h3>
                  </div>
                  <p className="text-gray-500 text-xs sm:text-sm font-lato line-clamp-2 mb-6 leading-relaxed flex-1">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-2">
                    <span className="text-xl sm:text-2xl font-black text-[#2563EB]">
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </span>
                    <Button 
                      size="md" 
                      variant="secondary" 
                      className="group-hover:bg-[#2563EB] group-hover:text-white transition-colors font-bold text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-2.5"
                      onClick={() => addToCart(product)}
                    >
                      Garantir Kit
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 sm:mt-20 text-center">
            <Button variant="primary" size="lg" className="w-full sm:w-auto px-8 sm:px-12 py-3.5 sm:py-4 text-base sm:text-lg font-bold shadow-lg" onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth'})}>
              Ver catálogo completo
            </Button>
        </div>
      </div>

      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </section>
  );
};
