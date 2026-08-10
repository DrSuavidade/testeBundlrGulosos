import React, { useState, useEffect } from 'react';
import { Instagram, ExternalLink, Heart, MessageCircle } from 'lucide-react';
import { WavyDivider } from './ui/WavyDivider';
import { api } from '../services/mockApi';
import { InstaPost } from '../types';

export const Press: React.FC = () => {
  const instaUrl = "https://www.instagram.com/pedramaniaoficial/";
  const [instaPosts, setInstaPosts] = useState<InstaPost[]>([]);

  useEffect(() => {
    api.getInstaPosts().then(setInstaPosts).catch(console.error);
  }, []);

  return (
    <section className="relative bg-[#93C5FD] py-14 md:py-20 flex flex-col lg:flex-row items-stretch overflow-hidden">
      {/* Top Divider */}
      <WavyDivider className="absolute top-0 left-0 w-full -translate-y-[99%] z-10" color="#BFDBFE" variant="flow" />

      {/* Left: Instagram Feed Content */}
      <div className="w-full lg:w-1/2 px-4 sm:px-8 lg:pl-24 flex flex-col justify-center py-8 md:py-12 relative z-10">
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
              href={instaUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white/80 hover:bg-white transition-all p-4 sm:p-5 rounded-2xl flex items-center justify-between group cursor-pointer shadow-sm hover:shadow-md border border-white/60"
            >
              <div className="flex items-center gap-3 sm:gap-4 flex-1 pr-2">
                <img src={post.image} alt={post.title} className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover shadow-sm shrink-0 group-hover:scale-105 transition-transform" />
                <div>
                  <span className="block font-bold text-[#2563EB] text-[0.65rem] sm:text-[0.7rem] uppercase tracking-wider mb-0.5">{post.tag}</span>
                  <h3 className="font-nunito font-bold text-[#1E293B] text-xs sm:text-sm md:text-base leading-tight group-hover:text-[#2563EB] transition-colors line-clamp-2">{post.title}</h3>
                  <div className="flex items-center gap-3 mt-1.5 text-[0.65rem] sm:text-xs text-gray-500 font-bold">
                    <span className="flex items-center gap-1"><Heart size={12} className="text-[#2563EB]" fill="currentColor" /> {post.likes}</span>
                    <span className="flex items-center gap-1"><MessageCircle size={12} className="text-gray-400" /> {post.comments}</span>
                  </div>
                </div>
              </div>
              <ExternalLink size={18} className="text-[#2563EB] transform group-hover:scale-110 transition-transform shrink-0" />
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
      <div className="w-full lg:w-1/2 relative min-h-[350px] sm:min-h-[450px] lg:min-h-[500px] mt-8 lg:mt-0">
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
