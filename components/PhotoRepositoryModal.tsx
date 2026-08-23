import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Image as ImageIcon, X, Check, Sparkles, Search } from 'lucide-react';
import { ImageUploader } from './ImageUploader';
import { formatFileSize } from '../services/imageUtils';
import { Button } from './ui/Button';

interface PhotoRepositoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (url: string) => void;
  title?: string;
}

export const PhotoRepositoryModal: React.FC<PhotoRepositoryModalProps> = ({
  isOpen,
  onClose,
  onSelectImage,
  title = 'Repositório de Fotos'
}) => {
  const [images, setImages] = useState<{ filename: string; url: string; sizeBytes: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'gallery' | 'upload'>('gallery');

  const loadRepository = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/upload');
      if (res.ok) {
        const data = await res.json();
        setImages(data);
      }
    } catch (e) {
      console.warn('Repositório offline:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadRepository();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredImages = images.filter(img => {
    if (!search.trim()) return true;
    return img.filename.toLowerCase().includes(search.toLowerCase());
  });

  const handleSelect = (url: string) => {
    onSelectImage(url);
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-[110] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in font-lato">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-3xl w-full shadow-2xl border border-[#BFDBFE] max-h-[88vh] flex flex-col justify-between space-y-5">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center border border-blue-200">
              <ImageIcon size={20} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#1E293B] font-nunito leading-tight">{title}</h3>
              <p className="text-xs text-gray-500">Escolha uma foto do repositório ou faça upload/drop de uma nova.</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Tab Buttons & Search */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
          <div className="flex items-center bg-gray-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setActiveTab('gallery')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'gallery' ? 'bg-white text-[#2563EB] shadow-xs' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Galeria ({images.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('upload')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'upload' ? 'bg-white text-[#2563EB] shadow-xs' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              + Dropar / Novo Upload
            </button>
          </div>

          {activeTab === 'gallery' && (
            <div className="relative flex-1 sm:max-w-xs">
              <input
                type="text"
                placeholder="Filtrar por nome..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full px-3 py-1.5 pl-8 rounded-xl border border-gray-200 text-xs focus:border-[#2563EB] outline-none"
              />
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto pr-1 min-h-[300px] max-h-[460px]">
          {activeTab === 'upload' ? (
            <div className="py-4 space-y-4">
              <ImageUploader
                label="Arraste e solte uma imagem (JPEG/PNG) para converter e salvar no repositório"
                onImageUploaded={(url) => {
                  loadRepository();
                  handleSelect(url);
                }}
              />
            </div>
          ) : loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-36 bg-gray-100 rounded-2xl animate-pulse"></div>
              ))}
            </div>
          ) : filteredImages.length === 0 ? (
            <div className="text-center py-16 px-4 bg-gray-50/70 border-2 border-dashed border-gray-200 rounded-2xl">
              <ImageIcon size={36} className="mx-auto mb-2 text-gray-300" />
              <p className="font-bold text-sm text-[#1E293B]">Nenhuma foto encontrada no repositório</p>
              <p className="text-xs text-gray-400 mt-1">Faça o upload ou arraste uma foto para começar.</p>
              <Button onClick={() => setActiveTab('upload')} className="mt-4 text-xs font-bold">
                Fazer Upload / Dropar Agora
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
              {filteredImages.map((img) => (
                <div
                  key={img.filename}
                  onClick={() => handleSelect(img.url)}
                  className="group relative bg-[#F8FAFC] border border-gray-200 hover:border-[#2563EB] rounded-2xl overflow-hidden p-2 text-left cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className="w-full aspect-square rounded-xl overflow-hidden bg-white border border-gray-100 relative">
                    <img
                      src={img.url}
                      alt={img.filename}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/20 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 bg-[#2563EB] text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-md transition-opacity flex items-center gap-1">
                        <Check size={13} /> Escolher
                      </span>
                    </div>
                  </div>
                  <div className="mt-1.5 px-0.5">
                    <p className="text-[11px] font-bold text-[#1E293B] truncate" title={img.filename}>
                      {img.filename}
                    </p>
                    <span className="text-[10px] text-gray-400 font-mono">
                      {formatFileSize(img.sizeBytes)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center border-t border-gray-100 pt-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Sparkles size={14} className="text-amber-500" /> Galeria oficial da loja
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
