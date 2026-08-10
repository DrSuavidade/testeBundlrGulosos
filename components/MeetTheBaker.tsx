import React from 'react';
import { Button } from './ui/Button';
import { WavyDivider } from './ui/WavyDivider';

export const MeetTheBaker: React.FC = () => {
  return (
    <section className="relative py-28 md:py-40 bg-[#F0F7FF]">
      {/* Top Divider */}
      <WavyDivider className="absolute top-0 left-0 w-full -translate-y-[99%] z-10" color="#F0F7FF" variant="swoop" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          
          {/* Photo with shape */}
          <div className="w-full md:w-5/12 relative group max-w-md mx-auto md:max-w-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[#93C5FD] rounded-[3rem] sm:rounded-[4rem] transform -rotate-3 sm:-rotate-6 scale-105 transition-transform group-hover:rotate-0"></div>
            <img 
              src="https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=800&auto=format&fit=crop" 
              alt="Encontro de Artesanato e Crochê no ES" 
              className="relative w-full h-[320px] sm:h-[420px] md:h-[500px] object-cover rounded-[3rem] sm:rounded-[4rem] shadow-2xl border-4 sm:border-8 border-white"
            />
            <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 bg-white px-4 py-2 sm:px-6 sm:py-3 rounded-full shadow-lg transform rotate-3 animate-float border-2 border-[#BFDBFE]">
              <span className="font-pacifico text-[#2563EB] text-xl sm:text-2xl">Oi, ES!</span>
            </div>
          </div>

          {/* Text */}
          <div className="w-full md:w-7/12 md:pl-8 text-center md:text-left">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-pacifico text-[#60A5FA] mb-4 drop-shadow-sm leading-tight">
              Conheça a <br/><span className="text-[#2563EB]">Pedra Mania</span>
            </h2>
            <div className="h-1 w-20 sm:w-24 bg-[#1E293B] mb-6 sm:mb-8 mx-auto md:mx-0 rounded-full"></div>
            
            <p className="text-base sm:text-xl text-[#1E293B]/80 mb-4 sm:mb-6 leading-relaxed font-lato">
              Somos o armarinho dos seus produtos! Tudo o que você precisa para seu artesanato, crochê, tricô, bijuterias e decor está aqui. Nascemos no Espírito Santo com o propósito de oferecer fios de algodão de altíssima qualidade, pedras autênticas e kits completos para facilitar suas criações.
            </p>
            <p className="text-sm sm:text-lg text-[#1E293B]/80 mb-8 sm:mb-10 leading-relaxed font-lato">
              Também amamos reunir artesãs! Promovemos <strong>encontros presenciais periódicos</strong> no ES para ensinar técnicas, praticar crochê e conversar. Siga nosso Instagram <strong>@pedramaniaoficial</strong> para não perder o próximo encontro!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button size="lg" className="w-full sm:w-auto shadow-lg hover:shadow-xl py-3.5 sm:py-4 text-sm sm:text-base" onClick={() => window.open('https://www.instagram.com/pedramaniaoficial/', '_blank')}>
                Siga no Insta @pedramaniaoficial
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
