import React, { useState, useEffect } from 'react';
import { CartItem, ShippingQuote, ShippingCalculationResponse, PackageTier } from '../types';
import { calculateShippingQuotes, calculateCartPackage, lookupAddressByCep } from '../services/shippingService';
import { Truck, Package, Clock, Check, Sparkles, MapPin, Store, AlertCircle, RefreshCw } from 'lucide-react';

interface ShippingCalculatorProps {
  items: CartItem[];
  selectedQuote: ShippingQuote | null;
  onSelectQuote: (quote: ShippingQuote | null) => void;
  onAddressFound?: (address: { street: string; district: string; city: string; state: string; zip: string }) => void;
}

export const ShippingCalculator: React.FC<ShippingCalculatorProps> = ({
  items,
  selectedQuote,
  onSelectQuote,
  onAddressFound
}) => {
  const [cep, setCep] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ShippingCalculationResponse | null>(null);
  const [packagePreview, setPackagePreview] = useState<PackageTier>(() => calculateCartPackage(items));

  // Recalcular preview de saco quando os itens mudarem
  useEffect(() => {
    const pkg = calculateCartPackage(items);
    setPackagePreview(pkg);
    
    // Se o CEP já foi calculado anteriormente, recalcular as cotações com o novo peso
    if (cep.replace(/\D/g, '').length === 8 && result) {
      handleCalculate(cep);
    }
  }, [items]);

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, '').slice(0, 8);
    if (raw.length > 5) {
      raw = raw.slice(0, 5) + '-' + raw.slice(5);
    }
    setCep(raw);
    setError(null);

    // Auto-disparo quando completar 8 dígitos
    if (raw.replace(/\D/g, '').length === 8) {
      handleCalculate(raw);
    }
  };

  const handleCalculate = async (targetCep?: string) => {
    const cleanCep = (targetCep || cep).replace(/\D/g, '');
    if (cleanCep.length !== 8) {
      setError('Por favor, informe um CEP válido com 8 dígitos.');
      return;
    }

    if (items.length === 0) {
      setError('Adicione produtos à sacola para calcular o frete.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1. Calcular cotações
      const calcResult = await calculateShippingQuotes(cleanCep, items);
      setResult(calcResult);

      // Selecionar automaticamente a opção mais económica se nenhuma estiver selecionada
      if (calcResult.quotes.length > 0) {
        // Se houver PAC ou primeira opção de envio pago/grátis
        const defaultChoice = calcResult.quotes.find(q => q.id !== 'pickup_store') || calcResult.quotes[0];
        if (!selectedQuote) {
          onSelectQuote(defaultChoice);
        } else {
          // Manter ou atualizar a selecionada
          const stillExists = calcResult.quotes.find(q => q.id === selectedQuote.id);
          onSelectQuote(stillExists || defaultChoice);
        }
      }

      // 2. Preencher endereço automaticamente via CEP se a callback existir
      if (onAddressFound) {
        const addr = await lookupAddressByCep(cleanCep);
        if (addr) {
          onAddressFound({ ...addr, zip: cleanCep });
        }
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao calcular frete. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#BFDBFE] shadow-sm space-y-4">
      {/* Header com Ícone e Título */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB]">
            <Truck size={20} />
          </div>
          <div>
            <h3 className="font-bold text-[#1E293B] text-sm sm:text-base leading-tight">
              Calcular Frete & Entrega
            </h3>
            <p className="text-xs text-gray-500">
              Enviamos de Jardim Camburi, Vitória / ES
            </p>
          </div>
        </div>

        {/* Badge do Saco Selecionado */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-[#F0F7FF] rounded-lg border border-[#93C5FD]/40 text-xs text-[#2563EB] font-medium">
          <Package size={14} />
          <span>{packagePreview.tierName.split(' ')[0]} {packagePreview.tierName.split(' ')[1]}</span>
          <span className="text-gray-400">•</span>
          <span>{packagePreview.totalWeightGrams}g</span>
        </div>
      </div>

      {/* Input de CEP e Botão */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            inputMode="numeric"
            placeholder="Informe seu CEP (ex: 29090-460)"
            value={cep}
            onChange={handleCepChange}
            maxLength={9}
            className="w-full pl-3.5 pr-9 py-2 sm:py-2.5 rounded-xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-[#93C5FD] outline-none text-sm transition-all"
          />
          {loading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2563EB] animate-spin">
              <RefreshCw size={16} />
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={() => handleCalculate()}
          disabled={loading || cep.replace(/\D/g, '').length < 8}
          className="px-4 py-2 sm:py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-50 text-white rounded-xl font-bold text-xs sm:text-sm transition-all shadow-sm flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
        >
          {loading ? 'Calculando...' : 'Calcular'}
        </button>
      </div>

      {/* Mensagem de Erro se houver */}
      {error && (
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-red-50 text-red-700 text-xs border border-red-200">
          <AlertCircle size={15} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Detalhe da Embalagem Atribuída */}
      <div className="bg-[#F8FAFC] p-3 rounded-xl border border-gray-100 flex items-center justify-between text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <Package size={16} className="text-[#2563EB] shrink-0" />
          <span>
            Embalagem calculada: <strong>{packagePreview.tierName}</strong> ({packagePreview.length}x{packagePreview.width}cm)
          </span>
        </div>
        <span className="font-semibold text-[#1E293B] shrink-0">
          {packagePreview.totalWeightGrams >= 1000 
            ? `${(packagePreview.totalWeightGrams / 1000).toFixed(2)} kg` 
            : `${packagePreview.totalWeightGrams} g`}
        </span>
      </div>

      {/* Lista de Opções de Frete */}
      {result && result.quotes && (
        <div className="space-y-2 pt-1 animate-fade-in-up">
          <p className="text-xs font-bold text-[#1E293B] flex items-center gap-1.5">
            <Sparkles size={13} className="text-[#2563EB]" /> Opções disponíveis para o seu CEP:
          </p>

          <div className="grid grid-cols-1 gap-2">
            {result.quotes.map((quote) => {
              const isSelected = selectedQuote?.id === quote.id;
              const isPickup = quote.id === 'pickup_store';

              return (
                <div
                  key={String(quote.id)}
                  onClick={() => onSelectQuote(quote)}
                  className={`relative p-3 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'border-[#2563EB] bg-[#EFF6FF] shadow-sm'
                      : 'border-gray-100 bg-white hover:border-[#BFDBFE] hover:bg-[#F8FAFC]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                      isSelected ? 'border-[#2563EB] bg-[#2563EB] text-white' : 'border-gray-300 bg-white'
                    }`}>
                      {isSelected && <Check size={12} strokeWidth={3} />}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        {isPickup ? (
                          <span className="font-bold text-xs sm:text-sm text-[#1E293B] flex items-center gap-1">
                            <Store size={14} className="text-[#059669]" /> {quote.name}
                          </span>
                        ) : (
                          <span className="font-bold text-xs sm:text-sm text-[#1E293B]">
                            {quote.name}
                          </span>
                        )}
                        
                        {isPickup && (
                          <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-md uppercase">
                            Grátis
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                        <Clock size={12} />
                        {isPickup
                          ? 'Pronto em 1 dia útil após confirmação'
                          : `Entrega em aprox. ${quote.delivery_time} ${quote.delivery_time === 1 ? 'dia útil' : 'dias úteis'}`}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className={`font-bold text-sm sm:text-base ${
                      quote.price === 0 ? 'text-[#059669]' : 'text-[#2563EB]'
                    }`}>
                      {quote.price === 0 ? 'R$ 0,00' : `R$ ${quote.price.toFixed(2).replace('.', ',')}`}
                    </span>
                    <p className="text-[10px] text-gray-400">
                      {quote.company.name}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-[11px] text-gray-400 text-center pt-1 flex items-center justify-center gap-1">
            <MapPin size={12} /> Loja Física: Rua Paschoal Delmaestro, 401, Jardim Camburi - Vitória/ES
          </p>
        </div>
      )}
    </div>
  );
};
