import { Product, Testimonial, Event, OrderInput, OrderResult } from '../types';

// Mock Data
const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Caixa de Cookies Sortidos',
    slug: 'cookies-sortidos',
    description: 'Uma seleção de 6 cookies artesanais: 2 chocolate belga, 2 red velvet e 2 macadâmia com chocolate branco. Crocantes por fora, macios por dentro.',
    price: 45.00,
    images: ['https://www.thehumblecookieshop.com/cdn/shop/files/20240229_102811.jpg?v=1709312546'],
    tags: ['Best Seller', 'Presente'],
    category: 'doces',
    allergens: ['Glúten', 'Lactose', 'Nozes'],
    active: true,
    featured: true,
  },
  {
    id: '2',
    name: 'Bolo Red Velvet Clássico',
    slug: 'red-velvet',
    description: 'Massa vermelha aveludada com recheio e cobertura generosa de cream cheese frosting. Perfeito para celebrações.',
    price: 120.00,
    images: ['https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?q=80&w=800&auto=format&fit=crop'],
    tags: ['Clássico', 'Festivo'],
    category: 'bolos',
    allergens: ['Glúten', 'Lactose', 'Ovos'],
    active: true,
    featured: true,
  },
  {
    id: '3',
    name: 'Croissant Amanteigado',
    slug: 'croissant-frances',
    description: 'Autêntico croissant francês, feito com manteiga importada. Laminação perfeita e sabor inigualável.',
    price: 12.50,
    images: ['https://images.rfm.pt/topo157513536_destaque_2col.jpg'],
    tags: ['Fresco', 'Café da Manhã'],
    category: 'pães',
    allergens: ['Glúten', 'Lactose'],
    active: true,
    featured: true,
  },
  {
    id: '4',
    name: 'Sourdough Rústico',
    slug: 'pao-sourdough',
    description: 'Pão de fermentação natural (levain) com casca crocante e miolo aerado. Fermentação de 48 horas.',
    price: 25.00,
    images: ['https://nickskitchen.com/wp-content/uploads/2025/08/NK_Bread-and-Butter_1-scaled.jpg'],
    tags: ['Sem Açúcar', 'Vegano'],
    category: 'pães',
    allergens: ['Glúten'],
    active: true,
    featured: false,
  },
  {
    id: '5',
    name: 'Cupcake de Limão Siciliano',
    slug: 'cupcake-limao',
    description: 'Massa fofinha de limão com recheio de lemon curd e cobertura de merengue maçaricado.',
    price: 14.00,
    images: ['https://images.unsplash.com/photo-1519869325930-281384150729?q=80&w=800&auto=format&fit=crop'],
    tags: ['Novidade', 'Cítrico'],
    category: 'doces',
    allergens: ['Glúten', 'Ovos'],
    active: true,
    featured: true,
  },
  {
    id: '6',
    name: 'Cesta de Café da Manhã',
    slug: 'cesta-cafe',
    description: 'O presente perfeito. Inclui pães, frios, geleia artesanal, suco natural e mini bolos.',
    price: 180.00,
    images: ['https://images.unsplash.com/photo-1551462147-37885acc36f1?q=80&w=800&auto=format&fit=crop'],
    tags: ['Kit', 'Para Compartilhar'],
    category: 'kits',
    allergens: ['Glúten', 'Lactose'],
    active: true,
    featured: true,
  },
  {
    id: '7',
    name: 'Baguette Francesa',
    slug: 'baguette',
    description: 'Tradicional baguette francesa, crocante e dourada. Ideal para sanduíches ou acompanhamento.',
    price: 10.00,
    images: ['https://images.unsplash.com/photo-1597079910443-60c43fc4f729?q=80&w=800&auto=format&fit=crop'],
    tags: ['Tradicional', 'Vegano'],
    category: 'pães',
    allergens: ['Glúten'],
    active: true,
    featured: false,
  },
  {
    id: '8',
    name: 'Empada de Frango com Queijo',
    slug: 'empada-frango',
    description: 'Massa podre que derrete na boca com recheio cremoso de frango desfiado e queijo.',
    price: 9.50,
    images: ['https://cdn0.tudoreceitas.com/pt/posts/7/8/1/empadinha_de_frango_cremosa_9187_600.jpg'],
    tags: ['Salgado', 'Lanche'],
    category: 'salgados',
    allergens: ['Glúten', 'Lactose', 'Ovos'],
    active: true,
    featured: true,
  },
  {
    id: '9',
    name: 'Bolo de Cenoura com Brigadeiro',
    slug: 'bolo-cenoura',
    description: 'O clássico brasileiro. Bolo fofinho de cenoura coberto com brigadeiro cremoso.',
    price: 65.00,
    images: ['https://www.daninoce.com.br/wp-content/uploads/2018/12/bolo-de-cenoura-com-brigadeiro-em-camadas-dani-noce-destaque-1.jpg'],
    tags: ['Nostalgia', 'Doce'],
    category: 'bolos',
    allergens: ['Glúten', 'Lactose', 'Ovos'],
    active: true,
    featured: false,
  },
  {
    id: '10',
    name: 'Quiche de Alho Poró',
    slug: 'quiche-alho',
    description: 'Torta salgada leve e saborosa, recheada com alho poró refogado e queijo gruyère.',
    price: 85.00,
    images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyAJ2MFKCZTZhB1XMrK_LQz0mtmS1uZVr7Vg&s'],
    tags: ['Vegetariano', 'Jantar'],
    category: 'salgados',
    allergens: ['Glúten', 'Lactose', 'Ovos'],
    active: true,
    featured: false,
  },
  {
    id: '11',
    name: 'Balde de Nutella',
    slug: 'balde-nutella',
    description: 'Delicioso balde com 3kg de Nutella para os amantes de avelã e chocolate. Perfeito para compartilhar ou se deliciar sozinho.',
    price: 42.00,
    images: ['https://down-br.img.susercontent.com/file/br-11134207-81z1k-meoltojbo4jka8_tn.webp'],
    tags: ['Doces', 'Bolos'],
    category: 'doces',
    allergens: ['Nozes', 'Lactose', 'Ovos'],
    active: true,
    featured: false,
  },
  {
    id: '12',
    name: 'Panela de Pressão',
    slug: 'panela-pressao',
    description: 'Panela de pressão de alta qualidade, ideal para cozinhar refeições rápidas e saborosas.',
    price: 120.00,
    images: ['https://www.silampos2.pt/fotos/produtos/pop_644122018740_1.jpg'],
    tags: ['Cozinha', 'Equipamentos'],
    category: 'kits',
    allergens: [],
    active: true,
    featured: false,
  }
];

