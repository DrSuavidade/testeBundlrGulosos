import React from 'react';
import { Button } from './ui/Button';
import { MapPin, Mail, Phone, Clock, MessageCircle } from 'lucide-react';
import { WavyDivider } from './ui/WavyDivider';

export const Contact: React.FC = () => {
  return (
    <section className="relative bg-[#F0F7FF] pt-16 md:pt-22 pb-12 md:pb-16">
      {/* Decorative Wave */}
      <WavyDivider className="absolute top-0 left-0 w-full -translate-y-[99%] z-10" color="#F0F7FF" variant="flow" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">

        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-pacifico text-[#2563EB] mb-2 drop-shadow-sm leading-tight">Fale Conosco</h2>
          <p className="text-xs sm:text-sm text-[#1E293B]/65 font-lato max-w-xl mx-auto">
            Dúvidas sobre fios, kits personalizados ou o próximo encontro no ES? A equipe Pedra Mania está à disposição!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start">

          {/* Info Card */}
          <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-md border-t-4 border-[#93C5FD]">
            <h3 className="text-lg sm:text-xl font-nunito font-extrabold text-[#1E293B] mb-5">Informações da Loja</h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3 group">
                <MapPin size={16} className="text-[#2563EB] mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-semibold text-[#1E293B] text-sm">Endereço</h4>
                  <p className="text-[#1E293B]/60 text-xs mt-0.5">Av. Beira Mar, 450 - Centro<br/>Vitória, Espírito Santo - BR</p>
                </div>
              </div>

              <div className="flex items-start gap-3 group">
                <Phone size={16} className="text-[#2563EB] mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-semibold text-[#1E293B] text-sm">Telefone / WhatsApp</h4>
                  <a
                    href="https://api.whatsapp.com/send?phone=5527996043041"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#1E293B]/60 text-xs mt-0.5 hover:text-[#2563EB] transition-colors inline-flex items-center gap-1 group/wa"
                  >
                    (27) 99604-3041
                    <MessageCircle size={11} className="opacity-0 group-hover/wa:opacity-100 transition-opacity" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 group">
                <Mail size={16} className="text-[#2563EB] mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-semibold text-[#1E293B] text-sm">Email</h4>
                  <p className="text-[#1E293B]/60 text-xs mt-0.5">contato@pedramania.com.br</p>
                </div>
              </div>

              <div className="flex items-start gap-3 group">
                <Clock size={16} className="text-[#2563EB] mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-semibold text-[#1E293B] text-sm">Horários de Atendimento</h4>
                  <div className="mt-1.5 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#1E293B]/60">Seg – Sex</span>
                      <span className="font-medium text-[#1E293B]">08:30 – 18:30</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[#1E293B]/60">Sábado</span>
                      <span className="font-medium text-[#1E293B]">09:00 – 14:00</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[#1E293B]/60">Domingo</span>
                      <span className="font-medium text-red-400">Fechado</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="relative">
            {/* Subtle background blobs */}
            <div className="absolute -top-8 -right-8 w-40 h-40 bg-[#93C5FD] rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#BFDBFE] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

            <form className="space-y-3.5 bg-white/75 backdrop-blur-md p-5 sm:p-7 rounded-2xl border border-white shadow-md relative z-10">
              <h3 className="text-base sm:text-lg font-bold text-[#1E293B] mb-3">Envie uma mensagem</h3>

              <div>
                <label className="block text-[10px] sm:text-xs font-bold text-[#1E293B] mb-1 uppercase tracking-wider">Seu Nome</label>
                <input
                  type="text"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DBEAFE] bg-white/80 focus:bg-white outline-none focus:border-[#93C5FD] focus:ring-2 focus:ring-[#93C5FD]/20 transition-all text-sm"
                  placeholder="Maria Santos"
                />
              </div>

              <div>
                <label className="block text-[10px] sm:text-xs font-bold text-[#1E293B] mb-1 uppercase tracking-wider">Seu Email</label>
                <input
                  type="email"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DBEAFE] bg-white/80 focus:bg-white outline-none focus:border-[#93C5FD] focus:ring-2 focus:ring-[#93C5FD]/20 transition-all text-sm"
                  placeholder="maria@email.com"
                />
              </div>

              <div>
                <label className="block text-[10px] sm:text-xs font-bold text-[#1E293B] mb-1 uppercase tracking-wider">Mensagem</label>
                <textarea
                  rows={4}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DBEAFE] bg-white/80 focus:bg-white outline-none focus:border-[#93C5FD] focus:ring-2 focus:ring-[#93C5FD]/20 transition-all resize-none text-sm"
                  placeholder="Gostaria de saber mais sobre os fios de algodão e o próximo encontro de artesanato..."
                ></textarea>
              </div>

              <Button fullWidth className="shadow-md">Enviar Mensagem</Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
