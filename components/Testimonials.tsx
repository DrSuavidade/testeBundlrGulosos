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
    <section className="relative bg-[#F6B9C3] pt-40 pb-32 overflow-hidden text-white">
      {/* Top Divider: Reaching up into HowToOrder (Cream) */}
      <WavyDivider className="absolute top-0 left-0 w-full -translate-y-[99%] z-10" color="#F6B9C3" variant="swoop" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
        <div className="mb-12">
            <h2 className="text-5xl md:text-7xl font-pacifico text-white mb-2 transform -rotate-2 drop-shadow-md">
              Palavras Doces
            </h2>
            <h3 className="text-lg md:text-xl font-nunito font-bold text-[#4A3B32] uppercase tracking-widest mt-4 bg-white/30 inline-block px-6 py-2 rounded-full backdrop-blur-sm">
              dos nossos clientes gulosos
            </h3>
        </div>

        <div className="relative h-72 md:h-64">
            {testimonials.map((item, index) => (
            <div 
                key={item.id}
                className={`absolute inset-0 transition-all duration-700 ease-in-out transform flex flex-col items-center justify-center ${
                    index === currentIndex ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-20 scale-95'
                }`}
            >
                <div className="bg-white/95 p-10 rounded-[3rem] shadow-2xl max-w-2xl w-full border-4 border-white/50 text-[#4A3B32]">
                  <p className="text-2xl md:text-3xl font-pacifico text-[#D87085] mb-6 leading-relaxed">
                      "{item.quote}"
                  </p>
                  <div className="flex flex-col items-center">
                    <div className="flex gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={20} fill="#F2D0B6" className="text-[#F2D0B6]" />
                        ))}
                    </div>
                    <h4 className="font-bold text-[#4A3B32] text-lg uppercase tracking-wider">{item.name}</h4>
                    <span className="text-sm text-[#4A3B32]/60 font-bold">{item.city}</span>
                  </div>
                </div>
            </div>
            ))}
        </div>
        
        <div className="flex justify-center gap-3 mt-16">
            {testimonials.map((_, index) => (
                <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-3 rounded-full transition-all duration-300 ${
                        index === currentIndex ? 'bg-white w-10 shadow-lg' : 'bg-white/40 w-3 hover:bg-white/60'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                />
            ))}
        </div>
      </div>
    </section>
  );
};
