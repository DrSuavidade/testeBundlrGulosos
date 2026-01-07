import React from 'react';
import { Instagram, Facebook, MapPin, Mail, Phone } from 'lucide-react';
import { WavyDivider } from './ui/WavyDivider';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#4A3B32] text-[#F2D0B6] relative pt-40">
      {/* Top Divider: Reaching up into MeetTheBaker (Cream) */}
      <WavyDivider className="absolute top-0 left-0 w-full -translate-y-[99%] z-10" color="#4A3B32" variant="flow" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="space-y-6">
            <h2 className="font-pacifico text-4xl text-white">Cenários Gulosos</h2>
            <p className="text-base opacity-80 font-lato leading-relaxed">
              A trazer doçura e afeto para a sua vida através da confeitaria artesanal desde 2012.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-[#D87085] hover:text-white transition-all transform hover:scale-110"><Instagram size={24} /></a>
              <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-[#D87085] hover:text-white transition-all transform hover:scale-110"><Facebook size={24} /></a>
            </div>
          </div>

          <div>
            <h3 className="font-nunito font-bold text-xl text-white mb-6 border-b-2 border-[#D87085] inline-block pb-1">Explorar</h3>
            <ul className="space-y-4 text-base opacity-80">
              <li><a href="#" className="hover:text-white hover:pl-2 transition-all">Nossa História</a></li>
              <li><a href="#" className="hover:text-white hover:pl-2 transition-all">Produtos</a></li>
              <li><a href="#" className="hover:text-white hover:pl-2 transition-all">Blog</a></li>
              <li><a href="#" className="hover:text-white hover:pl-2 transition-all">Carreiras</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-nunito font-bold text-xl text-white mb-6 border-b-2 border-[#D87085] inline-block pb-1">Contato</h3>
            <ul className="space-y-4 text-base opacity-80">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="mt-1 flex-shrink-0 text-[#D87085]" />
                <span>Rua dos Doces, 123<br/>Chiado, Lisboa - PT</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-[#D87085]" />
                <span>(11) 99999-9999</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-[#D87085]" />
                <span>oi@cenariosgulosos.pt</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-nunito font-bold text-xl text-white mb-6 border-b-2 border-[#D87085] inline-block pb-1">Horários</h3>
            <ul className="space-y-3 text-base opacity-80 bg-white/5 p-6 rounded-2xl">
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Ter - Sex</span>
                <span>09:00 - 19:00</span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Sáb</span>
                <span>09:00 - 18:00</span>
              </li>
              <li className="flex justify-between">
                <span>Dom</span>
                <span>09:00 - 13:00</span>
              </li>
              <li className="text-[#D87085] mt-4 font-bold text-center bg-white/10 py-1 rounded-lg">Segunda Fechado</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-8 text-center text-sm opacity-50 font-lato">
          <p>© 2026 Cenários Gulosos. Todos os direitos reservados. Feito com amor e açúcar.</p>
        </div>
      </div>
    </footer>
  );
};
