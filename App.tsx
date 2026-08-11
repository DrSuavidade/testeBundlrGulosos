import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { HowToOrder } from './components/HowToOrder';
import { Testimonials } from './components/Testimonials';
import { Press } from './components/Press';
import { MeetTheBaker } from './components/MeetTheBaker';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { Checkout } from './components/Checkout';
import { Contact } from './components/Contact';
import { ProductsPage } from './components/ProductsPage';
import { AdminPanel } from './components/AdminPanel';
import { CartProvider } from './context/CartContext';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

import { ShopeeMigrationBanner } from './components/ShopeeMigrationBanner';
import { ShopByCategory } from './components/ShopByCategory';

type ViewState = 'home' | 'about' | 'products' | 'orders' | 'contact' | 'checkout' | 'admin';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path === '/admin' || hash === '#admin') {
        return 'admin';
      }
    }
    return 'home';
  });

  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path === '/admin' || hash === '#admin') {
        setView('admin');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const handleNavigate = (page: string) => {
    const newView = page as ViewState;
    setView(newView);
    
    if (typeof window !== 'undefined') {
      if (newView === 'admin') {
        window.history.pushState({}, '', '/admin');
      } else if (window.location.pathname === '/admin') {
        window.history.pushState({}, '', '/');
      }
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-[#F0F7FF] font-lato selection:bg-[#93C5FD] selection:text-[#1E293B]">
        
        {view === 'admin' ? (
          <AdminPanel onBack={() => handleNavigate('home')} />
        ) : view === 'checkout' ? (
          <Checkout onBack={() => handleNavigate('home')} />
        ) : (
          <>
            <Navbar onNavigate={handleNavigate} />
            <main className="pt-28"> {/* Add padding for fixed navbar */}
              
              {/* HOME VIEW: Full Landing Page */}
              {view === 'home' && (
                <div className="-mt-8">
                  <ProductsPage compact />
                  <Testimonials />
                  <Press />
                </div>
              )}

              {/* PRODUCTS VIEW */}
              {view === 'products' && (
                <div className="animate-fade-in-up -mt-20">
                   <ProductsPage />
                </div>
              )}

              {/* ORDERS VIEW */}
              {view === 'orders' && (
                <div className="animate-fade-in-up min-h-[60vh]">
                  <HowToOrder />
                </div>
              )}

              {/* ABOUT VIEW */}
              {view === 'about' && (
                <div className="animate-fade-in-up">
                  <MeetTheBaker />
                  <Press />
                </div>
              )}

              {/* CONTACT VIEW */}
              {view === 'contact' && (
                <div className="animate-fade-in-up">
                  <Contact />
                </div>
              )}

            </main>
            <Footer behindContact={view === 'contact'} />
            <CartDrawer onCheckout={() => handleNavigate('checkout')} />
          </>
        )}
        
        <FloatingWhatsApp />
      </div>
    </CartProvider>
  );
};

export default App;
