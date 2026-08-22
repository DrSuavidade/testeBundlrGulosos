import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Button } from './ui/Button';
import { ArrowLeft, CheckCircle, Truck, Package, ShieldCheck, MapPin } from 'lucide-react';
import { api } from '../services/mockApi';
import { ShippingCalculator } from './ShippingCalculator';
import { ShippingQuote } from '../types';

interface CheckoutProps {
  onBack: () => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ onBack }) => {
  const { items, cartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [successId, setSuccessId] = useState<string | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<any | null>(null);

  // Cotação de Frete Selecionada
  const [selectedShippingQuote, setSelectedShippingQuote] = useState<ShippingQuote | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    zip: '',
    street: '',
    number: '',
    complement: '',
    district: '',
    city: 'Vitória',
    state: 'ES',
    date: '',
    notes: ''
  });

  // Callback ao encontrar endereço pelo CEP no componente de frete
  const handleAddressFound = (addr: { street: string; district: string; city: string; state: string; zip: string }) => {
    setFormData(prev => ({
      ...prev,
      zip: addr.zip,
      street: addr.street || prev.street,
      district: addr.district || prev.district,
      city: addr.city || prev.city,
      state: addr.state || prev.state
    }));
  };

  const shippingCost = selectedShippingQuote ? selectedShippingQuote.price : 0;
  const finalTotal = cartTotal + shippingCost;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedShippingQuote) {
      alert('Por favor, calcule e selecione uma opção de frete ou retirada.');
      return;
    }

    setLoading(true);

    const fullAddress = [
      formData.street,
      formData.number ? `nº ${formData.number}` : '',
      formData.complement,
      formData.district,
      `${formData.city} - ${formData.state}`,
      formData.zip ? `CEP: ${formData.zip}` : ''
    ].filter(Boolean).join(', ');

    const isPickup = selectedShippingQuote.id === 'pickup_store';

    try {
      const orderPayload = {
        customer_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        fulfillment_type: (isPickup ? 'pickup' : 'delivery') as 'pickup' | 'delivery',
        address_zip: formData.zip,
        address_street: formData.street,
        address_number: formData.number,
        address_complement: formData.complement,
        address_district: formData.district,
        address_city: formData.city,
        address_state: formData.state,
        address: fullAddress,
        scheduled_date: formData.date || new Date().toISOString().split('T')[0],
        shipping_cost: shippingCost,
        shipping_service_id: selectedShippingQuote.id,
        shipping_service_name: selectedShippingQuote.name,
        shipping_carrier: selectedShippingQuote.company.name,
        shipping_delivery_time: selectedShippingQuote.delivery_time,
        package_tier: selectedShippingQuote.package?.tierName,
        items: items.map(i => ({
          product_id: i.id,
          qty: i.qty,
          selected_color: (i as any).selectedColor || undefined
        })),
        notes: formData.notes
      };

      const res = await api.createOrder(orderPayload);
      
      setConfirmedOrder({
        id: res.id,
        total: finalTotal,
        shippingQuote: selectedShippingQuote,
        fullAddress
      });
      setSuccessId(res.id);
      clearCart();
    } catch (err) {
      alert('Erro ao criar pedido. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (successId && confirmedOrder) {
    return (
      <div className="min-h-screen bg-[#F0F7FF] flex items-center justify-center p-4">
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl max-w-lg w-full text-center animate-fade-in-up border border-[#BFDBFE] space-y-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#2563EB]/10 rounded-full flex items-center justify-center mx-auto text-[#2563EB]">
            <CheckCircle size={40} />
          </div>
          
          <div>
            <h2 className="text-2xl sm:text-3xl font-nunito font-bold text-[#1E293B] mb-1">
              Pedido Confirmado!
            </h2>
            <p className="text-sm text-gray-500">
              Código do Pedido: <strong className="text-[#2563EB]">#{successId}</strong>
            </p>
          </div>

          {/* Card com Detalhes do Frete */}
          <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-gray-100 text-left space-y-2.5 text-xs sm:text-sm">
            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <span className="text-gray-500 font-medium flex items-center gap-1.5">
                <Truck size={15} className="text-[#2563EB]" /> Forma de Envio:
              </span>
              <strong className="text-[#1E293B]">{confirmedOrder.shippingQuote.name}</strong>
            </div>

            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <span className="text-gray-500 font-medium flex items-center gap-1.5">
                <Package size={15} className="text-[#2563EB]" /> Embalagem:
              </span>
              <span className="text-gray-700">{confirmedOrder.shippingQuote.package?.tierName || 'Saco Padrão'}</span>
            </div>

            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <span className="text-gray-500 font-medium flex items-center gap-1.5">
                <MapPin size={15} className="text-[#2563EB]" /> Destino:
              </span>
              <span className="text-gray-700 text-right truncate max-w-[200px]" title={confirmedOrder.fullAddress}>
                {formData.city} - {formData.state}
              </span>
            </div>

            <div className="flex justify-between items-center pt-1 font-bold text-sm">
              <span className="text-[#1E293B]">Valor Total com Frete:</span>
              <span className="text-[#2563EB] text-base">R$ {confirmedOrder.total.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Nossa equipe da <strong>Pedra Mania</strong> entrará em contato via WhatsApp com os detalhes do rastreio e instruções de envio!
          </p>

          <Button onClick={onBack} fullWidth size="lg">
            Voltar para a Loja
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F7FF] py-8 sm:py-12 px-3 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center text-[#2563EB] font-bold mb-6 sm:mb-8 hover:underline text-sm sm:text-base cursor-pointer"
        >
          <ArrowLeft size={18} className="mr-2" /> Voltar para a Loja
        </button>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-nunito font-bold text-[#1E293B]">
              Finalizar Encomenda de Materiais
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              Preencha seus dados para envio seguro no Espírito Santo e todo o Brasil.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Form Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 1. Dados Pessoais */}
              <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-[#BFDBFE] shadow-sm space-y-4">
                <h3 className="font-bold text-[#1E293B] text-base border-b border-gray-100 pb-3 flex items-center gap-2">
                  <ShieldCheck size={18} className="text-[#2563EB]" /> 1. Dados de Contato
                </h3>

                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-[#1E293B] mb-1.5">
                      Nome Completo *
                    </label>
                    <input 
                      required 
                      type="text" 
                      placeholder="Seu nome completo"
                      className="w-full px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-[#93C5FD] outline-none transition-all text-sm"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-[#1E293B] mb-1.5">
                        Email *
                      </label>
                      <input 
                        required 
                        type="email" 
                        placeholder="seu.email@exemplo.com"
                        className="w-full px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-[#93C5FD] outline-none transition-all text-sm"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-[#1E293B] mb-1.5">
                        WhatsApp / Celular *
                      </label>
                      <input 
                        required 
                        type="tel" 
                        placeholder="(27) 99999-9999"
                        className="w-full px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-[#93C5FD] outline-none transition-all text-sm"
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Calculadora de Frete & Entrega */}
              <div>
                <ShippingCalculator
                  items={items}
                  selectedQuote={selectedShippingQuote}
                  onSelectQuote={setSelectedShippingQuote}
                  onAddressFound={handleAddressFound}
                />
              </div>

              {/* 3. Endereço de Entrega */}
              <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-[#BFDBFE] shadow-sm space-y-4">
                <h3 className="font-bold text-[#1E293B] text-base border-b border-gray-100 pb-3 flex items-center gap-2">
                  <MapPin size={18} className="text-[#2563EB]" /> 3. Endereço Completo de Destino
                </h3>

                <div className="space-y-3 sm:space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs sm:text-sm font-bold text-[#1E293B] mb-1.5">
                        Rua / Avenida *
                      </label>
                      <input 
                        required 
                        type="text" 
                        placeholder="Rua das Palmeiras"
                        className="w-full px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-[#93C5FD] outline-none transition-all text-sm"
                        value={formData.street}
                        onChange={e => setFormData({...formData, street: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-[#1E293B] mb-1.5">
                        Número *
                      </label>
                      <input 
                        required 
                        type="text" 
                        placeholder="120"
                        className="w-full px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-[#93C5FD] outline-none transition-all text-sm"
                        value={formData.number}
                        onChange={e => setFormData({...formData, number: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-[#1E293B] mb-1.5">
                        Complemento / Apto
                      </label>
                      <input 
                        type="text" 
                        placeholder="Apto 302"
                        className="w-full px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-[#93C5FD] outline-none transition-all text-sm"
                        value={formData.complement}
                        onChange={e => setFormData({...formData, complement: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-[#1E293B] mb-1.5">
                        Bairro *
                      </label>
                      <input 
                        required 
                        type="text" 
                        placeholder="Praia do Canto"
                        className="w-full px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-[#93C5FD] outline-none transition-all text-sm"
                        value={formData.district}
                        onChange={e => setFormData({...formData, district: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-[#1E293B] mb-1.5">
                        Cidade / UF *
                      </label>
                      <input 
                        required 
                        type="text" 
                        placeholder="Vitória - ES"
                        className="w-full px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-[#93C5FD] outline-none transition-all text-sm"
                        value={`${formData.city} - ${formData.state}`}
                        onChange={e => {
                          const parts = e.target.value.split('-');
                          setFormData({
                            ...formData,
                            city: parts[0]?.trim() || formData.city,
                            state: parts[1]?.trim() || formData.state
                          });
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-[#1E293B] mb-1.5">
                      Observações para a Embalagem ou Envio
                    </label>
                    <textarea 
                      rows={2}
                      className="w-full px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-[#93C5FD] outline-none transition-all resize-none text-sm"
                      placeholder="Ex: Preferência por cores específicas, instruções de entrega..."
                      value={formData.notes}
                      onChange={e => setFormData({...formData, notes: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              {/* Botão de Finalizar no Mobile */}
              <div className="lg:hidden">
                <Button 
                  type="submit" 
                  fullWidth 
                  size="lg" 
                  disabled={loading || !selectedShippingQuote}
                  className="py-3.5 text-base font-bold shadow-md"
                >
                  {loading ? 'Processando Pedido...' : `Confirmar Pedido (R$ ${finalTotal.toFixed(2).replace('.', ',')})`}
                </Button>
              </div>
            </form>
          </div>

          {/* Summary Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-[#BFDBFE] shadow-sm sticky top-32 space-y-4">
              <h3 className="font-bold text-[#1E293B] text-base border-b border-gray-100 pb-3">
                Resumo do Pedido
              </h3>

              {/* Lista de Itens */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {items.map(item => (
                  <div key={item.id} className="flex items-center justify-between gap-3 text-xs sm:text-sm pb-2 border-b border-gray-50">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img 
                        src={item.images?.[0] || 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=100'} 
                        alt={item.name} 
                        className="w-10 h-10 rounded-lg object-cover shrink-0 border border-gray-100"
                      />
                      <div className="min-w-0">
                        <p className="font-semibold text-[#1E293B] truncate">{item.name}</p>
                        <p className="text-gray-400 text-[11px]">
                          Qtd: {item.qty} {item.weight ? `• ${item.weight}` : ''}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-[#1E293B] shrink-0">
                      R$ {(item.price * item.qty).toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Subtotal, Frete e Total */}
              <div className="space-y-2 pt-2 text-xs sm:text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal dos Produtos</span>
                  <span>R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
                </div>

                <div className="flex justify-between items-center text-gray-600">
                  <span className="flex items-center gap-1">
                    <Truck size={14} className="text-[#2563EB]" /> 
                    Frete ({selectedShippingQuote ? selectedShippingQuote.name : 'A calcular'})
                  </span>
                  <span className={selectedShippingQuote?.price === 0 ? 'text-[#059669] font-bold' : 'font-semibold'}>
                    {selectedShippingQuote 
                      ? (selectedShippingQuote.price === 0 ? 'Grátis' : `R$ ${selectedShippingQuote.price.toFixed(2).replace('.', ',')}`)
                      : '—'}
                  </span>
                </div>

                {selectedShippingQuote?.package && (
                  <div className="flex justify-between text-[11px] text-gray-400">
                    <span>Embalagem Recomendada</span>
                    <span>{selectedShippingQuote.package.tierName.split(' ')[0]} {selectedShippingQuote.package.tierName.split(' ')[1]}</span>
                  </div>
                )}

                <div className="border-t border-[#BFDBFE] pt-3 flex justify-between items-center text-base sm:text-lg">
                  <span className="font-bold text-[#1E293B]">Total a Pagar</span>
                  <span className="font-bold text-[#2563EB] text-xl">
                    R$ {finalTotal.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              {/* Botão de Finalizar no Desktop */}
              <div className="hidden lg:block pt-2">
                <Button 
                  onClick={handleSubmit}
                  fullWidth 
                  size="lg" 
                  disabled={loading || !selectedShippingQuote}
                  className="py-3.5 text-base font-bold shadow-md cursor-pointer"
                >
                  {loading ? 'Processando Pedido...' : 'Confirmar Pedido Pedra Mania'}
                </Button>
                <p className="text-[11px] text-center text-gray-400 mt-2.5">
                  Pagamento e detalhes de rastreio combinados com segurança via WhatsApp.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
