import { Router } from 'express';
import { productRouter } from './product.routes.js';
import { categoryRouter } from './category.routes.js';
import { orderRouter } from './order.routes.js';
import { shippingRouter } from './shipping.routes.js';
import { uploadRouter } from './upload.routes.js';
import { customerRouter } from './customer.routes.js';
import { kitRouter } from './kit.routes.js';
import { ENV } from '../config/env.js';
export const apiRouter = Router();
apiRouter.get('/health', (req, res) => {
    res.json({
        status: 'online',
        store: 'Pedra Mania',
        originZip: ENV.STORE.ZIP_CODE,
        city: `${ENV.STORE.CITY} / ${ENV.STORE.STATE}`,
        melhorEnvio: {
            mode: ENV.MELHOR_ENVIO.ENV,
            tokenConfigured: Boolean(ENV.MELHOR_ENVIO.TOKEN && ENV.MELHOR_ENVIO.TOKEN.length > 5)
        }
    });
});
apiRouter.use('/products', productRouter);
apiRouter.use('/categories', categoryRouter);
apiRouter.use('/orders', orderRouter);
apiRouter.use('/shipping', shippingRouter);
apiRouter.use('/upload', uploadRouter);
apiRouter.use('/customer', customerRouter);
apiRouter.use('/kits', kitRouter);
