import React from 'react';
import { Button } from './ui/Button';
import { ArrowRight, MapPin, MessageCircle, PackageCheck } from 'lucide-react';

interface HeroProps {
  onShop: () => void;
  onLocalOrder: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShop, onLocalOrder }) => {
  return (
    <section className="relative overflow-hidden bg-[#FBFAF7] pt-12 pb-10 md:pt-20 md:pb-12">
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#DCEBFF] opacity-70 blur-3xl" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 text-[#2563EB] text-[0.65rem] sm:text-xs font-extrabold uppercase tracking-[0.18em] mb-5"><span className="h-2 w-2 rounded-full bg-[#2563EB]" /> Armarinho local · ES</span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-nunito font-extrabold tracking-tight text-[#172033] leading-[0.95]">Tudo para criar<br /><span className="text-[#2563EB]">algo seu.</span></h1>
            <p className="mt-6 text-base md:text-lg text-[#172033]/65 font-lato max-w-lg mx-auto lg:mx-0 leading-relaxed">Fios, linhas, miçangas, pedras e ferramentas escolhidos para transformar ideias em peças feitas à mão.</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start items-center">
              <Button size="lg" className="w-full sm:w-auto px-7 shadow-lg shadow-[#2563EB]/20" onClick={onShop}>Ver produtos <ArrowRight size={17} className="ml-2" /></Button>
              <button onClick={onLocalOrder} className="inline-flex items-center gap-2 text-[#172033] font-bold text-sm hover:text-[#2563EB] transition-colors py-2"><MessageCircle size={17} /> Falar pelo WhatsApp</button>
            </div>
            <div className="mt-10 pt-5 border-t border-[#172033]/10 grid grid-cols-3 gap-3 text-left max-w-lg mx-auto lg:mx-0">
              <div><PackageCheck size={18} className="text-[#2563EB] mb-2" /><p className="text-xs font-bold text-[#172033]">Entrega no ES</p></div>
              <div><MapPin size={18} className="text-[#2563EB] mb-2" /><p className="text-xs font-bold text-[#172033]">Retirada local</p></div>
              <div><MessageCircle size={18} className="text-[#2563EB] mb-2" /><p className="text-xs font-bold text-[#172033]">Ajuda de verdade</p></div>
            </div>
          </div>

          <div className="relative min-h-[390px] sm:min-h-[500px] lg:min-h-[560px]">
            <div className="absolute inset-x-8 sm:inset-x-14 top-5 bottom-4 rounded-[2rem] bg-[#E7F0FF] rotate-3" />
            <div className="absolute left-0 top-14 w-[48%] sm:w-[46%] rounded-[1.5rem] bg-white p-2 shadow-xl -rotate-6 transition-transform hover:rotate-0">
              <img src="https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop" alt="Fios coloridos Pedra Mania" className="w-full aspect-[4/5] object-cover rounded-xl" />
              <div className="px-2 py-3"><p className="text-[0.65rem] text-[#172033]/50 uppercase font-bold tracking-wider">Mais procurado</p><p className="font-bold text-sm text-[#172033]">Fios & linhas</p></div>
            </div>
            <div className="absolute right-0 top-0 w-[51%] sm:w-[48%] rounded-[1.5rem] bg-white p-2 shadow-2xl rotate-6 transition-transform hover:rotate-0">
              <img src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop" alt="Miçangas e pérolas Pedra Mania" className="w-full aspect-[4/5] object-cover rounded-xl" />
              <div className="px-2 py-3"><p className="text-[0.65rem] text-[#172033]/50 uppercase font-bold tracking-wider">Para começar</p><p className="font-bold text-sm text-[#172033]">Miçangas & peças</p></div>
            </div>
            <div className="absolute bottom-0 left-[20%] sm:left-[25%] w-[46%] rounded-[1.5rem] bg-white p-2 shadow-2xl rotate-2 transition-transform hover:rotate-0">
              <img src="https://images.unsplash.com/photo-1611591475285-a29ae2ea1c5c?q=80&w=800&auto=format&fit=crop" alt="Pedras naturais Pedra Mania" className="w-full aspect-[5/3] object-cover rounded-xl" />
              <div className="px-2 py-3 flex items-center justify-between"><p className="font-bold text-sm text-[#172033]">Matérias-primas</p><span className="text-[#2563EB] font-extrabold text-sm">Ver →</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
