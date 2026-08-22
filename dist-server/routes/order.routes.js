import { Router } from 'express';
import { OrderController } from '../controllers/order.controller.js';
import { requireAdmin } from '../middleware/auth.js';
export const orderRouter = Router();
// Cliente (Pública)
orderRouter.post('/', OrderController.create);
// Admin Métricas e Gestão Segura
orderRouter.get('/metrics', requireAdmin, OrderController.getMetrics);
orderRouter.get('/', requireAdmin, OrderController.getAll);
orderRouter.get('/:id', OrderController.getById);
orderRouter.patch('/:id/status', requireAdmin, OrderController.updateStatus);
orderRouter.post('/:id/generate-label', requireAdmin, OrderController.generateLabel);
