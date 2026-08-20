import React, { useState } from 'react';
import { Product, ProductColor, StoreCategory } from '../types';
import { Button } from './ui/Button';
import { 
  ArrowLeft, 
  Save, 
  Trash2, 
  Plus, 
  X, 
  Palette, 
  Tag, 
  Layers, 
  DollarSign, 
  Package, 
  Sparkles, 
  Eye, 
  Check, 
  Info,
  Scale,
  FileText
} from 'lucide-react';

interface AdminProductFormProps {
  initialProduct: Partial<Product>;
  categories: StoreCategory[];
  onSave: (productData: Partial<Product>) => Promise<void>;
  onCancel: () => void;
  onDelete?: (id: string) => Promise<void>;
}

export const AdminProductForm: React.FC<AdminProductFormProps> = ({
  initialProduct,
  categories,
  onSave,
  onCancel,
  onDelete
}) => {
  const isEditing = !!initialProduct.id;

  const [formData, setFormData] = useState<Partial<Product>>({
    name: initialProduct.name || '',
    slug: initialProduct.slug || '',
    description: initialProduct.description || '',
    category: initialProduct.category || (categories[0]?.id || 'linhas-fios'),
    price: initialProduct.price ?? 0,
    stock: initialProduct.stock ?? 10,
    weight: initialProduct.weight || '',
    composition: initialProduct.composition || '',
    tags: initialProduct.tags?.length ? [...initialProduct.tags] : ['Novo'],
    allergens: initialProduct.allergens?.length ? [...initialProduct.allergens] : [],
    colors: initialProduct.colors?.length ? [...initialProduct.colors] : [],
    images: initialProduct.images?.length ? [...initialProduct.images] : ['https://images.unsplash.com/photo-1608248597260-6f216e589959?q=80&w=800&auto=format&fit=crop'],
    active: initialProduct.active ?? true,
    featured: initialProduct.featured ?? false,
  });

  const [tagInput, setTagInput] = useState('');
  const [specInput, setSpecInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [previewColorIndex, setPreviewColorIndex] = useState<number>(0);

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !formData.tags?.includes(trimmed)) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), trimmed]
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter(t => t !== tagToRemove) || []
    });
  };

  const handleAddSpec = () => {
    const trimmed = specInput.trim();
    if (trimmed && !formData.allergens?.includes(trimmed)) {
      setFormData({
        ...formData,
        allergens: [...(formData.allergens || []), trimmed]
      });
      setSpecInput('');
    }
  };

  const handleRemoveSpec = (index: number) => {
    setFormData({
      ...formData,
      allergens: formData.allergens?.filter((_, i) => i !== index) || []
    });
  };

  const handleAddColor = () => {
    const current = formData.colors || [];
    setFormData({
      ...formData,
      colors: [
        ...current,
        { name: '', hex: '#3B82F6', image: '' }
      ]
    });
  };

  const handleUpdateColor = (index: number, updates: Partial<ProductColor>) => {
    const current = [...(formData.colors || [])];
    current[index] = { ...current[index], ...updates };
    setFormData({ ...formData, colors: current });
  };

  const handleRemoveColor = (index: number) => {
    const current = (formData.colors || []).filter((_, i) => i !== index);
    setFormData({ ...formData, colors: current });
    if (previewColorIndex >= current.length) {
      setPreviewColorIndex(Math.max(0, current.length - 1));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim()) {
      alert('Por favor, informe o nome do produto.');
      return;
    }

    setIsSaving(true);
    try {
      // Sync images array with colors images
      const validColors = (formData.colors || []).filter(c => c.image?.trim());
      const syncedImages = validColors.length > 0
        ? validColors.map(c => c.image)
        : (formData.images?.length ? formData.images : ['https://images.unsplash.com/photo-1608248597260-6f216e589959?q=80&w=800&auto=format&fit=crop']);

      await onSave({
        ...formData,
        colors: validColors.length > 0 ? validColors : undefined,
        images: syncedImages,
        price: Number(formData.price) || 0,
        stock: Number(formData.stock) || 0,
      });
    } catch (err) {
      alert('Erro ao salvar produto');
    } finally {
      setIsSaving(false);
    }
  };

  // Preview computed values
  const activePreviewImage = formData.colors?.length && formData.colors[previewColorIndex]?.image
    ? formData.colors[previewColorIndex].image
    : (formData.images?.[0] || 'https://images.unsplash.com/photo-1608248597260-6f216e589959?q=80&w=800&auto=format&fit=crop');

  const selectedCategoryObj = categories.find(c => c.id === formData.category);

  return (
    <div className="space-y-6 pb-20 animate-fade-in">
      
      {/* TOP BAR / BREADCRUMB & ACTIONS */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-[#BFDBFE] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="p-2.5 bg-gray-100 hover:bg-[#2563EB] hover:text-white text-gray-600 rounded-xl transition-all shadow-sm group"
            title="Voltar à lista de produtos"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <div>
            <div className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-wider">
              <span>Admin</span>
              <span>/</span>
              <span>Estoque & Produtos</span>
              <span>/</span>
              <span className="text-[#2563EB]">{isEditing ? 'Editar Insumo' : 'Novo Insumo'}</span>
            </div>
            <h2 className="text-2xl font-extrabold text-[#1E293B] font-nunito leading-tight mt-0.5">
              {isEditing ? (formData.name || 'Editar Produto') : 'Adicionar Novo Produto / Insumo'}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          {isEditing && onDelete && initialProduct.id && (
            <button
              type="button"
              onClick={() => onDelete(initialProduct.id!)}
              className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <Trash2 size={15} /> Apagar
            </button>
          )}
          <Button type="button" variant="ghost" onClick={onCancel} className="text-xs font-bold">
            Cancelar
          </Button>
          <Button 
            type="button" 
            onClick={handleSubmit} 
            disabled={isSaving}
            className="text-xs font-bold shadow-md shadow-[#2563EB]/25"
          >
            <Save size={15} className="mr-1.5" />
            {isSaving ? 'Salvando...' : 'Salvar Produto'}
          </Button>
        </div>
      </div>

      {/* FORM BODY */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: Main Info (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* CARD 1: Informações Gerais */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-[#BFDBFE]">
            <div className="flex items-center gap-2.5 mb-6 text-[#2563EB] border-b border-gray-100 pb-4">
              <Package size={20} />
              <h3 className="font-extrabold text-lg text-[#1E293B] font-nunito">1. Informações Básicas</h3>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <label className="block font-bold text-gray-700 mb-1.5">
                  Nome do Produto / Insumo <span className="text-rose-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  value={formData.name || ''}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Fio de Algodão Soft Pastel 100g"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-[#BFDBFE] outline-none text-base font-semibold text-[#1E293B] transition-all"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1.5">
                  Descrição Completa do Produto
                </label>
                <textarea
                  rows={4}
                  value={formData.description || ''}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descreva detalhes como textura, maciez, rendimento, recomendações de uso para artesãs..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-[#BFDBFE] outline-none text-sm text-[#1E293B] leading-relaxed transition-all resize-y"
                />
                <span className="text-[11px] text-gray-400 block text-right mt-1">
                  {(formData.description || '').length} caracteres
                </span>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1.5">
                  Categoria do Produto <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <select
                    value={formData.category || ''}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-[#BFDBFE] outline-none bg-white font-semibold text-[#1E293B]"
                  >
                    <option value="">-- Selecione uma categoria --</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>

                  {selectedCategoryObj && (
                    <div className="flex items-center gap-2.5 px-4 py-2.5 bg-[#F0F7FF] border border-[#BFDBFE] rounded-xl text-xs font-bold text-[#2563EB]">
                      <span className="w-4 h-4 rounded-full border border-white shadow-sm shrink-0" style={{ backgroundColor: selectedCategoryObj.color }} />
                      <span className="truncate">Categoria Ativa: {selectedCategoryObj.name}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* CARD 2: Cores & Fotos Variantes */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-[#BFDBFE]">
            <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2.5 text-[#2563EB]">
                <Palette size={20} />
                <div>
                  <h3 className="font-extrabold text-lg text-[#1E293B] font-nunito leading-none">2. Cores & Fotos Específicas</h3>
                  <p className="text-xs text-gray-400 mt-1 font-normal">Adicione as opções de cores. Cada cor pode ter a sua foto própria na loja.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleAddColor}
                className="px-3.5 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Plus size={15} /> Adicionar Cor
              </button>
            </div>

            <div className="space-y-3">
              {(formData.colors || []).map((color, idx) => (
                <div 
                  key={idx} 
                  className="p-4 bg-gray-50/80 hover:bg-[#F0F7FF]/50 rounded-2xl border border-gray-200 transition-colors flex flex-col sm:flex-row items-start sm:items-center gap-3.5"
                >
                  {/* Color Picker swatch */}
                  <div className="flex items-center gap-2 shrink-0">
                    <input
                      type="color"
                      value={color.hex || '#3B82F6'}
                      onChange={e => handleUpdateColor(idx, { hex: e.target.value })}
                      className="w-10 h-10 rounded-xl border-2 border-white shadow-sm cursor-pointer p-0.5 bg-white"
                      title="Escolher tom da cor"
                    />
                  </div>

                  {/* Color Name */}
                  <div className="w-full sm:w-44">
                    <input
                      type="text"
                      value={color.name}
                      onChange={e => handleUpdateColor(idx, { name: e.target.value })}
                      placeholder="Nome da cor (ex: Rosa Bebê)"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-200 bg-white focus:border-[#2563EB] outline-none text-xs font-bold text-[#1E293B]"
                    />
                  </div>

                  {/* Image URL */}
                  <div className="flex-1 w-full">
                    <input
                      type="text"
                      value={color.image}
                      onChange={e => handleUpdateColor(idx, { image: e.target.value })}
                      placeholder="URL da foto para esta cor (https://...)"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-200 bg-white focus:border-[#2563EB] outline-none text-xs text-gray-700"
                    />
                  </div>

                  {/* Preview Thumbnail */}
                  {color.image && (
                    <div className="w-10 h-10 rounded-xl overflow-hidden border border-gray-300 shrink-0 bg-white">
                      <img
                        src={color.image}
                        alt={color.name || 'preview'}
                        className="w-full h-full object-cover"
                        onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-1 shrink-0 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={() => setPreviewColorIndex(idx)}
                      className={`p-2 rounded-lg text-xs font-bold transition-colors ${
                        previewColorIndex === idx ? 'bg-[#2563EB] text-white' : 'text-gray-400 hover:text-[#2563EB] hover:bg-white'
                      }`}
                      title="Ver no card de pré-visualização"
                    >
                      <Eye size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveColor(idx)}
                      className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Remover esta cor"
                    >
                      <X size={15} />
                    </button>
                  </div>
                </div>
              ))}

              {(!formData.colors || formData.colors.length === 0) && (
                <div className="text-center py-8 px-4 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50 text-gray-400">
                  <Palette size={28} className="mx-auto mb-2 text-gray-300" />
                  <p className="font-bold text-sm text-[#1E293B]">Nenhuma variação de cor cadastrada</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Clique no botão acima para adicionar cores (ex: Branco, Azul, Vermelho) com fotos individuais.
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-200 text-left">
                    <label className="block font-bold text-gray-700 text-xs mb-1">
                      Ou informe a URL da foto principal (sem variações):
                    </label>
                    <input
                      type="text"
                      value={formData.images?.[0] || ''}
                      onChange={e => setFormData({ ...formData, images: [e.target.value] })}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:border-[#2563EB] outline-none text-xs"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CARD 3: Características Técnicas & Materiais */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-[#BFDBFE]">
            <div className="flex items-center gap-2.5 mb-6 text-[#2563EB] border-b border-gray-100 pb-4">
              <Scale size={20} />
              <div>
                <h3 className="font-extrabold text-lg text-[#1E293B] font-nunito leading-none">3. Características Técnicas & Materiais</h3>
                <p className="text-xs text-gray-400 mt-1 font-normal">Informações de peso, composição e especificações exibidas na loja.</p>
              </div>
            </div>

            <div className="space-y-5 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                    <span>⚖️ Peso / Metragem</span>
                  </label>
                  <input
                    type="text"
                    value={formData.weight || ''}
                    onChange={e => setFormData({ ...formData, weight: e.target.value })}
                    placeholder="Ex: 100g, 500g, 254 Metros..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-[#BFDBFE] outline-none text-sm font-semibold text-[#1E293B]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                    <span>🧵 Composição do Fio / Material</span>
                  </label>
                  <input
                    type="text"
                    value={formData.composition || ''}
                    onChange={e => setFormData({ ...formData, composition: e.target.value })}
                    placeholder="Ex: 100% Algodão Mercerizado, Aço Carbono..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-[#BFDBFE] outline-none text-sm font-semibold text-[#1E293B]"
                  />
                </div>
              </div>

              {/* Tags / Etiquetas */}
              <div>
                <label className="block font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                  <Tag size={15} className="text-[#2563EB]" />
                  <span>Tags & Destaques Visuais</span>
                </label>
                <div className="flex gap-2 mb-2.5">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddTag(); } }}
                    placeholder="Digite uma tag (ex: Mais Vendido, Novidade, 100% Algodão) e pressione Enter"
                    className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:border-[#2563EB] outline-none text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-4 py-2 bg-gray-100 hover:bg-[#2563EB] hover:text-white text-gray-700 font-bold text-xs rounded-xl transition-colors"
                  >
                    + Adicionar Tag
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {formData.tags?.map(t => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1.5 bg-[#F0F7FF] text-[#2563EB] border border-[#BFDBFE] px-3 py-1 rounded-lg text-xs font-bold"
                    >
                      {t}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(t)}
                        className="hover:text-rose-600 transition-colors"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Especificações Detalhadas (Allergens / specs list) */}
              <div>
                <label className="block font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                  <Info size={15} className="text-[#2563EB]" />
                  <span>Especificações Técnicas da Ficha</span>
                </label>
                <div className="flex gap-2 mb-2.5">
                  <input
                    type="text"
                    value={specInput}
                    onChange={e => setSpecInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddSpec(); } }}
                    placeholder="Adicione um detalhe (ex: Tex 394, Agulha 2.5mm a 3.5mm) e pressione Enter"
                    className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:border-[#2563EB] outline-none text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddSpec}
                    className="px-4 py-2 bg-gray-100 hover:bg-[#2563EB] hover:text-white text-gray-700 font-bold text-xs rounded-xl transition-colors"
                  >
                    + Adicionar
                  </button>
                </div>

                <div className="space-y-1.5">
                  {formData.allergens?.map((spec, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-xs font-medium text-[#1E293B]">
                      <span>• {spec}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSpec(i)}
                        className="text-gray-400 hover:text-rose-600 p-1"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Price, Stock, Visibility & Live Card Preview (1 col) */}
        <div className="space-y-6">
          
          {/* CARD 4: Preço & Estoque */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#BFDBFE]">
            <div className="flex items-center gap-2 mb-4 text-[#2563EB] border-b border-gray-100 pb-3">
              <DollarSign size={18} />
              <h3 className="font-extrabold text-base text-[#1E293B] font-nunito">Preço & Estoque</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block font-bold text-gray-700 text-xs mb-1">
                  Preço de Venda (R$) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-black text-[#2563EB]">R$</span>
                  <input
                    required
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price || 0}
                    onChange={e => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#2563EB] outline-none text-lg font-black text-[#2563EB]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 text-xs mb-1">
                  Quantidade em Estoque (Unidades) <span className="text-rose-500">*</span>
                </label>
                <input
                  required
                  type="number"
                  min="0"
                  value={formData.stock || 0}
                  onChange={e => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#2563EB] outline-none text-base font-bold text-[#1E293B]"
                />
                <div className="mt-1.5 flex items-center justify-between text-[11px]">
                  <span className="text-gray-400">Situação:</span>
                  <span className={`font-extrabold ${
                    (formData.stock || 0) > 10 ? 'text-emerald-600' : (formData.stock || 0) > 0 ? 'text-amber-600' : 'text-rose-600'
                  }`}>
                    {(formData.stock || 0) > 10 ? '✓ Estoque Saudável' : (formData.stock || 0) > 0 ? '⚠ Estoque Baixo' : '✕ Esgotado'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 5: Visibilidade & Status */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#BFDBFE]">
            <div className="flex items-center gap-2 mb-4 text-[#2563EB] border-b border-gray-100 pb-3">
              <Sparkles size={18} />
              <h3 className="font-extrabold text-base text-[#1E293B] font-nunito">Visibilidade</h3>
            </div>

            <div className="space-y-3 text-xs">
              <label className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
                <div>
                  <span className="font-bold text-[#1E293B] block">Produto Ativo na Loja</span>
                  <span className="text-gray-400 text-[11px]">Visível para os clientes comprarem</span>
                </div>
                <input
                  type="checkbox"
                  checked={formData.active ?? true}
                  onChange={e => setFormData({ ...formData, active: e.target.checked })}
                  className="w-5 h-5 text-[#2563EB] rounded cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
                <div>
                  <span className="font-bold text-[#1E293B] block">Destaque na Página Inicial</span>
                  <span className="text-gray-400 text-[11px]">Exibir nos produtos em alta</span>
                </div>
                <input
                  type="checkbox"
                  checked={formData.featured ?? false}
                  onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-5 h-5 text-[#2563EB] rounded cursor-pointer"
                />
              </label>
            </div>
          </div>

          {/* CARD 6: Live Card Preview */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#BFDBFE]">
            <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2.5">
              <span className="text-xs font-extrabold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                <Eye size={14} className="text-[#2563EB]" /> Pré-visualização na Loja
              </span>
              <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-extrabold">
                Ao Vivo
              </span>
            </div>

            {/* Simulated Product Card */}
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-md">
              <div className="relative h-44 bg-gray-100 overflow-hidden">
                <img
                  src={activePreviewImage}
                  alt={formData.name || 'Preview'}
                  className="w-full h-full object-cover"
                />
                {formData.featured && (
                  <span className="absolute top-2 left-2 bg-[#2563EB] text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                    Destaque
                  </span>
                )}
                {formData.colors && formData.colors.length > 0 && (
                  <div className="absolute bottom-2 left-2 flex gap-1 z-10">
                    {formData.colors.map((c, i) => (
                      <span
                        key={i}
                        className={`w-3.5 h-3.5 rounded-full border border-white shadow-sm transition-transform ${
                          previewColorIndex === i ? 'scale-125 ring-2 ring-[#2563EB]' : ''
                        }`}
                        style={{ backgroundColor: c.hex }}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="p-4">
                <h4 className="font-nunito font-extrabold text-base text-[#1E293B] leading-tight line-clamp-1">
                  {formData.name || 'Nome do Produto'}
                </h4>
                <p className="text-gray-400 text-xs line-clamp-2 mt-1 leading-relaxed">
                  {formData.description || 'Descrição do produto aparecerá aqui...'}
                </p>

                {(formData.weight || formData.composition) && (
                  <div className="flex flex-wrap gap-1 mt-2.5">
                    {formData.weight && (
                      <span className="text-[10px] font-bold bg-[#F0F7FF] text-[#2563EB] px-2 py-0.5 rounded">
                        ⚖️ {formData.weight}
                      </span>
                    )}
                    {formData.composition && (
                      <span className="text-[10px] font-bold bg-[#F0F7FF] text-[#2563EB] px-2 py-0.5 rounded truncate max-w-[150px]">
                        🧵 {formData.composition}
                      </span>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-gray-100">
                  <span className="text-base font-black text-[#2563EB]">
                    R$ {(Number(formData.price) || 0).toFixed(2).replace('.', ',')}
                  </span>
                  <span className="text-[10px] bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-bold">
                    {formData.stock || 0} em estoque
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </form>

      {/* BOTTOM FLOATING SAVE BAR */}
      <div className="sticky bottom-4 z-40 bg-[#1E293B] text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between gap-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#2563EB] flex items-center justify-center font-black">
            🧶
          </div>
          <div>
            <span className="font-bold text-sm block truncate max-w-xs sm:max-w-md">
              {formData.name || 'Novo Produto'}
            </span>
            <span className="text-xs text-gray-400">
              R$ {(Number(formData.price) || 0).toFixed(2).replace('.', ',')} · {formData.stock || 0} unidades
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl text-xs font-bold text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            Cancelar
          </button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isSaving}
            className="text-xs font-bold px-6"
          >
            <Save size={15} className="mr-1.5" />
            {isSaving ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </div>
      </div>

    </div>
  );
};
