import React, { useEffect, useState } from 'react';
import { api } from '../services/mockApi';
import { Testimonial } from '../types';
import { Star } from 'lucide-react';
import { WavyDivider } from './ui/WavyDivider';

export const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    api.getTestimonials().then(setTestimonials);
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials]);

  if (testimonials.length === 0) return null;

  return (
    <section className="relative bg-[#93C5FD] pt-28 md:pt-40 pb-24 md:pb-32 overflow-hidden text-white">
      {/* Top Divider */}
      <WavyDivider className="absolute top-0 left-0 w-full -translate-y-[99%] z-10" color="#93C5FD" variant="swoop" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
        <div className="mb-8 sm:mb-12">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-pacifico text-white mb-2 transform -rotate-2 drop-shadow-md leading-tight">
              Histórias de Criatividade
            </h2>
            <h3 className="text-xs sm:text-lg md:text-xl font-nunito font-bold text-[#1E293B] uppercase tracking-widest mt-2 sm:mt-4 bg-white/40 inline-block px-4 py-1.5 sm:px-6 sm:py-2 rounded-full backdrop-blur-sm shadow-sm">
              das nossas clientes & artesãs do ES
            </h3>
        </div>

        <div className="relative min-h-[300px] sm:min-h-[260px] flex items-center justify-center">
            {testimonials.map((item, index) => (
            <div 
                key={item.id}
                className={`absolute inset-0 transition-all duration-700 ease-in-out transform flex flex-col items-center justify-center ${
                    index === currentIndex ? 'opacity-100 translate-x-0 scale-100 z-10' : 'opacity-0 translate-x-12 scale-95 pointer-events-none'
                }`}
            >
                <div className="bg-white/95 p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] shadow-2xl max-w-2xl w-full border-2 sm:border-4 border-white/50 text-[#1E293B]">
                  <p className="text-lg sm:text-2xl md:text-3xl font-pacifico text-[#2563EB] mb-4 sm:mb-6 leading-relaxed">
                      "{item.quote}"
                  </p>
                  <div className="flex flex-col items-center">
                    <div className="flex gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={18} fill="#3B82F6" className="text-[#3B82F6]" />
                        ))}
                    </div>
                    <h4 className="font-bold text-[#1E293B] text-base sm:text-lg uppercase tracking-wider">{item.name}</h4>
                    <span className="text-xs sm:text-sm text-[#1E293B]/60 font-bold">{item.city}</span>
                  </div>
                </div>
            </div>
            ))}
        </div>
        
        <div className="flex justify-center gap-3 mt-10 sm:mt-16">
            {testimonials.map((_, index) => (
                <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2.5 sm:h-3 rounded-full transition-all duration-300 ${
                        index === currentIndex ? 'bg-white w-8 sm:w-10 shadow-lg' : 'bg-white/40 w-2.5 sm:w-3 hover:bg-white/60'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                />
            ))}
        </div>
      </div>
    </section>
  );
};
