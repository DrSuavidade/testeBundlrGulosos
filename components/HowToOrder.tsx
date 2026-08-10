import React from 'react';
import { WavyDivider } from './ui/WavyDivider';

export const HowToOrder: React.FC = () => {
  const steps = [
    { id: 1, title: 'Escolha', desc: 'Navegue pelos nossos fios de algodão, miçangas e kits criativos.' },
    { id: 2, title: 'Monte seu Kit', desc: 'Selecione as cores, agulhas e insumos ideias para a sua peça.' },
    { id: 3, title: 'Pagamento Fácil', desc: 'Pague com segurança no site via PIX, Cartão ou na entrega.' },
    { id: 4, title: 'Receba no ES', desc: 'Entregamos em todo o Espírito Santo ou retire na loja física!' },
  ];

  return (
    <section id="how-to" className="relative py-28 md:py-40 bg-[#F0F7FF]">
      {/* Top Divider */}
      <WavyDivider className="absolute top-0 left-0 w-full -translate-y-[99%] z-10" color="#F0F7FF" variant="flow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 lg:gap-24">
          
          {/* Left: Giant Blob Title */}
          <div className="relative w-full md:w-5/12 flex justify-center">
            <div className="relative w-full aspect-square max-w-[340px] sm:max-w-[420px] md:max-w-[500px]">
               {/* Blob SVG Background */}
               <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full text-[#2563EB] fill-current animate-blob opacity-90 drop-shadow-2xl">
                  <path d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,79.6,-46.9C87.4,-34.7,90.1,-20.4,85.8,-8.3C81.5,3.8,70.2,13.7,60,22.2C49.8,30.7,40.7,37.8,31.4,45.8C22.1,53.8,12.6,62.7,2,63.4C-8.6,64.1,-20.3,56.6,-30.9,49.2C-41.5,41.8,-51,34.5,-60.1,25C-69.2,15.5,-77.9,3.8,-76.8,-7.4C-75.7,-18.6,-64.8,-29.3,-53.6,-38.2C-42.4,-47.1,-30.9,-54.2,-19.1,-62.5C-7.3,-70.8,4.8,-80.3,16.8,-79.8C28.8,-79.3,40.7,-68.8,44.7,-76.4Z" transform="translate(100 100)" />
               </svg>
               
               <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 sm:p-8 z-10">
                 <h2 className="text-4xl sm:text-5xl md:text-7xl font-pacifico text-white leading-[0.95] drop-shadow-md transform -rotate-3">
                   Como <br/>Fazer <br/>Pedido
                 </h2>
                 <a href="#products" className="mt-4 sm:mt-6 inline-block bg-white text-[#2563EB] px-5 py-2 sm:px-6 sm:py-2.5 rounded-full font-extrabold shadow-lg hover:scale-105 transition-transform uppercase text-xs sm:text-sm tracking-widest">
                   Começar Agora &rarr;
                 </a>
               </div>
            </div>
          </div>

          {/* Right: Content/Steps */}
          <div className="w-full md:w-7/12 space-y-6 sm:space-y-8">
             <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-10 rounded-[2.5rem] sm:rounded-[3rem] shadow-xl border border-[#BFDBFE]">
                <h3 className="text-2xl sm:text-3xl font-nunito font-extrabold text-[#1E293B] mb-6 sm:mb-8 border-b-4 border-[#93C5FD] inline-block pb-1 sm:pb-2">Passo a Passo</h3>
                
                <div className="grid grid-cols-1 gap-5 sm:gap-6">
                  {steps.map((step) => (
                    <div key={step.id} className="flex items-start sm:items-center gap-4 sm:gap-6 group">
                       <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#F0F7FF] flex items-center justify-center border-2 sm:border-4 border-[#93C5FD] group-hover:bg-[#93C5FD] group-hover:border-[#2563EB] transition-colors shadow-sm shrink-0 mt-1 sm:mt-0">
                         <span className="text-xl sm:text-3xl font-pacifico text-[#2563EB] group-hover:text-white transition-colors">{step.id}</span>
                       </div>
                       <div>
                         <h4 className="font-bold text-[#1E293B] text-base sm:text-xl group-hover:text-[#2563EB] transition-colors">{step.title}</h4>
                         <p className="text-[#1E293B]/70 text-xs sm:text-sm md:text-base font-lato">{step.desc}</p>
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
