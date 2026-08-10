import React from 'react';

export const FloatingWhatsApp: React.FC = () => {
  const whatsappUrl = "https://api.whatsapp.com/send?phone=5527996043041";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Enviar mensagem no WhatsApp"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 bg-[#2563EB] text-white p-3.5 sm:p-4 rounded-full shadow-2xl hover:bg-[#1D4ED8] hover:scale-110 transition-all duration-500 ease-out flex items-center justify-center border-2 border-white/80 animate-float group"
    >
      {/* WhatsApp Icon SVG */}
      <svg 
        className="w-6 h-6 sm:w-7 sm:h-7 fill-current" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12.012 2c-5.506 0-9.989 4.478-9.989 9.984 0 1.76.459 3.474 1.33 4.988l-1.413 5.164 5.286-1.387c1.455.793 3.09 1.213 4.786 1.213 5.506 0 9.989-4.478 9.989-9.984 0-5.506-4.483-9.978-9.989-9.978zm0 18.271c-1.488 0-2.946-.397-4.223-1.147l-.303-.18-3.136.822.837-3.057-.197-.314c-.822-1.31-1.258-2.825-1.258-4.391 0-4.568 3.717-8.281 8.28-8.281 4.564 0 8.28 3.713 8.28 8.281 0 4.567-3.716 8.267-8.28 8.267zm4.536-6.196c-.248-.124-1.472-.727-1.7-.809-.228-.083-.394-.124-.56.124-.165.248-.641.809-.786.974-.145.165-.29.186-.538.062-.248-.124-1.049-.387-1.997-1.233-.738-.658-1.237-1.47-1.382-1.718-.145-.248-.015-.382.109-.505.111-.111.248-.29.373-.435.124-.145.165-.248.248-.414.083-.165.041-.311-.021-.435-.062-.124-.56-1.348-.767-1.846-.201-.485-.407-.419-.56-.427l-.476-.008c-.165 0-.435.062-.663.311-.228.248-.871.851-.871 2.074 0 1.223.891 2.404 1.015 2.57.124.165 1.754 2.679 4.249 3.756.593.256 1.057.409 1.418.524.596.19 1.138.163 1.567.099.479-.072 1.472-.601 1.679-1.181.207-.58.207-1.077.145-1.181-.062-.104-.228-.166-.476-.29z"/>
      </svg>
      
      {/* Tooltip on Hover */}
      <span className="absolute right-full mr-3 bg-[#1E293B] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Enviar mensagem no WhatsApp
      </span>
    </a>
  );
};
