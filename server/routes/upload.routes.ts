import { Router } from 'express';
import { UploadController } from '../controllers/upload.controller.js';

export const uploadRouter = Router();

// POST /api/upload - Salvar imagem convertida em WebP
uploadRouter.post('/', UploadController.uploadWebP);

// GET /api/upload - Listar repositório de imagens
uploadRouter.get('/', UploadController.listUploads);
