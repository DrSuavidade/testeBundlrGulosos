import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { CategoryModel } from '../models/category.model.js';

const categorySchema = z.object({
  name: z.string().min(2, 'Nome é obrigatório'),
  color: z.string().min(4, 'Cor hexadecimal é obrigatória'),
  image_url: z.string().url('URL da imagem inválida'),
});

export const CategoryController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await CategoryModel.findAll();
      res.json(categories);
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = String(req.params.id);
      const category = await CategoryModel.findById(id);
      if (!category) {
        res.status(404).json({ error: 'Categoria não encontrada' });
        return;
      }
      res.json(category);
    } catch (err) {
      next(err);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = categorySchema.parse(req.body);
      const slug = (req.body.id || parsed.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
      const created = await CategoryModel.create({
        id: slug,
        name: parsed.name,
        color: parsed.color,
        image_url: parsed.image_url
      });
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
      const parsed = categorySchema.partial().parse(req.body);
      const updated = await CategoryModel.update(id, parsed);
      if (!updated) {
        res.status(404).json({ error: 'Categoria não encontrada' });
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
      const deleted = await CategoryModel.delete(id);
      if (!deleted) {
        res.status(404).json({ error: 'Categoria não encontrada' });
        return;
      }
      res.json({ success: true, message: 'Categoria removida com sucesso' });
    } catch (err) {
      next(err);
    }
  }
};
