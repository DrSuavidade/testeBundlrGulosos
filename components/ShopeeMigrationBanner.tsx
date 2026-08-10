import React from 'react';
import { Star, ShoppingBag, Clock, Sparkles } from 'lucide-react';

export const ShopeeMigrationBanner: React.FC = () => {
  const stats = [
    { icon: <Star size={13} className="text-amber-500" fill="currentColor" />, value: '5.0', label: '8,2 mil avaliações' },
    { icon: <Clock size={13} className="text-[#2563EB]" />, value: '5 Anos', label: 'Online desde 2019' },
    { icon: <ShoppingBag size={13} className="text-[#2563EB]" />, value: '+150', label: 'Produtos & Kits' },
  ];

  return (
    <section className="relative z-20 pt-20 pb-6 sm:pt-24 sm:pb-8 bg-[#93C5FD] overflow-hidden">

      {/* Subtle top light blob */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg border border-white/80 overflow-hidden"
        >
          {/* Main content row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5">

            {/* Left: Identity */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                  <span className="bg-amber-500 text-white font-bold text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-0.5">
                    <Sparkles size={9} /> Da Shopee para o Site Oficial
                  </span>
                  <span className="bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE] font-bold text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Desde 2019
                  </span>
                </div>
                <h2 className="font-pacifico text-lg sm:text-xl text-[#1E293B] leading-tight truncate">
                  Armarinho <span className="text-[#2563EB]">Pedra Mania</span>
                </h2>
                <p className="text-[11px] text-gray-500 font-medium mt-0.5 leading-snug">
                  A mesma loja 5★ da Shopee — agora sem taxas, com preços ainda melhores
                </p>
              </div>
            </div>

            {/* Right: Stats chips */}
            <div className="flex flex-col sm:items-end gap-2 shrink-0 w-full sm:w-auto">
              {/* Stats chips */}
              <div className="flex flex-wrap gap-1.5">
                {stats.map((s, i) => (
                  <div key={i} className="flex items-center gap-1.5 bg-[#F0F7FF] border border-[#DBEAFE] px-2.5 py-1.5 rounded-lg">
                    {s.icon}
                    <div className="leading-none">
                      <span className="font-extrabold text-[#1E293B] text-xs block">{s.value}</span>
                      <span className="text-gray-400 text-[9px] font-medium">{s.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom strip */}
          <div className="bg-[#EFF6FF] border-t border-[#DBEAFE] px-4 sm:px-5 py-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping shrink-0"></span>
            <p className="text-[10px] sm:text-[11px] font-medium text-gray-500">
              ✅ Compra 100% segura direto com os especialistas da Pedra Mania em Vitória/ES — sem taxas de marketplace
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
