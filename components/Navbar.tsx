import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, User } from 'lucide-react';
import { Button } from './ui/Button';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  onNavigate: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleCart, itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Info & Encontros', id: 'about' },
    { name: 'Produtos', id: 'products' },
    { name: 'Kits & Encomendas', id: 'orders' },
    { name: 'Contato', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#93C5FD]/95 backdrop-blur-sm shadow-md py-2'
            : 'bg-[#93C5FD] py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Logo */}
          <div
            className="flex flex-col items-start cursor-pointer group"
            onClick={() => handleLinkClick('home')}
          >
            <h1 className="font-pacifico text-xl md:text-2xl text-[#1E293B] group-hover:scale-105 transition-transform leading-none">
              Pedra Mania
            </h1>
            <span className={`text-[0.6rem] font-nunito tracking-widest uppercase text-white font-bold transition-all ${isScrolled ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
              armarinho & artesanato · ES
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="font-nunito text-[#1E293B] hover:text-[#2563EB] font-semibold transition-colors bg-transparent border-none cursor-pointer text-sm"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-3">
            <button
              className="hidden md:block p-1.5 text-[#1E293B] hover:text-white transition-colors"
              onClick={() => handleLinkClick('admin')}
              title="Painel de Administração (/admin)"
            >
              <User size={20} />
            </button>

            <button
              className="relative p-1.5 text-[#1E293B] hover:text-white transition-transform hover:scale-110"
              onClick={toggleCart}
            >
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-[#2563EB] rounded-full shadow-sm">
                  {itemCount}
                </span>
              )}
            </button>

            <div className="hidden md:block">
              <Button onClick={() => handleLinkClick('products')} size="sm">
                Ver Catálogo
              </Button>
            </div>

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-1.5 text-[#1E293B]"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end md:hidden">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative w-72 bg-[#F0F7FF] h-full shadow-2xl p-5 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <span className="font-pacifico text-lg text-[#2563EB]">Menu</span>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X size={22} className="text-[#2563EB]" />
              </button>
            </div>

            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className="font-nunito text-sm font-semibold text-[#1E293B] border-b border-[#BFDBFE] py-3 text-left hover:text-[#2563EB] hover:pl-2 transition-all"
                >
                  {link.name}
                </button>
              ))}
              <button
                onClick={() => handleLinkClick('admin')}
                className="font-nunito text-sm font-semibold text-[#2563EB] border-b border-[#BFDBFE] py-3 text-left flex items-center justify-between hover:pl-2 transition-all"
              >
                <span>Painel Admin</span>
                <span className="text-[10px] bg-[#2563EB] text-white px-2 py-0.5 rounded-full">Gestão</span>
              </button>
              <Button
                fullWidth
                className="mt-4"
                onClick={() => handleLinkClick('products')}
              >
                Ver Catálogo
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
