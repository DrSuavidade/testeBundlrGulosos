import React, { useState, useEffect } from 'react';
import { CustomerUser, CustomerOrder, customerService } from '../services/customerService';
import { useCart } from '../context/CartContext';
import { Button } from './ui/Button';
import { 
  Package, 
  Clock, 
  Truck, 
  MapPin, 
  ShoppingBag, 
  ArrowLeft, 
  LogOut, 
  RefreshCw, 
  Phone, 
  ShieldCheck, 
  FileText,
  RotateCcw
} from 'lucide-react';

interface CustomerPortalProps {
  customer: CustomerUser;
  onBack: () => void;
  onLogout: () => void;
}

export const CustomerPortal: React.FC<CustomerPortalProps> = ({
  customer,
  onBack,
  onLogout
}) => {
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await customerService.getMyOrders();
      setOrders(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const getStatusBadge = (status: CustomerOrder['status']) => {
    switch (status) {
      case 'new':
        return { label: 'Pedido Recebido', class: 'bg-blue-100 text-[#2563EB] border-blue-200', step: 1 };
      case 'preparing':
        return { label: 'Separando c/ Carinho', class: 'bg-amber-100 text-amber-800 border-amber-200', step: 2 };
      case 'ready':
        return { label: 'Pronto p/ Envio / Retirada', class: 'bg-indigo-100 text-indigo-800 border-indigo-200', step: 3 };
      case 'delivered':
        return { label: 'Entregue / Concluído', class: 'bg-emerald-100 text-emerald-800 border-emerald-200', step: 4 };
      default:
        return { label: 'Em Processamento', class: 'bg-gray-100 text-gray-700 border-gray-200', step: 1 };
    }
  };

  const handleReorder = (order: CustomerOrder) => {
    let addedCount = 0;
    order.items.forEach(item => {
      addToCart({
        id: item.product_id,
        name: item.product_name,
        price: item.unit_price,
        images: [item.product_image || 'https://images.unsplash.com/photo-1608248597260-6f216e589959?q=80&w=800'],
        category: 'geral',
        tags: [],
        stock: 99,
        slug: '',
        description: '',
        allergens: [],
        active: true,
        featured: false
      }, item.qty, item.selected_color);
      addedCount += item.qty;
    });

    alert(`${addedCount} itens do pedido #${order.id} foram adicionados à sua sacola!`);
  };

  return (
    <div className="min-h-screen bg-[#F0F7FF] py-8 sm:py-12 px-3 sm:px-6 lg:px-8 font-lato animate-fade-in pb-24">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* TOP BAR / USER INFO CARD */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-[#BFDBFE] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-tr from-[#2563EB] to-[#60A5FA] text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-md shadow-[#2563EB]/25">
              {customer.email.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#2563EB] uppercase tracking-wider">
                <ShieldCheck size={14} />
                <span>Área do Cliente Pedra Mania</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#1E293B] font-nunito leading-tight">
                {customer.name || 'Bem-vindo(a) de volta!'}
              </h1>
              <p className="text-xs text-gray-500 font-mono mt-0.5">{customer.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-end sm:self-auto">
            <button
              type="button"
              onClick={onBack}
              className="px-4 py-2 bg-gray-100 hover:bg-[#2563EB] hover:text-white text-gray-700 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5"
            >
              <ArrowLeft size={14} /> Ir para a Loja
            </button>
            <button
              type="button"
              onClick={onLogout}
              className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5"
              title="Encerrar sessão no dispositivo"
            >
              <LogOut size={14} /> Sair
            </button>
          </div>
        </div>

        {/* SECTION: MEUS PEDIDOS */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-[#BFDBFE] space-y-6">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <div className="flex items-center gap-2.5">
              <ShoppingBag size={20} className="text-[#2563EB]" />
              <h2 className="text-lg sm:text-xl font-extrabold text-[#1E293B] font-nunito leading-none">
                Meus Pedidos & Rastreamento ({orders.length})
              </h2>
            </div>
            <button
              type="button"
              onClick={loadOrders}
              className="text-xs text-[#2563EB] font-bold hover:underline flex items-center gap-1"
            >
              <RefreshCw size={13} className={loading ? 'animate-spin' : ''} /> Atualizar
            </button>
          </div>

          {loading ? (
            <div className="space-y-4 py-8">
              {[1, 2].map(i => (
                <div key={i} className="h-36 bg-gray-50 rounded-2xl animate-pulse border border-gray-100"></div>
              ))}
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-12 px-4 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
              <Package size={36} className="mx-auto mb-2 text-gray-300" />
              <p className="font-bold text-sm text-[#1E293B]">Nenhum pedido encontrado para este email</p>
              <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
                Quando fizer um pedido na loja utilizando <strong>{customer.email}</strong>, o histórico e rastreio aparecerão aqui automaticamente!
              </p>
              <Button onClick={onBack} className="mt-4 text-xs font-bold shadow-sm">
                Explorar Catálogo de Produtos
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => {
                const badge = getStatusBadge(order.status);

                return (
                  <div
                    key={order.id}
                    className="border border-gray-200 rounded-2xl p-5 sm:p-6 space-y-4 hover:border-[#2563EB] transition-all bg-[#F8FAFC]/50 shadow-xs"
                  >
                    {/* Header do Pedido */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-gray-200/80">
                      <div>
                        <div className="flex items-center gap-2.5">
                          <span className="font-black text-lg text-[#2563EB]">#{order.id}</span>
                          <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full border ${badge.class}`}>
                            {badge.label}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-400 mt-0.5 flex items-center gap-1">
                          <Clock size={12} /> Realizado em: {new Date(order.created_at).toLocaleDateString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>

                      <div className="text-left sm:text-right">
                        <span className="text-xs text-gray-400 font-bold block">Total Pago:</span>
                        <span className="text-xl font-black text-[#1E293B]">
                          R$ {order.total.toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    </div>

                    {/* Timeline de Status */}
                    <div className="py-2">
                      <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold">
                        <div className={`p-2 rounded-xl border ${badge.step >= 1 ? 'bg-blue-50 border-blue-200 text-[#2563EB]' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
                          1. Recebido
                        </div>
                        <div className={`p-2 rounded-xl border ${badge.step >= 2 ? 'bg-amber-50 border-amber-200 text-amber-800' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
                          2. Em Preparo
                        </div>
                        <div className={`p-2 rounded-xl border ${badge.step >= 3 ? 'bg-indigo-50 border-indigo-200 text-indigo-800' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
                          3. Pronto / Enviado
                        </div>
                        <div className={`p-2 rounded-xl border ${badge.step >= 4 ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
                          4. Concluído
                        </div>
                      </div>
                    </div>

                    {/* Itens do Pedido */}
                    <div className="space-y-2.5 pt-1">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs bg-white p-2.5 rounded-xl border border-gray-100">
                          <div className="flex items-center gap-3 min-w-0">
                            {item.product_image && (
                              <img
                                src={item.product_image}
                                alt={item.product_name}
                                className="w-10 h-10 rounded-lg object-cover border border-gray-100 shrink-0"
                              />
                            )}
                            <div className="min-w-0">
                              <p className="font-bold text-[#1E293B] truncate">{item.product_name}</p>
                              {item.selected_color && (
                                <p className="text-[10px] text-[#2563EB] font-semibold">Cor: {item.selected_color}</p>
                              )}
                              <p className="text-[10px] text-gray-400">R$ {item.unit_price.toFixed(2).replace('.', ',')} un</p>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="font-black text-[#1E293B] px-2 py-0.5 bg-gray-100 rounded-md">
                              {item.qty}x
                            </span>
                            <span className="block font-bold text-xs text-[#2563EB] mt-0.5">
                              R$ {(item.unit_price * item.qty).toFixed(2).replace('.', ',')}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Detalhes de Envio & Botões de Ação */}
                    <div className="pt-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs text-gray-500 border-t border-gray-100">
                      <div className="space-y-0.5">
                        <p className="flex items-center gap-1.5">
                          <Truck size={13} className="text-[#2563EB]" />
                          <span>Envio: <strong>{order.shipping_service_name || 'Entrega Local ES'}</strong> {order.package_tier ? `(${order.package_tier})` : ''}</span>
                        </p>
                        {order.full_address && (
                          <p className="flex items-center gap-1.5 text-[11px] text-gray-400">
                            <MapPin size={12} /> {order.full_address}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                        <button
                          type="button"
                          onClick={() => handleReorder(order)}
                          className="px-3 py-1.5 bg-blue-50 hover:bg-[#2563EB] hover:text-white text-[#2563EB] font-bold rounded-xl transition-colors flex items-center gap-1 text-xs"
                          title="Adicionar estes itens de volta ao carrinho"
                        >
                          <RotateCcw size={13} /> Pedir Novamente
                        </button>
                        <a
                          href={`https://wa.me/5527996043041?text=${encodeURIComponent(`Olá Pedra Mania! Gostaria de informações sobre meu pedido #${order.id}.`)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700 font-bold rounded-xl transition-colors flex items-center gap-1 text-xs"
                        >
                          <Phone size={13} /> WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* SECTION: POLÍTICAS & INFORMAÇÕES ÚTEIS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#BFDBFE] space-y-2">
            <h3 className="font-extrabold text-sm text-[#1E293B] flex items-center gap-2">
              <FileText size={16} className="text-[#2563EB]" /> Política de Trocas e Devoluções
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Você tem até <strong>7 dias corridos</strong> após o recebimento do pedido para solicitar troca ou devolução de insumos em perfeito estado, conforme o Código de Defesa do Consumidor.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#BFDBFE] space-y-2">
            <h3 className="font-extrabold text-sm text-[#1E293B] flex items-center gap-2">
              <MapPin size={16} className="text-[#2563EB]" /> Retirada & Loja Física em Vitória
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Rua Paschoal Delmaestro, 401 - Jardim Camburi, Vitória/ES. Horário de funcionamento: Seg a Sex das 08h30 às 18h30 e Sábados até as 14h.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
