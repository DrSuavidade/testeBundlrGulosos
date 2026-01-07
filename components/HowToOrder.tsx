import React from 'react';
import { WavyDivider } from './ui/WavyDivider';

export const HowToOrder: React.FC = () => {
  const steps = [
    { id: 1, title: 'Escolhe', desc: 'Navegue pelo menu semanal recheado de novidades.' },
    { id: 2, title: 'Agenda', desc: 'Selecione a data para vir pegar ou para a entrega.' },
    { id: 3, title: 'Pagua', desc: 'Pagamento facilitado no site via Visa e Mastercard.' },
    { id: 4, title: 'Aproveita', desc: 'Receba a sua caixa e sinta o sabor do carinho.' },
  ];

  return (
    <section id="how-to" className="relative py-40 bg-[#FFF6F1]">
      {/* Top Divider: Reaching up into the ProductGrid (Pink) */}
      <WavyDivider className="absolute top-0 left-0 w-full -translate-y-[99%] z-10" color="#FFF6F1" variant="flow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="flex flex-col md:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left: Giant Blob Title */}
          <div className="relative w-full md:w-5/12 flex justify-center">
            <div className="relative w-full aspect-square max-w-[500px]">
               {/* Blob SVG Background */}
               <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full text-[#D87085] fill-current animate-blob opacity-90 drop-shadow-2xl">
                  <path d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,79.6,-46.9C87.4,-34.7,90.1,-20.4,85.8,-8.3C81.5,3.8,70.2,13.7,60,22.2C49.8,30.7,40.7,37.8,31.4,45.8C22.1,53.8,12.6,62.7,2,63.4C-8.6,64.1,-20.3,56.6,-30.9,49.2C-41.5,41.8,-51,34.5,-60.1,25C-69.2,15.5,-77.9,3.8,-76.8,-7.4C-75.7,-18.6,-64.8,-29.3,-53.6,-38.2C-42.4,-47.1,-30.9,-54.2,-19.1,-62.5C-7.3,-70.8,4.8,-80.3,16.8,-79.8C28.8,-79.3,40.7,-68.8,44.7,-76.4Z" transform="translate(100 100)" />
               </svg>
               
               <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-10">
                 <h2 className="text-5xl md:text-7xl font-pacifico text-white leading-[0.9] drop-shadow-md transform -rotate-3">
                   Como <br/>Fazer <br/>Pedido
                 </h2>
                 <a href="#products" className="mt-6 inline-block bg-white text-[#D87085] px-6 py-2 rounded-full font-bold shadow-lg hover:scale-105 transition-transform uppercase text-sm tracking-widest">
                   Começar Agora &rarr;
                 </a>
               </div>
            </div>
          </div>

          {/* Right: Content/Steps */}
          <div className="w-full md:w-7/12 space-y-8">
             <div className="bg-white/80 backdrop-blur-sm p-10 rounded-[3rem] shadow-xl border border-[#F2D0B6]">
                <h3 className="text-3xl font-nunito font-extrabold text-[#4A3B32] mb-8 border-b-4 border-[#F6B9C3] inline-block pb-2">Passo a Passo</h3>
                
                <div className="grid grid-cols-1 gap-6">
                  {steps.map((step, idx) => (
                    <div key={step.id} className="flex items-center gap-6 group">
                       <div className="w-16 h-16 rounded-full bg-[#FFF6F1] flex items-center justify-center border-4 border-[#F6B9C3] group-hover:bg-[#F6B9C3] group-hover:border-[#D87085] transition-colors shadow-sm shrink-0">
                         <span className="text-3xl font-pacifico text-[#D87085] group-hover:text-white transition-colors">{step.id}</span>
                       </div>
                       <div>
                         <h4 className="font-bold text-[#4A3B32] text-xl group-hover:text-[#D87085] transition-colors">{step.title}</h4>
                         <p className="text-[#4A3B32]/70 font-lato">{step.desc}</p>
                       </div>
                    </div>
                  ))}
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};
