import React from 'react';
import { Button } from './ui/Button';
import { Award } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative bg-[#F0F7FF] pt-16 pb-12 md:pt-24 md:pb-20 overflow-hidden">

      {/* Subtle background blobs — smaller and more restrained */}
      <div className="absolute top-0 right-0 w-[280px] h-[280px] sm:w-[450px] sm:h-[450px] md:w-[580px] md:h-[580px] bg-[#93C5FD] rounded-full opacity-30 blur-3xl -z-10 translate-x-1/3 -translate-y-1/3 animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] md:w-[420px] md:h-[420px] bg-[#BFDBFE] rounded-full opacity-30 blur-3xl -z-10 -translate-x-1/4 translate-y-1/4"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">

        {/* Left: Image */}
        <div className="relative order-2 md:order-1 flex justify-center md:justify-end mt-2 md:mt-0">
          <div className="relative transform -rotate-2 sm:-rotate-4 transition-transform hover:rotate-0 duration-700 ease-out group hover:z-20">
            <div className="absolute inset-0 bg-[#1E293B] rounded-2xl transform translate-y-2 translate-x-2 opacity-10"></div>
            <img
              src="https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop"
              alt="Novelos de Algodão e Kits Pedra Mania"
              className="relative w-56 sm:w-72 md:w-[22rem] rounded-2xl shadow-xl border-4 border-white object-cover aspect-[4/5] z-10"
            />

            {/* Badge 1 */}
            <div className="absolute -top-3 -left-3 sm:-top-5 sm:-left-5 md:-top-7 md:-left-7 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-[#2563EB] rounded-full flex flex-col items-center justify-center text-white text-center p-1.5 shadow-lg animate-float border-2 border-white transform -rotate-12 z-20">
              <span className="text-[0.5rem] sm:text-[0.55rem] uppercase tracking-widest font-bold">Eleito</span>
              <span className="font-pacifico text-sm sm:text-lg md:text-xl leading-none">Melhor</span>
              <span className="text-[0.5rem] sm:text-[0.6rem] font-bold">Kit Crochê</span>
              <span className="text-[0.45rem] sm:text-[0.5rem] mt-0.5 opacity-90 font-bold">ES · 2024</span>
            </div>

            {/* Badge 2 */}
            <div className="absolute bottom-3 -right-2 sm:bottom-6 sm:-right-3 md:bottom-8 md:-right-5 w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-[#F0F7FF] rounded-full flex flex-col items-center justify-center text-[#1E293B] text-center p-1.5 shadow-lg animate-float animation-delay-2000 border-2 border-[#BFDBFE] transform rotate-12 z-20">
              <Award size={14} className="mb-0.5 text-[#2563EB]" />
              <span className="text-[0.5rem] sm:text-[0.55rem] font-bold leading-tight">Escolha das<br/>Artesãs</span>
            </div>
          </div>
        </div>

        {/* Right: Text */}
        <div className="order-1 md:order-2 text-center md:text-left space-y-4 md:space-y-6">
          <div>
            <span className="inline-block bg-[#93C5FD]/40 text-[#2563EB] px-3 py-1 rounded-full font-bold tracking-wider uppercase text-[0.65rem] mb-2.5 shadow-sm">
              Armarinho, Linhas & Bijuterias no ES
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-pacifico text-[#2563EB] leading-[1.05] md:leading-[0.95] drop-shadow-sm">
              Pedra <br/>
              <span className="text-[#1E293B] relative inline-block mt-1 sm:mt-0">
                Mania
                <svg className="absolute w-full h-2.5 sm:h-3 -bottom-0.5 left-0 text-[#BFDBFE] -z-10" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" opacity="0.8" /></svg>
              </span>
            </h1>
          </div>

          <p className="text-sm sm:text-base md:text-lg text-[#1E293B]/75 font-lato max-w-md mx-auto md:mx-0 leading-relaxed">
            O que você precisa para o seu artesanato e decor está aqui! Fios de algodão para crochê e tricô, miçangas e kits criativos completos.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start items-center">
            <Button size="lg" className="w-full sm:w-auto px-7 sm:px-9 shadow-lg shadow-[#2563EB]/20 hover:shadow-xl hover:-translate-y-0.5" onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth'})}>
              Ver Kits da Semana
            </Button>
            <a href="#how-to" className="text-[#2563EB] font-bold text-sm hover:underline decoration-2 underline-offset-4 py-1.5">
              Como funciona?
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
