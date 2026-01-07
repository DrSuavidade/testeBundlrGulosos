import React, { useState } from 'react';
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
import { CartProvider } from './context/CartContext';

type ViewState = 'home' | 'about' | 'products' | 'orders' | 'contact' | 'checkout';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');

  const handleNavigate = (page: string) => {
    setView(page as ViewState);
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-[#FFF6F1] font-lato selection:bg-[#F6B9C3] selection:text-[#4A3B32]">
        
        {view === 'checkout' ? (
          <Checkout onBack={() => setView('home')} />
        ) : (
          <>
            <Navbar onNavigate={handleNavigate} />
            <main className="pt-20"> {/* Add padding for fixed navbar */}
              
              {/* HOME VIEW: Full Landing Page */}
              {view === 'home' && (
                <div className="-mt-20"> {/* Negate top padding for Hero full height */}
                  <Hero />
                  <ProductGrid />
                  <HowToOrder />
                  <Testimonials />
                  <Press />
                  <MeetTheBaker />
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
            <Footer />
            <CartDrawer onCheckout={() => handleNavigate('checkout')} />
          </>
        )}
        
      </div>
    </CartProvider>
  );
};

export default App;
