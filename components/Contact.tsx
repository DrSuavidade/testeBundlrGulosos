import React from 'react';
import { Button } from './ui/Button';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';
import { WavyDivider } from './ui/WavyDivider';

export const Contact: React.FC = () => {
  return (
    <section className="relative bg-[#FFF6F1] pt-32 pb-20">
      {/* Decorative Wave */}
      <WavyDivider className="absolute top-0 left-0 w-full -translate-y-[99%] z-10" color="#FFF6F1" variant="flow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-6xl font-pacifico text-[#D87085] mb-4 drop-shadow-sm">Fale Conosco</h2>
          <p className="text-lg text-[#4A3B32]/70 font-lato max-w-2xl mx-auto">
            Tem alguma dúvida, sugestão ou quer fazer uma encomenda especial para o seu evento? 
            Estamos aqui para deixar seu dia mais doce!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          
          {/* Info Card */}
          <div className="bg-white rounded-[2.5rem] p-10 shadow-xl border-t-[12px] border-[#F6B9C3]">
            <h3 className="text-3xl font-nunito font-extrabold text-[#4A3B32] mb-8">Informações</h3>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="bg-[#FFF6F1] p-4 rounded-full text-[#D87085] group-hover:bg-[#D87085] group-hover:text-white transition-colors shadow-sm">
                  <MapPin size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-[#4A3B32] text-lg">Endereço</h4>
                  <p className="text-[#4A3B32]/70 text-lg">Rua dos Doces, 123<br/>Jardins, São Paulo - SP</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="bg-[#FFF6F1] p-4 rounded-full text-[#D87085] group-hover:bg-[#D87085] group-hover:text-white transition-colors shadow-sm">
                  <Phone size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-[#4A3B32] text-lg">Telefone / WhatsApp</h4>
                  <p className="text-[#4A3B32]/70 text-lg">(11) 99999-9999</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="bg-[#FFF6F1] p-4 rounded-full text-[#D87085] group-hover:bg-[#D87085] group-hover:text-white transition-colors shadow-sm">
                  <Mail size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-[#4A3B32] text-lg">Email</h4>
                  <p className="text-[#4A3B32]/70 text-lg">oi@cenariosgulosos.com.br</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                 <div className="bg-[#FFF6F1] p-4 rounded-full text-[#D87085] group-hover:bg-[#D87085] group-hover:text-white transition-colors shadow-sm">
                  <Clock size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-[#4A3B32] text-lg">Horários</h4>
                  <p className="text-[#4A3B32]/70 text-lg">Ter - Sex: 09:00 - 19:00<br/>Sáb: 09:00 - 18:00<br/>Dom: 09:00 - 13:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="relative">
             {/* Background Decoration */}
             <div className="absolute -top-10 -right-10 w-60 h-60 bg-[#D87085] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
             <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#F2D0B6] rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>

             <form className="space-y-6 bg-white/60 backdrop-blur-md p-10 rounded-[2.5rem] border border-white shadow-lg relative z-10">
                <h3 className="text-2xl font-bold text-[#4A3B32] mb-2">Envie uma mensagem</h3>
                <div>
                  <label className="block text-sm font-bold text-[#4A3B32] mb-2 uppercase tracking-wide">Seu Nome</label>
                  <input type="text" className="w-full px-5 py-4 rounded-2xl border-2 border-white bg-white/80 focus:bg-white outline-none focus:border-[#F6B9C3] focus:ring-4 focus:ring-[#F6B9C3]/20 transition-all shadow-inner" placeholder="Maria da Silva" />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-[#4A3B32] mb-2 uppercase tracking-wide">Seu Email</label>
                  <input type="email" className="w-full px-5 py-4 rounded-2xl border-2 border-white bg-white/80 focus:bg-white outline-none focus:border-[#F6B9C3] focus:ring-4 focus:ring-[#F6B9C3]/20 transition-all shadow-inner" placeholder="maria@email.com" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#4A3B32] mb-2 uppercase tracking-wide">Mensagem</label>
                  <textarea rows={5} className="w-full px-5 py-4 rounded-2xl border-2 border-white bg-white/80 focus:bg-white outline-none focus:border-[#F6B9C3] focus:ring-4 focus:ring-[#F6B9C3]/20 transition-all resize-none shadow-inner" placeholder="Olá, gostaria de saber sobre..."></textarea>
                </div>

                <Button fullWidth size="lg" className="py-4 text-lg shadow-xl">Enviar Mensagem</Button>
             </form>
          </div>
        </div>
      </div>
    </section>
  );
};
