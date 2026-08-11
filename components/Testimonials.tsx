import React, { useEffect, useState } from 'react';
import { api } from '../services/mockApi';
import { Testimonial } from '../types';
import { Star, Quote } from 'lucide-react';
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
    <section className="relative bg-[#93C5FD] pt-16 md:pt-24 pb-14 md:pb-20 overflow-visible text-white">
      {/* Top Divider */}
      <WavyDivider className="absolute top-0 left-0 w-full -translate-y-[99%] z-0" color="#93C5FD" variant="swoop" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-30">

        {/* Header */}
        <div className="mb-6 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-pacifico text-white mb-2 drop-shadow-sm leading-tight">
            Histórias de Criatividade
          </h2>
          <p className="text-xs sm:text-sm font-nunito font-semibold text-[#1E293B] uppercase tracking-widest bg-white/30 inline-block px-4 py-1.5 rounded-full backdrop-blur-sm">
            das nossas clientes & artesãs do ES
          </p>
        </div>

        {/* Testimonial carousel */}
        <div className="relative min-h-[200px] sm:min-h-[180px] flex items-center justify-center">
          {testimonials.map((item, index) => {
            const offset = (index - currentIndex + testimonials.length) % testimonials.length;
            const position = offset === 0 ? 'center' : offset === 1 ? 'right' : 'left';
            return (
            <div key={item.id} className={`absolute inset-0 transition-all duration-700 ease-in-out transform flex flex-col items-center justify-center ${
              position === 'center' ? 'opacity-100 translate-x-0 scale-100 z-10' : position === 'right' ? 'opacity-35 translate-x-[58%] scale-90 z-0' : 'opacity-35 -translate-x-[58%] scale-90 z-0'
            }`}>
              <div className="bg-white/95 p-5 sm:p-8 rounded-2xl shadow-xl max-w-xl w-full border border-white/60 text-[#1E293B]">
                <Quote size={20} className="text-[#BFDBFE] mb-3 mx-auto" />
                <p className="text-sm sm:text-base md:text-lg font-lato italic text-[#1E293B]/90 mb-4 leading-relaxed">
                  "{item.quote}"
                </p>
                <div className="flex flex-col items-center gap-1">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="#3B82F6" className="text-[#3B82F6]" />
                    ))}
                  </div>
                  <h4 className="font-bold text-[#1E293B] text-sm uppercase tracking-wider">{item.name}</h4>
                  <span className="text-[11px] text-[#1E293B]/50 font-medium">{item.city}</span>
                </div>
              </div>
            </div>
            );
          })}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6 sm:mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-white w-6 shadow-sm' : 'bg-white/40 w-2 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
