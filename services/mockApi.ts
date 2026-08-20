import { Product, StoreCategory, Testimonial, Event, OrderInput, OrderResult, InstaPost, StoredOrder, OrderStatus } from '../types';

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
    composition: '100% Algodão Mercerizado',
    tags: ['Mais Vendido', 'Kit Completo'],
    category: 'kits',
    allergens: ['100% Algodão Mercerizado', 'Acompanha Receita Passo a Passo', 'Olhos com Trava de Segurança'],
    active: true,
    featured: true,
  },
  {
    id: '2',
    name: 'Novelo Fio de Algodão Supremo (100g)',
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
    weight: '100g',
    composition: '100% Algodão Mercerizado — Tex 394',
    tags: ['Campeão de Vendas', 'Cores Pastéis'],
    category: 'linhas-fios',
    allergens: ['100g / 254 Metros', 'Tex 394', 'Agulha Recomendada: 2.5mm a 3.5mm'],
    active: true,
    featured: true,
  },
  {
    id: '3',
    name: 'Kit Pulseira de Miçangas & Pérolas DIY',
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
    tags: ['Destaque da Semana', 'Criatividade'],
    category: 'kits',
    allergens: ['Livre de Níquel', 'Resistente à Água', 'Fio Elástico Silicone 0.8mm'],
    active: true,
    featured: true,
  },
  {
    id: '4',
    name: 'Kit Vestido & Top de Tricô de Verão',
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
    tags: ['Edição Especial', 'Moda Artesanal'],
    category: 'kits',
    allergens: ['Algodão Penteado Premium', 'Gráfico Exclusivo Pedra Mania', 'Nível Intermediário'],
    active: true,
    featured: true,
  },
  {
    id: '5',
    name: 'Maleta de Pedras Naturais & Miçangas Sortidas',
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
    tags: ['Coleção Pedra Mania', 'Qualidade'],
    category: 'materias-primas',
    allergens: ['Pedras Naturais Autênticas', 'Maleta com 24 Divisórias', 'Brilho Intenso'],
    active: true,
    featured: false,
  },
  {
    id: '6',
    name: 'Fio de Malha Premium para Cestos & Decor (500g)',
    slug: 'fio-de-malha-premium',
    description: 'Fio ecológico sem emendas e espessura regular. Perfeito para confeccionar cestos organizadores, tapetes e peças de decoração moderna.',
    price: 29.90,
    stock: 30,
    images: ['https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop'],
    colors: [
      { name: 'Cru Natural',   hex: '#E7DCC8', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop' },
      { name: 'Cinza Chumbo', hex: '#6B7280', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800&auto=format&fit=crop' },
      { name: 'Verde Oliva',  hex: '#65A30D', image: 'https://images.unsplash.com/photo-1560707303-4e980ce876ad?q=80&w=800&auto=format&fit=crop' },
      { name: 'Terracota',    hex: '#C2410C', image: 'https://images.unsplash.com/photo-1598532213919-078e54dd1f40?q=80&w=800&auto=format&fit=crop' },
    ],
    tags: ['Ecológico', 'Decor'],
    category: 'linhas-fios',
    allergens: ['500g / aprox. 140m', 'Sem Emendas', 'Espessura Uniforme 25mm'],
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
    title: 'Passo a Passo: Como combinar fios de algodão pastel em kits de crochê 🧶✨',
    image: 'https://images.unsplash.com/photo-1608248597260-6f216e589959?q=80&w=800&auto=format&fit=crop',
    likes: '482',
    comments: '34',
    tag: 'TUTORIAL CROCHÊ'
  },
  {
    id: '2',
    title: 'Bastidores do nosso Encontro de Artesãs no Espírito Santo! 💙',
    image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=800&auto=format&fit=crop',
    likes: '891',
    comments: '67',
    tag: 'ENCONTRO ES'
  },
  {
    id: '3',
    title: 'Chegaram novas pedras naturais e miçangas para bijuterias exclusivas! 💎',
    image: 'https://images.unsplash.com/photo-1611591475285-a29ae2ea1c5c?q=80&w=800&auto=format&fit=crop',
    likes: '625',
    comments: '41',
    tag: 'NOVIDADES'
  }
];

const INITIAL_ORDERS: StoredOrder[] = [
  {
    id: 'PM-89A12',
    customer_name: 'Carolina Neves',
    email: 'carolina.neves@email.com',
    phone: '5527998124455',
    address: 'Rua das Palmeiras, 120 - Praia do Canto, Vitória - ES',
    scheduled_date: '2026-08-12',
    notes: 'Favor embalar os novelos de algodão nas cores azul pastel separadamente para presente. Obrigada!',
    total: 151.80,
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
        product_name: 'Novelo Fio de Algodão Supremo (100g)',
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
  },
  {
    id: 'PM-74B39',
    customer_name: 'Renata Vasconcelos',
    email: 'renata.vasc@email.com',
    phone: '5527997431122',
    address: 'Av. Gil Veloso, 840 - Praia da Costa, Vila Velha - ES',
    scheduled_date: '2026-08-11',
    notes: 'Retirada na loja física de Vitória no final da tarde.',
    total: 213.00,
    status: 'new',
    created_at: '2026-08-10T15:10:00.000Z',
    items: [
      {
        product_id: '3',
        product_name: 'Kit Pulseira de Miçangas & Pérolas DIY',
        product_image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop',
        qty: 1,
        price: 55.00
      },
      {
        product_id: '5',
        product_name: 'Maleta de Pedras Naturais & Miçangas Sortidas',
        product_image: 'https://images.unsplash.com/photo-1611591475285-a29ae2ea1c5c?q=80&w=800&auto=format&fit=crop',
        qty: 1,
        price: 89.00
      },
      {
        product_id: '8',
        product_name: 'Kit Argolas & Fechos Folheados (150 Pçs)',
        product_image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop',
        qty: 2,
        price: 34.50
      }
    ]
  },
  {
    id: 'PM-52C88',
    customer_name: 'Mariana Alcantara',
    email: 'mari.alcantara@email.com',
    phone: '5527995548899',
    address: 'Rua Major Pissarra, 45 - Laranjeiras, Serra - ES',
    scheduled_date: '2026-08-10',
    notes: 'Avisar no WhatsApp antes da entrega.',
    total: 179.60,
    status: 'ready',
    created_at: '2026-08-09T18:45:00.000Z',
    items: [
      {
        product_id: '4',
        product_name: 'Kit Vestido & Top de Tricô de Verão',
        product_image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop',
        qty: 1,
        price: 119.90
      },
      {
        product_id: '9',
        product_name: 'Cordão Acetinado / Fio de Seda (Rolo 50m)',
        product_image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop',
        qty: 3,
        price: 19.90
      }
    ]
  },
  {
    id: 'PM-31D04',
    customer_name: 'Fernanda Duarte',
    email: 'fefe.duarte@email.com',
    phone: '5527996113377',
    address: 'Rua Muqui, 310 - Itaparica, Vila Velha - ES',
    scheduled_date: '2026-08-09',
    notes: '',
    total: 101.80,
    status: 'delivered',
    created_at: '2026-08-08T11:20:00.000Z',
    items: [
      {
        product_id: '6',
        product_name: 'Fio de Malha Premium para Cestos & Decor (500g)',
        product_image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop',
        qty: 2,
        price: 29.90
      },
      {
        product_id: '7',
        product_name: 'Kit Alicates de Precisão para Bijuterias (3 Pçs)',
        product_image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop',
        qty: 1,
        price: 42.00
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
  PRODUCTS: 'pedramania_products_v7',
  INSTA_POSTS: 'pedramania_insta_posts_v7',
  ORDERS: 'pedramania_orders_v7',
  CATEGORIES: 'pedramania_categories_v7',
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
    await delay(100);
    return getStoredData<StoreCategory[]>(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
  },

  addCategory: async (data: Omit<StoreCategory, 'id'>): Promise<StoreCategory> => {
    await delay(200);
    const cats = getStoredData<StoreCategory[]>(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
    const newCat: StoreCategory = {
      ...data,
      id: data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    };
    saveStoredData(STORAGE_KEYS.CATEGORIES, [...cats, newCat]);
    return newCat;
  },

  updateCategory: async (id: string, updates: Partial<StoreCategory>): Promise<StoreCategory> => {
    await delay(200);
    const cats = getStoredData<StoreCategory[]>(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
    let updated: StoreCategory | null = null;
    const next = cats.map(c => { if (c.id === id) { updated = { ...c, ...updates }; return updated; } return c; });
    saveStoredData(STORAGE_KEYS.CATEGORIES, next);
    if (!updated) throw new Error('Categoria não encontrada');
    return updated;
  },

  deleteCategory: async (id: string): Promise<boolean> => {
    await delay(200);
    const cats = getStoredData<StoreCategory[]>(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
    saveStoredData(STORAGE_KEYS.CATEGORIES, cats.filter(c => c.id !== id));
    return true;
  },

  // PRODUCTS & STOCK
  getProducts: async (): Promise<Product[]> => {
    await delay(200);
    return getStoredData<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  },

  getFeaturedProducts: async (): Promise<Product[]> => {
    await delay(200);
    const products = getStoredData<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    return products.filter(p => p.featured && p.active);
  },

  addProduct: async (productData: Omit<Product, 'id'>): Promise<Product> => {
    await delay(300);
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
    await delay(200);
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
    await delay(200);
    const products = getStoredData<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    const updated = products.filter(p => p.id !== id);
    saveStoredData(STORAGE_KEYS.PRODUCTS, updated);
    return true;
  },

  // INSTAGRAM POSTS
  getInstaPosts: async (): Promise<InstaPost[]> => {
    await delay(200);
    return getStoredData<InstaPost[]>(STORAGE_KEYS.INSTA_POSTS, INITIAL_INSTA_POSTS);
  },

  addInstaPost: async (postData: Omit<InstaPost, 'id'>): Promise<InstaPost> => {
    await delay(200);
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
    await delay(200);
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
    await delay(200);
    const posts = getStoredData<InstaPost[]>(STORAGE_KEYS.INSTA_POSTS, INITIAL_INSTA_POSTS);
    const updated = posts.filter(p => p.id !== id);
    saveStoredData(STORAGE_KEYS.INSTA_POSTS, updated);
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

  // ORDERS
  getOrders: async (): Promise<StoredOrder[]> => {
    await delay(200);
    return getStoredData<StoredOrder[]>(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
  },

  updateOrderStatus: async (id: string, status: OrderStatus): Promise<StoredOrder> => {
    await delay(200);
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

  createOrder: async (input: OrderInput): Promise<OrderResult> => {
    await delay(500);
    const products = getStoredData<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    
    let total = 0;
    const itemDetails = input.items.map(i => {
      const product = products.find(p => p.id === i.product_id);
      const price = product ? product.price : 0;
      total += price * i.qty;
      return {
        product_id: i.product_id,
        product_name: product ? product.name : 'Produto',
        product_image: product?.images?.[0] || 'https://images.unsplash.com/photo-1608248597260-6f216e589959?q=80&w=800&auto=format&fit=crop',
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

    const orderId = 'PM-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    const newOrder: StoredOrder = {
      id: orderId,
      customer_name: input.customer_name,
      email: input.email,
      phone: input.phone,
      address: input.address || 'Vitória / ES',
      scheduled_date: input.scheduled_date,
      notes: input.notes,
      total,
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
  }
};
