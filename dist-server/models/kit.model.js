import { pool } from '../config/db.js';
export const KitModel = {
    async findAll(activeOnly = false) {
        const whereClause = activeOnly ? 'WHERE k.active = TRUE' : '';
        const query = `
      SELECT 
        k.*,
        COALESCE(
          json_agg(
            json_build_object(
              'id', ki.id,
              'product_id', p.id,
              'product_name', p.name,
              'product_image', (p.images)[1],
              'product_price', p.price,
              'product_stock', p.stock,
              'qty', ki.qty,
              'selected_color', ki.selected_color
            ) ORDER BY ki.id ASC
          ) FILTER (WHERE ki.id IS NOT NULL), '[]'
        ) as items
      FROM kits k
      LEFT JOIN kit_items ki ON ki.kit_id = k.id
      LEFT JOIN products p ON p.id = ki.product_id
      ${whereClause}
      GROUP BY k.id
      ORDER BY k.created_at DESC
    `;
        const res = await pool.query(query);
        return res.rows.map(this.calculateKitMetrics);
    },
    async findById(id) {
        const query = `
      SELECT 
        k.*,
        COALESCE(
          json_agg(
            json_build_object(
              'id', ki.id,
              'product_id', p.id,
              'product_name', p.name,
              'product_image', (p.images)[1],
              'product_price', p.price,
              'product_stock', p.stock,
              'qty', ki.qty,
              'selected_color', ki.selected_color
            ) ORDER BY ki.id ASC
          ) FILTER (WHERE ki.id IS NOT NULL), '[]'
        ) as items
      FROM kits k
      LEFT JOIN kit_items ki ON ki.kit_id = k.id
      LEFT JOIN products p ON p.id = ki.product_id
      WHERE k.id = $1
      GROUP BY k.id
    `;
        const res = await pool.query(query, [id]);
        if (!res.rows[0])
            return null;
        return this.calculateKitMetrics(res.rows[0]);
    },
    async create(data) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            const slug = data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Math.random().toString(36).substring(2, 6);
            const kitRes = await client.query(`INSERT INTO kits (name, slug, description, price, badge_text, banner_image, active, featured)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING *`, [
                data.name,
                slug,
                data.description || '',
                data.price,
                data.badge_text || 'Promoção',
                data.banner_image || '',
                data.active !== undefined ? data.active : true,
                data.featured !== undefined ? data.featured : true
            ]);
            const kit = kitRes.rows[0];
            if (data.items && data.items.length > 0) {
                for (const it of data.items) {
                    await client.query(`INSERT INTO kit_items (kit_id, product_id, qty, selected_color)
             VALUES ($1, $2, $3, $4)`, [kit.id, it.product_id, it.qty || 1, it.selected_color || null]);
                }
            }
            await client.query('COMMIT');
            return (await this.findById(kit.id));
        }
        catch (err) {
            await client.query('ROLLBACK');
            throw err;
        }
        finally {
            client.release();
        }
    },
    async update(id, data) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            const fields = [];
            const values = [];
            let idx = 1;
            if (data.name !== undefined) {
                fields.push(`name = $${idx++}`);
                values.push(data.name);
            }
            if (data.slug !== undefined) {
                fields.push(`slug = $${idx++}`);
                values.push(data.slug);
            }
            if (data.description !== undefined) {
                fields.push(`description = $${idx++}`);
                values.push(data.description);
            }
            if (data.price !== undefined) {
                fields.push(`price = $${idx++}`);
                values.push(data.price);
            }
            if (data.badge_text !== undefined) {
                fields.push(`badge_text = $${idx++}`);
                values.push(data.badge_text);
            }
            if (data.banner_image !== undefined) {
                fields.push(`banner_image = $${idx++}`);
                values.push(data.banner_image);
            }
            if (data.active !== undefined) {
                fields.push(`active = $${idx++}`);
                values.push(data.active);
            }
            if (data.featured !== undefined) {
                fields.push(`featured = $${idx++}`);
                values.push(data.featured);
            }
            fields.push(`updated_at = NOW()`);
            if (fields.length > 1) {
                values.push(id);
                await client.query(`UPDATE kits SET ${fields.join(', ')} WHERE id = $${idx}`, values);
            }
            if (data.items) {
                await client.query('DELETE FROM kit_items WHERE kit_id = $1', [id]);
                for (const it of data.items) {
                    await client.query(`INSERT INTO kit_items (kit_id, product_id, qty, selected_color)
             VALUES ($1, $2, $3, $4)`, [id, it.product_id, it.qty || 1, it.selected_color || null]);
                }
            }
            await client.query('COMMIT');
            return await this.findById(id);
        }
        catch (err) {
            await client.query('ROLLBACK');
            throw err;
        }
        finally {
            client.release();
        }
    },
    async delete(id) {
        const res = await pool.query('DELETE FROM kits WHERE id = $1', [id]);
        return (res.rowCount ?? 0) > 0;
    },
    calculateKitMetrics(rawKit) {
        const items = rawKit.items || [];
        let originalPrice = 0;
        let minAvailableStock = items.length > 0 ? Infinity : 0;
        for (const it of items) {
            const price = parseFloat(it.product_price) || 0;
            const stock = parseInt(it.product_stock, 10) || 0;
            const qty = parseInt(it.qty, 10) || 1;
            originalPrice += price * qty;
            const possibleKits = Math.floor(stock / qty);
            if (possibleKits < minAvailableStock) {
                minAvailableStock = possibleKits;
            }
        }
        if (minAvailableStock === Infinity)
            minAvailableStock = 0;
        const kitPrice = parseFloat(rawKit.price) || 0;
        const discountAmount = Math.max(0, originalPrice - kitPrice);
        const discountPercentage = originalPrice > 0 ? Math.round((discountAmount / originalPrice) * 100) : 0;
        return {
            id: rawKit.id,
            name: rawKit.name,
            slug: rawKit.slug,
            description: rawKit.description || '',
            price: kitPrice,
            badge_text: rawKit.badge_text || 'Promoção',
            banner_image: rawKit.banner_image || (items[0]?.product_image || ''),
            active: Boolean(rawKit.active),
            featured: Boolean(rawKit.featured),
            created_at: rawKit.created_at,
            updated_at: rawKit.updated_at,
            items: items.map((i) => ({
                id: i.id,
                product_id: i.product_id,
                product_name: i.product_name,
                product_image: i.product_image,
                product_price: parseFloat(i.product_price) || 0,
                product_stock: parseInt(i.product_stock, 10) || 0,
                qty: parseInt(i.qty, 10) || 1,
                selected_color: i.selected_color || undefined
            })),
            original_price: parseFloat(originalPrice.toFixed(2)),
            discount_amount: parseFloat(discountAmount.toFixed(2)),
            discount_percentage: discountPercentage,
            available_stock: minAvailableStock
        };
    }
};
