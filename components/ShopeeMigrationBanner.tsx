import React from 'react';
import { Star, ShieldCheck, Sparkles, ShoppingBag, Clock, MessageSquare, Zap } from 'lucide-react';

export const ShopeeMigrationBanner: React.FC = () => {
  return (
    <section className="relative z-20 pt-28 pb-12 sm:pt-32 sm:pb-16 bg-[#93C5FD] overflow-hidden">
      
      {/* Decorative Blur Background Blobs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#2563EB]/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] p-6 sm:p-8 lg:p-10 shadow-2xl border-2 border-white/80">
          
          {/* Header Announcement */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#BFDBFE]/60 pb-6 mb-6">
            <div className="flex items-center gap-3.5">
              <div className="bg-[#2563EB] text-white p-3.5 rounded-2xl shadow-lg shrink-0">
                <ShieldCheck size={32} />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="bg-amber-500 text-white font-extrabold text-[10px] sm:text-xs px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                    <Sparkles size={12} /> Da Shopee para o nosso Site Oficial
                  </span>
                  <span className="bg-[#2563EB] text-white font-extrabold text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                    Desde 2019 Online
                  </span>
                </div>
                <h1 className="font-pacifico text-3xl sm:text-4xl text-[#1E293B] leading-tight">
                  Nosso Armarinho <span className="text-[#2563EB]">Pedra Mania</span>
                </h1>
                <p className="text-xs sm:text-sm font-bold text-gray-600 mt-0.5">
                  A mesma loja 5 estrelas da Shopee, agora com preços mais baixos e atendimento expresso!
                </p>
              </div>
            </div>

            <div className="bg-[#F0F7FF] border border-[#BFDBFE] px-4 py-3 rounded-2xl flex items-center gap-3 shrink-0 shadow-inner">
              <Zap size={22} className="text-[#2563EB]" />
              <div className="text-xs">
                <span className="font-bold text-gray-500 block text-[10px] uppercase tracking-wider">Vantagem Direta</span>
                <strong className="text-[#2563EB] font-black text-sm">Sem taxas = Melhores Preços!</strong>
              </div>
            </div>
          </div>

          {/* Real Shopee Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            
            {/* Stat 1: Rating */}
            <div className="bg-[#F0F7FF] p-4 sm:p-5 rounded-2xl border border-[#BFDBFE]/70 hover:border-[#2563EB] transition-colors group">
              <div className="flex items-center justify-center gap-1 text-amber-500 mb-1">
                <Star size={22} fill="currentColor" />
                <span className="font-black text-2xl sm:text-3xl text-[#1E293B]">5.0</span>
              </div>
              <p className="text-xs font-extrabold text-[#2563EB]">8,2 mil Avaliações 5★</p>
              <p className="text-[11px] text-gray-500 font-bold mt-0.5">Nota Máxima na Shopee</p>
            </div>

            {/* Stat 2: Time in Market */}
            <div className="bg-[#F0F7FF] p-4 sm:p-5 rounded-2xl border border-[#BFDBFE]/70 hover:border-[#2563EB] transition-colors group">
              <div className="flex items-center justify-center gap-1.5 text-[#2563EB] mb-1">
                <Clock size={22} />
                <span className="font-black text-2xl sm:text-3xl text-[#1E293B]">5 Anos</span>
              </div>
              <p className="text-xs font-extrabold text-[#2563EB]">Desde 2019 Online</p>
              <p className="text-[11px] text-gray-500 font-bold mt-0.5">Tradição em Artesanato</p>
            </div>

            {/* Stat 3: Products */}
            <div className="bg-[#F0F7FF] p-4 sm:p-5 rounded-2xl border border-[#BFDBFE]/70 hover:border-[#2563EB] transition-colors group">
              <div className="flex items-center justify-center gap-1.5 text-[#2563EB] mb-1">
                <ShoppingBag size={22} />
                <span className="font-black text-2xl sm:text-3xl text-[#1E293B]">+150</span>
              </div>
              <p className="text-xs font-extrabold text-[#2563EB]">Produtos & Kits</p>
              <p className="text-[11px] text-gray-500 font-bold mt-0.5">Fios, miçangas e receitas</p>
            </div>

            {/* Stat 4: Fast Support */}
            <div className="bg-[#F0F7FF] p-4 sm:p-5 rounded-2xl border border-[#BFDBFE]/70 hover:border-[#2563EB] transition-colors group">
              <div className="flex items-center justify-center gap-1.5 text-emerald-600 mb-1">
                <MessageSquare size={22} />
                <span className="font-black text-2xl sm:text-3xl text-[#1E293B]">Rápido</span>
              </div>
              <p className="text-xs font-extrabold text-emerald-700">Atendimento WhatsApp</p>
              <p className="text-[11px] text-gray-500 font-bold mt-0.5">Suporte em poucas horas</p>
            </div>

          </div>

          {/* Direct Channel Benefit Summary */}
          <div className="mt-6 pt-4 border-t border-[#BFDBFE]/40 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs font-bold text-gray-600">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span>✅ Compra 100% segura e garantida direto com os especialistas da Pedra Mania em Vitória/ES.</span>
            </div>
            <span className="text-[#2563EB] font-extrabold whitespace-nowrap">
              Economize no frete e receba com mais agilidade 🚀
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};
