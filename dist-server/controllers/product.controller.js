import { z } from 'zod';
import { ProductModel } from '../models/product.model.js';
const productSchema = z.object({
    name: z.string().min(2, 'Nome é obrigatório'),
    slug: z.string().min(2, 'Slug é obrigatório'),
    description: z.string().nullable().optional(),
    price: z.number().nonnegative('Preço deve ser positivo'),
    stock: z.number().int().nonnegative('Estoque não pode ser negativo'),
    category_id: z.string().nullable().optional(),
    weight_grams: z.number().int().nonnegative().optional().default(250),
    height_cm: z.number().nonnegative().optional().default(5),
    width_cm: z.number().nonnegative().optional().default(15),
    length_cm: z.number().nonnegative().optional().default(20),
    weight_label: z.string().nullable().optional(),
    composition: z.string().nullable().optional(),
    tags: z.array(z.string()).optional().default([]),
    allergens: z.array(z.string()).optional().default([]),
    images: z.array(z.string()).optional().default([]),
    active: z.boolean().optional().default(true),
    featured: z.boolean().optional().default(false),
    colors: z.array(z.object({
        name: z.string(),
        hex: z.string(),
        image_url: z.string()
    })).optional()
});
export const ProductController = {
    async getAll(req, res, next) {
        try {
            const activeOnly = req.query.active === 'true';
            const products = await ProductModel.findAll(activeOnly);
            res.json(products);
        }
        catch (err) {
            next(err);
        }
    },
    async getFeatured(req, res, next) {
        try {
            const products = await ProductModel.findFeatured();
            res.json(products);
        }
        catch (err) {
            next(err);
        }
    },
    async getById(req, res, next) {
        try {
            const id = String(req.params.id);
            const product = await ProductModel.findById(id);
            if (!product) {
                res.status(404).json({ error: 'Produto não encontrado' });
                return;
            }
            res.json(product);
        }
        catch (err) {
            next(err);
        }
    },
    async create(req, res, next) {
        try {
            const parsed = productSchema.parse(req.body);
            const created = await ProductModel.create(parsed);
            res.status(201).json(created);
        }
        catch (err) {
            if (err instanceof z.ZodError) {
                res.status(400).json({ error: err.errors[0]?.message || 'Dados inválidos' });
                return;
            }
            next(err);
        }
    },
    async update(req, res, next) {
        try {
            const id = String(req.params.id);
            const partialSchema = productSchema.partial();
            const parsed = partialSchema.parse(req.body);
            const updated = await ProductModel.update(id, parsed);
            if (!updated) {
                res.status(404).json({ error: 'Produto não encontrado' });
                return;
            }
            res.json(updated);
        }
        catch (err) {
            if (err instanceof z.ZodError) {
                res.status(400).json({ error: err.errors[0]?.message || 'Dados inválidos' });
                return;
            }
            next(err);
        }
    },
    async delete(req, res, next) {
        try {
            const id = String(req.params.id);
            const deleted = await ProductModel.delete(id);
            if (!deleted) {
                res.status(404).json({ error: 'Produto não encontrado' });
                return;
            }
            res.json({ success: true, message: 'Produto removido com sucesso' });
        }
        catch (err) {
            next(err);
        }
    }
};
