import React, { useState, useEffect } from 'react';
import { Product, ProductColor, StoreCategory, Category, InstaPost, StoredOrder, OrderStatus } from '../types';
import { ProductModal } from './ProductModal';
import { AdminProductForm } from './AdminProductForm';
import { api } from '../services/mockApi';
import { Button } from './ui/Button';
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  Instagram, 
  ShoppingBag, 
  Plus, 
  Edit3, 
  Trash2, 
  ArrowLeft, 
  Search, 
  Star,
  RefreshCw,
  Eye,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  CheckCircle2,
  X,
  Menu,
  ChevronRight,
  Sparkles,
  Clock,
  Send,
  CheckSquare,
  Square,
  MapPin,
  Calendar,
  FileText,
  LogOut,
  Palette
} from 'lucide-react';
import { AdminLogin } from './AdminLogin';

interface AdminPanelProps {
  onBack: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onBack }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('pedramania_admin_auth') === 'true';
  });
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'categories' | 'kits' | 'insta' | 'orders'>('dashboard');
  const [orderFilter, setOrderFilter] = useState<'new' | 'all' | 'preparing' | 'ready' | 'delivered'>('new');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem('pedramania_admin_auth');
    setIsAuthenticated(false);
  };
  
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<StoreCategory[]>([]);
  const [instaPosts, setInstaPosts] = useState<InstaPost[]>([]);
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingCategory, setEditingCategory] = useState<Partial<StoreCategory> | null>(null);

  // Picking checklist state (orderId -> set of item product_ids checked)
  const [checkedItems, setCheckedItems] = useState<Record<string, Record<string, boolean>>>({});

  // Modals state
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [editingInstaPost, setEditingInstaPost] = useState<Partial<InstaPost> | null>(null);
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [prods, posts, ords, cats] = await Promise.all([
        api.getProducts(),
        api.getInstaPosts(),
        api.getOrders(),
        api.getCategories(),
      ]);
      setProducts(prods);
      setInstaPosts(posts);
      setOrders(ords);
      setCategories(cats);
    } catch (err) {
      console.error('Erro ao carregar dados do admin', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Category handlers
  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;
    try {
      if (editingCategory.id) {
        await api.updateCategory(editingCategory.id, editingCategory);
      } else {
        await api.addCategory({
          name: editingCategory.name || 'Nova Categoria',
          color: editingCategory.color || '#2563EB',
          image: editingCategory.image || '',
        });
      }
      setEditingCategory(null);
      loadData();
    } catch (err) {
      alert('Erro ao salvar categoria');
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!window.confirm('Apagar esta categoria? Os produtos com esta categoria ficarão sem categoria.')) return;
    try {
      await api.deleteCategory(id);
      loadData();
    } catch (err) { console.error(err); }
  };

  // Handlers for Products
  const handleSaveProduct = async (productData: Partial<Product>) => {
    try {
      if (productData.id) {
        await api.updateProduct(productData.id, productData);
      } else {
        await api.addProduct({
          name: productData.name || 'Novo Produto',
          slug: (productData.name || 'novo-produto').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
          description: productData.description || '',
          price: Number(productData.price) || 0,
          stock: Number(productData.stock) || 0,
          images: productData.images?.length ? productData.images : ['https://images.unsplash.com/photo-1608248597260-6f216e589959?q=80&w=800&auto=format&fit=crop'],
          colors: productData.colors,
          weight: productData.weight,
          composition: productData.composition,
          tags: productData.tags || ['Novo'],
          category: (productData.category as Category) || (categories[0]?.id || 'linhas-fios'),
          allergens: productData.allergens || [],
          active: productData.active ?? true,
          featured: productData.featured ?? false,
        });
      }
      setEditingProduct(null);
      loadData();
    } catch (err) {
      alert('Erro ao salvar produto');
    }
  };

  const handleQuickStockChange = async (product: Product, delta: number) => {
    const newStock = Math.max(0, product.stock + delta);
    try {
      await api.updateProduct(product.id, { stock: newStock });
      setProducts(products.map(p => p.id === product.id ? { ...p, stock: newStock } : p));
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleProductActive = async (product: Product) => {
    try {
      const updated = await api.updateProduct(product.id, { active: !product.active });
      setProducts(products.map(p => p.id === product.id ? updated : p));
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleProductFeatured = async (product: Product) => {
    try {
      const updated = await api.updateProduct(product.id, { featured: !product.featured });
      setProducts(products.map(p => p.id === product.id ? updated : p));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja apagar este produto?')) return;
    try {
      await api.deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Handlers for Orders
  const handleOrderStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const updated = await api.updateOrderStatus(orderId, newStatus);
      setOrders(orders.map(o => o.id === orderId ? updated : o));
    } catch (err) {
      console.error(err);
    }
  };

  const toggleItemChecked = (orderId: string, productId: string) => {
    setCheckedItems(prev => {
      const orderState = prev[orderId] || {};
      return {
        ...prev,
        [orderId]: {
          ...orderState,
          [productId]: !orderState[productId]
        }
      };
    });
  };

  const sendWhatsAppNotification = (order: StoredOrder) => {
    const statusText = 
      order.status === 'new' ? 'recebido e está em fila para separação' :
      order.status === 'preparing' ? 'sendo preparado com carinho pela nossa equipe' :
      order.status === 'ready' ? 'pronto para entrega / retirada' : 'concluído e entregue';

    const text = encodeURIComponent(
      `Olá ${order.customer_name}! 🧶✨ Seu pedido #${order.id} da Pedra Mania está ${statusText}. ` +
      `Total: R$ ${order.total.toFixed(2).replace('.', ',')}. Qualquer dúvida estamos à disposição!`
    );

    const cleanPhone = order.phone.replace(/\D/g, '');
    const finalPhone = cleanPhone.startsWith('55') ? cleanPhone : '55' + cleanPhone;
    window.open(`https://api.whatsapp.com/send?phone=${finalPhone}&text=${text}`, '_blank');
  };

  // Handlers for Instagram Posts
  const handleSaveInstaPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingInstaPost) return;

    try {
      if (editingInstaPost.id) {
        await api.updateInstaPost(editingInstaPost.id, editingInstaPost);
      } else {
        await api.addInstaPost({
          title: editingInstaPost.title || 'Novo Post',
          image: editingInstaPost.image || 'https://images.unsplash.com/photo-1608248597260-6f216e589959?q=80&w=800&auto=format&fit=crop',
          likes: editingInstaPost.likes || '100',
          comments: editingInstaPost.comments || '10',
          tag: editingInstaPost.tag || 'NOVIDADE'
        });
      }
      setEditingInstaPost(null);
      loadData();
    } catch (err) {
      alert('Erro ao salvar post');
    }
  };

  const handleDeleteInstaPost = async (id: string) => {
    if (!window.confirm('Deseja apagar este post em destaque do Instagram?')) return;
    try {
      await api.deleteInstaPost(id);
      setInstaPosts(instaPosts.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Derived Data
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeKits = products.filter(p => p.category === 'kits');
  const lowStockProducts = products.filter(p => p.stock <= 10);
  const outOfStockProducts = products.filter(p => p.stock === 0);

  const filteredOrders = orders.filter(o => 
    orderFilter === 'all' || o.status === orderFilter
  );

  const newOrdersCount = orders.filter(o => o.status === 'new').length;
  const preparingOrdersCount = orders.filter(o => o.status === 'preparing').length;

  // Mock Sales Data for Monthly Chart
  const monthlySales = [
    { month: 'Jan', revenue: 8400, sales: 92 },
    { month: 'Fev', revenue: 9800, sales: 110 },
    { month: 'Mar', revenue: 11200, sales: 128 },
    { month: 'Abr', revenue: 10500, sales: 115 },
    { month: 'Mai', revenue: 13400, sales: 146 },
    { month: 'Jun', revenue: 15200, sales: 168 },
    { month: 'Jul', revenue: 14100, sales: 155 },
    { month: 'Ago', revenue: 16850, sales: 184 },
  ];

  const maxRevenue = Math.max(...monthlySales.map(s => s.revenue));

  // Top Selling Items Ranking
  const topSellers = [
    { product: products[1] || products[0], salesCount: 142, revenue: 2343.00 },
    { product: products[0] || products[1], salesCount: 118, revenue: 5770.20 },
    { product: products[2] || products[0], salesCount: 94, revenue: 5170.00 },
    { product: products[5] || products[0], salesCount: 86, revenue: 2571.40 },
    { product: products[3] || products[0], salesCount: 62, revenue: 7433.80 },
  ].filter(item => item.product);

  const navItems = [
    { id: 'dashboard',  label: 'Dashboard Início',       icon: LayoutDashboard },
    { id: 'products',   label: 'Estoque & Produtos',      icon: Package, badge: lowStockProducts.length > 0 ? `${lowStockProducts.length} baixos` : undefined },
    { id: 'categories', label: 'Categorias',              icon: Layers, count: categories.length },
    { id: 'kits',       label: 'Kits Ativos',             icon: Star, count: activeKits.length },
    { id: 'insta',      label: 'Destaques Instagram',     icon: Instagram, count: instaPosts.length },
    { id: 'orders',     label: 'Pedidos Recebidos',       icon: ShoppingBag, count: orders.length, badge: (newOrdersCount + preparingOrdersCount) > 0 ? `${newOrdersCount + preparingOrdersCount} ativos` : undefined },
  ];

  const statusBadges: Record<OrderStatus, { label: string; class: string }> = {
    new: { label: 'A Preparar (Novo)', class: 'bg-blue-100 text-[#2563EB] border-blue-300' },
    preparing: { label: 'Em Preparação', class: 'bg-amber-100 text-amber-800 border-amber-300' },
    ready: { label: 'Pronto p/ Envio', class: 'bg-[#BFDBFE] text-[#1E293B] border-blue-400' },
    delivered: { label: 'Concluído', class: 'bg-emerald-100 text-emerald-800 border-emerald-300' }
  };

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} onBackToStore={onBack} />;
  }

  return (
    <div className="min-h-screen bg-[#F4F8FC] text-[#1E293B] flex flex-col md:flex-row">
      
      {/* Mobile Top Header */}
      <div className="md:hidden bg-[#1E293B] text-white px-4 py-3 flex justify-between items-center sticky top-0 z-40 shadow-lg">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors relative"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            {/* Badge on hamburger when orders pending */}
            {(newOrdersCount + preparingOrdersCount) > 0 && !isSidebarOpen && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-extrabold rounded-full flex items-center justify-center">
                {newOrdersCount + preparingOrdersCount}
              </span>
            )}
          </button>
          <span className="font-pacifico text-lg text-[#93C5FD] leading-none">Pedra Mania</span>
          <span className="text-[9px] text-gray-400 uppercase tracking-widest font-bold hidden sm:inline">Admin</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={loadData} className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
            <RefreshCw size={16} />
          </button>
          <button onClick={onBack} className="text-[11px] bg-[#2563EB] hover:bg-[#1D4ED8] px-3 py-1.5 rounded-lg font-bold transition-colors flex items-center gap-1">
            <Eye size={13} /> Loja
          </button>
        </div>
      </div>

      {/* SIDEBAR NAVIGATION */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-50 h-screen w-56 bg-[#1E293B] text-white flex flex-col justify-between transition-transform duration-300 ease-in-out shrink-0 ${
          isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand header */}
        <div className="px-4 pt-5 pb-4 border-b border-white/10 flex items-center justify-between">
          <div>
            <h2 className="font-pacifico text-lg text-[#93C5FD] leading-none">Pedra Mania</h2>
            <p className="text-[0.6rem] text-gray-500 font-bold uppercase tracking-widest mt-0.5">Painel Admin · ES</p>
          </div>
          <button className="md:hidden text-gray-500 hover:text-white p-1 transition-colors" onClick={() => setIsSidebarOpen(false)}>
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as any);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-[#2563EB] text-white shadow-md shadow-[#2563EB]/40'
                    : 'text-gray-400 hover:bg-white/8 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon size={15} className={isActive ? 'text-white shrink-0' : 'text-[#93C5FD] shrink-0'} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge ? (
                  <span className="ml-1.5 shrink-0 min-w-[1.25rem] h-5 px-1.5 bg-rose-500 text-white text-[9px] font-extrabold rounded-full flex items-center justify-center">
                    {item.badge.split(' ')[0]}
                  </span>
                ) : item.count !== undefined ? (
                  <span className="ml-1.5 shrink-0 min-w-[1.25rem] h-5 px-1.5 bg-white/10 text-gray-400 text-[10px] font-bold rounded-full flex items-center justify-center">
                    {item.count}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-3 pb-4 pt-3 border-t border-white/10 space-y-1.5">
          <button
            onClick={onBack}
            className="w-full flex items-center gap-2 px-3 py-2 bg-white/8 hover:bg-white/15 rounded-xl text-[11px] font-semibold text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} className="shrink-0" />
            <span>Voltar à Loja</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 hover:text-rose-300 rounded-xl text-[11px] font-semibold transition-colors"
          >
            <LogOut size={14} className="shrink-0" />
            <span>Terminar Sessão</span>
          </button>
          <p className="text-[10px] text-gray-600 text-center pt-0.5">v2.4 · Pedra Mania ES</p>
        </div>
      </aside>

      {/* Overlay backdrop for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full overflow-y-auto">
        {editingProduct ? (
          <AdminProductForm
            initialProduct={editingProduct}
            categories={categories}
            onSave={handleSaveProduct}
            onCancel={() => setEditingProduct(null)}
            onDelete={editingProduct.id ? async (id) => {
              await handleDeleteProduct(id);
              setEditingProduct(null);
            } : undefined}
          />
        ) : (
          <>
            {/* TOP BAR / USER INFO */}
            <header className="hidden md:flex justify-between items-center mb-8 bg-white p-4 sm:px-8 rounded-2xl shadow-sm border border-[#BFDBFE]/60">
          <div>
            <h1 className="text-2xl font-extrabold text-[#1E293B] font-nunito">
              {activeTab === 'dashboard' && ' Visão Geral & Desempenho'}
              {activeTab === 'products' && ' Gestão de Estoque & Produtos'}
              {activeTab === 'categories' && ' Gestão de Categorias'}
              {activeTab === 'kits' && ' Kits Ativos & Criatividade'}
              {activeTab === 'insta' && ' Destaques do Instagram'}
              {activeTab === 'orders' && ' Preparação & Separação de Pedidos'}
            </h1>
            <p className="text-xs text-gray-500 font-lato">Atualizado em tempo real com localStorage</p>
          </div>

          <div className="flex items-center gap-3">
            <Button size="sm" variant="secondary" onClick={loadData} className="text-xs font-bold">
              <RefreshCw size={14} className="mr-1.5" /> Recarregar
            </Button>
            <Button size="sm" onClick={onBack} className="text-xs font-bold">
              <Eye size={14} className="mr-1.5" /> Ver Loja Virtual
            </Button>
            <Button size="sm" variant="ghost" onClick={handleLogout} className="text-xs font-bold text-rose-600 hover:bg-rose-50">
              <LogOut size={14} className="mr-1.5" /> Sair
            </Button>
          </div>
        </header>

        {/* TAB 0: MODERN DASHBOARD OVERVIEW */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fade-in-up">
            
            {/* KPI METRIC CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Metric 1 */}
              <div className="bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] text-white p-6 rounded-3xl shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:scale-125 transition-transform"></div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs uppercase font-extrabold tracking-wider bg-white/20 px-3 py-1 rounded-full backdrop-blur-md">
                    Faturamento Mês
                  </span>
                  <div className="p-2 bg-white/20 rounded-xl">
                    <DollarSign size={22} />
                  </div>
                </div>
                <h3 className="text-3xl font-black mb-1">R$ 16.850,00</h3>
                <p className="text-xs text-blue-100 flex items-center gap-1 font-bold">
                  <TrendingUp size={14} className="text-emerald-300" /> +18,4% em relação a Julho
                </p>
              </div>

              {/* Metric 2 */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#BFDBFE] flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs uppercase font-extrabold tracking-wider text-gray-500">
                    Vendas no Mês
                  </span>
                  <div className="p-2 bg-blue-50 text-[#2563EB] rounded-xl">
                    <ShoppingCart size={22} />
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-black text-[#1E293B]">184 Pedidos</h3>
                  <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1">
                    <CheckCircle2 size={14} /> 96% de entregas no ES concluídas
                  </p>
                </div>
              </div>

              {/* Metric 3: Critical Stock Alert */}
              <div className={`p-6 rounded-3xl shadow-sm border transition-all ${
                lowStockProducts.length > 0 
                  ? 'bg-amber-50/80 border-amber-300' 
                  : 'bg-white border-[#BFDBFE]'
              }`}>
                <div className="flex justify-between items-start mb-4">
                  <span className={`text-xs uppercase font-extrabold tracking-wider ${
                    lowStockProducts.length > 0 ? 'text-amber-800' : 'text-gray-500'
                  }`}>
                    Estoque Crítico
                  </span>
                  <div className={`p-2 rounded-xl ${
                    lowStockProducts.length > 0 ? 'bg-amber-200 text-amber-900' : 'bg-gray-100 text-gray-400'
                  }`}>
                    <AlertTriangle size={22} />
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-black text-[#1E293B]">
                    {lowStockProducts.length} {lowStockProducts.length === 1 ? 'Produto' : 'Produtos'}
                  </h3>
                  <p className="text-xs text-amber-700 font-bold mt-1">
                    {outOfStockProducts.length > 0 ? `${outOfStockProducts.length} esgotados!` : 'Itens com 10 ou menos unidades'}
                  </p>
                </div>
              </div>

              {/* Metric 4 */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-[#BFDBFE] flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs uppercase font-extrabold tracking-wider text-gray-500">
                    Kits em Alta
                  </span>
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                    <Sparkles size={22} />
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-black text-[#1E293B]">{activeKits.length} Kits</h3>
                  <p className="text-xs text-indigo-600 font-bold mt-1">
                    Amigurumi e Miçangas lideram vendas
                  </p>
                </div>
              </div>

            </div>

            {/* GRÁFICO DE VENDAS POR MÊS & ARTIGOS MAIS VENDIDOS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* CHART: Monthly Sales Trend */}
              <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-[#BFDBFE] flex flex-col justify-between">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-8">
                  <div>
                    <h3 className="text-xl font-extrabold text-[#1E293B] font-nunito flex items-center gap-2">
                      <TrendingUp size={22} className="text-[#2563EB]" /> Gráfico de Vendas por Mês (2026)
                    </h3>
                    <p className="text-xs text-gray-500">Faturamento acumulado em R$ no Espírito Santo</p>
                  </div>
                  <span className="bg-[#2563EB]/10 text-[#2563EB] text-xs font-extrabold px-3 py-1.5 rounded-full self-start sm:self-auto">
                    Média: R$ 12.550/mês
                  </span>
                </div>

                {/* SVG / CSS Bar Chart */}
                <div className="h-64 flex items-end justify-between gap-2 sm:gap-4 pt-8 pb-2 px-2 border-b border-gray-100">
                  {monthlySales.map((data, idx) => {
                    const heightPercent = Math.round((data.revenue / maxRevenue) * 100);
                    const isCurrentMonth = idx === monthlySales.length - 1;
                    return (
                      <div key={data.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-pointer relative">
                        
                        {/* Tooltip on Hover */}
                        <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-[#1E293B] text-white text-[10px] font-bold px-2 py-1 rounded shadow pointer-events-none whitespace-nowrap z-20">
                          R$ {data.revenue.toLocaleString('pt-BR')} ({data.sales} pds)
                        </div>

                        {/* Bar */}
                        <div 
                          className={`w-full max-w-[40px] rounded-t-xl transition-all duration-500 group-hover:brightness-110 ${
                            isCurrentMonth 
                              ? 'bg-gradient-to-t from-[#2563EB] to-[#60A5FA] shadow-md shadow-[#2563EB]/30' 
                              : 'bg-gradient-to-t from-[#BFDBFE] to-[#93C5FD]'
                          }`}
                          style={{ height: `${heightPercent}%` }}
                        />

                        {/* Month Label */}
                        <span className={`text-xs font-bold ${isCurrentMonth ? 'text-[#2563EB]' : 'text-gray-400'}`}>
                          {data.month}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between items-center text-xs text-gray-500 font-bold pt-4">
                  <span>Janeiro (R$ 8.400)</span>
                  <span className="text-[#2563EB]">Agosto Atual (R$ 16.850) 🎉</span>
                </div>
              </div>

              {/* RANKING: Top Selling Articles */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-[#BFDBFE] flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-extrabold text-[#1E293B] font-nunito mb-1">
                    🏆 Artigos Mais Vendidos
                  </h3>
                  <p className="text-xs text-gray-500 mb-6">Campeões de pedidos das artesãs do ES</p>

                  <div className="space-y-4">
                    {topSellers.map((item, index) => (
                      <div key={item.product.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors">
                        <span className="font-extrabold text-xs text-gray-400 w-4 text-center">#{index + 1}</span>
                        <img src={item.product.images[0]} alt={item.product.name} className="w-11 h-11 rounded-xl object-cover shadow-sm shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-xs text-[#1E293B] truncate">{item.product.name}</h4>
                          <div className="flex items-center justify-between text-[11px] text-gray-500 mt-1">
                            <span>{item.salesCount} un vendidas</span>
                            <span className="font-bold text-[#2563EB]">R$ {item.revenue.toFixed(0)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Button size="sm" variant="outline" className="w-full mt-6 text-xs font-bold" onClick={() => setActiveTab('products')}>
                  Ver Todos os Produtos
                </Button>
              </div>

            </div>

            {/* CRITICAL STOCK ALERTS WIDGET */}
            {lowStockProducts.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-amber-200">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-amber-100 text-amber-800 rounded-2xl">
                      <AlertTriangle size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold text-[#1E293B] font-nunito">Alerta de Estoque em Falta / Terminar</h3>
                      <p className="text-xs text-gray-500">Reponha estes insumos para não perder vendas</p>
                    </div>
                  </div>
                  <Button size="sm" onClick={() => setActiveTab('products')}>
                    Gerenciar Estoque
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {lowStockProducts.map(product => (
                    <div key={product.id} className="border border-amber-200 bg-amber-50/50 p-4 rounded-2xl flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <img src={product.images[0]} alt={product.name} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                        <div className="min-w-0">
                          <h4 className="font-bold text-xs text-[#1E293B] truncate">{product.name}</h4>
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase inline-block mt-1 ${
                            product.stock === 0 ? 'bg-rose-600 text-white' : 'bg-amber-600 text-white'
                          }`}>
                            {product.stock === 0 ? 'ESGOTADO' : `Restam apenas ${product.stock} un`}
                          </span>
                        </div>
                      </div>

                      <button 
                        onClick={() => handleQuickStockChange(product, 10)}
                        className="px-3 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold rounded-xl shrink-0 shadow-sm transition-colors"
                      >
                        +10 Estoque
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 1: PRODUCTS & STOCK */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#BFDBFE] animate-fade-in-up">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div className="relative w-full md:w-80">
                <input 
                  type="text" 
                  placeholder="Buscar produto por nome ou categoria..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#2563EB] outline-none text-sm"
                />
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <Button onClick={() => setEditingProduct({ active: true, featured: false, category: 'linhas-fios', price: 0, stock: 10, allergens: [], tags: ['Novo'] })}>
                <Plus size={18} className="mr-1.5" /> Adicionar Produto / Insumo
              </Button>
            </div>

            {loading ? (
              <div className="py-20 text-center text-gray-400">Carregando estoque...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider bg-gray-50/50">
                      <th className="py-3 px-4">Produto</th>
                      <th className="py-3 px-4">Categoria</th>
                      <th className="py-3 px-4">Preço (R$)</th>
                      <th className="py-3 px-4">Estoque</th>
                      <th className="py-3 px-4">Destaque</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    {filteredProducts.map(product => (
                      <tr key={product.id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-[#1E293B]">
                          <button
                            onClick={() => setPreviewProduct(product)}
                            className="flex items-center gap-3 text-left hover:opacity-80 transition-opacity group/preview"
                            title="Clique para ver detalhes do produto"
                          >
                            <div className="relative shrink-0">
                              <img src={product.images[0]} alt={product.name} className="w-12 h-12 rounded-xl object-cover border border-gray-200 group-hover/preview:ring-2 group-hover/preview:ring-[#2563EB] transition-all" />
                              {product.colors && product.colors.length > 0 && (
                                <div className="absolute -bottom-1 -right-1 flex gap-0.5">
                                  {product.colors.slice(0, 3).map(c => (
                                    <span key={c.name} className="w-3 h-3 rounded-full border border-white shadow-sm" style={{ backgroundColor: c.hex }} title={c.name} />
                                  ))}
                                </div>
                              )}
                            </div>
                            <div>
                              <span className="block font-bold text-[#1E293B] group-hover/preview:text-[#2563EB] transition-colors">{product.name}</span>
                              <span className="text-xs text-gray-400 font-normal">{product.tags.join(', ')}</span>
                            </div>
                          </button>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="bg-[#BFDBFE]/40 text-[#2563EB] text-xs font-bold px-2.5 py-1 rounded-md uppercase">
                            {product.category}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-black text-[#2563EB]">
                          R$ {product.price.toFixed(2).replace('.', ',')}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => handleQuickStockChange(product, -1)}
                              className="w-7 h-7 bg-gray-100 hover:bg-gray-200 rounded-md flex items-center justify-center font-bold text-gray-600"
                              title="Diminuir Estoque"
                            >
                              -
                            </button>
                            <span className={`px-2.5 py-1 rounded-md font-bold text-xs ${
                              product.stock > 10 
                                ? 'bg-emerald-100 text-emerald-700' 
                                : product.stock > 0 
                                ? 'bg-amber-100 text-amber-700' 
                                : 'bg-rose-100 text-rose-700'
                            }`}>
                              {product.stock} un
                            </span>
                            <button 
                              onClick={() => handleQuickStockChange(product, 1)}
                              className="w-7 h-7 bg-gray-100 hover:bg-gray-200 rounded-md flex items-center justify-center font-bold text-gray-600"
                              title="Aumentar Estoque"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <button 
                            onClick={() => handleToggleProductFeatured(product)}
                            className={`p-1.5 rounded-lg border transition-colors ${
                              product.featured 
                                ? 'bg-amber-50 border-amber-300 text-amber-500' 
                                : 'bg-gray-50 border-gray-200 text-gray-300'
                            }`}
                            title="Alternar Destaque"
                          >
                            <Star size={16} fill={product.featured ? "currentColor" : "none"} />
                          </button>
                        </td>
                        <td className="py-3.5 px-4">
                          <button 
                            onClick={() => handleToggleProductActive(product)}
                            className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase ${
                              product.active 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : 'bg-gray-200 text-gray-500'
                            }`}
                          >
                            {product.active ? 'Ativo' : 'Inativo'}
                          </button>
                        </td>
                        <td className="py-3.5 px-4 text-right space-x-1">
                          <button 
                            onClick={() => setPreviewProduct(product)} 
                            className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                            title="Ver produto (como na loja)"
                          >
                            <Eye size={18} />
                          </button>
                          <button 
                            onClick={() => setEditingProduct(product)} 
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Editar"
                          >
                            <Edit3 size={18} />
                          </button>
                          <button 
                            onClick={() => handleDeleteProduct(product.id)} 
                            className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Apagar"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB: CATEGORIES */}
        {activeTab === 'categories' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#BFDBFE] animate-fade-in-up">
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-xl font-extrabold text-[#1E293B]">Categorias de Produtos</h3>
                <p className="text-sm text-gray-500">Crie e edite as categorias disponíveis na loja e no formulário de produtos</p>
              </div>
              <Button size="sm" onClick={() => setEditingCategory({ name: '', color: '#2563EB', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=500&auto=format&fit=crop' })}>
                <Plus size={16} className="mr-1" /> Nova Categoria
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map(cat => {
                const productCount = products.filter(p => p.category === cat.id).length;
                return (
                  <div key={cat.id} className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm flex flex-col justify-between group">
                    <div className="relative h-32 overflow-hidden bg-gray-100">
                      <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${cat.color}ee 0%, ${cat.color}66 60%, transparent 100%)` }} />
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: cat.color }} />
                        <span className="bg-black/40 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          slug: {cat.id}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <h4 className="font-nunito font-extrabold text-lg leading-tight drop-shadow-sm">{cat.name}</h4>
                        <span className="text-xs opacity-90">{productCount} {productCount === 1 ? 'produto associado' : 'produtos associados'}</span>
                      </div>
                    </div>

                    <div className="p-4 bg-white flex justify-end gap-2 border-t border-gray-100">
                      <button 
                        onClick={() => setEditingCategory(cat)} 
                        className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold flex items-center gap-1 hover:bg-blue-100 transition-colors"
                      >
                        <Edit3 size={14} /> Editar
                      </button>
                      <button 
                        onClick={() => handleDeleteCategory(cat.id)} 
                        className="px-3 py-1.5 bg-rose-50 text-rose-600 rounded-lg text-xs font-bold flex items-center gap-1 hover:bg-rose-100 transition-colors"
                      >
                        <Trash2 size={14} /> Apagar
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: ACTIVE KITS */}
        {activeTab === 'kits' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#BFDBFE] animate-fade-in-up">
            <div className="mb-6 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-extrabold text-[#1E293B]">Kits de Artesanato & Criatividade</h3>
                <p className="text-sm text-gray-500">Gestão dos kits completos (algodão, miçangas, receitas e insumos)</p>
              </div>
              <Button size="sm" onClick={() => setEditingProduct({ category: 'kits', active: true, featured: true, price: 50, stock: 10, tags: ['Kit Completo'] })}>
                <Plus size={16} className="mr-1" /> Criar Novo Kit
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeKits.map(kit => (
                <div key={kit.id} className="border border-gray-200 rounded-2xl p-5 bg-white shadow-sm flex flex-col justify-between">
                  <div className="flex items-start gap-4 mb-4">
                    <img src={kit.images[0]} alt={kit.name} className="w-20 h-20 rounded-xl object-cover shadow-sm shrink-0" />
                    <div>
                      <span className="bg-[#2563EB] text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">Kit</span>
                      <h4 className="font-bold text-[#1E293B] text-lg leading-snug mt-1">{kit.name}</h4>
                      <p className="text-[#2563EB] font-black text-lg">R$ {kit.price.toFixed(2).replace('.', ',')}</p>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-500">Estoque:</span>
                      <button onClick={() => handleQuickStockChange(kit, -1)} className="w-6 h-6 bg-gray-100 rounded text-xs font-bold">-</button>
                      <span className="font-bold text-sm text-[#1E293B]">{kit.stock}</span>
                      <button onClick={() => handleQuickStockChange(kit, 1)} className="w-6 h-6 bg-gray-100 rounded text-xs font-bold">+</button>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleToggleProductFeatured(kit)}
                        className={`p-1.5 rounded-lg border text-xs font-bold ${kit.featured ? 'bg-amber-100 text-amber-700 border-amber-300' : 'bg-gray-100 text-gray-400'}`}
                      >
                        {kit.featured ? 'Destaque ⭐' : 'Comum'}
                      </button>
                      <button onClick={() => setEditingProduct(kit)} className="p-1.5 text-blue-600 bg-blue-50 rounded-lg">
                        <Edit3 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: INSTAGRAM POSTS */}
        {activeTab === 'insta' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#BFDBFE] animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-extrabold text-[#1E293B]">Posts em Destaque do Instagram (@pedramaniaoficial)</h3>
                <p className="text-sm text-gray-500">Estes posts aparecem diretamente na seção da página inicial do site</p>
              </div>
              <Button onClick={() => setEditingInstaPost({ title: '', tag: 'NOVIDADE', likes: '350', comments: '25', image: 'https://images.unsplash.com/photo-1608248597260-6f216e589959?q=80&w=800&auto=format&fit=crop' })}>
                <Plus size={18} className="mr-1.5" /> Adicionar Post do Insta
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {instaPosts.map(post => (
                <div key={post.id} className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between bg-white">
                  <div className="relative h-48">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 bg-[#2563EB] text-white text-xs font-bold px-2.5 py-1 rounded-md uppercase shadow">
                      {post.tag}
                    </span>
                  </div>
                  
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-[#1E293B] text-base leading-snug mb-3">{post.title}</h4>
                      <div className="flex gap-4 text-xs font-bold text-gray-500 mb-4">
                        <span>❤️ {post.likes} curtidas</span>
                        <span>💬 {post.comments} comentários</span>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 border-t border-gray-100 pt-3">
                      <button 
                        onClick={() => setEditingInstaPost(post)} 
                        className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold flex items-center gap-1"
                      >
                        <Edit3 size={14} /> Editar
                      </button>
                      <button 
                        onClick={() => handleDeleteInstaPost(post.id)} 
                        className="px-3 py-1.5 bg-rose-50 text-rose-600 rounded-lg text-xs font-bold flex items-center gap-1"
                      >
                        <Trash2 size={14} /> Apagar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: ORDERS PREPARATION & PICKING CHECKLIST */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-fade-in-up">
            
            {/* Filter Tabs for Orders */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#BFDBFE] flex flex-wrap gap-2 items-center justify-between">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setOrderFilter('new')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    orderFilter === 'new' ? 'bg-blue-600 text-white shadow-md' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                  }`}
                >
                  🆕 A Preparar ({newOrdersCount})
                </button>
                <button
                  onClick={() => setOrderFilter('all')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    orderFilter === 'all' ? 'bg-[#2563EB] text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  📄 Todos os Pedidos ({orders.length})
                </button>
                <button
                  onClick={() => setOrderFilter('preparing')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    orderFilter === 'preparing' ? 'bg-amber-600 text-white shadow-md' : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                  }`}
                >
                  🛠️ Em Preparação ({preparingOrdersCount})
                </button>
                <button
                  onClick={() => setOrderFilter('ready')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    orderFilter === 'ready' ? 'bg-[#2563EB] text-white shadow-md' : 'bg-blue-50 text-blue-800 hover:bg-blue-100'
                  }`}
                >
                  📦 Prontos p/ Envio ({orders.filter(o => o.status === 'ready').length})
                </button>
                <button
                  onClick={() => setOrderFilter('delivered')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    orderFilter === 'delivered' ? 'bg-emerald-600 text-white shadow-md' : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                  }`}
                >
                  ✅ Concluídos ({orders.filter(o => o.status === 'delivered').length})
                </button>
              </div>

              <span className="text-xs text-gray-400 font-bold px-2">
                Mostrando {filteredOrders.length} pedidos
              </span>
            </div>

            {/* Orders List */}
            {filteredOrders.length === 0 ? (
              <div className="bg-white rounded-3xl p-16 text-center text-gray-400 border border-[#BFDBFE]">
                <ShoppingBag size={48} className="mx-auto mb-3 text-gray-300" />
                <p className="font-bold text-lg text-[#1E293B]">Nenhum pedido encontrado nesta categoria.</p>
                <p className="text-sm text-gray-400">Altere os filtros acima para visualizar outros pedidos.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredOrders.map(order => {
                  const badge = statusBadges[order.status] || statusBadges.new;
                  const orderCheckedState = checkedItems[order.id] || {};
                  const totalItemsCount = order.items?.reduce((acc, i) => acc + i.qty, 0) || 0;
                  const checkedCount = order.items?.filter(i => orderCheckedState[i.product_id]).length || 0;
                  const isAllPicked = order.items?.length > 0 && checkedCount === order.items.length;

                  return (
                    <div 
                      key={order.id} 
                      className={`bg-white rounded-3xl p-6 shadow-sm border transition-all ${
                        order.status === 'new' ? 'border-blue-400 ring-2 ring-blue-100' : 'border-[#BFDBFE]'
                      }`}
                    >
                      {/* Order Header */}
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-gray-100 gap-4">
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="font-black text-xl text-[#2563EB]">#{order.id}</h3>
                            <span className={`text-xs font-extrabold px-3 py-1 rounded-full uppercase border ${badge.class}`}>
                              {badge.label}
                            </span>
                            {isAllPicked && (
                              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                                <CheckCircle2 size={14} /> Insumos Separados
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                            <Clock size={14} /> Recebido em: {new Date(order.created_at).toLocaleString('pt-BR')}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                          {/* Quick Status Action Buttons */}
                          {order.status === 'new' && (
                            <button
                              onClick={() => handleOrderStatusChange(order.id, 'preparing')}
                              className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold shadow-sm transition-colors"
                            >
                              Iniciar Preparação
                            </button>
                          )}
                          {order.status === 'preparing' && (
                            <button
                              onClick={() => handleOrderStatusChange(order.id, 'ready')}
                              className="px-3.5 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl text-xs font-bold shadow-sm transition-colors"
                            >
                              Marcar como Pronto p/ Envio
                            </button>
                          )}
                          {order.status === 'ready' && (
                            <button
                              onClick={() => handleOrderStatusChange(order.id, 'delivered')}
                              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-colors"
                            >
                              Marcar como Concluído
                            </button>
                          )}

                          {/* WhatsApp Customer Action Button */}
                          <button
                            onClick={() => sendWhatsAppNotification(order)}
                            className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-sm flex items-center gap-1.5 transition-colors"
                            title="Avisar cliente no WhatsApp"
                          >
                            <Send size={14} /> WhatsApp Cliente
                          </button>
                        </div>
                      </div>

                      {/* Customer Details & Address */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 border-b border-gray-100 text-xs">
                        <div>
                          <span className="font-bold text-gray-400 uppercase tracking-wider block mb-1">Cliente</span>
                          <p className="font-extrabold text-[#1E293B] text-sm">{order.customer_name}</p>
                          <p className="text-gray-500">{order.phone} • {order.email}</p>
                        </div>

                        <div>
                          <span className="font-bold text-gray-400 uppercase tracking-wider block mb-1 flex items-center gap-1">
                            <MapPin size={12} /> Endereço de Entrega (ES)
                          </span>
                          <p className="font-bold text-[#1E293B]">{order.address}</p>
                          <p className="text-gray-500 flex items-center gap-1 mt-0.5">
                            <Calendar size={12} /> Agendado para: {order.scheduled_date}
                          </p>
                        </div>

                        <div>
                          <span className="font-bold text-gray-400 uppercase tracking-wider block mb-1 flex items-center gap-1">
                            <FileText size={12} /> Observações do Cliente
                          </span>
                          <p className="text-xs text-[#2563EB] font-bold bg-blue-50 p-2 rounded-lg border border-blue-100">
                            {order.notes || 'Nenhuma observação especial.'}
                          </p>
                        </div>
                      </div>

                      {/* PICKING LIST / ITEM CHECKLIST */}
                      <div className="pt-4">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-xs font-extrabold text-[#1E293B] uppercase tracking-wider flex items-center gap-1.5">
                            <CheckSquare size={16} className="text-[#2563EB]" /> Lista de Separação de Insumos ({totalItemsCount} peças)
                          </span>
                          <span className="text-xs text-gray-500 font-bold">
                            {checkedCount} de {order.items?.length || 0} itens checados na caixa
                          </span>
                        </div>

                        <div className="space-y-2 bg-gray-50/70 p-4 rounded-2xl border border-gray-100">
                          {order.items?.map((item) => {
                            const isChecked = !!orderCheckedState[item.product_id];
                            return (
                              <div 
                                key={item.product_id}
                                onClick={() => toggleItemChecked(order.id, item.product_id)}
                                className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                                  isChecked ? 'bg-emerald-50 border border-emerald-200' : 'bg-white border border-gray-200 hover:border-[#BFDBFE]'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  {isChecked ? (
                                    <CheckSquare size={20} className="text-emerald-600 shrink-0" />
                                  ) : (
                                    <Square size={20} className="text-gray-300 shrink-0" />
                                  )}
                                  
                                  <img src={item.product_image} alt={item.product_name} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                                  
                                  <div>
                                    <span className={`font-bold text-xs sm:text-sm block ${isChecked ? 'line-through text-gray-500' : 'text-[#1E293B]'}`}>
                                      {item.product_name}
                                    </span>
                                    <span className="text-xs text-gray-400">R$ {item.price.toFixed(2).replace('.', ',')} un</span>
                                  </div>
                                </div>

                                <div className="text-right">
                                  <span className="bg-[#2563EB] text-white text-xs font-black px-3 py-1 rounded-lg">
                                    {item.qty}x
                                  </span>
                                  <span className="block text-xs font-bold text-[#1E293B] mt-1">
                                    R$ {(item.price * item.qty).toFixed(2).replace('.', ',')}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        <div className="flex justify-between items-center mt-4 pt-2">
                          <span className="text-xs text-gray-400 font-bold">Total da Encomenda:</span>
                          <span className="text-2xl font-black text-[#2563EB]">R$ {order.total.toFixed(2).replace('.', ',')}</span>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

          </>
        )}

      </main>

      {/* MODAL: CREATE / EDIT INSTAGRAM POST */}
      {editingInstaPost && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#1E293B]">
                {editingInstaPost.id ? 'Editar Post do Insta' : 'Novo Post do Insta'}
              </h3>
              <button onClick={() => setEditingInstaPost(null)} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveInstaPost} className="space-y-4 text-sm">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Título do Post</label>
                <textarea 
                  required
                  rows={2}
                  value={editingInstaPost.title || ''} 
                  onChange={e => setEditingInstaPost({...editingInstaPost, title: e.target.value})}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-[#2563EB] outline-none"
                  placeholder="Ex: Passo a passo de crochê com fio de algodão supremo..."
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Tag / Etiqueta</label>
                <input 
                  type="text" 
                  value={editingInstaPost.tag || ''} 
                  onChange={e => setEditingInstaPost({...editingInstaPost, tag: e.target.value.toUpperCase()})}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-[#2563EB] outline-none"
                  placeholder="Ex: TUTORIAL CROCHÊ, NOVIDADE..."
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">URL da Imagem</label>
                <input 
                  required
                  type="text" 
                  value={editingInstaPost.image || ''} 
                  onChange={e => setEditingInstaPost({...editingInstaPost, image: e.target.value})}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-[#2563EB] outline-none text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Curtidas</label>
                  <input 
                    type="text" 
                    value={editingInstaPost.likes || '250'} 
                    onChange={e => setEditingInstaPost({...editingInstaPost, likes: e.target.value})}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-[#2563EB] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Comentários</label>
                  <input 
                    type="text" 
                    value={editingInstaPost.comments || '18'} 
                    onChange={e => setEditingInstaPost({...editingInstaPost, comments: e.target.value})}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-[#2563EB] outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button type="button" variant="ghost" onClick={() => setEditingInstaPost(null)}>Cancelar</Button>
                <Button type="submit">Salvar Post</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CREATE / EDIT CATEGORY */}
      {editingCategory && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#1E293B]">
                {editingCategory.id ? 'Editar Categoria' : 'Nova Categoria'}
              </h3>
              <button onClick={() => setEditingCategory(null)} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-4 text-sm">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Nome da Categoria</label>
                <input 
                  required
                  type="text" 
                  value={editingCategory.name || ''} 
                  onChange={e => setEditingCategory({...editingCategory, name: e.target.value})}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-[#2563EB] outline-none"
                  placeholder="Ex: Fios & Linhas, Matérias-Primas..."
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Cor do Card / Gradiente</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="color" 
                    value={editingCategory.color || '#2563EB'} 
                    onChange={e => setEditingCategory({...editingCategory, color: e.target.value})}
                    className="w-10 h-10 rounded-lg border-2 border-gray-200 cursor-pointer p-0.5 bg-white"
                  />
                  <input 
                    type="text" 
                    value={editingCategory.color || '#2563EB'} 
                    onChange={e => setEditingCategory({...editingCategory, color: e.target.value})}
                    className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:border-[#2563EB] outline-none text-xs font-mono"
                    placeholder="#2563EB"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">URL da Imagem de Fundo</label>
                <input 
                  required
                  type="text" 
                  value={editingCategory.image || ''} 
                  onChange={e => setEditingCategory({...editingCategory, image: e.target.value})}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-[#2563EB] outline-none text-xs"
                  placeholder="https://images.unsplash.com/..."
                />
                {editingCategory.image && (
                  <div className="mt-2 relative h-24 rounded-xl overflow-hidden border border-gray-200">
                    <img 
                      src={editingCategory.image} 
                      alt="preview" 
                      className="w-full h-full object-cover"
                      onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                    <div 
                      className="absolute inset-0 opacity-60" 
                      style={{ background: `linear-gradient(to top, ${editingCategory.color || '#2563EB'} 0%, transparent 100%)` }} 
                    />
                    <span className="absolute bottom-2 left-2 text-white font-bold text-xs">Pré-visualização</span>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button type="button" variant="ghost" onClick={() => setEditingCategory(null)}>Cancelar</Button>
                <Button type="submit">Salvar Categoria</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PRODUCT PREVIEW MODAL (same as store) */}
      {previewProduct && (
        <ProductModal
          product={previewProduct}
          onClose={() => setPreviewProduct(null)}
        />
      )}

    </div>
  );
};
