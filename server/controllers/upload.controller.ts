import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Diretório de uploads no servidor (public/uploads ou uploads)
const uploadsDir = path.resolve(__dirname, '../../uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

export const UploadController = {
  /**
   * Salva imagem convertida em WebP no repositório local de uploads
   * Aceita payload com base64 dataUrl ou buffer
   */
  async uploadWebP(req: Request, res: Response, next: NextFunction) {
    try {
      const { dataUrl, filename } = req.body;

      if (!dataUrl || typeof dataUrl !== 'string') {
        res.status(400).json({ error: 'Nenhuma imagem enviada (dataUrl requerido)' });
        return;
      }

      // Extrair base64 da string data:image/webp;base64,...
      const matches = dataUrl.match(/^data:image\/([a-zA-Z0-9-+.]+);base64,(.+)$/);
      if (!matches || matches.length !== 3) {
        res.status(400).json({ error: 'Formato de imagem base64 inválido' });
        return;
      }

      const ext = matches[1].toLowerCase().replace('jpeg', 'jpg');
      const base64Data = matches[2];
      const buffer = Buffer.from(base64Data, 'base64');

      // Gerar nome de ficheiro seguro com extensão .webp ou original
      const safeExt = ext === 'webp' ? 'webp' : 'webp'; // Garantir webp
      const rawName = (filename || 'imagem').replace(/\.[^/.]+$/, '');
      const cleanName = rawName
        .toLowerCase()
        .replace(/[^a-z0-9_-]+/g, '-')
        .replace(/(^-|-$)/g, '');

      const finalFilename = `${cleanName || 'foto'}-${Date.now()}.${safeExt}`;
      const filePath = path.join(uploadsDir, finalFilename);

      // Gravar no disco
      fs.writeFileSync(filePath, buffer);

      const publicUrl = `/uploads/${finalFilename}`;

      res.status(201).json({
        success: true,
        url: publicUrl,
        filename: finalFilename,
        sizeBytes: buffer.length,
        message: 'Foto convertida e salva com sucesso no repositório!'
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Listar todas as imagens guardadas no repositório de uploads
   */
  async listUploads(req: Request, res: Response, next: NextFunction) {
    try {
      if (!fs.existsSync(uploadsDir)) {
        res.json([]);
        return;
      }

      const files = fs.readdirSync(uploadsDir);
      const images = files
        .filter(f => /\.(webp|jpg|jpeg|png|gif|svg)$/i.test(f))
        .map(f => {
          const stats = fs.statSync(path.join(uploadsDir, f));
          return {
            filename: f,
            url: `/uploads/${f}`,
            sizeBytes: stats.size,
            createdAt: stats.birthtime
          };
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

      res.json(images);
    } catch (err) {
      next(err);
    }
  }
};