const TESTIMONIALS: Testimonial[] = [
  { id: '1', name: 'Mariana S.', city: 'Coimbra', rating: 5, quote: 'O melhor red velvet que já comi na vida! A entrega foi super cuidadosa.' },
  { id: '2', name: 'Pedro A.', city: 'Lisboa', rating: 5, quote: 'Os pães chegaram quentes e duraram a semana toda. Recomendo!' },
  { id: '3', name: 'Carla Dias', city: 'Porto', rating: 4, quote: 'Encomendei para o aniversário da minha filha e foi um sucesso total.' },
];

const EVENTS: Event[] = [
  { id: '1', title: 'Workshop de Cupcakes', date: '2024-06-15', location: 'Loja Pinheiros', description: 'Aprenda a decorar cupcakes como um profissional.' },
  { id: '2', title: 'Degustação de Vinhos e Pães', date: '2024-06-22', location: 'Loja Jardins', description: 'Harmonização exclusiva para clientes.' },
];

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  getProducts: async (): Promise<Product[]> => {
    await delay(600);
    return PRODUCTS;
  },

  getFeaturedProducts: async (): Promise<Product[]> => {
    await delay(500);
    return PRODUCTS.filter(p => p.featured);
  },

  getTestimonials: async (): Promise<Testimonial[]> => {
    await delay(400);
    return TESTIMONIALS;
  },

  getEvents: async (): Promise<Event[]> => {
    await delay(400);
    return EVENTS;
  },

  createOrder: async (input: OrderInput): Promise<OrderResult> => {
    await delay(1500);
    // Simulate server-side calculation
    const total = input.items.reduce((acc, item) => {
      const product = PRODUCTS.find(p => p.id === item.product_id);
      return acc + (product ? product.price * item.qty : 0);
    }, 0);

    return {
      id: Math.random().toString(36).substring(7).toUpperCase(),
      total,
      status: 'new'
    };
  }
};
