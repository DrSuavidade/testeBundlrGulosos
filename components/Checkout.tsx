import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Button } from './ui/Button';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { api } from '../services/mockApi';

interface CheckoutProps {
  onBack: () => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ onBack }) => {
  const { items, cartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [successId, setSuccessId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    date: '',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await api.createOrder({
        customer_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        fulfillment_type: 'delivery',
        address: formData.address,
        scheduled_date: formData.date,
        items: items.map(i => ({ product_id: i.id, qty: i.qty })),
        notes: formData.notes
      });
      
      setSuccessId(res.id);
      clearCart();
    } catch (err) {
      alert('Erro ao criar pedido. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (successId) {
    return (
      <div className="min-h-screen bg-[#F0F7FF] flex items-center justify-center p-4">
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl max-w-md w-full text-center animate-fade-in-up border border-[#BFDBFE]">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#2563EB]/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-[#2563EB]">
            <CheckCircle size={36} className="sm:w-10 sm:h-10" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-nunito font-bold text-[#1E293B] mb-2">Pedido Recebido!</h2>
          <p className="text-sm sm:text-base text-[#1E293B]/70 mb-6 leading-relaxed">
            Seu pedido <strong>#{successId}</strong> foi confirmado. Em breve nossa equipe entrará em contato via WhatsApp para organizar a entrega dos seus produtos no Espírito Santo!
          </p>
          <Button onClick={onBack} fullWidth size="lg">Voltar para a Loja</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F7FF] py-8 sm:py-12 px-3 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center text-[#2563EB] font-bold mb-6 sm:mb-8 hover:underline text-sm sm:text-base"
        >
          <ArrowLeft size={18} className="mr-2" /> Voltar
        </button>

        <h1 className="text-2xl sm:text-3xl font-nunito font-bold text-[#1E293B] mb-6 sm:mb-8">Finalizar Encomenda de Materiais</h1>

        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm overflow-hidden flex flex-col md:flex-row border border-[#BFDBFE]">
          {/* Summary Column */}
          <div className="w-full md:w-1/3 bg-[#BFDBFE]/30 p-5 sm:p-6 md:order-last border-b md:border-b-0 md:border-l border-[#BFDBFE]">
            <h3 className="font-bold text-[#1E293B] mb-4 text-base sm:text-lg">Resumo da Sacola</h3>
            <div className="space-y-2.5 sm:space-y-3 mb-4 max-h-48 overflow-y-auto pr-1">
              {items.map(item => (
                <div key={item.id} className="flex justify-between text-xs sm:text-sm">
                  <span className="text-[#1E293B]/80 pr-2">{item.qty}x {item.name}</span>
                  <span className="font-bold text-[#1E293B] shrink-0">R$ {(item.price * item.qty).toFixed(2).replace('.', ',')}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-[#2563EB]/20 pt-3 sm:pt-4 flex justify-between items-center">
              <span className="font-bold text-base sm:text-lg text-[#1E293B]">Total</span>
              <span className="font-bold text-base sm:text-lg text-[#2563EB]">R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>

          {/* Form Column */}
          <div className="w-full md:w-2/3 p-5 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-[#1E293B] mb-1.5 sm:mb-2">Nome Completo</label>
                  <input 
                    required 
                    type="text" 
                    className="w-full px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-[#93C5FD] outline-none transition-all text-sm"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-[#1E293B] mb-1.5 sm:mb-2">Email</label>
                    <input 
                      required 
                      type="email" 
                      className="w-full px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-[#93C5FD] outline-none transition-all text-sm"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-[#1E293B] mb-1.5 sm:mb-2">WhatsApp / Telefone (ES)</label>
                    <input 
                      required 
                      type="tel" 
                      className="w-full px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-[#93C5FD] outline-none transition-all text-sm"
                      placeholder="(27) 99604-3041"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                   <label className="block text-xs sm:text-sm font-bold text-[#1E293B] mb-1.5 sm:mb-2">Endereço de Entrega no ES</label>
                   <input 
                      required 
                      type="text" 
                      className="w-full px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-[#93C5FD] outline-none transition-all text-sm"
                      placeholder="Rua, número, bairro e cidade (Vitória, Vila Velha, Serra...)"
                      value={formData.address}
                      onChange={e => setFormData({...formData, address: e.target.value})}
                   />
                </div>

                <div>
                   <label className="block text-xs sm:text-sm font-bold text-[#1E293B] mb-1.5 sm:mb-2">Data Preferida de Envio/Retirada</label>
                   <input 
                      required 
                      type="date" 
                      className="w-full px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-[#93C5FD] outline-none transition-all text-sm"
                      value={formData.date}
                      onChange={e => setFormData({...formData, date: e.target.value})}
                   />
                </div>

                 <div>
                   <label className="block text-xs sm:text-sm font-bold text-[#1E293B] mb-1.5 sm:mb-2">Observações do Pedido</label>
                   <textarea 
                      rows={3}
                      className="w-full px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-[#93C5FD] outline-none transition-all resize-none text-sm"
                      placeholder="Ex: Preferência de tons de linhas, especificações de pedras..."
                      value={formData.notes}
                      onChange={e => setFormData({...formData, notes: e.target.value})}
                   />
                </div>
              </div>

              <div className="pt-2 sm:pt-4">
                <Button type="submit" fullWidth size="lg" disabled={loading} className="py-3.5 text-sm sm:text-base font-bold">
                  {loading ? 'Processando...' : 'Confirmar Pedido Pedra Mania'}
                </Button>
                <p className="text-xs text-center text-gray-400 mt-3">
                  Confirmamos os detalhes e pagamento via WhatsApp.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
