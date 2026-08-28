import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
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

import { CustomerPortal } from './components/CustomerPortal';
import { CustomerAuthModal } from './components/CustomerAuthModal';
import { KitsSection } from './components/KitsSection';
import { customerService, CustomerUser } from './services/customerService';

type ViewState = 'home' | 'about' | 'products' | 'orders' | 'contact' | 'checkout' | 'admin' | 'customer';

const App: React.FC = () => {
  const checkIsAdmin = () => {
    if (typeof window === 'undefined') return false;
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();
    return path.startsWith('/admin') || hash.includes('admin') || search.includes('admin');
  };

  const [view, setView] = useState<ViewState>(() => {
    return checkIsAdmin() ? 'admin' : 'home';
  });

  const [customer, setCustomer] = useState<CustomerUser | null>(null);
  const [isCustomerAuthOpen, setIsCustomerAuthOpen] = useState(false);

  useEffect(() => {
    // Carregar sessão do cliente se token existir
    customerService.getMe().then(user => {
      if (user) setCustomer(user);
    });
  }, []);

  useEffect(() => {
    const handleLocationChange = () => {
      if (checkIsAdmin()) {
        setView('admin');
      } else if (view === 'admin') {
        setView('home');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, [view]);

  const handleNavigate = (page: string) => {
    const newView = page as ViewState;
    setView(newView);
    
    if (typeof window !== 'undefined') {
      if (newView === 'admin') {
        window.history.pushState({}, '', '/admin');
      } else if (window.location.pathname.startsWith('/admin')) {
        window.history.pushState({}, '', '/');
      }
    }
  };

  const handleLogoutCustomer = () => {
    customerService.logout();
    setCustomer(null);
    handleNavigate('home');
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-[#F0F7FF] font-lato selection:bg-[#93C5FD] selection:text-[#1E293B]">
        
        {view === 'admin' ? (
          <AdminPanel onBack={() => handleNavigate('home')} />
        ) : view === 'customer' && customer ? (
          <CustomerPortal 
            customer={customer} 
            onBack={() => handleNavigate('home')} 
            onLogout={handleLogoutCustomer} 
          />
        ) : view === 'checkout' ? (
          <Checkout onBack={() => handleNavigate('home')} />
        ) : (
          <>
            <Navbar 
              onNavigate={handleNavigate} 
              customer={customer}
              onOpenCustomerAuth={() => setIsCustomerAuthOpen(true)}
              onOpenCustomerPortal={() => handleNavigate('customer')}
            />
            <main className="pt-28"> {/* Add padding for fixed navbar */}
              
              {/* HOME VIEW: Full Landing Page */}
              {view === 'home' && (
                <div className="-mt-8">
                  <ProductsPage compact />
                  <KitsSection onNavigateToProducts={() => handleNavigate('products')} />
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

              {/* ORDERS / KITS VIEW */}
              {view === 'orders' && (
                <div className="animate-fade-in-up min-h-[60vh] -mt-10 space-y-6">
                  <KitsSection onNavigateToProducts={() => handleNavigate('products')} />
                  <HowToOrder />
                </div>
              )}

              {/* ABOUT VIEW */}
              {view === 'about' && (
                <div>
                  <div className="animate-fade-in-up">
                    <MeetTheBaker />
                  </div>
                  <Press dividerColor="#93C5FD" dividerVariant="swoop" showTopDivider={true} />
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
        
        {/* Customer Auth Modal (Passwordless OTP) */}
        <CustomerAuthModal
          isOpen={isCustomerAuthOpen}
          onClose={() => setIsCustomerAuthOpen(false)}
          onSuccess={(loggedCustomer) => {
            setCustomer(loggedCustomer);
            handleNavigate('customer');
          }}
        />

        <FloatingWhatsApp />
      </div>
    </CartProvider>
  );
};

export default App;
