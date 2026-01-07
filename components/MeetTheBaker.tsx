import React from 'react';
import { Button } from './ui/Button';
import { WavyDivider } from './ui/WavyDivider';

export const MeetTheBaker: React.FC = () => {
  return (
    <section className="relative py-40 bg-[#FFF6F1]">
      {/* Top Divider: Reaching up into Press (Peach) */}
      <WavyDivider className="absolute top-0 left-0 w-full -translate-y-[99%] z-10" color="#FFF6F1" variant="swoop" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-16">
          
          {/* Photo with shape */}
          <div className="w-full md:w-5/12 relative group">
            <div className="absolute top-0 left-0 w-full h-full bg-[#F6B9C3] rounded-[4rem] transform -rotate-6 scale-105 transition-transform group-hover:rotate-0"></div>
            <img 
              src="https://thumbs.dreamstime.com/b/happy-senior-woman-baking-bright-modern-kitchen-189865253.jpg" 
              alt="A Confeiteira" 
              className="relative w-full h-[500px] object-cover rounded-[4rem] shadow-2xl border-8 border-white"
            />
            <div className="absolute bottom-8 right-8 bg-white px-6 py-3 rounded-full shadow-lg transform rotate-3 animate-float">
              <span className="font-pacifico text-[#D87085] text-2xl">Oi!</span>
            </div>
          </div>

          {/* Text */}
          <div className="w-full md:w-7/12 md:pl-8 text-center md:text-left">
            <h2 className="text-6xl md:text-7xl font-pacifico text-[#F2D0B6] mb-4 drop-shadow-sm leading-tight">
              Conheça a <br/><span className="text-[#D87085]">Mariana</span>
            </h2>
            <div className="h-1 w-24 bg-[#4A3B32] mb-8 mx-auto md:mx-0 rounded-full"></div>
            
            <p className="text-xl text-[#4A3B32]/80 mb-6 leading-relaxed font-lato">
              Olá! Sou a fundadora da Cenários Gulosos. Desde pequena que a cozinha foi um lugar de magia. 
              Troquei a arquitetura pelas formas e sabores da confeitaria e hoje realizo o sonho de levar 
              doçura para a casa de centenas de clientes.
            </p>
            <p className="text-lg text-[#4A3B32]/80 mb-10 leading-relaxed font-lato">
              Cada miniatura, cada bolo, tem um pedacinho da minha história e muito amor envolvido.
              Espero que sinta esse carinho em cada mordida!
            </p>
            <Button size="lg" className="shadow-lg hover:shadow-xl">Ler a minha história completa</Button>
          </div>

        </div>
      </div>
    </section>
  );
};
