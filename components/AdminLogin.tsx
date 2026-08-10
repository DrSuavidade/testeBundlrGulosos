import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Lock, User, ArrowLeft, ShieldCheck, AlertCircle } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onBackToStore: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onBackToStore }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (username.trim().toLowerCase() === 'admin' && password === 'admin') {
        sessionStorage.setItem('pedramania_admin_auth', 'true');
        onLoginSuccess();
      } else {
        setError('Usuário ou senha incorretos. (Dica: admin / admin)');
        setLoading(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#F0F7FF] flex items-center justify-center p-4 relative overflow-hidden font-lato selection:bg-[#93C5FD]">
      
      {/* Background Decorative Gradient Blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#93C5FD]/40 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#BFDBFE]/60 rounded-full blur-3xl animate-blob animation-delay-2000"></div>

      <div className="max-w-md w-full relative z-10">
        
        {/* Top Back Link */}
        <div className="mb-6 flex justify-between items-center">
          <button 
            onClick={onBackToStore}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#1E293B] hover:text-[#2563EB] transition-colors bg-white/80 backdrop-blur-md px-3.5 py-2 rounded-full shadow-sm"
          >
            <ArrowLeft size={16} /> Voltar para a Loja Virtual
          </button>
          <span className="text-xs font-extrabold text-[#2563EB] bg-blue-100 px-3 py-1 rounded-full">
            Área Restrita
          </span>
        </div>

        {/* Login Card */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/60">
          
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#2563EB] text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#2563EB]/30">
              <ShieldCheck size={32} />
            </div>
            <h2 className="font-pacifico text-3xl text-[#1E293B] mb-1">Pedra Mania</h2>
            <p className="text-xs font-extrabold text-gray-500 uppercase tracking-widest">Painel de Administração</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-start gap-3 animate-fade-in-up">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-extrabold text-[#1E293B] uppercase tracking-wider mb-2">
                Usuário Admin
              </label>
              <div className="relative">
                <input 
                  required
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10 outline-none transition-all text-sm font-bold text-[#1E293B]"
                />
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-[#1E293B] uppercase tracking-wider mb-2">
                Senha de Acesso
              </label>
              <div className="relative">
                <input 
                  required
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10 outline-none transition-all text-sm font-bold text-[#1E293B]"
                />
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <Button 
              fullWidth 
              type="submit" 
              className="py-3.5 text-base font-bold shadow-lg shadow-[#2563EB]/30 mt-2"
            >
              {loading ? 'Autenticando...' : 'Entrar no Painel'}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-[11px] text-gray-400 font-bold">
              Credenciais padrão de teste: <code className="bg-gray-100 text-[#2563EB] px-2 py-0.5 rounded">admin</code> / <code className="bg-gray-100 text-[#2563EB] px-2 py-0.5 rounded">admin</code>
            </p>
          </div>

        </div>

        <p className="text-center text-xs text-gray-400 mt-6 font-bold">
          Pedra Mania Armarinho & Artesanato • Vitória/ES
        </p>

      </div>
    </div>
  );
};
