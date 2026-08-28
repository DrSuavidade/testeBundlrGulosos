import React, { useState, useEffect } from 'react';
import { Instagram, ExternalLink } from 'lucide-react';
import { WavyDivider } from './ui/WavyDivider';
import { api } from '../services/mockApi';
import { InstaPost } from '../types';

interface PressProps {
  dividerColor?: string;
  dividerVariant?: 'gentle' | 'wave' | 'curve' | 'asymmetric' | 'swoop' | 'flow';
  showTopDivider?: boolean;
}

export const Press: React.FC<PressProps> = ({ 
  dividerColor = "#BFDBFE",
  dividerVariant = "flow",
  showTopDivider = false
}) => {
  const instaUrl = "https://www.instagram.com/pedramaniaoficial/";
  const [instaPosts, setInstaPosts] = useState<InstaPost[]>([]);

  useEffect(() => {
    api.getInstaPosts().then(setInstaPosts).catch(console.error);
  }, []);

  return (
    <section className="relative bg-[#93C5FD] py-14 md:py-20 flex flex-col lg:flex-row items-stretch">
      {/* Top Divider */}
      {showTopDivider && (
        <WavyDivider className="absolute top-0 left-0 w-full -translate-y-[99%] z-40" color={dividerColor} variant={dividerVariant} />
      )}

      {/* Left: Instagram Feed Content */}
      <div className="w-full lg:w-1/2 px-4 sm:px-8 lg:pl-24 flex flex-col justify-center py-8 md:py-12 relative z-30">
        <div className="mb-8 text-center md:text-left">
           <div className="inline-flex items-center gap-2 bg-white/40 text-[#1E293B] px-3.5 py-1.5 rounded-full text-[0.7rem] sm:text-xs font-extrabold uppercase tracking-wider mb-3 shadow-sm backdrop-blur-sm">
              <Instagram size={16} className="text-[#2563EB]" />
              <span>@pedramaniaoficial</span>
           </div>
           <h2 className="font-pacifico text-3xl sm:text-4xl text-[#2563EB] mb-2.5 drop-shadow-sm leading-tight">Direto do <br/>Instagram</h2>
           <p className="text-[#1E293B] font-semibold text-xs sm:text-sm border-l-4 border-[#2563EB] pl-3">
             Acompanhe nossas dicas, novidades de produtos e encontros presenciais no ES
           </p>
        </div>

        {/* Post cards linking to Instagram */}
        <div className="space-y-3 sm:space-y-4">
          {instaPosts.map((post) => (
            <a 
              key={post.id} 
              href={post.url || instaUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white/90 hover:bg-white transition-all p-4 sm:p-5 rounded-2xl flex items-center justify-between group cursor-pointer shadow-sm hover:shadow-md border border-white/80"
            >
              <div className="flex items-start gap-3.5 sm:gap-4 flex-1 pr-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform mt-0.5">
                  <Instagram size={20} />
                </div>
                <div className="space-y-1">
                  {post.tag && (
                    <span className="inline-block font-black text-[#2563EB] text-[0.65rem] sm:text-[0.7rem] uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                      {post.tag}
                    </span>
                  )}
                  <h3 className="font-nunito font-extrabold text-[#1E293B] text-sm sm:text-base leading-snug group-hover:text-[#2563EB] transition-colors">
                    {post.title}
                  </h3>
                  {post.description && (
                    <p className="text-xs sm:text-sm text-gray-600 font-lato leading-relaxed line-clamp-2">
                      {post.description}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-[#2563EB] shrink-0 opacity-80 group-hover:opacity-100">
                <span className="hidden sm:inline">Ver Post</span>
                <ExternalLink size={16} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </a>
          ))}
        </div>

        <div className="mt-6 sm:mt-8 text-center md:text-left">
          <a
            href={instaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#2563EB] text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold shadow-lg hover:bg-[#1D4ED8] hover:shadow-xl transition-all text-sm sm:text-base w-full sm:w-auto"
          >
            <Instagram size={18} />
            Siga @pedramaniaoficial no Insta
          </a>
        </div>
      </div>

      {/* Right: Big Image / Reel Showcase */}
      <div className="w-full lg:w-1/2 relative z-30 min-h-[350px] sm:min-h-[450px] lg:min-h-[500px] mt-8 lg:mt-0">
         {/* Organic clip path mask */}
         <div className="absolute inset-0 bg-[#F0F7FF] rounded-t-[3rem] lg:rounded-l-[5rem] lg:rounded-tr-none overflow-hidden border-t-4 lg:border-t-0 lg:border-l-8 border-white shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
              alt="Comunidade e Insta Pedra Mania"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B]/70 via-transparent to-transparent flex items-end p-6 sm:p-10">
               <div className="bg-white/90 backdrop-blur-md p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-xl max-w-sm text-[#1E293B]">
                  <span className="text-[#2563EB] font-bold text-[0.65rem] sm:text-xs uppercase tracking-wider block mb-1">Dica da Semana</span>
                  <p className="font-nunito font-bold text-sm sm:text-lg leading-snug">"Toda terça temos novidades e amostras de fios no nosso feed do Instagram!"</p>
                  <a href={instaUrl} target="_blank" rel="noreferrer" className="text-[#2563EB] font-extrabold text-xs sm:text-sm mt-2 sm:mt-3 inline-flex items-center gap-1 hover:underline">Ver no perfil &rarr;</a>
               </div>
            </div>
         </div>
      </div>
    </section>
  );
};
