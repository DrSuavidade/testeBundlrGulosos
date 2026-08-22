import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller.js';
import { requireAdmin } from '../middleware/auth.js';

export const categoryRouter = Router();

// Públicas
categoryRouter.get('/', CategoryController.getAll);
categoryRouter.get('/:id', CategoryController.getById);

// Administrativas
categoryRouter.post('/', requireAdmin, CategoryController.create);
categoryRouter.put('/:id', requireAdmin, CategoryController.update);
categoryRouter.delete('/:id', requireAdmin, CategoryController.delete);
