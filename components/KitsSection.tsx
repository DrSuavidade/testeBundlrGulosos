import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ShoppingBag, 
  Check, 
  Clock, 
  Layers
} from 'lucide-react';
import { Kit } from '../types';
import { api } from '../services/mockApi';
import { useCart } from '../context/CartContext';
import { Button } from './ui/Button';

interface KitsSectionProps {
  onNavigateToProducts?: () => void;
}

export const KitsSection: React.FC<KitsSectionProps> = ({ onNavigateToProducts }) => {
  const [kits, setKits] = useState<Kit[]>([]);
  const [loading, setLoading] = useState(true);
  const [addedKitId, setAddedKitId] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchKits = async () => {
      setLoading(true);
      try {
        const data = await api.getKits(true);
        setKits(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchKits();
  }, []);

  const handleAddKitToCart = (kit: Kit) => {
    // Adicionar o Kit como um item composto à sacola
    addToCart({
      id: kit.id,
      name: `[KIT] ${kit.name}`,
      price: kit.price,
      images: [kit.banner_image || kit.items[0]?.product_image || 'https://images.unsplash.com/photo-1608248597260-6f216e589959?q=80&w=800'],
      category: 'kits',
      tags: ['Kit Promocional', 'Combo'],
      stock: kit.available_stock,
      slug: kit.slug,
      description: kit.description || 'Kit promocional completo com desconto especial.',
      allergens: kit.items.map(i => `${i.qty}x ${i.product_name}`),
      active: true,
      featured: true
    }, 1);

    setAddedKitId(kit.id);
    setTimeout(() => setAddedKitId(null), 2500);
  };

  if (!loading && kits.length === 0) {
    return null; // Não renderiza nada se não houver kits ativos
  }

  return (
    <section id="kits-promocionais" className="py-16 sm:py-24 bg-gradient-to-b from-[#F0F7FF] to-white relative overflow-hidden font-lato">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 text-[#2563EB] text-xs font-black uppercase tracking-wider border border-blue-200 shadow-xs">
            <Sparkles size={14} className="text-[#2563EB]" />
            <span>Kits & Combos com Desconto Especial</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-nunito font-extrabold text-[#1E293B] leading-tight">
            Combos Prontos para Artesanato
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Monte seus projetos completos economizando tempo e dinheiro. Cada kit reúne as melhores combinações de fios, miçangas e ferramentas da nossa loja.
          </p>
        </div>

        {/* KITS GRID */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm animate-pulse h-96"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {kits.map(kit => {
              const isAdded = addedKitId === kit.id;
              const isOutOfStock = kit.available_stock <= 0;

              return (
                <div
                  key={kit.id}
                  className="bg-white rounded-3xl border border-[#BFDBFE] hover:border-[#2563EB] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group relative"
                >
                  {/* Promo Badge */}
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-1 px-3 py-1 bg-[#2563EB] text-white text-xs font-black rounded-full shadow-md">
                    <Sparkles size={13} /> {kit.badge_text || 'Oferta Especial'}
                  </div>

                  {kit.discount_percentage > 0 && (
                    <div className="absolute top-4 right-4 z-20 px-2.5 py-1 bg-emerald-600 text-white text-xs font-black rounded-full shadow-md">
                      -{kit.discount_percentage}% OFF
                    </div>
                  )}

                  {/* Main Banner / Image */}
                  <div className="relative h-52 bg-[#F8FAFC] overflow-hidden">
                    <img
                      src={kit.banner_image || kit.items[0]?.product_image || 'https://images.unsplash.com/photo-1608248597260-6f216e589959?q=80&w=800'}
                      alt={kit.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-extrabold text-[#1E293B] font-nunito leading-snug group-hover:text-[#2563EB] transition-colors">
                        {kit.name}
                      </h3>

                      {kit.description && (
                        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                          {kit.description}
                        </p>
                      )}
                    </div>

                    {/* Breakdown of items inside this kit */}
                    <div className="bg-[#F0F7FF]/80 p-3.5 rounded-2xl border border-blue-100 space-y-2">
                      <span className="text-[11px] font-extrabold text-[#2563EB] uppercase tracking-wider flex items-center gap-1">
                        <Layers size={13} /> O que vem neste combo ({kit.items.length} itens):
                      </span>

                      <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                        {kit.items.map((it, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs bg-white p-2 rounded-xl border border-blue-50">
                            <div className="flex items-center gap-2 min-w-0">
                              {it.product_image && (
                                <img
                                  src={it.product_image}
                                  alt={it.product_name}
                                  className="w-6 h-6 rounded-md object-cover border border-gray-100 shrink-0"
                                />
                              )}
                              <span className="truncate font-semibold text-gray-700">{it.product_name}</span>
                            </div>
                            <span className="font-extrabold text-[#2563EB] shrink-0 ml-2 px-1.5 py-0.5 bg-blue-50 rounded">
                              {it.qty}x
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pricing & Stock */}
                    <div className="pt-3 border-t border-gray-100 space-y-3">
                      <div className="flex items-baseline justify-between">
                        <div>
                          {kit.original_price > kit.price && (
                            <span className="text-xs text-gray-400 line-through mr-2 font-medium">
                              R$ {kit.original_price.toFixed(2).replace('.', ',')}
                            </span>
                          )}
                          <span className="text-2xl font-black text-[#1E293B]">
                            R$ {kit.price.toFixed(2).replace('.', ',')}
                          </span>
                        </div>

                        {kit.discount_amount > 0 && (
                          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                            Economize R$ {kit.discount_amount.toFixed(2).replace('.', ',')}
                          </span>
                        )}
                      </div>

                      {/* Add to Cart Button */}
                      <Button
                        onClick={() => handleAddKitToCart(kit)}
                        disabled={isOutOfStock}
                        fullWidth
                        size="lg"
                        className={`py-3 text-xs sm:text-sm font-bold shadow-md transition-all ${
                          isOutOfStock 
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : isAdded
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                            : ''
                        }`}
                      >
                        {isOutOfStock ? (
                          'Temporariamente Indisponível'
                        ) : isAdded ? (
                          <span className="flex items-center justify-center gap-1.5">
                            <Check size={16} /> Kit Adicionado à Sacola!
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-1.5">
                            <ShoppingBag size={16} /> Comprar Kit com Desconto
                          </span>
                        )}
                      </Button>

                      {kit.available_stock > 0 && kit.available_stock <= 5 && (
                        <p className="text-[11px] text-amber-700 font-bold text-center flex items-center justify-center gap-1">
                          <Clock size={12} /> Restam apenas {kit.available_stock} combos com este estoque!
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
