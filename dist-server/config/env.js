import dotenv from 'dotenv';
dotenv.config();
export const ENV = {
    PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3001,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL || '',
    // Dados da Loja - Pedra Mania (Vitória / ES)
    STORE: {
        ZIP_CODE: (process.env.STORE_ZIP_CODE || '29090460').replace(/\D/g, ''),
        ADDRESS: process.env.STORE_ADDRESS || 'Rua Paschoal Delmaestro, 401',
        DISTRICT: process.env.STORE_DISTRICT || 'Jardim Camburi',
        CITY: process.env.STORE_CITY || 'Vitória',
        STATE: process.env.STORE_STATE || 'ES',
    },
    // Melhor Envio
    MELHOR_ENVIO: {
        ENV: process.env.MELHOR_ENVIO_ENV || 'sandbox',
        TOKEN: process.env.MELHOR_ENVIO_TOKEN || '',
        API_URL: (process.env.MELHOR_ENVIO_ENV === 'production')
            ? 'https://melhorenvio.com.br/api/v2'
            : 'https://sandbox.melhorenvio.com.br/api/v2',
    },
    ADMIN_TOKEN: process.env.ADMIN_TOKEN || 'pedramania_admin_secret_token_2026',
    // Configurações de Email / SMTP
    EMAIL: {
        HOST: process.env.SMTP_HOST || '',
        PORT: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587,
        SECURE: process.env.SMTP_SECURE === 'true',
        USER: process.env.SMTP_USER || '',
        PASS: process.env.SMTP_PASS || '',
        FROM: process.env.EMAIL_FROM || '"Pedra Mania Armarinho" <contato@pedramania.com.br>',
    },
};
