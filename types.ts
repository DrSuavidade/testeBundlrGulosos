export type Category = string; // slug da categoria, ex: 'linhas-fios'

export interface StoreCategory {
  id: string;   // slug único, ex: 'linhas-fios'
  name: string; // nome visível, ex: 'Linhas & Fios'
  color: string; // cor do gradiente, ex: '#2563EB'
  image: string; // URL da imagem de fundo do card
}

export interface ProductColor {
  name: string;  // Ex: "Vermelho", "Azul Royal", "Natural"
  hex: string;   // Ex: "#E63946"
  image: string; // URL da imagem para esta cor específica
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  colors?: ProductColor[]; // Opcional — cores disponíveis, cada uma com imagem própria
  weight?: string;       // Ex: "160g", "350g", "700g", "1,8kg"
  weight_grams?: number; // Peso numérico em gramas para a calculadora de frete
  height_cm?: number;
  width_cm?: number;
  length_cm?: number;
  composition?: string;  // Ex: "100% Algodão Mercerizado", "Aço Carbono"
  tags: string[];
  category: Category;
  allergens: string[]; // Especificações / características dos materiais
  active: boolean;
  featured: boolean;
}

export interface InstaPost {
  id: string;
  title: string;
  description?: string;
  url: string; // Link real do post ou reels no Instagram
  tag?: string; // Ex: "Novidade", "Dica", "Reels", "Encontro"
}

export interface CartItem extends Product {
  qty: number;
  selectedColor?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  rating: number; // 1-5
  quote: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
}

export type OrderStatus = 'new' | 'preparing' | 'ready' | 'delivered';

export interface OrderItemDetail {
  product_id: string;
  product_name: string;
  product_image: string;
  selected_color?: string;
  qty: number;
  price?: number;
  unit_price?: number;
}

// 📦 TIPOS DA CALCULADORA DE FRETE (MELHOR ENVIO & PEDRA MANIA)
export interface PackageTier {
  tierNumber: 1 | 2 | 3 | 4;
  tierName: string;
  height: number;
  width: number;
  length: number;
  weightKg: number;
  totalWeightGrams: number;
}

export interface ShippingQuote {
  id: number | string;
  name: string; // Ex: 'SEDEX', 'PAC', '.Package', 'Retirada na Loja'
  company: {
    id: number;
    name: string; // 'Correios', 'Jadlog', 'Pedra Mania'
    picture: string;
  };
  price: number;
  custom_price: number;
  discount: number;
  currency: string;
  delivery_time: number; // Dias úteis
  package: {
    tierName: string;
    dimensions: string;
    totalWeightGrams: number;
  };
  error?: string;
}

export interface ShippingCalculationResponse {
  originZip: string;
  destinationZip: string;
  package: PackageTier;
  quotes: ShippingQuote[];
  isPickupAvailable: boolean;
  storeAddress: {
    street: string;
    district: string;
    city: string;
    state: string;
    zip: string;
  };
}

export interface StoredOrder {
  id: string;
  customer_name: string;
  email: string;
  phone: string;
  fulfillment_type: 'pickup' | 'delivery';
  address_zip?: string;
  address_street?: string;
  address_number?: string;
  address_complement?: string;
  address_district?: string;
  address_city?: string;
  address_state?: string;
  address: string; // Endereço formatado
  scheduled_date: string;
  notes?: string;
  subtotal: number;
  shipping_cost: number;
  total: number;
  shipping_service_id?: number | string;
  shipping_service_name?: string;
  shipping_carrier?: string;
  shipping_delivery_time?: number;
  package_tier?: string;
  status: OrderStatus;
  tracking_code?: string;
  label_url?: string;
  shipping_cost_real?: number;
  payment_method?: string;
  mp_transaction_id?: string;
  created_at: string;
  items: OrderItemDetail[];
}

export interface OrderInput {
  customer_name: string;
  email: string;
  phone: string;
  fulfillment_type: 'pickup' | 'delivery';
  address_zip?: string;
  address_street?: string;
  address_number?: string;
  address_complement?: string;
  address_district?: string;
  address_city?: string;
  address_state?: string;
  address?: string;
  scheduled_date: string;
  notes?: string;
  shipping_cost?: number;
  shipping_service_id?: number | string;
  shipping_service_name?: string;
  shipping_carrier?: string;
  shipping_delivery_time?: number;
  package_tier?: string;
  payment_method?: string;
  items: { product_id: string; qty: number; selected_color?: string }[];
}

export interface OrderResult {
  id: string;
  total: number;
  status: OrderStatus;
}

// 🎁 TIPOS DE KITS & COMBOS PROMOCIONAIS
export interface KitItem {
  id?: number;
  product_id: string;
  product_name: string;
  product_image?: string;
  product_price: number;
  product_stock: number;
  qty: number;
  selected_color?: string;
}

export interface Kit {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number; // Preço promocional do Kit
  badge_text: string; // Ex: '🔥 Mais Vendido', 'Combo Crochê', 'Iniciante'
  banner_image?: string;
  active: boolean;
  featured: boolean;
  items: KitItem[];
  original_price: number; // Soma dos preços dos produtos individuais
  discount_amount: number; // Valor economizado
  discount_percentage: number; // Ex: 20 (% OFF)
  available_stock: number; // Calculado pelo menor estoque dos itens
  created_at?: string;
  updated_at?: string;
}

export interface KitInput {
  name: string;
  slug?: string;
  description?: string;
  price: number;
  badge_text?: string;
  banner_image?: string;
  active?: boolean;
  featured?: boolean;
  items: {
    product_id: string;
    qty: number;
    selected_color?: string;
  }[];
}
