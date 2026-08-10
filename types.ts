export type Category = 'linhas-fios' | 'kits' | 'bijuterias-pecas' | 'materias-primas' | 'decor-ferramentas';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  tags: string[];
  category: Category;
  allergens: string[]; // Especificações / características dos materiais (ex: Algodão 100%, Fio 4/6, etc)
  active: boolean;
  featured: boolean;
}

export interface InstaPost {
  id: string;
  title: string;
  image: string;
  likes: string;
  comments: string;
  tag: string;
}

export interface CartItem extends Product {
  qty: number;
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
  qty: number;
  price: number;
}

export interface StoredOrder {
  id: string;
  customer_name: string;
  email: string;
  phone: string;
  address: string;
  scheduled_date: string;
  notes?: string;
  total: number;
  status: OrderStatus;
  created_at: string;
  items: OrderItemDetail[];
}

export interface OrderInput {
  customer_name: string;
  email: string;
  phone: string;
  fulfillment_type: 'pickup' | 'delivery';
  address?: string;
  scheduled_date: string;
  notes?: string;
  items: { product_id: string; qty: number }[];
}

export interface OrderResult {
  id: string;
  total: number;
  status: OrderStatus;
}
