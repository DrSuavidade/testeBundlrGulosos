import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, User, Search, ChevronDown } from 'lucide-react';
import { Button } from './ui/Button';
import { useCart } from '../context/CartContext';
import { CustomerUser } from '../services/customerService';

interface NavbarProps {
  onNavigate: (page: string) => void;
  customer?: CustomerUser | null;
  onOpenCustomerAuth?: () => void;
  onOpenCustomerPortal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onNavigate,
  customer,
  onOpenCustomerAuth,
  onOpenCustomerPortal
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleCart, itemCount } = useCart();

  const DEFAULT_ANNOUNCEMENTS = [
    "20% de desconto no primeiro produto!",
    "Frete grátis em compras a partir de R$ 100!",
    "Entrega e retirada no Espírito Santo"
  ];
  const [announcements, setAnnouncements] = useState<string[]>(DEFAULT_ANNOUNCEMENTS);
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const [announcementStyle, setAnnouncementStyle] = useState<'fade' | 'marquee'>('fade');

  useEffect(() => {
    const stored = localStorage.getItem('pedramania_announcements');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAnnouncements(parsed);
        }
      } catch (e) {
        console.error('Failed to parse announcements', e);
      }
    }
    const storedStyle = localStorage.getItem('pedramania_announcement_style');
    if (storedStyle === 'marquee' || storedStyle === 'fade') {
      setAnnouncementStyle(storedStyle);
    }
  }, []);

  useEffect(() => {
    if (announcements.length === 0 || announcementStyle !== 'fade') return;
    const timer = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [announcements, announcementStyle]);

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

  const handleAccountClick = () => {
    if (customer) {
      if (onOpenCustomerPortal) onOpenCustomerPortal();
      else onNavigate('customer');
    } else {
      if (onOpenCustomerAuth) onOpenCustomerAuth();
      else onNavigate('customer');
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[60] transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-sm shadow-md'
            : 'bg-white'
        }`}
      >
        <div className="bg-[#1E293B] text-white text-[0.65rem] sm:text-xs font-bold relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-7 flex items-center justify-center">
            {announcements.length > 0 && announcementStyle === 'marquee' && (
              <div className="w-full overflow-hidden whitespace-nowrap flex">
                <div className="animate-marquee inline-block whitespace-pre">
                  {[...announcements, ...announcements, ...announcements, ...announcements, ...announcements, ...announcements].join("                                      ") + "                                      "}
                </div>
              </div>
            )}
            {announcements.length > 0 && announcementStyle === 'fade' && (
              <div 
                key={announcementIndex}
                className="animate-fade-in-up transition-all duration-500 truncate text-center"
              >
                {announcements[announcementIndex]}
              </div>
            )}
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 flex justify-between items-center">
          {/* Logo */}
          <div
            className="flex flex-col items-start cursor-pointer group"
            onClick={() => handleLinkClick('home')}
          >
              <h1 className="font-pacifico text-2xl md:text-3xl text-[#1E293B] group-hover:scale-105 transition-transform leading-none">
              Pedra Mania
            </h1>
            <span className="text-[0.6rem] font-nunito tracking-widest uppercase text-[#64748B] font-bold">
              armarinho & artesanato · ES
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-5">
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
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="hidden sm:flex items-center rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] overflow-hidden focus-within:border-[#2563EB] focus-within:ring-2 focus-within:ring-[#BFDBFE] transition-all">
              <button onClick={() => handleLinkClick('products')} className="flex items-center gap-2 px-3 py-2.5 text-xs lg:text-sm text-[#64748B] hover:text-[#2563EB] transition-colors w-36 lg:w-48 text-left">
                <Search size={17} /><span>Buscar produtos</span>
              </button>
              <div className="h-6 w-px bg-[#CBD5E1]" />
              <button onClick={() => handleLinkClick('products')} className="flex items-center gap-1.5 px-3 py-2.5 text-xs lg:text-sm font-bold text-[#1E293B] hover:text-[#2563EB] transition-colors"><ChevronDown size={16} /> Categorias</button>
            </div>

            {/* Account / User Portal Button */}
            <button
              className={`p-1.5 transition-colors rounded-xl flex items-center gap-1.5 text-xs font-bold ${
                customer 
                  ? 'bg-blue-50 text-[#2563EB] px-2.5 py-1.5 border border-[#BFDBFE]' 
                  : 'text-[#1E293B] hover:text-[#2563EB]'
              }`}
              onClick={handleAccountClick}
              title={customer ? `Área do Cliente (${customer.email})` : 'Entrar / Rastrear Pedidos'}
            >
              <User size={18} />
              {customer && <span className="hidden xl:inline truncate max-w-[100px]">{customer.name || customer.email.split('@')[0]}</span>}
            </button>

            <button
              className="relative p-1.5 text-[#1E293B] hover:text-[#2563EB] transition-transform hover:scale-110"
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
