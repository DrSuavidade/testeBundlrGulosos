import { z } from 'zod';
import { calculateShipping, selectPackageByWeight } from '../services/melhorEnvio.service.js';
const shippingCalculateSchema = z.object({
    postalCode: z.string().min(8, 'CEP inválido'),
    items: z.array(z.object({
        productId: z.string().optional(),
        name: z.string().optional(),
        weightGrams: z.number().nonnegative().optional(),
        qty: z.number().int().positive().default(1),
        price: z.number().nonnegative().default(0)
    })).min(1, 'Adicione pelo menos um produto para calcular o frete')
});
export const ShippingController = {
    async calculate(req, res, next) {
        try {
            const parsed = shippingCalculateSchema.parse(req.body);
            const result = await calculateShipping(parsed.postalCode, parsed.items);
            res.json(result);
        }
        catch (err) {
            if (err instanceof z.ZodError) {
                res.status(400).json({ error: err.errors[0]?.message || 'Dados inválidos' });
                return;
            }
            next(err);
        }
    },
    async getPackagePreview(req, res, next) {
        try {
            const weight = parseFloat(req.query.weight) || 0;
            const pkg = selectPackageByWeight(weight);
            res.json(pkg);
        }
        catch (err) {
            next(err);
        }
    }
};
