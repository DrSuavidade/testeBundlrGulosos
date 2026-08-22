import pg from 'pg';
const { Pool } = pg;
import { ENV } from './env.js';
export const isDbConfigured = Boolean(ENV.DATABASE_URL && ENV.DATABASE_URL.trim() !== '');
const rawPool = isDbConfigured
    ? new Pool({
        connectionString: ENV.DATABASE_URL,
        ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
    })
    : null;
if (rawPool) {
    rawPool.on('error', (err) => {
        console.error('Erro na conexão idle do PostgreSQL:', err.message);
    });
}
export const pool = {
    async query(text, params) {
        if (!rawPool) {
            return { rows: [], rowCount: 0 };
        }
        return rawPool.query(text, params);
    },
    async connect() {
        if (!rawPool) {
            return {
                query: async () => ({ rows: [], rowCount: 0 }),
                release: () => { },
            };
        }
        return rawPool.connect();
    },
    on: (event, listener) => {
        if (rawPool)
            rawPool.on(event, listener);
    }
};
/**
 * Cria automaticamente as tabelas e seeds caso não existam no banco
 */
export async function autoMigrateAndSeed() {
    if (!ENV.DATABASE_URL || ENV.DATABASE_URL.trim() === '') {
        console.log('ℹ️ DATABASE_URL não definida. O servidor operará em modo rápido de API & Frete.');
        return false;
    }
    try {
        const client = await pool.connect();
        console.log('🔄 Verificando e criando tabelas PostgreSQL...');
        await client.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

      CREATE TABLE IF NOT EXISTS categories (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        color VARCHAR(7) NOT NULL,
        image_url TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS products (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(200) NOT NULL,
        slug VARCHAR(200) UNIQUE NOT NULL,
        description TEXT,
        price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
        stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
        category_id VARCHAR(50) REFERENCES categories(id) ON DELETE SET NULL,
        weight_grams INTEGER DEFAULT 250 CHECK (weight_grams >= 0),
        height_cm NUMERIC(5,1) DEFAULT 5.0,
        width_cm NUMERIC(5,1) DEFAULT 15.0,
        length_cm NUMERIC(5,1) DEFAULT 20.0,
        weight_label VARCHAR(50),
        composition VARCHAR(200),
        tags TEXT[] DEFAULT '{}',
        allergens TEXT[] DEFAULT '{}',
        images TEXT[] DEFAULT '{}',
        active BOOLEAN DEFAULT TRUE,
        featured BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS product_colors (
        id SERIAL PRIMARY KEY,
        product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
        name VARCHAR(100) NOT NULL,
        hex VARCHAR(7) NOT NULL,
        image_url TEXT NOT NULL,
        sort_order INTEGER DEFAULT 0
      );

      CREATE TABLE IF NOT EXISTS orders (
        id VARCHAR(20) PRIMARY KEY,
        customer_name VARCHAR(200) NOT NULL,
        email VARCHAR(200) NOT NULL,
        phone VARCHAR(30) NOT NULL,
        fulfillment_type VARCHAR(20) NOT NULL DEFAULT 'delivery',
        address_zip VARCHAR(10),
        address_street VARCHAR(200),
        address_number VARCHAR(20),
        address_complement VARCHAR(100),
        address_district VARCHAR(100),
        address_city VARCHAR(100),
        address_state VARCHAR(2) DEFAULT 'ES',
        full_address TEXT,
        scheduled_date DATE,
        notes TEXT,
        subtotal NUMERIC(10,2) NOT NULL DEFAULT 0,
        shipping_cost NUMERIC(10,2) NOT NULL DEFAULT 0,
        total NUMERIC(10,2) NOT NULL DEFAULT 0,
        shipping_service_id INTEGER,
        shipping_service_name VARCHAR(100),
        shipping_carrier VARCHAR(100),
        shipping_delivery_time INTEGER,
        package_tier VARCHAR(50),
        status VARCHAR(20) NOT NULL DEFAULT 'new',
        tracking_code VARCHAR(100),
        label_url TEXT,
        shipping_cost_real NUMERIC(10,2) DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      ALTER TABLE orders ADD COLUMN IF NOT EXISTS tracking_code VARCHAR(100);
      ALTER TABLE orders ADD COLUMN IF NOT EXISTS label_url TEXT;
      ALTER TABLE orders ADD COLUMN IF NOT EXISTS shipping_cost_real NUMERIC(10,2) DEFAULT 0;

      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id VARCHAR(20) NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
        product_id UUID REFERENCES products(id) ON DELETE SET NULL,
        product_name VARCHAR(200) NOT NULL,
        product_image TEXT,
        selected_color VARCHAR(100),
        qty INTEGER NOT NULL CHECK (qty > 0),
        unit_price NUMERIC(10,2) NOT NULL
      );

      CREATE TABLE IF NOT EXISTS customers (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255),
        phone VARCHAR(50),
        created_at TIMESTAMPTZ DEFAULT NOW(),
        last_login_at TIMESTAMPTZ
      );

      CREATE TABLE IF NOT EXISTS customer_auth_codes (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        email VARCHAR(255) NOT NULL,
        code VARCHAR(10) NOT NULL,
        attempts INTEGER DEFAULT 0,
        expires_at TIMESTAMPTZ NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS customer_sessions (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
        token VARCHAR(255) UNIQUE NOT NULL,
        expires_at TIMESTAMPTZ NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS kits (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(200) NOT NULL,
        slug VARCHAR(200) UNIQUE NOT NULL,
        description TEXT,
        price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
        badge_text VARCHAR(50) DEFAULT 'Promoção',
        banner_image TEXT,
        active BOOLEAN DEFAULT TRUE,
        featured BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS kit_items (
        id SERIAL PRIMARY KEY,
        kit_id UUID NOT NULL REFERENCES kits(id) ON DELETE CASCADE,
        product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
        qty INTEGER NOT NULL DEFAULT 1 CHECK (qty > 0),
        selected_color VARCHAR(100)
      );

      CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
      CREATE INDEX IF NOT EXISTS idx_products_active ON products(active);
      CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
      CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
      CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(email);
      CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC);
      CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
      CREATE INDEX IF NOT EXISTS idx_customer_codes_email ON customer_auth_codes(email);
      CREATE INDEX IF NOT EXISTS idx_customer_sessions_token ON customer_sessions(token);
      CREATE INDEX IF NOT EXISTS idx_kits_active ON kits(active);
      CREATE INDEX IF NOT EXISTS idx_kits_featured ON kits(featured);
      CREATE INDEX IF NOT EXISTS idx_kit_items_kit ON kit_items(kit_id);
    `);
        // Inserir categorias padrão se vazio
        const catCheck = await client.query('SELECT COUNT(*) FROM categories');
        if (parseInt(catCheck.rows[0].count, 10) === 0) {
            await client.query(`
        INSERT INTO categories (id, name, color, image_url) VALUES
        ('linhas-fios', 'Linhas & Fios', '#2563EB', 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=500&auto=format&fit=crop'),
        ('bijuterias-pecas', 'Miçangas & Bijuterias', '#7C3AED', 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=500&auto=format&fit=crop'),
        ('decor-ferramentas', 'Ferramentas & Decor', '#D97706', 'https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=500&auto=format&fit=crop'),
        ('materias-primas', 'Matérias-primas', '#059669', 'https://images.unsplash.com/photo-1611591475285-a29ae2ea1c5c?q=80&w=500&auto=format&fit=crop'),
        ('kits', 'Kits & Achadinhos', '#DB2777', 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=500&auto=format&fit=crop');
      `);
        }
        client.release();
        console.log('✅ PostgreSQL: Tabelas e categorias verificadas/criadas com sucesso!');
        return true;
    }
    catch (err) {
        console.warn('⚠️ Erro ao conectar/migrar PostgreSQL:', err.message);
        return false;
    }
}
