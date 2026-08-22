/**
 * Utilitário de Conversão e Otimização de Imagens para WebP
 * Converte qualquer imagem (JPEG, PNG, BMP, etc.) diretamente no navegador
 * usando a API nativa HTML5 Canvas sem precisar de bibliotecas pesadas.
 */

export interface WebPConversionResult {
  file: File;
  blob: Blob;
  dataUrl: string;
  originalSize: number; // bytes
  webpSize: number;     // bytes
  reductionPercent: number; // % economia
  filename: string;
  width: number;
  height: number;
}

export interface ConvertOptions {
  quality?: number;     // 0.1 a 1.0 (padrão 0.85)
  maxWidth?: number;    // Dimensão máxima de largura (padrão 1200px)
  maxHeight?: number;   // Dimensão máxima de altura (padrão 1200px)
}

/**
 * Converte um arquivo de imagem (JPEG, PNG, etc.) para WebP otimizado
 */
export async function convertImageToWebP(
  file: File,
  options: ConvertOptions = {}
): Promise<WebPConversionResult> {
  const {
    quality = 0.85,
    maxWidth = 1200,
    maxHeight = 1200
  } = options;

  return new Promise((resolve, reject) => {
    // Verificar se é imagem
    if (!file.type.startsWith('image/')) {
      return reject(new Error('O arquivo selecionado não é uma imagem válida.'));
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Falha ao ler o arquivo de imagem.'));

    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Falha ao carregar a imagem para conversão.'));

      img.onload = () => {
        // Calcular novas dimensões mantendo o aspect ratio
        let { width, height } = img;

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        // Criar Canvas para renderização e conversão
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return reject(new Error('Não foi possível obter o contexto 2D do Canvas.'));
        }

        // Suavização de alta qualidade
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Desenhar a imagem redimensionada
        ctx.drawImage(img, 0, 0, width, height);

        // Exportar como WebP
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              return reject(new Error('Falha na conversão para formato WebP.'));
            }

            const dataUrl = canvas.toDataURL('image/webp', quality);
            const originalNameWithoutExt = file.name.replace(/\.[^/.]+$/, '');
            const cleanName = originalNameWithoutExt
              .toLowerCase()
              .replace(/[^a-z0-9_-]+/g, '-')
              .replace(/(^-|-$)/g, '');
            const newFilename = `${cleanName || 'foto'}-${Date.now()}.webp`;

            const webpFile = new File([blob], newFilename, {
              type: 'image/webp',
              lastModified: Date.now()
            });

            const originalSize = file.size;
            const webpSize = blob.size;
            const reductionPercent = originalSize > 0 
              ? Math.max(0, Math.round(((originalSize - webpSize) / originalSize) * 100))
              : 0;

            resolve({
              file: webpFile,
              blob,
              dataUrl,
              originalSize,
              webpSize,
              reductionPercent,
              filename: newFilename,
              width,
              height
            });
          },
          'image/webp',
          quality
        );
      };

      img.src = reader.result as string;
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Formata bytes em texto legível (ex: 2.4 MB, 180 KB)
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}
