import { pool } from '../config/db.js';
import { ENV } from '../config/env.js';
import { generateShipmentLabel } from '../services/melhorEnvio.service.js';
const inMemoryOrders = [
    {
        id: 'PM-89A12',
        customer_name: 'Carolina Neves',
        email: 'carolina.neves@email.com',
        phone: '5527998124455',
        fulfillment_type: 'delivery',
        address_zip: '29055-270',
        full_address: 'Rua das Palmeiras, 120 - Praia do Canto, Vitória - ES, CEP: 29055-270',
        scheduled_date: '2026-08-12',
        notes: 'Favor embalar os novelos de algodão nas cores azul pastel separadamente para presente. Obrigada!',
        subtotal: 151.80,
        shipping_cost: 14.50,
        shipping_cost_real: 14.50,
        total: 166.30,
        shipping_service_id: 2,
        shipping_service_name: 'SEDEX (Correios)',
        shipping_carrier: 'Correios',
        package_tier: 'Saco 2 Médio (26x33cm)',
        status: 'preparing',
        tracking_code: 'BR982134561PM',
        label_url: 'https://sandbox.melhorenvio.com.br/painel/carrinho?order=PM-89A12',
        created_at: new Date('2026-08-10T14:20:00.000Z'),
        items: [
            {
                product_id: '1',
                product_name: 'Kit Amigurumi Ursinho Crochê',
                product_image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=800&auto=format&fit=crop',
                qty: 1,
                unit_price: 48.90
            },
            {
                product_id: '2',
                product_name: 'Novelo Fio de Algodão Supremo (160g)',
                product_image: 'https://images.unsplash.com/photo-1608248597260-6f216e589959?q=80&w=800&auto=format&fit=crop',
                qty: 2,
                unit_price: 16.50
            },
            {
                product_id: '10',
                product_name: 'Kit Agulhas de Crochê Soft Touch (9 Tamanhos)',
                product_image: 'https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=800&auto=format&fit=crop',
                qty: 1,
                unit_price: 69.90
            }
        ]
    }
];
export const OrderModel = {
    async findAll() {
        if (!ENV.DATABASE_URL || ENV.DATABASE_URL.trim() === '') {
            return [...inMemoryOrders];
        }
        try {
            const ordersRes = await pool.query(`SELECT * FROM orders ORDER BY created_at DESC`);
            const orders = ordersRes.rows;
            if (orders.length === 0)
                return [];
            const orderIds = orders.map(o => o.id);
            const itemsRes = await pool.query(`SELECT * FROM order_items WHERE order_id = ANY($1) ORDER BY id ASC`, [orderIds]);
            const itemsMap = new Map();
            for (const item of itemsRes.rows) {
                if (!itemsMap.has(item.order_id)) {
                    itemsMap.set(item.order_id, []);
                }
                itemsMap.get(item.order_id).push({
                    ...item,
                    unit_price: parseFloat(item.unit_price)
                });
            }
            return orders.map(o => ({
                ...o,
                subtotal: parseFloat(o.subtotal),
                shipping_cost: parseFloat(o.shipping_cost),
                shipping_cost_real: parseFloat((o.shipping_cost_real || o.shipping_cost)),
                total: parseFloat(o.total),
                items: itemsMap.get(o.id) || []
            }));
        }
        catch {
            return [...inMemoryOrders];
        }
    },
    async findById(id) {
        if (!ENV.DATABASE_URL || ENV.DATABASE_URL.trim() === '') {
            return inMemoryOrders.find(o => o.id === id) || null;
        }
        try {
            const orderRes = await pool.query(`SELECT * FROM orders WHERE id = $1`, [id]);
            if (orderRes.rows.length === 0)
                return inMemoryOrders.find(o => o.id === id) || null;
            const order = orderRes.rows[0];
            const itemsRes = await pool.query(`SELECT * FROM order_items WHERE order_id = $1 ORDER BY id ASC`, [id]);
            return {
                ...order,
                subtotal: parseFloat(order.subtotal),
                shipping_cost: parseFloat(order.shipping_cost),
                shipping_cost_real: parseFloat((order.shipping_cost_real || order.shipping_cost)),
                total: parseFloat(order.total),
                items: itemsRes.rows.map(item => ({
                    ...item,
                    unit_price: parseFloat(item.unit_price)
                }))
            };
        }
        catch {
            return inMemoryOrders.find(o => o.id === id) || null;
        }
    },
    async create(data) {
        const orderId = 'PM-' + Math.random().toString(36).substring(2, 7).toUpperCase();
        const shippingCost = data.shipping_cost || 0;
        const fullAddress = data.full_address || [
            data.address_street,
            data.address_number,
            data.address_complement,
            data.address_district,
            data.address_city,
            data.address_state,
            data.address_zip
        ].filter(Boolean).join(', ');
        // 1. Gerar Etiqueta no Melhor Envio
        let trackingCode = null;
        let labelUrl = null;
        let shippingCostReal = shippingCost;
        if (data.fulfillment_type === 'delivery') {
            try {
                const labelRes = await generateShipmentLabel({
                    orderId,
                    customerName: data.customer_name,
                    email: data.email,
                    phone: data.phone,
                    address: {
                        zip: data.address_zip || '29090460',
                        street: data.address_street || 'Rua Principal',
                        number: data.address_number || 'S/N',
                        complement: data.address_complement || '',
                        district: data.address_district || 'Centro',
                        city: data.address_city || 'Vitória',
                        state: data.address_state || 'ES'
                    },
                    items: data.items.map(it => ({
                        productId: it.product_id,
                        qty: it.qty,
                        price: 25
                    })),
                    serviceId: data.shipping_service_id || 2,
                    shippingCost
                });
                if (labelRes.success) {
                    trackingCode = labelRes.trackingCode || null;
                    labelUrl = labelRes.labelUrl || null;
                    if (labelRes.cost)
                        shippingCostReal = labelRes.cost;
                }
            }
            catch (labelErr) {
                console.warn('Aviso: Etiqueta Melhor Envio será gerada posteriormente:', labelErr);
            }
        }
        // Se DATABASE_URL estiver configurada, salvar no PostgreSQL
        if (ENV.DATABASE_URL && ENV.DATABASE_URL.trim() !== '') {
            const client = await pool.connect();
            try {
                await client.query('BEGIN');
                const productIds = data.items.map(i => i.product_id);
                const prodRes = await client.query(`SELECT id, name, price, stock, images FROM products WHERE id = ANY($1)`, [productIds]);
                const productMap = new Map();
                for (const p of prodRes.rows) {
                    productMap.set(p.id, p);
                }
                const kitRes = await client.query(`SELECT k.id, k.name, k.price, k.banner_image,
            COALESCE(
              json_agg(
                json_build_object('product_id', ki.product_id, 'qty', ki.qty)
              ) FILTER (WHERE ki.id IS NOT NULL), '[]'
            ) as items
           FROM kits k
           LEFT JOIN kit_items ki ON ki.kit_id = k.id
           WHERE k.id = ANY($1)
           GROUP BY k.id`, [productIds]);
                const kitMap = new Map();
                for (const k of kitRes.rows) {
                    kitMap.set(k.id, k);
                }
                let subtotal = 0;
                const orderItemsToInsert = [];
                for (const item of data.items) {
                    const product = productMap.get(item.product_id);
                    const kit = kitMap.get(item.product_id);
                    if (kit) {
                        const kitPrice = parseFloat(kit.price);
                        subtotal += kitPrice * item.qty;
                        orderItemsToInsert.push({
                            product_id: item.product_id,
                            product_name: `[Kit] ${kit.name}`,
                            product_image: kit.banner_image || null,
                            selected_color: item.selected_color || null,
                            qty: item.qty,
                            unit_price: kitPrice
                        });
                        for (const ki of kit.items || []) {
                            const deductQty = (ki.qty || 1) * item.qty;
                            await client.query(`UPDATE products SET stock = GREATEST(0, stock - $1), updated_at = NOW() WHERE id = $2`, [deductQty, ki.product_id]);
                        }
                    }
                    else {
                        const price = product ? parseFloat(product.price) : 0;
                        const name = product ? product.name : 'Produto';
                        const image = product?.images?.[0] || null;
                        subtotal += price * item.qty;
                        orderItemsToInsert.push({
                            product_id: item.product_id,
                            product_name: name,
                            product_image: image,
                            selected_color: item.selected_color || null,
                            qty: item.qty,
                            unit_price: price
                        });
                        if (product) {
                            await client.query(`UPDATE products SET stock = GREATEST(0, stock - $1), updated_at = NOW() WHERE id = $2`, [item.qty, item.product_id]);
                        }
                    }
                }
                const total = subtotal + shippingCost;
                await client.query(`INSERT INTO orders (
            id, customer_name, email, phone, fulfillment_type,
            address_zip, address_street, address_number, address_complement,
            address_district, address_city, address_state, full_address,
            scheduled_date, notes, subtotal, shipping_cost, shipping_cost_real, total,
            shipping_service_id, shipping_service_name, shipping_carrier,
            shipping_delivery_time, package_tier, status, tracking_code, label_url
          ) VALUES (
            $1, $2, $3, $4, $5,
            $6, $7, $8, $9,
            $10, $11, $12, $13,
            $14, $15, $16, $17, $18, $19,
            $20, $21, $22,
            $23, $24, 'new', $25, $26
          )`, [
                    orderId,
                    data.customer_name,
                    data.email,
                    data.phone,
                    data.fulfillment_type,
                    data.address_zip || null,
                    data.address_street || null,
                    data.address_number || null,
                    data.address_complement || null,
                    data.address_district || null,
                    data.address_city || null,
                    data.address_state || 'ES',
                    fullAddress || 'Vitória / ES',
                    data.scheduled_date ? new Date(data.scheduled_date) : null,
                    data.notes || null,
                    subtotal,
                    shippingCost,
                    shippingCostReal,
                    total,
                    data.shipping_service_id || null,
                    data.shipping_service_name || null,
                    data.shipping_carrier || null,
                    data.shipping_delivery_time || null,
                    data.package_tier || null,
                    trackingCode,
                    labelUrl
                ]);
                for (const item of orderItemsToInsert) {
                    await client.query(`INSERT INTO order_items (
              order_id, product_id, product_name, product_image, selected_color, qty, unit_price
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)`, [
                        orderId,
                        item.product_id,
                        item.product_name,
                        item.product_image,
                        item.selected_color,
                        item.qty,
                        item.unit_price
                    ]);
                }
                await client.query('COMMIT');
                return (await this.findById(orderId));
            }
            catch (err) {
                await client.query('ROLLBACK');
                throw err;
            }
            finally {
                client.release();
            }
        }
        // Fallback em memória (sem PostgreSQL configurado)
        let fallbackSubtotal = 0;
        const fallbackItems = data.items.map((it, idx) => {
            const price = 25.0;
            fallbackSubtotal += price * it.qty;
            return {
                id: idx + 1,
                order_id: orderId,
                product_id: it.product_id,
                product_name: `Insumo #${it.product_id}`,
                selected_color: it.selected_color || null,
                qty: it.qty,
                unit_price: price
            };
        });
        const fallbackTotal = fallbackSubtotal + shippingCost;
        const memoryOrder = {
            id: orderId,
            customer_name: data.customer_name,
            email: data.email,
            phone: data.phone,
            fulfillment_type: data.fulfillment_type,
            address_zip: data.address_zip || null,
            address_street: data.address_street || null,
            address_number: data.address_number || null,
            address_complement: data.address_complement || null,
            address_district: data.address_district || null,
            address_city: data.address_city || null,
            address_state: data.address_state || 'ES',
            full_address: fullAddress || 'Vitória / ES',
            scheduled_date: data.scheduled_date || null,
            notes: data.notes || null,
            subtotal: fallbackSubtotal,
            shipping_cost: shippingCost,
            shipping_cost_real: shippingCostReal,
            total: fallbackTotal,
            shipping_service_id: data.shipping_service_id || null,
            shipping_service_name: data.shipping_service_name || 'SEDEX (Correios)',
            shipping_carrier: data.shipping_carrier || 'Correios',
            shipping_delivery_time: data.shipping_delivery_time || 1,
            package_tier: data.package_tier || 'Saco 2 Médio (26x33cm)',
            status: 'new',
            tracking_code: trackingCode,
            label_url: labelUrl,
            created_at: new Date(),
            items: fallbackItems
        };
        inMemoryOrders.unshift(memoryOrder);
        return memoryOrder;
    },
    async updateStatus(id, status) {
        if (ENV.DATABASE_URL && ENV.DATABASE_URL.trim() !== '') {
            try {
                const res = await pool.query(`UPDATE orders SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *`, [status, id]);
                if (res.rows.length > 0)
                    return this.findById(id);
            }
            catch { }
        }
        const o = inMemoryOrders.find(ord => ord.id === id);
        if (o) {
            o.status = status;
            o.updated_at = new Date();
            return { ...o };
        }
        return null;
    },
    async generateLabel(orderId) {
        const order = await this.findById(orderId);
        if (!order)
            return null;
        const labelRes = await generateShipmentLabel({
            orderId: order.id,
            customerName: order.customer_name,
            email: order.email,
            phone: order.phone,
            address: {
                zip: order.address_zip || '29090460',
                street: order.address_street || 'Rua Principal',
                number: order.address_number || 'S/N',
                complement: order.address_complement || '',
                district: order.address_district || 'Centro',
                city: order.address_city || 'Vitória',
                state: order.address_state || 'ES'
            },
            items: (order.items || []).map(it => ({
                productId: it.product_id || undefined,
                name: it.product_name,
                qty: it.qty,
                price: it.unit_price
            })),
            serviceId: order.shipping_service_id || 2,
            shippingCost: order.shipping_cost
        });
        if (labelRes.success) {
            if (ENV.DATABASE_URL && ENV.DATABASE_URL.trim() !== '') {
                try {
                    await pool.query(`UPDATE orders SET label_url = $1, tracking_code = $2, shipping_cost_real = $3, updated_at = NOW() WHERE id = $4`, [labelRes.labelUrl, labelRes.trackingCode, labelRes.cost || order.shipping_cost, orderId]);
                    return this.findById(orderId);
                }
                catch { }
            }
            const mem = inMemoryOrders.find(o => o.id === orderId);
            if (mem) {
                mem.label_url = labelRes.labelUrl || null;
                mem.tracking_code = labelRes.trackingCode || null;
                mem.shipping_cost_real = labelRes.cost || mem.shipping_cost;
                mem.updated_at = new Date();
                return { ...mem };
            }
        }
        return order;
    }
};
