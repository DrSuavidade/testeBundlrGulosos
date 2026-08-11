import React from 'react';
import { Instagram, Facebook, MapPin, Mail, Phone } from 'lucide-react';
import { WavyDivider } from './ui/WavyDivider';

interface FooterProps {
  behindContact?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ behindContact = false }) => {
  return (
    <footer className="bg-[#1E293B] text-[#BFDBFE] relative pt-16 sm:pt-24" style={behindContact ? { zIndex: 0, isolation: 'isolate' } : undefined}>
      {/* Top Divider */}
      {!behindContact && <WavyDivider className="absolute top-0 left-0 w-full -translate-y-[99%] z-10" color="#1E293B" variant="flow" />}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 relative z-30">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          
          <div className="space-y-4 sm:space-y-6">
            <h2 className="font-pacifico text-2xl sm:text-3xl text-white">Pedra Mania</h2>
            <p className="text-xs sm:text-sm opacity-80 font-lato leading-relaxed">
              O seu armarinho de referência no Espírito Santo. Insumos para crochê, tricô, bijuterias, miçangas e artes manuais com carinho e qualidade.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://www.instagram.com/pedramaniaoficial/" target="_blank" rel="noreferrer" className="bg-white/10 p-3 rounded-full hover:bg-[#2563EB] hover:text-white transition-all transform hover:scale-110"><Instagram size={22} /></a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="bg-white/10 p-3 rounded-full hover:bg-[#2563EB] hover:text-white transition-all transform hover:scale-110"><Facebook size={22} /></a>
            </div>
          </div>

          <div>
            <h3 className="font-nunito font-bold text-sm text-white mb-3 border-b-2 border-[#2563EB] inline-block pb-1">Explorar</h3>
            <ul className="space-y-2.5 text-xs opacity-75">
              <li><a href="#about" className="hover:text-white hover:pl-2 transition-all block">Nossa História & Encontros</a></li>
              <li><a href="#products" className="hover:text-white hover:pl-2 transition-all block">Linhas & Kits de Crochê</a></li>
              <li><a href="#how-to" className="hover:text-white hover:pl-2 transition-all block">Como Fazer Pedidos</a></li>
              <li><a href="https://www.instagram.com/pedramaniaoficial/" target="_blank" rel="noreferrer" className="hover:text-white hover:pl-2 transition-all block">Instagram @pedramaniaoficial</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-nunito font-bold text-sm text-white mb-3 border-b-2 border-[#2563EB] inline-block pb-1">Contato ES</h3>
            <ul className="space-y-2.5 text-xs opacity-75">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 flex-shrink-0 text-[#2563EB]" />
                <span>Av. Beira Mar, 450 - Centro<br/>Vitória, Espírito Santo - BR</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-[#2563EB] flex-shrink-0" />
                <span>(27) 99604-3041</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-[#2563EB] flex-shrink-0" />
                <span>contato@pedramania.com.br</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-nunito font-bold text-sm text-white mb-3 border-b-2 border-[#2563EB] inline-block pb-1">Horários Loja Física</h3>
            <ul className="space-y-2 text-xs opacity-75 bg-white/5 p-4 rounded-xl">
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Seg - Sex</span>
                <span>08:30 - 18:30</span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Sáb</span>
                <span>09:00 - 14:00</span>
              </li>
              <li className="text-[#2563EB] mt-3 font-bold text-center bg-white/10 py-1 rounded-lg">Domingo Fechado</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 sm:mt-10 pt-5 sm:pt-6 text-center text-[11px] opacity-50 font-lato">
          <p>© 2026 Pedra Mania Armarinho & Artesanato. Todos os direitos reservados. Espírito Santo - Brasil.</p>
        </div>
      </div>
    </footer>
  );
};
