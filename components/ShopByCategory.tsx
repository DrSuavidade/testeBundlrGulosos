import React from 'react';
import { ArrowUpRight, Gem, Hammer, Palette, Scissors, Sparkles } from 'lucide-react';
import { Category } from '../types';

interface ShopByCategoryProps {
  onSelect: (category: Category) => void;
  compact?: boolean;
}

const categories: { id: Category; title: string; description: string; icon: React.ElementType; tone: string; image: string }[] = [
  { id: 'linhas-fios', title: 'Fios & Linhas', description: 'Texturas e cores para começar.', icon: Sparkles, tone: 'from-[#2563EB] to-[#60A5FA]', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=500&auto=format&fit=crop' },
  { id: 'bijuterias-pecas', title: 'Miçangas & Bijuterias', description: 'Detalhes para criar acessórios.', icon: Gem, tone: 'from-[#7C3AED] to-[#C084FC]', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=500&auto=format&fit=crop' },
  { id: 'decor-ferramentas', title: 'Ferramentas & Decor', description: 'Trabalhe melhor e finalize.', icon: Hammer, tone: 'from-[#D97706] to-[#FBBF24]', image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=500&auto=format&fit=crop' },
  { id: 'materias-primas', title: 'Matérias-primas', description: 'Pedras e contas únicas.', icon: Palette, tone: 'from-[#059669] to-[#34D399]', image: 'https://images.unsplash.com/photo-1611591475285-a29ae2ea1c5c?q=80&w=500&auto=format&fit=crop' },
  { id: 'kits', title: 'Kits & Achadinhos', description: 'Ideias divertidas para testar.', icon: Scissors, tone: 'from-[#DB2777] to-[#FB7185]', image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=500&auto=format&fit=crop' },
];

export const ShopByCategory: React.FC<ShopByCategoryProps> = ({ onSelect, compact = false }) => (
  <section className={`relative z-50 bg-transparent ${compact ? 'pt-8 sm:pt-10 pb-1 sm:pb-2' : 'py-16 sm:py-20'}`} aria-labelledby="shop-by-category-title">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        {categories.map(({ id, title, description, icon: Icon, tone, image }) => (
          <button key={id} onClick={() => onSelect(id)} className={`relative overflow-hidden group text-left rounded-2xl p-4 sm:p-5 ${compact ? 'min-h-32 sm:min-h-36' : 'min-h-44'} flex flex-col justify-between bg-gradient-to-br ${tone} text-white shadow-md hover:-translate-y-1 hover:shadow-2xl transition-all`}>
            <img src={image} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-overlay group-hover:scale-110 group-hover:opacity-35 transition-all duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
            <div className="relative z-10 flex items-start justify-between">
              <span className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white border border-white/25"><Icon size={20} /></span>
              <ArrowUpRight size={18} className="text-white/70 group-hover:text-white transition-colors" />
            </div>
            <div className="relative z-10 mt-8">
              <h3 className="font-nunito font-extrabold text-base sm:text-lg text-white leading-tight">{title}</h3>
              <p className="hidden sm:block text-xs text-white/80 mt-2 leading-relaxed">{description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  </section>
);
