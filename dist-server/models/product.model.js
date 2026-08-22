import { pool } from '../config/db.js';
export const ProductModel = {
    async findAll(activeOnly = false) {
        const query = activeOnly
            ? `SELECT * FROM products WHERE active = TRUE ORDER BY created_at DESC`
            : `SELECT * FROM products ORDER BY created_at DESC`;
        const res = await pool.query(query);
        const products = res.rows;
        if (products.length === 0)
            return [];
        const productIds = products.map(p => p.id);
        const colorsRes = await pool.query(`SELECT * FROM product_colors WHERE product_id = ANY($1) ORDER BY sort_order ASC, id ASC`, [productIds]);
        const colorsMap = new Map();
        for (const color of colorsRes.rows) {
            if (!colorsMap.has(color.product_id)) {
                colorsMap.set(color.product_id, []);
            }
            colorsMap.get(color.product_id).push(color);
        }
        return products.map(p => ({
            ...p,
            price: parseFloat(p.price),
            colors: colorsMap.get(p.id) || []
        }));
    },
    async findFeatured() {
        const res = await pool.query(`SELECT * FROM products WHERE active = TRUE AND featured = TRUE ORDER BY created_at DESC`);
        const products = res.rows;
        if (products.length === 0)
            return [];
        const productIds = products.map(p => p.id);
        const colorsRes = await pool.query(`SELECT * FROM product_colors WHERE product_id = ANY($1) ORDER BY sort_order ASC, id ASC`, [productIds]);
        const colorsMap = new Map();
        for (const color of colorsRes.rows) {
            if (!colorsMap.has(color.product_id)) {
                colorsMap.set(color.product_id, []);
            }
            colorsMap.get(color.product_id).push(color);
        }
        return products.map(p => ({
            ...p,
            price: parseFloat(p.price),
            colors: colorsMap.get(p.id) || []
        }));
    },
    async findById(id) {
        const res = await pool.query(`SELECT * FROM products WHERE id = $1`, [id]);
        if (res.rows.length === 0)
            return null;
        const product = res.rows[0];
        const colorsRes = await pool.query(`SELECT * FROM product_colors WHERE product_id = $1 ORDER BY sort_order ASC, id ASC`, [id]);
        return {
            ...product,
            price: parseFloat(product.price),
            colors: colorsRes.rows
        };
    },
    async create(data) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            const insertRes = await client.query(`INSERT INTO products (
          name, slug, description, price, stock, category_id,
          weight_grams, height_cm, width_cm, length_cm, weight_label,
          composition, tags, allergens, images, active, featured
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
        RETURNING *`, [
                data.name,
                data.slug,
                data.description,
                data.price,
                data.stock,
                data.category_id,
                data.weight_grams || 250,
                data.height_cm || 5,
                data.width_cm || 15,
                data.length_cm || 20,
                data.weight_label,
                data.composition,
                data.tags || [],
                data.allergens || [],
                data.images || [],
                data.active ?? true,
                data.featured ?? false
            ]);
            const product = insertRes.rows[0];
            if (data.colors && data.colors.length > 0) {
                for (let i = 0; i < data.colors.length; i++) {
                    const c = data.colors[i];
                    await client.query(`INSERT INTO product_colors (product_id, name, hex, image_url, sort_order)
             VALUES ($1, $2, $3, $4, $5)`, [product.id, c.name, c.hex, c.image_url, i]);
                }
            }
            await client.query('COMMIT');
            return this.findById(product.id);
        }
        catch (err) {
            await client.query('ROLLBACK');
            throw err;
        }
        finally {
            client.release();
        }
    },
    async update(id, updates) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            const fields = [];
            const values = [];
            let idx = 1;
            if (updates.name !== undefined) {
                fields.push(`name = $${idx++}`);
                values.push(updates.name);
            }
            if (updates.slug !== undefined) {
                fields.push(`slug = $${idx++}`);
                values.push(updates.slug);
            }
            if (updates.description !== undefined) {
                fields.push(`description = $${idx++}`);
                values.push(updates.description);
            }
            if (updates.price !== undefined) {
                fields.push(`price = $${idx++}`);
                values.push(updates.price);
            }
            if (updates.stock !== undefined) {
                fields.push(`stock = $${idx++}`);
                values.push(updates.stock);
            }
            if (updates.category_id !== undefined) {
                fields.push(`category_id = $${idx++}`);
                values.push(updates.category_id);
            }
            if (updates.weight_grams !== undefined) {
                fields.push(`weight_grams = $${idx++}`);
                values.push(updates.weight_grams);
            }
            if (updates.height_cm !== undefined) {
                fields.push(`height_cm = $${idx++}`);
                values.push(updates.height_cm);
            }
            if (updates.width_cm !== undefined) {
                fields.push(`width_cm = $${idx++}`);
                values.push(updates.width_cm);
            }
            if (updates.length_cm !== undefined) {
                fields.push(`length_cm = $${idx++}`);
                values.push(updates.length_cm);
            }
            if (updates.weight_label !== undefined) {
                fields.push(`weight_label = $${idx++}`);
                values.push(updates.weight_label);
            }
            if (updates.composition !== undefined) {
                fields.push(`composition = $${idx++}`);
                values.push(updates.composition);
            }
            if (updates.tags !== undefined) {
                fields.push(`tags = $${idx++}`);
                values.push(updates.tags);
            }
            if (updates.allergens !== undefined) {
                fields.push(`allergens = $${idx++}`);
                values.push(updates.allergens);
            }
            if (updates.images !== undefined) {
                fields.push(`images = $${idx++}`);
                values.push(updates.images);
            }
            if (updates.active !== undefined) {
                fields.push(`active = $${idx++}`);
                values.push(updates.active);
            }
            if (updates.featured !== undefined) {
                fields.push(`featured = $${idx++}`);
                values.push(updates.featured);
            }
            fields.push(`updated_at = NOW()`);
            values.push(id);
            if (fields.length > 1) {
                await client.query(`UPDATE products SET ${fields.join(', ')} WHERE id = $${idx}`, values);
            }
            if (updates.colors !== undefined) {
                await client.query(`DELETE FROM product_colors WHERE product_id = $1`, [id]);
                for (let i = 0; i < updates.colors.length; i++) {
                    const c = updates.colors[i];
                    await client.query(`INSERT INTO product_colors (product_id, name, hex, image_url, sort_order)
             VALUES ($1, $2, $3, $4, $5)`, [id, c.name, c.hex, c.image_url, i]);
                }
            }
            await client.query('COMMIT');
            return this.findById(id);
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
        const res = await pool.query(`DELETE FROM products WHERE id = $1`, [id]);
        return (res.rowCount ?? 0) > 0;
    }
};
