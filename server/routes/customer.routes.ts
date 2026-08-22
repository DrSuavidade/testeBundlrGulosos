import { Router } from 'express';
import { CustomerAuthController } from '../controllers/customerAuth.controller.js';

export const customerRouter = Router();

// 1. Enviar código de 6 dígitos para o email
customerRouter.post('/auth/send-code', CustomerAuthController.sendCode);

// 2. Validar código e iniciar sessão de 7 dias
customerRouter.post('/auth/verify-code', CustomerAuthController.verifyCode);

// 3. Obter perfil do cliente logado
customerRouter.get('/auth/me', CustomerAuthController.getMe);

// 4. Obter histórico de pedidos do cliente logado
customerRouter.get('/orders', CustomerAuthController.getMyOrders);
