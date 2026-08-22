import React, { useState, useRef } from 'react';
import { convertImageToWebP, formatFileSize, WebPConversionResult } from '../services/imageUtils';
import { UploadCloud, Image as ImageIcon, Sparkles, Check, AlertCircle, RefreshCw, X } from 'lucide-react';

interface ImageUploaderProps {
  currentImageUrl?: string;
  onImageUploaded: (url: string) => void;
  label?: string;
  className?: string;
  compact?: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  currentImageUrl,
  onImageUploaded,
  label = 'Submeter Foto',
  className = '',
  compact = false
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [conversionData, setConversionData] = useState<WebPConversionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setError(null);
    setIsConverting(true);

    try {
      // 1. Converter para WebP no navegador via Canvas
      const result = await convertImageToWebP(file, { quality: 0.85, maxWidth: 1200, maxHeight: 1200 });
      setConversionData(result);
      setPreviewUrl(result.dataUrl);

      // 2. Enviar para o repositório local do servidor via /api/upload
      setIsUploading(true);
      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            dataUrl: result.dataUrl,
            filename: result.filename
          })
        });

        if (res.ok) {
          const data = await res.json();
          onImageUploaded(data.url);
        } else {
          // Fallback: usar a dataURL caso o endpoint falhe
          onImageUploaded(result.dataUrl);
        }
      } catch (uploadErr) {
        // Fallback local se backend offline
        onImageUploaded(result.dataUrl);
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao processar imagem.');
    } finally {
      setIsConverting(false);
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleClear = () => {
    setPreviewUrl(null);
    setConversionData(null);
    onImageUploaded('');
  };

  if (compact) {
    return (
      <div className={`relative inline-flex items-center ${className}`}>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/webp,image/bmp"
          onChange={handleFileSelect}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isConverting || isUploading}
          className="px-3 py-1.5 bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#2563EB] font-bold text-xs rounded-xl border border-[#93C5FD] flex items-center gap-1.5 transition-all cursor-pointer shadow-xs disabled:opacity-50"
          title="Submeter imagem do dispositivo"
        >
          {isConverting || isUploading ? (
            <RefreshCw size={13} className="animate-spin" />
          ) : (
            <UploadCloud size={13} className="text-[#2563EB]" />
          )}
          <span>{isConverting ? 'Processando...' : isUploading ? 'Salvando...' : 'Submeter'}</span>
        </button>
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {label && (
        <label className="block text-xs sm:text-sm font-bold text-gray-700">
          {label}
        </label>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp,image/bmp"
        onChange={handleFileSelect}
        className="hidden"
      />

      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-[#93C5FD] hover:border-[#2563EB] bg-[#F8FAFC] hover:bg-[#F0F7FF] rounded-2xl p-5 text-center cursor-pointer transition-all group"
      >
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-2.5 shadow-sm text-[#2563EB] group-hover:scale-110 transition-transform">
          {isConverting || isUploading ? (
            <RefreshCw size={24} className="animate-spin text-[#2563EB]" />
          ) : (
            <UploadCloud size={24} />
          )}
        </div>

        <p className="font-bold text-sm text-[#1E293B] group-hover:text-[#2563EB] transition-colors">
          {isConverting 
            ? 'Processando imagem...' 
            : isUploading 
            ? 'Gravando no repositório...' 
            : 'Clique ou arraste a imagem para submeter'}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Formatos suportados: PNG, JPEG, JPG ou WebP.
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
          <AlertCircle size={15} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Card de Sucesso do Upload */}
      {conversionData && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 flex items-center justify-between text-xs text-emerald-800 animate-fade-in">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0">
              <Check size={16} strokeWidth={3} />
            </div>
            <div>
              <p className="font-bold">
                Foto submetida com sucesso!
              </p>
              <p className="text-emerald-700 text-[11px]">
                {conversionData.filename} ({conversionData.width}x{conversionData.height}px)
              </p>
            </div>
          </div>

          <span className="px-2 py-1 bg-emerald-600 text-white font-extrabold text-[11px] rounded-lg shadow-xs">
            Pronto
          </span>
        </div>
      )}

      {/* Preview da Imagem */}
      {previewUrl && (
        <div className="relative rounded-2xl overflow-hidden border border-gray-200 bg-white p-2 flex items-center gap-3">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-16 h-16 rounded-xl object-cover border border-gray-100 shrink-0"
          />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-gray-700 truncate">
              {previewUrl.startsWith('data:') ? 'Imagem carregada' : previewUrl}
            </p>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-[#2563EB] text-[10px] font-bold rounded-md mt-1">
              <Check size={10} /> Imagem Vinculada
            </span>
          </div>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); handleClear(); }}
            className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
            title="Remover imagem"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
};
