import { z } from 'zod';
import { OrderModel } from '../models/order.model.js';
import { CustomerModel } from '../models/customer.model.js';
import { EmailService } from '../services/email.service.js';
const orderCreateSchema = z.object({
    customer_name: z.string().min(2, 'Nome do cliente é obrigatório'),
    email: z.string().email('Email inválido'),
    phone: z.string().min(8, 'Telefone inválido'),
    fulfillment_type: z.enum(['delivery', 'pickup']).default('delivery'),
    address_zip: z.string().optional(),
    address_street: z.string().optional(),
    address_number: z.string().optional(),
    address_complement: z.string().optional(),
    address_district: z.string().optional(),
    address_city: z.string().optional(),
    address_state: z.string().optional(),
    full_address: z.string().optional(),
    scheduled_date: z.string().optional(),
    notes: z.string().optional(),
    shipping_cost: z.number().nonnegative().optional().default(0),
    shipping_service_id: z.union([z.number(), z.string()]).optional(),
    shipping_service_name: z.string().optional(),
    shipping_carrier: z.string().optional(),
    shipping_delivery_time: z.number().optional(),
    package_tier: z.string().optional(),
    items: z.array(z.object({
        product_id: z.string().min(1, 'Product ID é obrigatório'),
        qty: z.number().int().positive('Quantidade deve ser maior que 0'),
        selected_color: z.string().optional()
    })).min(1, 'O pedido deve ter pelo menos um item')
});
const statusUpdateSchema = z.object({
    status: z.enum(['new', 'preparing', 'ready', 'delivered'])
});
export const OrderController = {
    async getAll(req, res, next) {
        try {
            const orders = await OrderModel.findAll();
            res.json(orders);
        }
        catch (err) {
            next(err);
        }
    },
    async getById(req, res, next) {
        try {
            const id = String(req.params.id);
            const order = await OrderModel.findById(id);
            if (!order) {
                res.status(404).json({ error: 'Pedido não encontrado' });
                return;
            }
            res.json(order);
        }
        catch (err) {
            next(err);
        }
    },
    async create(req, res, next) {
        try {
            const parsed = orderCreateSchema.parse(req.body);
            const created = await OrderModel.create({
                ...parsed,
                shipping_service_id: typeof parsed.shipping_service_id === 'number' ? parsed.shipping_service_id : undefined
            });
            // 1. Auto-cadastrar / vincular cliente pelo email
            try {
                await CustomerModel.findOrCreate(parsed.email, parsed.customer_name, parsed.phone);
            }
            catch (custErr) {
                console.warn('Aviso: Não foi possível vincular cliente automaticamente:', custErr);
            }
            // 2. Disparar email de confirmação com resumo e links úteis
            try {
                await EmailService.sendOrderConfirmationEmail(created);
            }
            catch (emailErr) {
                console.warn('Aviso: Falha no envio do email de confirmação:', emailErr);
            }
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
    async updateStatus(req, res, next) {
        try {
            const id = String(req.params.id);
            const parsed = statusUpdateSchema.parse(req.body);
            const updated = await OrderModel.updateStatus(id, parsed.status);
            if (!updated) {
                res.status(404).json({ error: 'Pedido não encontrado' });
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
    async getMetrics(req, res, next) {
        try {
            const orders = await OrderModel.findAll();
            const totalRevenue = orders.reduce((acc, o) => acc + (o.total || 0), 0);
            const totalOrders = orders.length;
            const averageTicket = totalOrders > 0 ? totalRevenue / totalOrders : 0;
            const byStatus = {
                new: orders.filter(o => o.status === 'new').length,
                preparing: orders.filter(o => o.status === 'preparing').length,
                ready: orders.filter(o => o.status === 'ready').length,
                delivered: orders.filter(o => o.status === 'delivered').length
            };
            // Top itens mais vendidos
            const productSalesMap = {};
            for (const o of orders) {
                for (const it of o.items || []) {
                    const key = it.product_id || it.product_name;
                    if (!productSalesMap[key]) {
                        productSalesMap[key] = {
                            productId: it.product_id || '',
                            name: it.product_name,
                            qty: 0,
                            revenue: 0
                        };
                    }
                    productSalesMap[key].qty += it.qty;
                    productSalesMap[key].revenue += it.qty * it.unit_price;
                }
            }
            const topProducts = Object.values(productSalesMap)
                .sort((a, b) => b.revenue - a.revenue)
                .slice(0, 5);
            res.json({
                totalRevenue: parseFloat(totalRevenue.toFixed(2)),
                totalOrders,
                averageTicket: parseFloat(averageTicket.toFixed(2)),
                byStatus,
                topProducts
            });
        }
        catch (err) {
            next(err);
        }
    },
    async generateLabel(req, res, next) {
        try {
            const id = String(req.params.id);
            const updated = await OrderModel.generateLabel(id);
            if (!updated) {
                res.status(404).json({ error: 'Pedido não encontrado' });
                return;
            }
            res.json(updated);
        }
        catch (err) {
            next(err);
        }
    }
};
