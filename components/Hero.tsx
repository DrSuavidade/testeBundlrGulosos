import React from 'react';
import { Button } from './ui/Button';
import { Award } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative bg-[#FFF6F1] pt-32 pb-48 overflow-hidden">
      
      {/* Abstract Background Flow - Pink/Peach Blobs */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#F6B9C3] rounded-full opacity-40 blur-3xl -z-10 translate-x-1/4 -translate-y-1/4 animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#F2D0B6] rounded-full opacity-30 blur-3xl -z-10 -translate-x-1/4 translate-y-1/4"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left: Tilted Box Image */}
        <div className="relative order-2 md:order-1 flex justify-center md:justify-end">
           <div className="relative transform -rotate-6 transition-transform hover:rotate-0 duration-700 ease-out group hover:z-20">
              <div className="absolute inset-0 bg-[#4A3B32] rounded-[2rem] transform translate-y-4 translate-x-4 opacity-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1621236378699-8597faf6a176?q=80&w=800&auto=format&fit=crop" 
                alt="Caixa de Cookies" 
                className="relative w-72 md:w-[28rem] rounded-[2rem] shadow-2xl border-[6px] border-white object-cover aspect-[4/5] z-10"
              />
              
              {/* Floating Badge 1 - Top Left */}
              <div className="absolute -top-6 -left-6 md:-top-10 md:-left-10 w-24 h-24 md:w-32 md:h-32 bg-[#D87085] rounded-full flex flex-col items-center justify-center text-white text-center p-2 shadow-xl animate-float border-4 border-white transform -rotate-12 z-20">
                 <span className="text-[0.6rem] md:text-xs uppercase tracking-widest font-bold">Voted</span>
                 <span className="font-pacifico text-xl md:text-3xl leading-none">Best</span>
                 <span className="text-xs md:text-sm font-bold">Cookies</span>
                 <span className="text-[0.6rem] mt-1 opacity-80">2024</span>
              </div>

               {/* Floating Badge 2 - Bottom Right */}
               <div className="absolute bottom-8 -right-4 md:bottom-12 md:-right-8 w-20 h-20 md:w-28 md:h-28 bg-[#FFF6F1] rounded-full flex flex-col items-center justify-center text-[#4A3B32] text-center p-2 shadow-xl animate-float animation-delay-2000 border-4 border-[#F2D0B6] transform rotate-12 z-20">
                 <Award size={24} className="mb-1 text-[#D87085]" />
                 <span className="text-xs font-bold leading-tight">Escolha do<br/>Chef</span>
              </div>
           </div>
        </div>

        {/* Right: Text Content */}
        <div className="order-1 md:order-2 text-center md:text-left space-y-12">
          <div>
            <span className="inline-block bg-[#F6B9C3]/30 text-[#D87085] px-4 py-1 rounded-full font-bold tracking-wider uppercase text-xs mb-4">
              Padaria Artesanal & Confeitaria
            </span>
            <h1 className="text-6xl md:text-8xl font-pacifico text-[#D87085] leading-[0.9] drop-shadow-sm">
              Cenários <br/>
              <span className="text-[#4A3B32] relative">
                Gulosos
                <svg className="absolute w-full h-4 -bottom-1 left-0 text-[#F2D0B6] -z-10" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" opacity="0.6" /></svg>
              </span>
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-[#4A3B32]/80 font-lato max-w-md mx-auto md:mx-0 leading-relaxed">
            Uma boutique de doces e salgados, especializada em entregar felicidade.
          </p>
          
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center">
             <Button size="lg" className="px-10 py-4 text-xl shadow-xl shadow-[#D87085]/20 hover:shadow-2xl hover:-translate-y-1" onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth'})}>
              Ver Caixas da Semana
             </Button>
             <a href="#how-to" className="text-[#D87085] font-bold hover:underline decoration-2 underline-offset-4">
               Como funciona?
             </a>
          </div>
        </div>
      </div>
    </section>
  );
};
