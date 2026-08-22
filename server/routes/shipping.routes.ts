import { Router } from 'express';
import { ShippingController } from '../controllers/shipping.controller.js';

export const shippingRouter = Router();

// POST /api/shipping/calculate
shippingRouter.post('/calculate', ShippingController.calculate);

// GET /api/shipping/package-preview
shippingRouter.get('/package-preview', ShippingController.getPackagePreview);
