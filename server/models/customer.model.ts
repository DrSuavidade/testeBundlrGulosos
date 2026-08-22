import { pool } from '../config/db.js';
import crypto from 'crypto';

export interface Customer {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  created_at: Date;
  last_login_at: Date | null;
}

export const CustomerModel = {
  async findByEmail(email: string): Promise<Customer | null> {
    const cleanEmail = email.trim().toLowerCase();
    const res = await pool.query('SELECT * FROM customers WHERE LOWER(email) = $1', [cleanEmail]);
    return res.rows[0] || null;
  },

  async findOrCreate(email: string, name?: string, phone?: string): Promise<Customer> {
    const cleanEmail = email.trim().toLowerCase();
    const existing = await this.findByEmail(cleanEmail);
    if (existing) {
      if (name || phone) {
        const res = await pool.query(
          `UPDATE customers 
           SET name = COALESCE($1, name), phone = COALESCE($2, phone), last_login_at = NOW() 
           WHERE id = $3 RETURNING *`,
          [name || null, phone || null, existing.id]
        );
        return res.rows[0];
      }
      return existing;
    }

    const res = await pool.query(
      `INSERT INTO customers (email, name, phone, last_login_at)
       VALUES ($1, $2, $3, NOW())
       RETURNING *`,
      [cleanEmail, name || null, phone || null]
    );
    return res.rows[0];
  },

  async createAuthCode(email: string): Promise<string> {
    const cleanEmail = email.trim().toLowerCase();
    // Gerar código aleatório de 6 dígitos
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos

    // Remover códigos antigos não usados
    await pool.query('DELETE FROM customer_auth_codes WHERE LOWER(email) = $1', [cleanEmail]);

    await pool.query(
      `INSERT INTO customer_auth_codes (email, code, expires_at)
       VALUES ($1, $2, $3)`,
      [cleanEmail, code, expiresAt]
    );

    return code;
  },

  async verifyAuthCode(email: string, code: string): Promise<boolean> {
    const cleanEmail = email.trim().toLowerCase();
    const cleanCode = code.trim();

    const res = await pool.query(
      `SELECT * FROM customer_auth_codes 
       WHERE LOWER(email) = $1 AND expires_at > NOW() 
       ORDER BY created_at DESC LIMIT 1`,
      [cleanEmail]
    );

    const record = res.rows[0];
    if (!record) return false;

    if (record.code !== cleanCode) {
      // Incrementar tentativas
      await pool.query('UPDATE customer_auth_codes SET attempts = attempts + 1 WHERE id = $1', [record.id]);
      return false;
    }

    // Código válido -> Apagar código consumido
    await pool.query('DELETE FROM customer_auth_codes WHERE id = $1', [record.id]);
    return true;
  },

  async createSession(customerId: string, daysValid = 7): Promise<string> {
    const token = 'pm_sess_' + crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + daysValid * 24 * 60 * 60 * 1000);

    await pool.query(
      `INSERT INTO customer_sessions (customer_id, token, expires_at)
       VALUES ($1, $2, $3)`,
      [customerId, token, expiresAt]
    );

    return token;
  },

  async findBySessionToken(token: string): Promise<Customer | null> {
    const res = await pool.query(
      `SELECT c.* FROM customers c
       JOIN customer_sessions s ON s.customer_id = c.id
       WHERE s.token = $1 AND s.expires_at > NOW()`,
      [token]
    );
    return res.rows[0] || null;
  },

  async getCustomerOrders(email: string): Promise<any[]> {
    const cleanEmail = email.trim().toLowerCase();
    const ordersRes = await pool.query(
      `SELECT o.*, 
        COALESCE(
          json_agg(
            json_build_object(
              'id', oi.id,
              'product_id', oi.product_id,
              'product_name', oi.product_name,
              'product_image', oi.product_image,
              'selected_color', oi.selected_color,
              'qty', oi.qty,
              'unit_price', oi.unit_price
            )
          ) FILTER (WHERE oi.id IS NOT NULL), '[]'
        ) as items
       FROM orders o
       LEFT JOIN order_items oi ON oi.order_id = o.id
       WHERE LOWER(o.email) = $1
       GROUP BY o.id
       ORDER BY o.created_at DESC`,
      [cleanEmail]
    );

    return ordersRes.rows;
  }
};
