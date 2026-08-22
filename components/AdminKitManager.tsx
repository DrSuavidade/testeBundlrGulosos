import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Plus, 
  Trash2, 
  Edit, 
  Check, 
  Sparkles, 
  Percent, 
  AlertCircle, 
  X, 
  Layers, 
  Search, 
  ArrowRight,
  TrendingDown,
  Boxes
} from 'lucide-react';
import { Kit, KitInput, Product } from '../types';
import { api } from '../services/mockApi';
import { Button } from './ui/Button';

interface AdminKitManagerProps {
  products: Product[];
  onRefreshProducts?: () => void;
}

export const AdminKitManager: React.FC<AdminKitManagerProps> = ({ products, onRefreshProducts }) => {
  const [kits, setKits] = useState<Kit[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingKit, setEditingKit] = useState<Kit | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [badgeText, setBadgeText] = useState('Super Combo');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [bannerImage, setBannerImage] = useState('');
  const [active, setActive] = useState(true);
  const [featured, setFeatured] = useState(true);
  const [selectedItems, setSelectedItems] = useState<{ productId: string; qty: number; selectedColor?: string }[]>([]);
  
  // Product Search inside selector
  const [productSearch, setProductSearch] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const loadKits = async () => {
    setLoading(true);
    try {
      const data = await api.getKits();
      setKits(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadKits();
  }, []);

  const openCreateModal = () => {
    setEditingKit(null);
    setName('');
    setBadgeText('Super Combo');
    setDescription('');
    setPrice('');
    setBannerImage('');
    setActive(true);
    setFeatured(true);
    setSelectedItems([]);
    setError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (kit: Kit) => {
    setEditingKit(kit);
    setName(kit.name);
    setBadgeText(kit.badge_text || 'Super Combo');
    setDescription(kit.description || '');
    setPrice(kit.price);
    setBannerImage(kit.banner_image || '');
    setActive(kit.active);
    setFeatured(kit.featured);
    setSelectedItems(
      kit.items.map(it => ({
        productId: it.product_id,
        qty: it.qty,
        selectedColor: it.selected_color
      }))
    );
    setError(null);
    setIsModalOpen(true);
  };

  const handleAddItem = (productId: string) => {
    const existing = selectedItems.find(i => i.productId === productId);
    if (existing) {
      setSelectedItems(selectedItems.map(i => i.productId === productId ? { ...i, qty: i.qty + 1 } : i));
    } else {
      setSelectedItems([...selectedItems, { productId, qty: 1 }]);
    }
  };

  const handleRemoveItem = (productId: string) => {
    setSelectedItems(selectedItems.filter(i => i.productId !== productId));
  };

  const handleUpdateQty = (productId: string, delta: number) => {
    setSelectedItems(selectedItems.map(i => {
      if (i.productId === productId) {
        const nextQty = Math.max(1, i.qty + delta);
        return { ...i, qty: nextQty };
      }
      return i;
    }));
  };

  // Cálculos em Tempo Real
  const calculateOriginalPrice = () => {
    return selectedItems.reduce((sum, it) => {
      const p = products.find(prod => prod.id === it.productId);
      return sum + (p ? p.price * it.qty : 0);
    }, 0);
  };

  const calculateMaxStock = () => {
    if (selectedItems.length === 0) return 0;
    let minStock = Infinity;
    for (const it of selectedItems) {
      const p = products.find(prod => prod.id === it.productId);
      const stock = p ? p.stock : 0;
      const possible = Math.floor(stock / it.qty);
      if (possible < minStock) {
        minStock = possible;
      }
    }
    return minStock === Infinity ? 0 : minStock;
  };

  const originalPrice = calculateOriginalPrice();
  const numericPrice = typeof price === 'number' ? price : 0;
  const discountAmount = Math.max(0, originalPrice - numericPrice);
  const discountPercent = originalPrice > 0 ? Math.round((discountAmount / originalPrice) * 100) : 0;
  const maxStock = calculateMaxStock();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Por favor, defina o nome do kit.');
      return;
    }
    if (selectedItems.length === 0) {
      setError('Adicione pelo menos um produto ao kit.');
      return;
    }
    if (!price || price <= 0) {
      setError('Defina um preço promocional válido para o kit.');
      return;
    }

    setError(null);
    setSubmitting(true);

    const payload: KitInput = {
      name: name.trim(),
      badge_text: badgeText.trim(),
      description: description.trim(),
      price: Number(price),
      banner_image: bannerImage.trim() || undefined,
      active,
      featured,
      items: selectedItems.map(it => ({
        product_id: it.productId,
        qty: it.qty,
        selected_color: it.selectedColor
      }))
    };

    try {
      if (editingKit) {
        await api.updateKit(editingKit.id, payload);
      } else {
        await api.addKit(payload);
      }
      setIsModalOpen(false);
      loadKits();
      if (onRefreshProducts) onRefreshProducts();
    } catch (err: any) {
      setError(err.message || 'Erro ao salvar kit.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, kitName: string) => {
    if (!window.confirm(`Tem certeza que deseja excluir o kit "${kitName}"?`)) return;
    try {
      await api.deleteKit(id);
      loadKits();
    } catch (err: any) {
      alert('Erro ao excluir kit: ' + err.message);
    }
  };

  const filteredProductsToAdd = products.filter(p => {
    if (!productSearch.trim()) return true;
    return p.name.toLowerCase().includes(productSearch.toLowerCase());
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#2563EB] uppercase tracking-wider">
            <Boxes size={16} />
            <span>Kits Promocionais & Combos Rápidos</span>
          </div>
          <h2 className="text-xl font-extrabold text-[#1E293B] font-nunito mt-0.5">
            Montador de Kits com Produtos do Estoque
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Monte pacotes com produtos existentes da loja, com cálculo automático de economia e controle de estoque real.
          </p>
        </div>

        <Button onClick={openCreateModal} className="flex items-center gap-2 text-xs font-bold shadow-md">
          <Plus size={16} /> Novo Kit / Combo
        </Button>
      </div>

      {/* Kits List */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-64 bg-white rounded-2xl border border-gray-100 animate-pulse p-6"></div>
          ))}
        </div>
      ) : kits.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white rounded-2xl border-2 border-dashed border-gray-200">
          <Package size={40} className="mx-auto mb-3 text-gray-300" />
          <h3 className="text-base font-bold text-[#1E293B]">Nenhum Kit Promocional cadastrado ainda</h3>
          <p className="text-xs text-gray-400 mt-1 max-w-md mx-auto">
            Crie combos com desconto juntando produtos do seu catálogo para aumentar o ticket médio das vendas!
          </p>
          <Button onClick={openCreateModal} className="mt-4 text-xs font-bold">
            <Plus size={14} className="mr-1" /> Criar Primeiro Kit
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kits.map(kit => (
            <div
              key={kit.id}
              className={`bg-white rounded-2xl border ${
                kit.active ? 'border-gray-200 hover:border-[#2563EB]' : 'border-gray-200 opacity-60'
              } p-5 shadow-xs transition-all flex flex-col justify-between space-y-4`}
            >
              <div className="space-y-3">
                {/* Header & Badges */}
                <div className="flex justify-between items-start gap-2">
                  <span className="px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-extrabold rounded-full flex items-center gap-1">
                    <Sparkles size={11} className="text-amber-600" /> {kit.badge_text || 'Combo'}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(kit)}
                      className="p-1.5 text-gray-400 hover:text-[#2563EB] hover:bg-gray-100 rounded-lg transition-colors"
                      title="Editar Kit"
                    >
                      <Edit size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(kit.id, kit.name)}
                      className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Excluir Kit"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                {/* Title & Desc */}
                <div>
                  <h3 className="font-extrabold text-[#1E293B] text-base leading-tight">{kit.name}</h3>
                  {kit.description && (
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{kit.description}</p>
                  )}
                </div>

                {/* Included Items Preview */}
                <div className="bg-[#F8FAFC] p-3 rounded-xl border border-gray-100 space-y-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    Produtos no Kit ({kit.items.length}):
                  </span>
                  <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                    {kit.items.map((it, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs text-gray-700 bg-white p-1.5 rounded-lg border border-gray-50">
                        <div className="flex items-center gap-2 truncate">
                          {it.product_image && (
                            <img src={it.product_image} alt={it.product_name} className="w-6 h-6 rounded object-cover shrink-0" />
                          )}
                          <span className="truncate font-medium">{it.product_name}</span>
                        </div>
                        <span className="font-bold text-[#2563EB] shrink-0 ml-2">{it.qty}x</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & Stock Footer */}
              <div className="pt-3 border-t border-gray-100 space-y-2">
                <div className="flex items-baseline justify-between">
                  <div>
                    {kit.original_price > kit.price && (
                      <span className="text-xs text-gray-400 line-through mr-1.5">
                        R$ {kit.original_price.toFixed(2).replace('.', ',')}
                      </span>
                    )}
                    <span className="text-lg font-black text-[#2563EB]">
                      R$ {kit.price.toFixed(2).replace('.', ',')}
                    </span>
                  </div>

                  {kit.discount_percentage > 0 && (
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-extrabold rounded-md">
                      {kit.discount_percentage}% OFF
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center text-[11px] text-gray-500 font-medium">
                  <span>Estoque Real Disponível:</span>
                  <strong className={kit.available_stock > 0 ? 'text-emerald-600' : 'text-rose-600'}>
                    {kit.available_stock > 0 ? `${kit.available_stock} kits prontos` : 'Esgotado'}
                  </strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-[#BFDBFE] max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-xl font-bold text-[#1E293B] font-nunito">
                  {editingKit ? 'Editar Kit Promocional' : 'Montar Novo Kit Promocional'}
                </h3>
                <p className="text-xs text-gray-500">Selecione produtos existentes e defina o valor do combo.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-700 rounded-full">
                <X size={20} />
              </button>
            </div>

            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-xl flex items-center gap-2">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1E293B] mb-1">Nome do Kit *</label>
                  <input
                    required
                    type="text"
                    placeholder="Ex: Combo Crochê Completo Amigurumi"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#2563EB] outline-none text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E293B] mb-1">Tag / Badge em Destaque</label>
                  <input
                    type="text"
                    placeholder="Ex: 🔥 Oferta Especial, 20% OFF, Iniciante"
                    value={badgeText}
                    onChange={e => setBadgeText(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#2563EB] outline-none text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E293B] mb-1">Descrição / Benefício do Kit</label>
                <textarea
                  rows={2}
                  placeholder="Ex: O pacote ideal para quem quer começar a fazer amigurumi com linhas de alta qualidade e agulha ergonômica."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 focus:border-[#2563EB] outline-none text-sm resize-none"
                />
              </div>

              {/* SELEÇÃO DE PRODUTOS */}
              <div className="bg-[#F0F7FF] p-4 rounded-2xl border border-[#BFDBFE] space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-xs text-[#1E293B] uppercase tracking-wider flex items-center gap-1.5">
                    <Layers size={15} className="text-[#2563EB]" /> Composição do Kit (Produtos Selecionados)
                  </h4>
                  <span className="text-[11px] font-bold text-[#2563EB]">
                    {selectedItems.length} itens no combo
                  </span>
                </div>

                {/* Lista de Itens Já Adicionados ao Kit */}
                {selectedItems.length === 0 ? (
                  <p className="text-xs text-gray-500 italic py-2 text-center">
                    Nenhum produto adicionado ainda. Escolha os produtos abaixo.
                  </p>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {selectedItems.map(it => {
                      const prod = products.find(p => p.id === it.productId);
                      if (!prod) return null;

                      return (
                        <div key={it.productId} className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-gray-200 text-xs">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <img
                              src={prod.images?.[0] || 'https://images.unsplash.com/photo-1608248597260-6f216e589959?q=80&w=100'}
                              alt={prod.name}
                              className="w-8 h-8 rounded-lg object-cover border border-gray-100 shrink-0"
                            />
                            <div className="min-w-0">
                              <p className="font-bold text-[#1E293B] truncate">{prod.name}</p>
                              <p className="text-[10px] text-gray-400">
                                R$ {prod.price.toFixed(2).replace('.', ',')} un · Estoque individual: {prod.stock} un
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                              <button
                                type="button"
                                onClick={() => handleUpdateQty(it.productId, -1)}
                                className="px-2 py-1 hover:bg-gray-200 font-bold"
                              >
                                -
                              </button>
                              <span className="px-2 font-bold text-xs">{it.qty}</span>
                              <button
                                type="button"
                                onClick={() => handleUpdateQty(it.productId, 1)}
                                className="px-2 py-1 hover:bg-gray-200 font-bold"
                              >
                                +
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleRemoveItem(it.productId)}
                              className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"
                              title="Remover do kit"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Seletor / Busca de Produtos da Loja para Adicionar */}
                <div className="pt-2 border-t border-blue-200/60 space-y-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Buscar produto do catálogo para adicionar..."
                      value={productSearch}
                      onChange={e => setProductSearch(e.target.value)}
                      className="w-full px-3 py-1.5 pl-8 rounded-xl border border-gray-200 bg-white text-xs outline-none focus:border-[#2563EB]"
                    />
                    <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>

                  <div className="max-h-32 overflow-y-auto space-y-1 pr-1">
                    {filteredProductsToAdd.slice(0, 8).map(prod => (
                      <div key={prod.id} className="flex justify-between items-center bg-white/70 hover:bg-white p-1.5 rounded-lg text-xs border border-transparent hover:border-gray-200 transition-colors">
                        <span className="truncate max-w-[280px] font-medium">{prod.name} (R$ {prod.price.toFixed(2)})</span>
                        <button
                          type="button"
                          onClick={() => handleAddItem(prod.id)}
                          className="px-2.5 py-1 bg-[#2563EB] text-white font-bold text-[11px] rounded-lg hover:bg-blue-700 transition-colors shrink-0"
                        >
                          + Adicionar
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* PAINEL DE PRECIFICAÇÃO & SIMULADOR */}
              <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-gray-200 space-y-3">
                <h4 className="font-bold text-xs text-[#1E293B] uppercase tracking-wider flex items-center gap-1.5">
                  <Percent size={15} className="text-emerald-600" /> Precificação & Estoque Calculado
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-gray-100 space-y-1">
                    <span className="text-gray-400 block font-medium">Soma dos Itens Individuais:</span>
                    <span className="text-base font-black text-gray-700">
                      R$ {originalPrice.toFixed(2).replace('.', ',')}
                    </span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-gray-100 space-y-1">
                    <label className="text-[#2563EB] block font-bold">Preço Promocional do Kit (R$) *</label>
                    <input
                      required
                      type="number"
                      step="0.01"
                      placeholder="Ex: 59.90"
                      value={price}
                      onChange={e => setPrice(e.target.value === '' ? '' : parseFloat(e.target.value))}
                      className="w-full px-2.5 py-1 text-base font-black text-[#2563EB] border border-[#BFDBFE] rounded-lg focus:ring-2 focus:ring-blue-200 outline-none"
                    />
                  </div>
                </div>

                {/* Feedback de Desconto e Estoque */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pt-2 border-t border-gray-200 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      Economia: R$ {discountAmount.toFixed(2).replace('.', ',')} ({discountPercent}% OFF)
                    </span>
                  </div>
                  <div className="text-gray-500 font-medium">
                    Estoque Máximo Real: <strong className="text-[#1E293B]">{maxStock} kits</strong>
                  </div>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="flex justify-end items-center gap-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl"
                >
                  Cancelar
                </button>
                <Button type="submit" disabled={submitting} className="text-xs font-bold shadow-md">
                  {submitting ? 'Salvando...' : editingKit ? 'Atualizar Kit' : 'Criar Kit Promocional'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
