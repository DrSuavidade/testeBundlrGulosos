import React from 'react';
import { Button } from './ui/Button';

export const MeetTheBaker: React.FC = () => {
  return (
    <section className="relative py-16 md:py-24 bg-[#F0F7FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-14">

          {/* Photo */}
          <div className="w-full md:w-5/12 relative group max-w-sm mx-auto md:max-w-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[#93C5FD] rounded-2xl sm:rounded-3xl transform -rotate-2 sm:-rotate-4 scale-105 transition-transform group-hover:rotate-0"></div>
            <img
              src="https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=800&auto=format&fit=crop"
              alt="Encontro de Artesanato e Crochê no ES"
              className="relative w-full h-[260px] sm:h-[340px] md:h-[400px] object-cover rounded-2xl sm:rounded-3xl shadow-xl border-4 border-white"
            />
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-md transform rotate-3 animate-float border border-[#BFDBFE]">
              <span className="font-pacifico text-[#2563EB] text-base sm:text-lg">Oi, ES!</span>
            </div>
          </div>

          {/* Text */}
          <div className="w-full md:w-7/12 md:pl-6 text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-pacifico text-[#60A5FA] mb-3 drop-shadow-sm leading-tight">
              Conheça a <br/><span className="text-[#2563EB]">Pedra Mania</span>
            </h2>
            <div className="h-1 w-16 sm:w-20 bg-[#1E293B] mb-4 sm:mb-6 mx-auto md:mx-0 rounded-full"></div>

            <p className="text-sm sm:text-base text-[#1E293B]/80 mb-3 sm:mb-4 leading-relaxed font-lato">
              Somos o armarinho dos seus produtos! Tudo o que você precisa para seu artesanato, crochê, tricô, bijuterias e decor está aqui. Nascemos no Espírito Santo com o propósito de oferecer fios de algodão de altíssima qualidade, pedras autênticas e kits completos para facilitar suas criações.
            </p>
            <p className="text-xs sm:text-sm text-[#1E293B]/70 mb-6 sm:mb-8 leading-relaxed font-lato">
              Também amamos reunir artesãs! Promovemos <strong>encontros presenciais periódicos</strong> no ES para ensinar técnicas, praticar crochê e conversar. Siga nosso Instagram <strong>@pedramaniaoficial</strong> para não perder o próximo encontro!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Button size="lg" className="w-full sm:w-auto shadow-md hover:shadow-lg" onClick={() => window.open('https://www.instagram.com/pedramaniaoficial/', '_blank')}>
                Siga no Insta @pedramaniaoficial
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
