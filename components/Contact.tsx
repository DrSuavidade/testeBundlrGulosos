import React, { useState } from 'react';
import { Button } from './ui/Button';
import { MapPin, Mail, Phone, Clock, MessageCircle } from 'lucide-react';
import { WavyDivider } from './ui/WavyDivider';

export const Contact: React.FC = () => {
  const [openMap, setOpenMap] = useState<'vila-velha' | 'vitoria' | null>('vila-velha');

  return (
    <section className="relative bg-[#F0F7FF] pt-6 md:pt-10 pb-12 md:pb-16 overflow-visible" style={{ zIndex: 1000, isolation: 'isolate', transform: 'translateZ(0)' }}>
      <WavyDivider className="absolute bottom-0 left-0 w-full z-0" color="#1E293B" variant="flow" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-[200]" style={{ transform: 'translateZ(0)' }}>

        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-pacifico text-[#2563EB] mb-2 drop-shadow-sm leading-tight">Fale Conosco</h2>
          <p className="text-xs sm:text-sm text-[#1E293B]/65 font-lato max-w-xl mx-auto">
            Dúvidas sobre fios, kits personalizados ou o próximo encontro no ES? A equipe Pedra Mania está à disposição!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start">

          {/* Info Card */}
          <div className="relative z-[9999] h-full bg-white rounded-2xl p-5 sm:p-7 shadow-md border-t-4 border-[#93C5FD] flex flex-col" style={{ position: 'relative', zIndex: 99999 }}>
            <h3 className="text-lg sm:text-xl font-nunito font-extrabold text-[#1E293B] mb-4 sm:mb-6">Informações da Loja</h3>

            <div className="flex-1 flex flex-col justify-between space-y-4">
              <div className="flex items-start gap-3 group">
                <div className="bg-[#F0F7FF] p-2 rounded-lg shrink-0 group-hover:bg-[#DBEAFE] transition-colors">
                  <MapPin size={18} className="text-[#2563EB]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1E293B] text-sm">Endereços</h4>
                  <p className="text-[#1E293B]/70 text-[13px] mt-1 leading-relaxed">
                    Glória, Vila Velha — ES<br/>
                    Jardim Camburi, Vitória — ES
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 group">
                <div className="bg-[#F0F7FF] p-2 rounded-lg shrink-0 group-hover:bg-[#DBEAFE] transition-colors">
                  <Phone size={18} className="text-[#2563EB]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1E293B] text-sm">WhatsApp</h4>
                  <a
                    href="https://api.whatsapp.com/send?phone=5527996043041"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#2563EB] font-semibold text-[13px] mt-1 hover:text-[#1D4ED8] transition-colors inline-flex items-center gap-1.5 group/wa"
                  >
                    (27) 99604-3041
                    <MessageCircle size={14} className="opacity-70 group-hover/wa:opacity-100 transition-opacity" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 group">
                <div className="bg-[#F0F7FF] p-2 rounded-lg shrink-0 group-hover:bg-[#DBEAFE] transition-colors">
                  <Mail size={18} className="text-[#2563EB]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1E293B] text-sm">Email</h4>
                  <p className="text-[#1E293B]/70 text-[13px] mt-1">contato@pedramania.com.br</p>
                </div>
              </div>

              <div className="flex items-start gap-3 group">
                <div className="bg-[#F0F7FF] p-2 rounded-lg shrink-0 group-hover:bg-[#DBEAFE] transition-colors">
                  <Clock size={18} className="text-[#2563EB]" />
                </div>
                <div className="w-full">
                  <h4 className="font-bold text-[#1E293B] text-sm mb-2">Horários</h4>
                  <div className="space-y-1.5 bg-gray-50 rounded-lg p-3 border border-gray-100">
                    <div className="flex justify-between text-[13px]">
                      <span className="text-[#1E293B]/70 font-medium">Seg – Sex</span>
                      <span className="font-bold text-[#1E293B]">08:30 – 18:30</span>
                    </div>
                    <div className="flex justify-between text-[13px]">
                      <span className="text-[#1E293B]/70 font-medium">Sábado</span>
                      <span className="font-bold text-[#1E293B]">09:00 – 14:00</span>
                    </div>
                    <div className="flex justify-between text-[13px]">
                      <span className="text-[#1E293B]/70 font-medium">Domingo</span>
                      <span className="font-bold text-red-500">Fechado</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Locations */}
          <div className="relative">
            <div className="space-y-4 h-full bg-white p-5 sm:p-7 rounded-2xl border border-white shadow-md relative z-[9999]" style={{ position: 'relative', zIndex: 99999 }}>
              <h3 className="text-base sm:text-lg font-bold text-[#1E293B] mb-4">Nossas Lojas</h3>

              {/* Vila Velha */}
              <div className="border border-[#DBEAFE] rounded-xl overflow-hidden transition-all">
                <button 
                  onClick={() => setOpenMap(openMap === 'vila-velha' ? null : 'vila-velha')}
                  className="w-full flex items-center justify-between p-4 bg-gray-50/50 hover:bg-[#F0F7FF] transition-colors text-left"
                >
                  <div>
                    <h4 className="text-[11px] sm:text-xs font-bold text-[#2563EB] uppercase tracking-wider">Vila Velha</h4>
                    <p className="text-xs text-[#1E293B]/80 mt-1">Rua dom Pedro II, 261 - Glória</p>
                  </div>
                  <div className={`transform transition-transform text-[#2563EB] ${openMap === 'vila-velha' ? 'rotate-180' : ''}`}>
                    ▼
                  </div>
                </button>
                {openMap === 'vila-velha' && (
                  <div className="w-full h-48 sm:h-56 border-t border-[#DBEAFE]">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      loading="lazy" 
                      allowFullScreen 
                      src="https://www.google.com/maps?q=Rua+dom+Pedro+2,+261+Gloria+Vila+Velha&output=embed">
                    </iframe>
                  </div>
                )}
              </div>

              {/* Vitória */}
              <div className="border border-[#DBEAFE] rounded-xl overflow-hidden transition-all">
                <button 
                  onClick={() => setOpenMap(openMap === 'vitoria' ? null : 'vitoria')}
                  className="w-full flex items-center justify-between p-4 bg-gray-50/50 hover:bg-[#F0F7FF] transition-colors text-left"
                >
                  <div>
                    <h4 className="text-[11px] sm:text-xs font-bold text-[#2563EB] uppercase tracking-wider">Vitória</h4>
                    <p className="text-xs text-[#1E293B]/80 mt-1">Rua Paschoal Delmaestro, 401 - Jardim Camburi</p>
                  </div>
                  <div className={`transform transition-transform text-[#2563EB] ${openMap === 'vitoria' ? 'rotate-180' : ''}`}>
                    ▼
                  </div>
                </button>
                {openMap === 'vitoria' && (
                  <div className="w-full h-48 sm:h-56 border-t border-[#DBEAFE]">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      loading="lazy" 
                      allowFullScreen 
                      src="https://www.google.com/maps?q=Rua+Paschoal+Delmaestro,+401,+Jardim+Camburi,+vitoria&output=embed">
                    </iframe>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
