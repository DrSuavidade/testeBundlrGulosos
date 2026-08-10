import React from 'react';
import { Button } from './ui/Button';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';
import { WavyDivider } from './ui/WavyDivider';

export const Contact: React.FC = () => {
  return (
    <section className="relative bg-[#F0F7FF] pt-28 md:pt-32 pb-16 md:pb-20">
      {/* Decorative Wave */}
      <WavyDivider className="absolute top-0 left-0 w-full -translate-y-[99%] z-10" color="#F0F7FF" variant="flow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-6xl font-pacifico text-[#2563EB] mb-3 sm:mb-4 drop-shadow-sm leading-tight">Fale Conosco</h2>
          <p className="text-sm sm:text-lg text-[#1E293B]/70 font-lato max-w-2xl mx-auto px-2 sm:px-0">
            Tem dúvidas sobre qual fio de algodão escolher, quer montar um kit personalizado de bijuterias ou participar do nosso próximo encontro no Espírito Santo? Fale com a equipe da Pedra Mania!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          
          {/* Info Card */}
          <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 shadow-xl border-t-[10px] sm:border-t-[12px] border-[#93C5FD]">
            <h3 className="text-2xl sm:text-3xl font-nunito font-extrabold text-[#1E293B] mb-6 sm:mb-8">Informações da Loja</h3>
            
            <div className="space-y-6 sm:space-y-8">
              <div className="flex items-start gap-4 sm:gap-6 group">
                <div className="bg-[#F0F7FF] p-3 sm:p-4 rounded-full text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-colors shadow-sm shrink-0">
                  <MapPin size={24} className="sm:w-7 sm:h-7" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1E293B] text-base sm:text-lg">Endereço</h4>
                  <p className="text-[#1E293B]/70 text-xs sm:text-base">Av. Beira Mar, 450 - Centro<br/>Vitória, Espírito Santo - BR</p>
                </div>
              </div>

              <div className="flex items-start gap-4 sm:gap-6 group">
                <div className="bg-[#F0F7FF] p-3 sm:p-4 rounded-full text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-colors shadow-sm shrink-0">
                  <Phone size={24} className="sm:w-7 sm:h-7" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1E293B] text-base sm:text-lg">Telefone / WhatsApp</h4>
                  <p className="text-[#1E293B]/70 text-xs sm:text-base">(27) 99604-3041</p>
                </div>
              </div>

              <div className="flex items-start gap-4 sm:gap-6 group">
                <div className="bg-[#F0F7FF] p-3 sm:p-4 rounded-full text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-colors shadow-sm shrink-0">
                  <Mail size={24} className="sm:w-7 sm:h-7" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1E293B] text-base sm:text-lg">Email</h4>
                  <p className="text-[#1E293B]/70 text-xs sm:text-base">contato@pedramania.com.br</p>
                </div>
              </div>

              <div className="flex items-start gap-4 sm:gap-6 group">
                 <div className="bg-[#F0F7FF] p-3 sm:p-4 rounded-full text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-colors shadow-sm shrink-0">
                  <Clock size={24} className="sm:w-7 sm:h-7" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1E293B] text-base sm:text-lg">Horários de Atendimento</h4>
                  <p className="text-[#1E293B]/70 text-xs sm:text-base">Seg - Sex: 08:30 - 18:30<br/>Sáb: 09:00 - 14:00<br/>Dom: Fechado</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="relative">
             {/* Background Decoration */}
             <div className="absolute -top-10 -right-10 w-48 sm:w-60 h-48 sm:h-60 bg-[#93C5FD] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
             <div className="absolute -bottom-10 -left-10 w-36 sm:w-40 h-36 sm:h-40 bg-[#BFDBFE] rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>

             <form className="space-y-4 sm:space-y-6 bg-white/70 backdrop-blur-md p-6 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] border border-white shadow-lg relative z-10">
                <h3 className="text-xl sm:text-2xl font-bold text-[#1E293B] mb-2">Envie uma mensagem</h3>
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-[#1E293B] mb-1.5 sm:mb-2 uppercase tracking-wide">Seu Nome</label>
                  <input type="text" className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-2xl border-2 border-white bg-white/80 focus:bg-white outline-none focus:border-[#93C5FD] focus:ring-4 focus:ring-[#93C5FD]/20 transition-all shadow-inner text-sm" placeholder="Maria Santos" />
                </div>
                
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-[#1E293B] mb-1.5 sm:mb-2 uppercase tracking-wide">Seu Email</label>
                  <input type="email" className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-2xl border-2 border-white bg-white/80 focus:bg-white outline-none focus:border-[#93C5FD] focus:ring-4 focus:ring-[#93C5FD]/20 transition-all shadow-inner text-sm" placeholder="maria@email.com" />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-[#1E293B] mb-1.5 sm:mb-2 uppercase tracking-wide">Mensagem</label>
                  <textarea rows={4} className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-2xl border-2 border-white bg-white/80 focus:bg-white outline-none focus:border-[#93C5FD] focus:ring-4 focus:ring-[#93C5FD]/20 transition-all resize-none shadow-inner text-sm" placeholder="Gostaria de saber mais sobre os fios de algodão e o próximo encontro de artesanato..."></textarea>
                </div>

                <Button fullWidth size="lg" className="py-3.5 sm:py-4 text-base sm:text-lg shadow-xl">Enviar Mensagem</Button>
             </form>
          </div>
        </div>
      </div>
    </section>
  );
};
