import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Mail, KeyRound, ArrowRight, ShieldCheck, X, AlertCircle, Sparkles, RefreshCw, Check } from 'lucide-react';
import { customerService, CustomerUser } from '../services/customerService';
import { Button } from './ui/Button';

interface CustomerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (customer: CustomerUser) => void;
}

export const CustomerAuthModal: React.FC<CustomerAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [devPreview, setDevPreview] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError('Por favor, informe um email válido.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const res = await customerService.sendLoginCode(email.trim());
      setStep('code');
      if (res.preview) {
        setDevPreview(res.preview);
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao enviar código de acesso.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      setError('Por favor, digite o código de 6 dígitos recebido.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const res = await customerService.verifyCode(email.trim(), code.trim());
      onSuccess(res.customer);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Código incorreto ou expirado.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep('email');
    setCode('');
    setError(null);
    setDevPreview(null);
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-[#BFDBFE] relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-[#1E293B] hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-[#EFF6FF] text-[#2563EB] rounded-2xl flex items-center justify-center mx-auto mb-3 border border-[#BFDBFE]">
            {step === 'email' ? <Mail size={26} /> : <KeyRound size={26} />}
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#1E293B] font-nunito">
            {step === 'email' ? 'Acessar Minha Conta' : 'Digite o Código de Segurança'}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {step === 'email'
              ? 'Acesso simples e rápido sem senha! Enviaremos um código para seu email.'
              : `Enviamos um código de 6 dígitos para ${email}`}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-xl flex items-center gap-2 animate-fade-in">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Sandbox Dev Code Preview */}
        {devPreview && step === 'code' && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-xl flex items-center justify-between animate-fade-in">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-amber-600" />
              <span>{devPreview}</span>
            </div>
            {devPreview.match(/\d{6}/) && (
              <button
                type="button"
                onClick={() => {
                  const match = devPreview.match(/\d{6}/);
                  if (match) setCode(match[0]);
                }}
                className="px-2 py-1 bg-amber-600 text-white font-bold text-[10px] rounded-lg hover:bg-amber-700 transition-colors"
              >
                Preencher
              </button>
            )}
          </div>
        )}

        {step === 'email' ? (
          <form onSubmit={handleSendCode} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                Seu Email Cadastrado ou de Compra
              </label>
              <div className="relative">
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemplo@gmail.com"
                  autoFocus
                  className="w-full px-4 py-3 pl-11 rounded-2xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-[#93C5FD] outline-none text-sm font-semibold text-[#1E293B] transition-all"
                />
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <Button
              fullWidth
              size="lg"
              type="submit"
              disabled={loading}
              className="py-3.5 text-sm font-bold shadow-md shadow-[#2563EB]/25"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <RefreshCw size={16} className="animate-spin" /> Enviando Código...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Receber Código de Acesso <ArrowRight size={16} />
                </span>
              )}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerifyCode} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider text-center">
                Código de 6 Dígitos
              </label>
              <input
                required
                type="text"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                placeholder="000000"
                autoFocus
                className="w-full px-4 py-3 text-center tracking-[10px] text-2xl font-black font-mono rounded-2xl border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-[#93C5FD] outline-none text-[#1E293B] transition-all"
              />
              <p className="text-[11px] text-gray-400 text-center mt-1.5">
                ⏱️ O código expira em 15 minutos.
              </p>
            </div>

            <Button
              fullWidth
              size="lg"
              type="submit"
              disabled={loading || code.length < 4}
              className="py-3.5 text-sm font-bold shadow-md shadow-[#2563EB]/25"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <RefreshCw size={16} className="animate-spin" /> Validando...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <ShieldCheck size={18} /> Entrar na Minha Conta
                </span>
              )}
            </Button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-[#2563EB] font-bold hover:underline"
              >
                ← Usar outro email ou reenviar
              </button>
            </div>
          </form>
        )}

        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-center gap-2 text-[11px] text-gray-400">
          <ShieldCheck size={14} className="text-emerald-500" />
          <span>Acesso criptografado e seguro · Pedra Mania</span>
        </div>
      </div>
    </div>,
    document.body
  );
};
