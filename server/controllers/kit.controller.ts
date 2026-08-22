import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { KitModel } from '../models/kit.model.js';

const kitItemSchema = z.object({
  product_id: z.string().min(1, 'Product ID é obrigatório'),
  qty: z.number().int().positive('Quantidade do item deve ser positiva'),
  selected_color: z.string().optional()
});

const kitCreateSchema = z.object({
  name: z.string().min(2, 'Nome do kit é obrigatório'),
  slug: z.string().optional(),
  description: z.string().optional(),
  price: z.number().positive('Preço promocional do kit deve ser positivo'),
  badge_text: z.string().optional(),
  banner_image: z.string().optional(),
  active: z.boolean().optional().default(true),
  featured: z.boolean().optional().default(true),
  items: z.array(kitItemSchema).min(1, 'Selecione pelo menos um produto para o kit')
});

const kitUpdateSchema = kitCreateSchema.partial();

export const KitController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const activeOnly = req.query.active === 'true';
      const kits = await KitModel.findAll(activeOnly);
      res.json(kits);
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      const kit = await KitModel.findById(id);
      if (!kit) {
        res.status(404).json({ error: 'Kit não encontrado' });
        return;
      }
      res.json(kit);
    } catch (err) {
      next(err);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = kitCreateSchema.parse(req.body);
      const created = await KitModel.create(parsed);
      res.status(201).json(created);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ error: err.errors[0]?.message || 'Dados inválidos' });
        return;
      }
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      const parsed = kitUpdateSchema.parse(req.body);
      const updated = await KitModel.update(id, parsed);
      if (!updated) {
        res.status(404).json({ error: 'Kit não encontrado' });
        return;
      }
      res.json(updated);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ error: err.errors[0]?.message || 'Dados inválidos' });
        return;
      }
      next(err);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      const success = await KitModel.delete(id);
      if (!success) {
        res.status(404).json({ error: 'Kit não encontrado' });
        return;
      }
      res.json({ success: true, message: 'Kit removido com sucesso' });
    } catch (err) {
      next(err);
    }
  }
};
