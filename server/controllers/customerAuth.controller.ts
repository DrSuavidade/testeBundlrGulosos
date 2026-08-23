import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { CustomerModel } from '../models/customer.model.js';
import { EmailService } from '../services/email.service.js';

const sendCodeSchema = z.object({
  email: z.string().email('Email inválido')
});

const verifyCodeSchema = z.object({
  email: z.string().email('Email inválido'),
  code: z.string().min(4, 'Código inválido')
});

export const CustomerAuthController = {
  /**
   * Envia código de 6 dígitos para o email do cliente
   */
  async sendCode(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = sendCodeSchema.parse(req.body);
      const cleanEmail = email.trim().toLowerCase();

      // Verificar se existe OTP recente (rate limiting de 60 segundos)
      const lastCode = await CustomerModel.getLastAuthCode(cleanEmail);
      if (lastCode) {
        const diffMs = Date.now() - new Date(lastCode.created_at).getTime();
        if (diffMs < 60 * 1000) {
          const waitSeconds = Math.ceil((60 * 1000 - diffMs) / 1000);
          res.status(429).json({ 
            error: `Por favor, aguarde ${waitSeconds} segundos antes de solicitar um novo código.` 
          });
          return;
        }
      }

      // Gerar código de 6 dígitos temporário
      const code = await CustomerModel.createAuthCode(cleanEmail);

      // Enviar email com o código
      const emailResult = await EmailService.sendOtpCodeEmail(cleanEmail, code);

      res.json({
        success: true,
        message: 'Código de confirmação enviado para seu email!',
        preview: emailResult.preview
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ error: err.errors[0]?.message || 'Email inválido' });
        return;
      }
      next(err);
    }
  },

  /**
   * Valida código de 6 dígitos e inicia sessão de 7 dias
   */
  async verifyCode(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, code } = verifyCodeSchema.parse(req.body);
      const cleanEmail = email.trim().toLowerCase();

      const isValid = await CustomerModel.verifyAuthCode(cleanEmail, code);
      if (!isValid) {
        res.status(401).json({ error: 'Código de confirmação incorreto ou expirado.' });
        return;
      }

      // Buscar ou criar cliente
      const customer = await CustomerModel.findOrCreate(cleanEmail);

      // Criar token de sessão (7 dias)
      const token = await CustomerModel.createSession(customer.id, 7);

      // Buscar histórico de pedidos associados
      const orders = await CustomerModel.getCustomerOrders(cleanEmail);

      res.json({
        success: true,
        token,
        customer,
        ordersCount: orders.length,
        message: `Bem-vindo(a) à sua conta Pedra Mania!`
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ error: err.errors[0]?.message || 'Dados inválidos' });
        return;
      }
      next(err);
    }
  },

  /**
   * Retorna perfil do cliente autenticado via Bearer Token
   */
  async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader?.replace(/^Bearer\s+/i, '');

      if (!token) {
        res.status(401).json({ error: 'Sessão não informada' });
        return;
      }

      const customer = await CustomerModel.findBySessionToken(token);
      if (!customer) {
        res.status(401).json({ error: 'Sessão expirada. Faça login novamente.' });
        return;
      }

      res.json(customer);
    } catch (err) {
      next(err);
    }
  },

  /**
   * Retorna pedidos do cliente autenticado
   */
  async getMyOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader?.replace(/^Bearer\s+/i, '');

      if (!token) {
        res.status(401).json({ error: 'Não autenticado' });
        return;
      }

      const customer = await CustomerModel.findBySessionToken(token);
      if (!customer) {
        res.status(401).json({ error: 'Sessão expirada. Faça login novamente.' });
        return;
      }

      const orders = await CustomerModel.getCustomerOrders(customer.email);
      res.json(orders);
    } catch (err) {
      next(err);
    }
  }
};
