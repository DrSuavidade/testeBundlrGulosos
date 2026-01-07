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
      <div className="min-h-screen bg-[#FFF6F1] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center animate-fade-in-up">
          <div className="w-20 h-20 bg-[#D87085]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#D87085]">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-3xl font-nunito font-bold text-[#4A3B32] mb-2">Pedido Recebido!</h2>
          <p className="text-[#4A3B32]/70 mb-6">Seu pedido #{successId} foi confirmado e logo começaremos a prepará-lo com muito carinho.</p>
          <Button onClick={onBack} fullWidth>Voltar para a Loja</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF6F1] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center text-[#D87085] font-bold mb-8 hover:underline"
        >
          <ArrowLeft size={20} className="mr-2" /> Voltar
        </button>

        <h1 className="text-3xl font-nunito font-bold text-[#4A3B32] mb-8">Finalizar Encomenda</h1>

        <div className="bg-white rounded-3xl shadow-sm overflow-hidden flex flex-col md:flex-row">
          {/* Summary Column */}
          <div className="w-full md:w-1/3 bg-[#F6B9C3]/20 p-6 md:order-last">
            <h3 className="font-bold text-[#4A3B32] mb-4">Resumo do Pedido</h3>
            <div className="space-y-3 mb-4">
              {items.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-[#4A3B32]/80">{item.qty}x {item.name}</span>
                  <span className="font-bold text-[#4A3B32]">{(item.price * item.qty).toFixed(2)} €</span>
                </div>
              ))}
            </div>
            <div className="border-t border-[#D87085]/20 pt-4 flex justify-between items-center">
              <span className="font-bold text-lg text-[#4A3B32]">Total</span>
              <span className="font-bold text-lg text-[#D87085]">{cartTotal.toFixed(2)} €</span>
            </div>
          </div>

          {/* Form Column */}
          <div className="w-full md:w-2/3 p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-bold text-[#4A3B32] mb-2">Nome Completo</label>
                  <input 
                    required 
                    type="text" 
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-[#D87085] focus:ring-2 focus:ring-[#F6B9C3] outline-none transition-all"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-[#4A3B32] mb-2">Email</label>
                    <input 
                      required 
                      type="email" 
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-[#D87085] focus:ring-2 focus:ring-[#F6B9C3] outline-none transition-all"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#4A3B32] mb-2">WhatsApp</label>
                    <input 
                      required 
                      type="tel" 
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-[#D87085] focus:ring-2 focus:ring-[#F6B9C3] outline-none transition-all"
                      placeholder="(11) 99999-9999"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                   <label className="block text-sm font-bold text-[#4A3B32] mb-2">Endereço de Entrega</label>
                   <input 
                      required 
                      type="text" 
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-[#D87085] focus:ring-2 focus:ring-[#F6B9C3] outline-none transition-all"
                      value={formData.address}
                      onChange={e => setFormData({...formData, address: e.target.value})}
                   />
                </div>

                <div>
                   <label className="block text-sm font-bold text-[#4A3B32] mb-2">Data Preferida</label>
                   <input 
                      required 
                      type="date" 
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-[#D87085] focus:ring-2 focus:ring-[#F6B9C3] outline-none transition-all"
                      value={formData.date}
                      onChange={e => setFormData({...formData, date: e.target.value})}
                   />
                </div>

                 <div>
                   <label className="block text-sm font-bold text-[#4A3B32] mb-2">Mensagem / Observações</label>
                   <textarea 
                      rows={3}
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-[#D87085] focus:ring-2 focus:ring-[#F6B9C3] outline-none transition-all resize-none"
                      placeholder="Ex: Escrever 'Parabéns' no bolo..."
                      value={formData.notes}
                      onChange={e => setFormData({...formData, notes: e.target.value})}
                   />
                </div>
              </div>

              <div className="pt-4">
                <Button type="submit" fullWidth size="lg" disabled={loading}>
                  {loading ? 'Processando...' : 'Confirmar Encomenda'}
                </Button>
                <p className="text-xs text-center text-gray-400 mt-4">
                  Pagamento realizado no momento da entrega/retirada.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
