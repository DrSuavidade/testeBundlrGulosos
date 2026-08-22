import { pool } from '../config/db.js';
export const CategoryModel = {
    async findAll() {
        const res = await pool.query(`SELECT * FROM categories ORDER BY name ASC`);
        return res.rows;
    },
    async findById(id) {
        const res = await pool.query(`SELECT * FROM categories WHERE id = $1`, [id]);
        return res.rows[0] || null;
    },
    async create(data) {
        const res = await pool.query(`INSERT INTO categories (id, name, color, image_url)
       VALUES ($1, $2, $3, $4)
       RETURNING *`, [data.id, data.name, data.color, data.image_url]);
        return res.rows[0];
    },
    async update(id, updates) {
        const fields = [];
        const values = [];
        let idx = 1;
        if (updates.name !== undefined) {
            fields.push(`name = $${idx++}`);
            values.push(updates.name);
        }
        if (updates.color !== undefined) {
            fields.push(`color = $${idx++}`);
            values.push(updates.color);
        }
        if (updates.image_url !== undefined) {
            fields.push(`image_url = $${idx++}`);
            values.push(updates.image_url);
        }
        fields.push(`updated_at = NOW()`);
        values.push(id);
        const res = await pool.query(`UPDATE categories SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`, values);
        return res.rows[0] || null;
    },
    async delete(id) {
        const res = await pool.query(`DELETE FROM categories WHERE id = $1`, [id]);
        return (res.rowCount ?? 0) > 0;
    }
};
