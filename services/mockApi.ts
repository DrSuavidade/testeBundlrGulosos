import { Product, StoreCategory, Testimonial, Event, OrderInput, OrderResult, InstaPost, StoredOrder, OrderStatus, Kit, KitInput } from '../types';

const INITIAL_CATEGORIES: StoreCategory[] = [
  { id: 'linhas-fios',       name: 'Linhas & Fios',         color: '#2563EB', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=500&auto=format&fit=crop' },
  { id: 'bijuterias-pecas',  name: 'Miçangas & Bijuterias', color: '#7C3AED', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=500&auto=format&fit=crop' },
  { id: 'decor-ferramentas', name: 'Ferramentas & Decor',   color: '#D97706', image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=500&auto=format&fit=crop' },
  { id: 'materias-primas',   name: 'Matérias-primas',       color: '#059669', image: 'https://images.unsplash.com/photo-1611591475285-a29ae2ea1c5c?q=80&w=500&auto=format&fit=crop' },
  { id: 'kits',              name: 'Kits & Achadinhos',     color: '#DB2777', image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=500&auto=format&fit=crop' },
];

const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Kit Amigurumi Ursinho Crochê',
    slug: 'kit-amigurumi-ursinho',
    description: 'Kit completo com 3 novelos de fio 100% algodão mercerizado, agulha de crochê emborrachada, olhos de segurança com trava, fibra de enchimento e receita impressa passo a passo.',
    price: 48.90,
    stock: 15,
    images: ['https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=800&auto=format&fit=crop'],
    colors: [
      { name: 'Bege Natural', hex: '#D4B896', image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=800&auto=format&fit=crop' },
      { name: 'Rosa Pastel', hex: '#F4A8B8', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop' },
      { name: 'Azul Bebê', hex: '#93C5FD', image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=800&auto=format&fit=crop' },
    ],
    weight: '250g',
    weight_grams: 250,
    composition: '100% Algodão Mercerizado',
    tags: ['Mais Vendido', 'Kit Completo'],
    category: 'kits',
    allergens: ['100% Algodão Mercerizado', 'Acompanha Receita Passo a Passo', 'Olhos com Trava de Segurança'],
    active: true,
    featured: true,
  },
  {
    id: '2',
    name: 'Novelo Fio de Algodão Supremo (160g)',
    slug: 'novelo-algodao-supremo',
    description: 'O queridinho das artesãs do Espírito Santo! Fio super macio e resistente, ideal para kits de crochê, tricot, amigurumi e peças de vestuário.',
    price: 16.50,
    stock: 45,
    images: ['https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop'],
    colors: [
      { name: 'Branco Puro',  hex: '#F8F8F8', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop' },
      { name: 'Azul Royal',   hex: '#2563EB', image: 'https://images.unsplash.com/photo-1579389083395-4507e98b5e67?q=80&w=800&auto=format&fit=crop' },
      { name: 'Verde Menta',  hex: '#6EE7B7', image: 'https://images.unsplash.com/photo-1560707303-4e980ce876ad?q=80&w=800&auto=format&fit=crop' },
      { name: 'Amarelo Sol',  hex: '#FCD34D', image: 'https://images.unsplash.com/photo-1598532213919-078e54dd1f40?q=80&w=800&auto=format&fit=crop' },
      { name: 'Lilás',        hex: '#C4B5FD', image: 'https://images.unsplash.com/photo-1550159930-40066082a4fc?q=80&w=800&auto=format&fit=crop' },
    ],
    weight: '160g',
    weight_grams: 160,
    composition: '100% Algodão Mercerizado — Tex 394',
    tags: ['Campeão de Vendas', 'Cores Pastéis'],
    category: 'linhas-fios',
    allergens: ['160g / aprox. 320 Metros', 'Tex 394', 'Agulha Recomendada: 2.5mm a 3.5mm'],
    active: true,
    featured: true,
  },
  {
    id: '3',
    name: 'Kit Pulseira de Miçangas & Pérolas DIY (350g)',
    slug: 'kit-pulseiras-micangas',
    description: 'Caixa organizadora completa com mais de 1200 peças: miçangas em tons pastel, pérolas de vidro, pingentes fofos e 2 rolos de fio elástico de silicone.',
    price: 55.00,
    stock: 20,
    images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop'],
    colors: [
      { name: 'Tons Pastéis', hex: '#FBCFE8', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop' },
      { name: 'Multicolor',   hex: '#F59E0B', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop' },
      { name: 'Azul & Prata', hex: '#7DD3FC', image: 'https://images.unsplash.com/photo-1611591475285-a29ae2ea1c5c?q=80&w=800&auto=format&fit=crop' },
    ],
    weight: '350g',
    weight_grams: 350,
    tags: ['Destaque da Semana', 'Criatividade'],
    category: 'kits',
    allergens: ['Livre de Níquel', 'Resistente à Água', 'Fio Elástico Silicone 0.8mm'],
    active: true,
    featured: true,
  },
  {
    id: '4',
    name: 'Kit Vestido & Top de Tricô de Verão (700g)',
    slug: 'kit-vestido-trico-verao',
    description: 'Kit de alta costura artesanal. Contém 5 novelos de fio de algodão penteado em tons de azul pastel, gráfico exclusivo Pedra Mania e agulha circular de bambu.',
    price: 119.90,
    stock: 8,
    images: ['https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop'],
    colors: [
      { name: 'Azul Pastel',   hex: '#93C5FD', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop' },
      { name: 'Areia',         hex: '#D4B896', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop' },
      { name: 'Branco Off',    hex: '#FAF9F6', image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800&auto=format&fit=crop' },
    ],
    weight: '700g',
    weight_grams: 700,
    tags: ['Edição Especial', 'Moda Artesanal'],
    category: 'kits',
    allergens: ['Algodão Penteado Premium', 'Gráfico Exclusivo Pedra Mania', 'Nível Intermediário'],
    active: true,
    featured: true,
  },
  {
    id: '5',
    name: 'Maleta de Pedras Naturais & Miçangas Sortidas (700g)',
    slug: 'maleta-pedras-naturais',
    description: 'Seleção premium de pedras brasileiras autenticadas, miçangas facetadas e contas para confecção de bijuterias refinadas e exclusivas.',
    price: 89.00,
    stock: 12,
    images: ['https://images.unsplash.com/photo-1611591475285-a29ae2ea1c5c?q=80&w=800&auto=format&fit=crop'],
    colors: [
      { name: 'Sortido',         hex: '#A78BFA', image: 'https://images.unsplash.com/photo-1611591475285-a29ae2ea1c5c?q=80&w=800&auto=format&fit=crop' },
      { name: 'Pedras Negras',   hex: '#374151', image: 'https://images.unsplash.com/photo-1600703093977-9e85ca22dc71?q=80&w=800&auto=format&fit=crop' },
      { name: 'Quartzo Rosa',    hex: '#F9A8D4', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop' },
    ],
    weight: '700g',
    weight_grams: 700,
    tags: ['Coleção Pedra Mania', 'Qualidade'],
    category: 'materias-primas',
    allergens: ['Pedras Naturais Autênticas', 'Maleta com 24 Divisórias', 'Brilho Intenso'],
    active: true,
    featured: false,
  },
  {
    id: '6',
    name: 'Fio de Malha Premium para Cestos & Decor (1,8kg)',
    slug: 'fio-de-malha-premium',
    description: 'Fio ecológico sem emendas e espessura regular. Perfeito para confeccionar cestos organizadores, tapetes e peças de decoração moderna.',
    price: 49.90,
    stock: 30,
    images: ['https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop'],
    colors: [
      { name: 'Cru Natural',   hex: '#E7DCC8', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop' },
      { name: 'Cinza Chumbo', hex: '#6B7280', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800&auto=format&fit=crop' },
      { name: 'Verde Oliva',  hex: '#65A30D', image: 'https://images.unsplash.com/photo-1560707303-4e980ce876ad?q=80&w=800&auto=format&fit=crop' },
      { name: 'Terracota',    hex: '#C2410C', image: 'https://images.unsplash.com/photo-1598532213919-078e54dd1f40?q=80&w=800&auto=format&fit=crop' },
    ],
    weight: '1,8kg',
    weight_grams: 1800,
    tags: ['Ecológico', 'Decor', 'Linha Pesada'],
    category: 'linhas-fios',
    allergens: ['1,8kg / aprox. 480m', 'Sem Emendas', 'Espessura Uniforme 25mm'],
    active: true,
    featured: true,
  },
  {
    id: '7',
    name: 'Kit Alicates de Precisão para Bijuterias (3 Pçs)',
    slug: 'kit-alicates-bijuteria',
    description: 'Trio essencial com alicate de ponta meia-cana, corte diagonal e ponta redonda para dobrar, cortar arames e criar elos perfeitos.',
    price: 42.00,
    stock: 18,
    images: ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop'],
    weight: '350g',
    weight_grams: 350,
    tags: ['Profissional', 'Indispensável'],
    category: 'decor-ferramentas',
    allergens: ['Aço Carbono Temperado', 'Cabo Emborrachado Antiderrapante', 'Mola Retrátil'],
    active: true,
    featured: false,
  },
  {
    id: '8',
    name: 'Kit Argolas & Fechos Folheados (150 Pçs)',
    slug: 'kit-argolas-fechos',
    description: 'Conjunto de insumos banhados com camada de verniz de proteção para montagem de colares, pulseiras e brincos com padrão de joalharia.',
    price: 34.50,
    stock: 50,
    images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop'],
    colors: [
      { name: 'Dourado',     hex: '#D97706', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop' },
      { name: 'Prateado',    hex: '#9CA3AF', image: 'https://images.unsplash.com/photo-1611591475285-a29ae2ea1c5c?q=80&w=800&auto=format&fit=crop' },
      { name: 'Rosé Gold',   hex: '#E8A598', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop' },
    ],
    weight: '160g',
    weight_grams: 160,
    tags: ['Qualidade Premium', 'Antialérgico'],
    category: 'bijuterias-pecas',
    allergens: ['Verniz de Proteção Duplo', 'Antialérgico (Sem Níquel)', 'Garantia de Brilho'],
    active: true,
    featured: true,
  },
  {
    id: '9',
    name: 'Cordão Acetinado / Fio de Seda (Rolo 50m)',
    slug: 'cordao-acetinado-seda',
    description: 'Fio de seda sintética acetinada super macia de 1mm, ideal para macramé delicado, pulseiras com nós e fechos ajustáveis.',
    price: 19.90,
    stock: 25,
    images: ['https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop'],
    colors: [
      { name: 'Azul Pastel',  hex: '#93C5FD', image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop' },
      { name: 'Preto',        hex: '#111827', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop' },
      { name: 'Vermelho',     hex: '#DC2626', image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=800&auto=format&fit=crop' },
      { name: 'Caramelo',     hex: '#D97706', image: 'https://images.unsplash.com/photo-1598532213919-078e54dd1f40?q=80&w=800&auto=format&fit=crop' },
    ],
    weight: '160g',
    weight_grams: 160,
    tags: ['Toque de Seda', 'Azul Pastel'],
    category: 'linhas-fios',
    allergens: ['Espessura 1mm', 'Rolo de 50 Metros', 'Resistência ao Desbotamento'],
    active: true,
    featured: false,
  },
  {
    id: '10',
    name: 'Kit Agulhas de Crochê Soft Touch (9 Tamanhos)',
    slug: 'kit-agulhas-croche-soft',
    description: 'Kit completo com tamanhos de 2.0mm a 6.0mm. Cabos anatômicos emborrachados que proporcionam conforto total em longas sessões de artesanato.',
    price: 69.90,
    stock: 14,
    images: ['https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=800&auto=format&fit=crop'],
    weight: '350g',
    weight_grams: 350,
    tags: ['Ergonômico', 'Com Estojo'],
    category: 'decor-ferramentas',
    allergens: ['Ponta de Alumínio Polido', 'Cabo Ergonômico Antialérgico', 'Acompanha Estojo Estampado'],
    active: true,
    featured: false,
  }
];

const INITIAL_INSTA_POSTS: InstaPost[] = [
  {
    id: '1',
    title: 'Novas Cores de Linhas de Algodão para Amigurumi',
    description: 'Confira no reels o unboxing com as novas tonalidades pastel e fios mercerizados que acabaram de chegar na loja!',
    url: 'https://www.instagram.com/pedramaniaoficial/',
    tag: 'Novidades'
  },
  {
    id: '2',
    title: 'Dica Rápida: Como Escolher a Agulha Ergonômica Ideal',
    description: 'Vídeo rápido mostrando a numeração certa de agulhas para cada espessura de linha sem cansar as mãos.',
    url: 'https://www.instagram.com/pedramaniaoficial/',
    tag: 'Dica da Semana'
  },
  {
    id: '3',
    title: 'Bastidores do Encontro de Artesãs em Vitória / ES',
    description: 'Veja como foi nossa última oficina de artesanato presencial no armarinho de Jardim Camburi!',
    url: 'https://www.instagram.com/pedramaniaoficial/',
    tag: 'Comunidade'
  }
];

const INITIAL_ORDERS: StoredOrder[] = [
  {
    id: 'PM-89A12',
    customer_name: 'Carolina Neves',
    email: 'carolina.neves@email.com',
    phone: '5527998124455',
    fulfillment_type: 'delivery',
    address_zip: '29055-270',
    address: 'Rua das Palmeiras, 120 - Praia do Canto, Vitória - ES, CEP: 29055-270',
    scheduled_date: '2026-08-12',
    notes: 'Favor embalar os novelos de algodão nas cores azul pastel separadamente para presente. Obrigada!',
    subtotal: 151.80,
    shipping_cost: 14.50,
    total: 166.30,
    shipping_service_name: 'SEDEX (Correios)',
    shipping_carrier: 'Correios',
    package_tier: 'Saco 2 Médio (26x33cm)',
    status: 'preparing',
    created_at: '2026-08-10T14:20:00.000Z',
    items: [
      {
        product_id: '1',
        product_name: 'Kit Amigurumi Ursinho Crochê',
        product_image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=800&auto=format&fit=crop',
        qty: 1,
        price: 48.90
      },
      {
        product_id: '2',
        product_name: 'Novelo Fio de Algodão Supremo (160g)',
        product_image: 'https://images.unsplash.com/photo-1608248597260-6f216e589959?q=80&w=800&auto=format&fit=crop',
        qty: 2,
        price: 16.50
      },
      {
        product_id: '10',
        product_name: 'Kit Agulhas de Crochê Soft Touch (9 Tamanhos)',
        product_image: 'https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=800&auto=format&fit=crop',
        qty: 1,
        price: 69.90
      }
    ]
  }
];

const TESTIMONIALS: Testimonial[] = [
  { id: '1', name: 'Juliana Medeiros', city: 'Vitória - ES', rating: 5, quote: 'Os kits de algodão para crochê da Pedra Mania são incríveis! Os fios são super macios e a entrega em Vitória foi rápida demais.' },
  { id: '2', name: 'Patrícia Alencar', city: 'Vila Velha - ES', rating: 5, quote: 'Participei do encontro de artesãs e me apaixonei! O armarinho tem tudo o que precisamos para bijuterias e tricô.' },
  { id: '3', name: 'Camila Fernandes', city: 'Serra - ES', rating: 5, quote: 'Comprei o kit de amigurumi de presente para minha mãe. A receita é super detalhada e as pedras e miçangas têm excelente qualidade.' },
];

const EVENTS: Event[] = [
  { id: '1', title: 'Encontro de Crochê & Tricô no ES', date: '2026-08-25', location: 'Espaço Pedra Mania - Vitória/ES', description: 'Traga suas agulhas! Tarde de trocas de pontos, café e amostras grátis de fios de algodão.' },
  { id: '2', title: 'Oficina de Montagem de Bijuterias & Pedras', date: '2026-09-02', location: 'Loja Pedra Mania - Vila Velha/ES', description: 'Aprenda técnicas de acabamento com alicates e pedras naturais com nossas especialistas.' },
];

// Helper for localStorage persistence
const STORAGE_KEYS = {
  PRODUCTS: 'pedramania_products_v8',
  INSTA_POSTS: 'pedramania_insta_posts_v8',
  ORDERS: 'pedramania_orders_v8',
  CATEGORIES: 'pedramania_categories_v8',
};

const getStoredData = <T>(key: string, fallback: T): T => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (e) {
    return fallback;
  }
};

const saveStoredData = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save data to localStorage', e);
  }
};

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // CATEGORIES
  getCategories: async (): Promise<StoreCategory[]> => {
    try {
      const res = await fetch('/api/categories');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          saveStoredData(STORAGE_KEYS.CATEGORIES, data);
          return data;
        }
      }
    } catch (e) {
      // Offline fallback
    }
    return getStoredData<StoreCategory[]>(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
  },

  addCategory: async (data: Omit<StoreCategory, 'id'>): Promise<StoreCategory> => {
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {}

    const cats = getStoredData<StoreCategory[]>(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
    const newCat: StoreCategory = {
      ...data,
      id: data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    };
    saveStoredData(STORAGE_KEYS.CATEGORIES, [...cats, newCat]);
    return newCat;
  },

  updateCategory: async (id: string, updates: Partial<StoreCategory>): Promise<StoreCategory> => {
    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {}

    const cats = getStoredData<StoreCategory[]>(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
    let updated: StoreCategory | null = null;
    const next = cats.map(c => { if (c.id === id) { updated = { ...c, ...updates }; return updated; } return c; });
    saveStoredData(STORAGE_KEYS.CATEGORIES, next);
    if (!updated) throw new Error('Categoria não encontrada');
    return updated;
  },

  deleteCategory: async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
      if (res.ok) return true;
    } catch {}

    const cats = getStoredData<StoreCategory[]>(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
    saveStoredData(STORAGE_KEYS.CATEGORIES, cats.filter(c => c.id !== id));
    return true;
  },

  // PRODUCTS & STOCK
  getProducts: async (): Promise<Product[]> => {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          saveStoredData(STORAGE_KEYS.PRODUCTS, data);
          return data;
        }
      }
    } catch (e) {}
    return getStoredData<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  },

  getFeaturedProducts: async (): Promise<Product[]> => {
    try {
      const prods = await api.getProducts();
      return prods.filter(p => p.featured && p.active);
    } catch {
      const products = getStoredData<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
      return products.filter(p => p.featured && p.active);
    }
  },

  addProduct: async (productData: Omit<Product, 'id'>): Promise<Product> => {
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {}

    const products = getStoredData<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    const newProduct: Product = {
      ...productData,
      id: Math.random().toString(36).substring(2, 9)
    };
    const updated = [newProduct, ...products];
    saveStoredData(STORAGE_KEYS.PRODUCTS, updated);
    return newProduct;
  },

  updateProduct: async (id: string, updates: Partial<Product>): Promise<Product> => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {}

    const products = getStoredData<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    let updatedProduct: Product | null = null;
    const updated = products.map(p => {
      if (p.id === id) {
        updatedProduct = { ...p, ...updates };
        return updatedProduct;
      }
      return p;
    });
    saveStoredData(STORAGE_KEYS.PRODUCTS, updated);
    if (!updatedProduct) throw new Error('Produto não encontrado');
    return updatedProduct;
  },

  deleteProduct: async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) return true;
    } catch {}

    const products = getStoredData<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    const updated = products.filter(p => p.id !== id);
    saveStoredData(STORAGE_KEYS.PRODUCTS, updated);
    return true;
  },

  // INSTAGRAM POSTS
  getInstaPosts: async (): Promise<InstaPost[]> => {
    return getStoredData<InstaPost[]>(STORAGE_KEYS.INSTA_POSTS, INITIAL_INSTA_POSTS);
  },

  addInstaPost: async (postData: Omit<InstaPost, 'id'>): Promise<InstaPost> => {
    const posts = getStoredData<InstaPost[]>(STORAGE_KEYS.INSTA_POSTS, INITIAL_INSTA_POSTS);
    const newPost: InstaPost = {
      ...postData,
      id: Math.random().toString(36).substring(2, 9)
    };
    const updated = [newPost, ...posts];
    saveStoredData(STORAGE_KEYS.INSTA_POSTS, updated);
    return newPost;
  },

  updateInstaPost: async (id: string, updates: Partial<InstaPost>): Promise<InstaPost> => {
    const posts = getStoredData<InstaPost[]>(STORAGE_KEYS.INSTA_POSTS, INITIAL_INSTA_POSTS);
    let updatedPost: InstaPost | null = null;
    const updated = posts.map(p => {
      if (p.id === id) {
        updatedPost = { ...p, ...updates };
        return updatedPost;
      }
      return p;
    });
    saveStoredData(STORAGE_KEYS.INSTA_POSTS, updated);
    if (!updatedPost) throw new Error('Post não encontrado');
    return updatedPost;
  },

  deleteInstaPost: async (id: string): Promise<boolean> => {
    const posts = getStoredData<InstaPost[]>(STORAGE_KEYS.INSTA_POSTS, INITIAL_INSTA_POSTS);
    saveStoredData(STORAGE_KEYS.INSTA_POSTS, posts.filter(p => p.id !== id));
    return true;
  },

  // TESTIMONIALS & EVENTS
  getTestimonials: async (): Promise<Testimonial[]> => {
    await delay(200);
    return TESTIMONIALS;
  },

  getEvents: async (): Promise<Event[]> => {
    await delay(200);
    return EVENTS;
  },

  // ORDERS & STOCK DECREMENT
  getOrders: async (): Promise<StoredOrder[]> => {
    try {
      const res = await fetch('/api/orders', {
        headers: { Authorization: 'Bearer pedramania_admin_secret_token_2026' }
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          saveStoredData(STORAGE_KEYS.ORDERS, data);
          return data;
        }
      }
    } catch {}
    return getStoredData<StoredOrder[]>(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
  },

  updateOrderStatus: async (id: string, status: OrderStatus): Promise<StoredOrder> => {
    try {
      const res = await fetch(`/api/orders/${id}/status`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: 'Bearer pedramania_admin_secret_token_2026'
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {}

    const orders = getStoredData<StoredOrder[]>(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
    let updatedOrder: StoredOrder | null = null;
    const updated = orders.map(o => {
      if (o.id === id) {
        updatedOrder = { ...o, status };
        return updatedOrder;
      }
      return o;
    });
    saveStoredData(STORAGE_KEYS.ORDERS, updated);
    if (!updatedOrder) throw new Error('Pedido não encontrado');
    return updatedOrder;
  },

  generateOrderLabel: async (id: string): Promise<StoredOrder> => {
    try {
      const res = await fetch(`/api/orders/${id}/generate-label`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: 'Bearer pedramania_admin_secret_token_2026'
        }
      });
      if (res.ok) {
        const updated = await res.json();
        // Atualizar cache local
        const orders = getStoredData<StoredOrder[]>(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
        saveStoredData(STORAGE_KEYS.ORDERS, orders.map(o => o.id === id ? updated : o));
        return updated;
      }
    } catch {}

    // Fallback local se backend offline
    const orders = getStoredData<StoredOrder[]>(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
    let updatedOrder: StoredOrder | null = null;
    const tracking = `PM${Math.floor(100000000 + Math.random() * 900000000)}BR`;
    const labelUrl = `https://sandbox.melhorenvio.com.br/painel/carrinho?order=${id}`;
    const updated = orders.map(o => {
      if (o.id === id) {
        updatedOrder = { ...o, tracking_code: tracking, label_url: labelUrl };
        return updatedOrder;
      }
      return o;
    });
    saveStoredData(STORAGE_KEYS.ORDERS, updated);
    if (!updatedOrder) throw new Error('Pedido não encontrado');
    return updatedOrder;
  },

  createOrder: async (input: OrderInput): Promise<OrderResult> => {
    // 1. Tentar enviar para a API central (PostgreSQL + Email)
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
      });

      if (res.ok) {
        const orderData = await res.json();
        // Sincronizar cache local
        const existingOrders = getStoredData<StoredOrder[]>(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
        saveStoredData(STORAGE_KEYS.ORDERS, [orderData, ...existingOrders]);
        
        return {
          id: orderData.id,
          total: parseFloat(orderData.total),
          status: orderData.status || 'new'
        };
      }
    } catch (apiErr) {
      console.warn('Backend PostgreSQL offline, gravando em cache local:', apiErr);
    }

    // 2. Fallback local offline
    const products = getStoredData<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    
    let subtotal = 0;
    const itemDetails = input.items.map(i => {
      const product = products.find(p => p.id === i.product_id);
      const price = product ? product.price : 0;
      subtotal += price * i.qty;
      return {
        product_id: i.product_id,
        product_name: product ? product.name : 'Produto',
        product_image: product?.images?.[0] || 'https://images.unsplash.com/photo-1608248597260-6f216e589959?q=80&w=800&auto=format&fit=crop',
        selected_color: i.selected_color,
        qty: i.qty,
        price
      };
    });

    // Decrement stock for ordered items
    const updatedProducts = products.map(p => {
      const item = input.items.find(i => i.product_id === p.id);
      if (item) {
        return {
          ...p,
          stock: Math.max(0, p.stock - item.qty)
        };
      }
      return p;
    });
    saveStoredData(STORAGE_KEYS.PRODUCTS, updatedProducts);

    const shippingCost = input.shipping_cost || 0;
    const total = subtotal + shippingCost;
    const orderId = 'PM-' + Math.random().toString(36).substring(2, 8).toUpperCase();

    const newOrder: StoredOrder = {
      id: orderId,
      customer_name: input.customer_name,
      email: input.email,
      phone: input.phone,
      fulfillment_type: input.fulfillment_type,
      address_zip: input.address_zip,
      address_street: input.address_street,
      address_number: input.address_number,
      address_complement: input.address_complement,
      address_district: input.address_district,
      address_city: input.address_city,
      address_state: input.address_state,
      address: input.address || 'Vitória / ES',
      scheduled_date: input.scheduled_date,
      notes: input.notes,
      subtotal,
      shipping_cost: shippingCost,
      total,
      shipping_service_id: input.shipping_service_id,
      shipping_service_name: input.shipping_service_name,
      shipping_carrier: input.shipping_carrier,
      shipping_delivery_time: input.shipping_delivery_time,
      package_tier: input.package_tier,
      status: 'new',
      created_at: new Date().toISOString(),
      items: itemDetails
    };

    const existingOrders = getStoredData<StoredOrder[]>(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
    saveStoredData(STORAGE_KEYS.ORDERS, [newOrder, ...existingOrders]);

    return {
      id: orderId,
      total,
      status: 'new'
    };
  },

  // 🎁 KITS & COMBOS PROMOCIONAIS
  getKits: async (activeOnly = false): Promise<Kit[]> => {
    try {
      const res = await fetch(`/api/kits${activeOnly ? '?active=true' : ''}`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          return data;
        }
      }
    } catch {}
    return [];
  },

  addKit: async (data: KitInput): Promise<Kit> => {
    const res = await fetch('/api/kits', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: 'Bearer pedramania_admin_secret_token_2026'
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Erro ao criar kit');
    }
    return await res.json();
  },

  updateKit: async (id: string, updates: Partial<KitInput>): Promise<Kit> => {
    const res = await fetch(`/api/kits/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: 'Bearer pedramania_admin_secret_token_2026'
      },
      body: JSON.stringify(updates)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Erro ao atualizar kit');
    }
    return await res.json();
  },

  deleteKit: async (id: string): Promise<boolean> => {
    const res = await fetch(`/api/kits/${id}`, {
      method: 'DELETE',
      headers: { Authorization: 'Bearer pedramania_admin_secret_token_2026' }
    });
    return res.ok;
  }
};
