import { CartItem, ShippingCalculationResponse, ShippingQuote, PackageTier } from '../types';

/**
 * Seleciona o saco com base no peso total do carrinho
 * 1º saco: até 300g -> 8cm x 12cm
 * 2º saco: 301g a 800g -> 26cm x 33cm
 * 3º saco: 801g a 2.000g -> 33cm x 38cm
 * 4º saco: acima de 2.000g -> 53cm x 40cm
 */
export function calculateCartPackage(items: CartItem[]): PackageTier {
  const totalWeightGrams = items.reduce((acc, item) => {
    let weight = item.weight_grams;
    if (!weight && item.weight) {
      const match = item.weight.match(/([\d,.]+)\s*(kg|g|gr)/i);
      if (match) {
        const val = parseFloat(match[1].replace(',', '.'));
        const unit = match[2].toLowerCase();
        weight = unit === 'kg' ? val * 1000 : val;
      }
    }
    const safeWeight = weight && weight > 0 ? weight : 250;
    return acc + (safeWeight * item.qty);
  }, 0);

  const safeTotal = Math.max(50, Math.round(totalWeightGrams));
  const weightKg = parseFloat((safeTotal / 1000).toFixed(3));

  if (safeTotal <= 300) {
    return {
      tierNumber: 1,
      tierName: 'Saco 1 Pequeno (8x12cm)',
      width: 8,
      length: 12,
      height: 3,
      weightKg,
      totalWeightGrams: safeTotal
    };
  } else if (safeTotal <= 800) {
    return {
      tierNumber: 2,
      tierName: 'Saco 2 Médio (26x33cm)',
      width: 26,
      length: 33,
      height: 5,
      weightKg,
      totalWeightGrams: safeTotal
    };
  } else if (safeTotal <= 2000) {
    return {
      tierNumber: 3,
      tierName: 'Saco 3 Grande (33x38cm)',
      width: 33,
      length: 38,
      height: 8,
      weightKg,
      totalWeightGrams: safeTotal
    };
  } else {
    return {
      tierNumber: 4,
      tierName: 'Saco 4 Extra Grande (40x53cm)',
      width: 40,
      length: 53,
      height: 10,
      weightKg,
      totalWeightGrams: safeTotal
    };
  }
}

/**
 * Consulta endereço a partir do CEP usando ViaCEP
 */
export async function lookupAddressByCep(cep: string): Promise<{
  street: string;
  district: string;
  city: string;
  state: string;
} | null> {
  const cleanCep = cep.replace(/\D/g, '');
  if (cleanCep.length !== 8) return null;

  try {
    const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
    if (!res.ok) return null;
    const data = await res.json();
    if (data.erro) return null;
    return {
      street: data.logradouro || '',
      district: data.bairro || '',
      city: data.localidade || '',
      state: data.uf || 'ES'
    };
  } catch (e) {
    console.warn('Falha na busca de CEP:', e);
    return null;
  }
}

/**
 * Calcula cotação de frete tentando o backend Pedra Mania e com fallback instantâneo
 */
export async function calculateShippingQuotes(
  destinationZip: string,
  items: CartItem[]
): Promise<ShippingCalculationResponse> {
  const cleanZip = destinationZip.replace(/\D/g, '');
  if (cleanZip.length !== 8) {
    throw new Error('CEP deve conter 8 dígitos.');
  }

  const pkg = calculateCartPackage(items);

  // 1. Tentar chamada à API do backend
  try {
    const payloadItems = items.map(item => ({
      productId: item.id,
      name: item.name,
      weightGrams: item.weight_grams || 250,
      qty: item.qty,
      price: item.price
    }));

    const res = await fetch('/api/shipping/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        postalCode: cleanZip,
        items: payloadItems
      })
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (err) {
    // Se o backend não estiver respondendo na porta 3001, usar fallback calibrado
    console.info('Backend offline, usando estimativa calibrada para o Espírito Santo.');
  }

  // 2. Fallback calibrado para o ES / Brasil
  const isES = cleanZip.startsWith('29');
  const isGrandeVitoria = cleanZip.startsWith('290') || cleanZip.startsWith('291');
  const weightMultiplier = Math.max(1, pkg.weightKg * 1.3);

  let basePac = isGrandeVitoria ? 11.50 : isES ? 16.90 : 24.50;
  let baseSedex = isGrandeVitoria ? 15.90 : isES ? 23.50 : 42.00;
  let baseJadlog = isGrandeVitoria ? 12.80 : isES ? 18.40 : 26.90;

  const quotes: ShippingQuote[] = [
    {
      id: 'pickup_store',
      name: 'Retirada na Loja (Jardim Camburi - Vitória)',
      company: {
        id: 0,
        name: 'Pedra Mania',
        picture: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=100'
      },
      price: 0.00,
      custom_price: 0.00,
      discount: 0,
      currency: 'R$',
      delivery_time: 1,
      package: {
        tierName: pkg.tierName,
        dimensions: `${pkg.length}x${pkg.width}x${pkg.height}cm`,
        totalWeightGrams: pkg.totalWeightGrams
      }
    },
    {
      id: 1,
      name: 'PAC (Correios)',
      company: {
        id: 1,
        name: 'Correios',
        picture: 'https://sandbox.melhorenvio.com.br/images/shipping-companies/correios.png'
      },
      price: parseFloat((basePac * weightMultiplier).toFixed(2)),
      custom_price: parseFloat((basePac * weightMultiplier).toFixed(2)),
      discount: 0,
      currency: 'R$',
      delivery_time: isGrandeVitoria ? 2 : isES ? 4 : 7,
      package: {
        tierName: pkg.tierName,
        dimensions: `${pkg.length}x${pkg.width}x${pkg.height}cm`,
        totalWeightGrams: pkg.totalWeightGrams
      }
    },
    {
      id: 2,
      name: 'SEDEX (Correios)',
      company: {
        id: 1,
        name: 'Correios',
        picture: 'https://sandbox.melhorenvio.com.br/images/shipping-companies/correios.png'
      },
      price: parseFloat((baseSedex * weightMultiplier).toFixed(2)),
      custom_price: parseFloat((baseSedex * weightMultiplier).toFixed(2)),
      discount: 0,
      currency: 'R$',
      delivery_time: isGrandeVitoria ? 1 : isES ? 2 : 3,
      package: {
        tierName: pkg.tierName,
        dimensions: `${pkg.length}x${pkg.width}x${pkg.height}cm`,
        totalWeightGrams: pkg.totalWeightGrams
      }
    },
    {
      id: 3,
      name: '.Package (Jadlog)',
      company: {
        id: 2,
        name: 'Jadlog',
        picture: 'https://sandbox.melhorenvio.com.br/images/shipping-companies/jadlog.png'
      },
      price: parseFloat((baseJadlog * weightMultiplier).toFixed(2)),
      custom_price: parseFloat((baseJadlog * weightMultiplier).toFixed(2)),
      discount: 0,
      currency: 'R$',
      delivery_time: isGrandeVitoria ? 2 : isES ? 3 : 6,
      package: {
        tierName: pkg.tierName,
        dimensions: `${pkg.length}x${pkg.width}x${pkg.height}cm`,
        totalWeightGrams: pkg.totalWeightGrams
      }
    }
  ];

  return {
    originZip: '29090460',
    destinationZip: cleanZip,
    package: pkg,
    quotes,
    isPickupAvailable: true,
    storeAddress: {
      street: 'Rua Paschoal Delmaestro, 401',
      district: 'Jardim Camburi',
      city: 'Vitória',
      state: 'ES',
      zip: '29090-460'
    }
  };
}
