import React from 'react';
import { Button } from './ui/Button';
import { Award } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative bg-[#F0F7FF] pt-24 pb-28 md:pt-32 md:pb-48 overflow-hidden">
      
      {/* Abstract Background Flow - Pastel Blue Blobs */}
      <div className="absolute top-0 right-0 w-[340px] h-[340px] sm:w-[600px] sm:h-[600px] md:w-[800px] md:h-[800px] bg-[#93C5FD] rounded-full opacity-40 blur-3xl -z-10 translate-x-1/4 -translate-y-1/4 animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-[280px] h-[280px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] bg-[#BFDBFE] rounded-full opacity-40 blur-3xl -z-10 -translate-x-1/4 translate-y-1/4"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        
        {/* Left: Tilted Box Image */}
        <div className="relative order-2 md:order-1 flex justify-center md:justify-end mt-4 md:mt-0">
           <div className="relative transform -rotate-3 sm:-rotate-6 transition-transform hover:rotate-0 duration-700 ease-out group hover:z-20">
              <div className="absolute inset-0 bg-[#1E293B] rounded-[2rem] transform translate-y-3 translate-x-3 opacity-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop" 
                alt="Novelos de Algodão e Kits Pedra Mania" 
                className="relative w-64 sm:w-80 md:w-[28rem] rounded-[2rem] shadow-2xl border-4 sm:border-[6px] border-white object-cover aspect-[4/5] z-10"
              />
              
              {/* Floating Badge 1 - Top Left */}
              <div className="absolute -top-4 -left-3 sm:-top-6 sm:-left-6 md:-top-10 md:-left-10 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-[#2563EB] rounded-full flex flex-col items-center justify-center text-white text-center p-1.5 sm:p-2 shadow-xl animate-float border-2 sm:border-4 border-white transform -rotate-12 z-20">
                 <span className="text-[0.55rem] sm:text-[0.65rem] md:text-xs uppercase tracking-widest font-bold">Eleito</span>
                 <span className="font-pacifico text-base sm:text-xl md:text-3xl leading-none">Melhor</span>
                 <span className="text-[0.65rem] sm:text-xs md:text-sm font-bold">Kit Crochê</span>
                 <span className="text-[0.55rem] sm:text-[0.6rem] mt-0.5 opacity-90 font-bold">ES • 2024</span>
              </div>

               {/* Floating Badge 2 - Bottom Right */}
               <div className="absolute bottom-4 -right-2 sm:bottom-8 sm:-right-4 md:bottom-12 md:-right-8 w-18 h-18 sm:w-22 sm:h-22 md:w-28 md:h-28 bg-[#F0F7FF] rounded-full flex flex-col items-center justify-center text-[#1E293B] text-center p-1.5 sm:p-2 shadow-xl animate-float animation-delay-2000 border-2 sm:border-4 border-[#BFDBFE] transform rotate-12 z-20">
                 <Award size={20} className="mb-0.5 sm:mb-1 text-[#2563EB]" />
                 <span className="text-[0.6rem] sm:text-xs font-bold leading-tight">Escolha das<br/>Artesãs</span>
              </div>
           </div>
        </div>

        {/* Right: Text Content */}
        <div className="order-1 md:order-2 text-center md:text-left space-y-6 md:space-y-12">
          <div>
            <span className="inline-block bg-[#93C5FD]/40 text-[#2563EB] px-3 py-1 sm:px-4 sm:py-1 rounded-full font-bold tracking-wider uppercase text-[0.7rem] sm:text-xs mb-3 shadow-sm">
              Armarinho, Linhas & Bijuterias no ES
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-pacifico text-[#2563EB] leading-[1.05] md:leading-[0.9] drop-shadow-sm">
              Pedra <br/>
              <span className="text-[#1E293B] relative inline-block mt-1 sm:mt-0">
                Mania
                <svg className="absolute w-full h-3 sm:h-4 -bottom-1 left-0 text-[#BFDBFE] -z-10" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" opacity="0.8" /></svg>
              </span>
            </h1>
          </div>
          
          <p className="text-base sm:text-xl md:text-2xl text-[#1E293B]/80 font-lato max-w-md mx-auto md:mx-0 leading-relaxed px-2 sm:px-0">
            O que você precisa para o seu artesanato e decor está aqui! Fios de algodão para crochê e tricô, miçangas e kits criativos completos.
          </p>
          
          <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start items-center">
             <Button size="lg" className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 text-base sm:text-xl shadow-xl shadow-[#2563EB]/20 hover:shadow-2xl hover:-translate-y-1" onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth'})}>
              Ver Kits da Semana
             </Button>
             <a href="#how-to" className="text-[#2563EB] font-bold text-sm sm:text-base hover:underline decoration-2 underline-offset-4 py-2">
               Como funciona?
             </a>
          </div>
        </div>
      </div>
    </section>
  );
};
