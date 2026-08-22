import { Router } from 'express';
import { KitController } from '../controllers/kit.controller.js';
import { requireAdmin } from '../middleware/auth.js';

export const kitRouter = Router();

// Leitura pública de kits
kitRouter.get('/', KitController.getAll);
kitRouter.get('/:id', KitController.getById);

// Gestão de kits restrita ao Administrador
kitRouter.post('/', requireAdmin, KitController.create);
kitRouter.put('/:id', requireAdmin, KitController.update);
kitRouter.delete('/:id', requireAdmin, KitController.delete);
