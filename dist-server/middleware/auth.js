import { ENV } from '../config/env.js';
export function requireAdmin(req, res, next) {
    const authHeader = req.headers.authorization;
    const adminTokenHeader = req.headers['x-admin-token'];
    const token = authHeader?.startsWith('Bearer ')
        ? authHeader.substring(7)
        : adminTokenHeader;
    if (token && token === ENV.ADMIN_TOKEN) {
        return next();
    }
    if (ENV.NODE_ENV === 'development' && (!token || token === 'admin' || token === ENV.ADMIN_TOKEN)) {
        return next();
    }
    res.status(401).json({ error: 'Acesso não autorizado. Token administrativo requerido.' });
}
