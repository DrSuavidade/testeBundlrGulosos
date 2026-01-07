import React from 'react';
import { ArrowRight } from 'lucide-react';
import { WavyDivider } from './ui/WavyDivider';

export const Press: React.FC = () => {
  const pressItems = [
    { outlet: 'Revista Gastronomia', logo: 'GASTRO', title: 'Cenários Gulosos eleita melhor cookie de SP', link: '#' },
    { outlet: 'Folha de S.Paulo', logo: 'FOLHA', title: 'A confeitaria artesanal que conquistou a internet', link: '#' },
    { outlet: 'Veja SP', logo: 'VEJA', title: 'Destaque da semana: Bolo Red Velvet', link: '#' },
  ];

  return (
    <section className="relative bg-[#F6B9C3] py-32 flex flex-col md:flex-row items-stretch overflow-hidden">
      {/* Top Divider: Reaching up into Testimonials (Pink) */}
      <WavyDivider className="absolute top-0 left-0 w-full -translate-y-[99%] z-10" color="#F2D0B6" variant="flow" />

      {/* Left: Content */}
      <div className="w-full md:w-1/2 px-6 sm:px-12 lg:pl-24 flex flex-col justify-center py-12 relative z-10">
        <div className="mb-10 text-center md:text-left">
           <h2 className="font-pacifico text-5xl md:text-6xl text-[#D87085] mb-4">Cenários <br/>na Mídia</h2>
           <p className="text-[#4A3B32] font-bold text-lg border-l-4 border-[#D87085] pl-4">Veja quem está a falar dos nossos doces</p>
        </div>

        <div className="space-y-4">
          {pressItems.map((item, idx) => (
            <div key={idx} className="bg-white/60 hover:bg-white/90 transition-all p-6 rounded-2xl flex items-center justify-between group cursor-pointer shadow-sm hover:shadow-md transform hover:-translate-x-1">
              <div>
                <span className="block font-bold text-[#D87085] text-xs uppercase tracking-wider mb-1">{item.outlet}</span>
                <h3 className="font-nunito font-bold text-[#4A3B32] text-lg leading-tight group-hover:text-[#D87085] transition-colors">{item.title}</h3>
              </div>
              <ArrowRight className="text-[#D87085] transform group-hover:translate-x-2 transition-transform opacity-50 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>

      {/* Right: Big Image */}
      <div className="w-full md:w-1/2 relative min-h-[500px] mt-12 md:mt-0">
         {/* Organic clip path mask */}
         <div className="absolute inset-0 bg-[#FFF6F1] transform md:translate-x-0 rounded-t-[4rem] md:rounded-l-[5rem] md:rounded-tr-none overflow-hidden border-t-8 md:border-t-0 md:border-l-8 border-white shadow-2xl">
            <img 
            src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=800&auto=format&fit=crop" 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
            alt="Cookies deliciosos"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#4A3B32]/40 to-transparent"></div>
         </div>
      </div>
    </section>
  );
};
