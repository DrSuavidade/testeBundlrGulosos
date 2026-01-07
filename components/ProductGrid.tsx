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
        // Fetch only featured for the home page
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
    <section id="products" className="relative bg-[#F6B9C3] pb-40 pt-10">
      {/* Top Divider: Reaching up into the Hero with a huge Swoop */}
      <WavyDivider className="absolute top-0 left-0 w-full -translate-y-[99%] z-20" color="#F6B9C3" variant="swoop" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 pt-10">
          <span className="bg-white/20 text-white px-4 py-1 rounded-full font-bold tracking-wider uppercase text-xs backdrop-blur-sm">
            Edição Limitada
          </span>
          <h2 className="text-5xl md:text-7xl font-pacifico text-white mt-4 drop-shadow-sm">
            Vitrine da <span className="text-[#4A3B32]">Semana</span>
          </h2>
          <div className="w-32 h-2 bg-white/40 rounded-full mx-auto mt-6"></div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white/50 rounded-3xl h-96 animate-pulse shadow-sm"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="group bg-white rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className="relative h-72 overflow-hidden bg-gray-100">
                  <div className="absolute inset-0 bg-[#4A3B32]/5 z-10 group-hover:bg-transparent transition-colors"></div>
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black/10 z-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button 
                      onClick={() => setSelectedProduct(product)}
                      className="bg-white p-4 rounded-full text-[#4A3B32] hover:bg-[#F6B9C3] hover:text-white transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 shadow-xl"
                    >
                      <Eye size={24} />
                    </button>
                  </div>
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
                    {product.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="bg-white/90 backdrop-blur-md text-[#D87085] text-xs font-extrabold px-3 py-1.5 rounded-full shadow-sm uppercase tracking-wide">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex justify-between items-start mb-2">
                     <h3 className="font-nunito font-extrabold text-2xl text-[#4A3B32] leading-tight flex-1 pr-2">
                      {product.name}
                    </h3>
                  </div>
                  <p className="text-gray-500 text-sm font-lato line-clamp-2 mb-6 leading-relaxed">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-2xl font-black text-[#D87085]">
                      {product.price.toFixed(2).replace('.', ',')} €
                    </span>
                    <Button 
                      size="md" 
                      variant="secondary" 
                      className="group-hover:bg-[#F6B9C3] group-hover:text-white transition-colors"
                      onClick={() => addToCart(product)}
                    >
                      Comprar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-20 text-center">
            <Button variant="primary" size="lg" className="px-12 py-4 text-lg font-bold shadow-lg" onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth'})}>
              Ver cardápio completo
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
