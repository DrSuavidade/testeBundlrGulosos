export type Category = 'pães' | 'bolos' | 'doces' | 'salgados' | 'kits';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  tags: string[];
  category: Category;
  allergens: string[];
  active: boolean;
  featured: boolean;
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
  status: 'new' | 'confirmed';
}
