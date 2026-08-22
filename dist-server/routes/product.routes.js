import { Router } from 'express';
import { ProductController } from '../controllers/product.controller.js';
import { requireAdmin } from '../middleware/auth.js';
export const productRouter = Router();
// Rotas Públicas
productRouter.get('/', ProductController.getAll);
productRouter.get('/featured', ProductController.getFeatured);
productRouter.get('/:id', ProductController.getById);
// Rotas Administrativas
productRouter.post('/', requireAdmin, ProductController.create);
productRouter.put('/:id', requireAdmin, ProductController.update);
productRouter.delete('/:id', requireAdmin, ProductController.delete);
