import nodemailer from 'nodemailer';
import { ENV } from '../config/env.js';

let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter | null {
  if (transporter) return transporter;

  if (ENV.EMAIL.HOST && ENV.EMAIL.USER && ENV.EMAIL.PASS) {
    transporter = nodemailer.createTransport({
      host: ENV.EMAIL.HOST,
      port: ENV.EMAIL.PORT,
      secure: ENV.EMAIL.SECURE,
      auth: {
        user: ENV.EMAIL.USER,
        pass: ENV.EMAIL.PASS,
      },
    });
    return transporter;
  }

  return null;
}

export const EmailService = {
  /**
   * Envia o código de 6 dígitos (OTP) para o email do cliente
   */
  async sendOtpCodeEmail(toEmail: string, code: string): Promise<{ success: boolean; preview?: string }> {
    const subject = `Seu código de acesso Pedra Mania: ${code}`;
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #F0F7FF; margin: 0; padding: 20px; color: #1E293B; }
          .card { max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 20px; padding: 32px; border: 1px solid #BFDBFE; box-shadow: 0 4px 12px rgba(37,99,235,0.08); }
          .header { text-align: center; margin-bottom: 24px; }
          .logo { font-size: 26px; font-weight: bold; color: #2563EB; margin: 0; }
          .sublogo { font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #64748B; margin-top: 4px; font-weight: bold; }
          .code-box { background: #EFF6FF; border: 2px dashed #93C5FD; border-radius: 16px; padding: 20px; text-align: center; margin: 24px 0; }
          .code { font-size: 34px; font-weight: 900; letter-spacing: 8px; color: #2563EB; margin: 0; font-family: monospace; }
          .note { font-size: 13px; color: #64748B; line-height: 1.6; text-align: center; }
          .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #E2E8F0; text-align: center; font-size: 11px; color: #94A3B8; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <h1 class="logo">Pedra Mania</h1>
            <div class="sublogo">Armarinho & Artesanato · Vitória / ES</div>
          </div>

          <p style="font-size: 15px; font-weight: bold; margin-bottom: 8px;">Olá!</p>
          <p style="font-size: 14px; line-height: 1.5; color: #475569;">
            Aqui está o seu código de segurança para entrar na sua conta e visualizar seus pedidos:
          </p>

          <div class="code-box">
            <div class="code">${code}</div>
            <div style="font-size: 11px; color: #3B82F6; margin-top: 8px; font-weight: bold;">
              ⏱️ Válido por 15 minutos
            </div>
          </div>

          <p class="note">
            Se não solicitou este acesso, pode ignorar este email com segurança. Nunca compartilhe este código com ninguém.
          </p>

          <div class="footer">
            © 2026 Pedra Mania Armarinho & Artesanato · Vitória, ES · (27) 99604-3041
          </div>
        </div>
      </body>
      </html>
    `;

    const transport = getTransporter();

    if (transport) {
      try {
        await transport.sendMail({
          from: ENV.EMAIL.FROM,
          to: toEmail,
          subject,
          html,
        });
        console.log(`📧 [SMTP] Código de login enviado com sucesso para: ${toEmail}`);
        return { success: true };
      } catch (err: any) {
        console.warn(`⚠️ [SMTP Falha] Não foi possível enviar email via SMTP: ${err.message}.`);
      }
    }

    // Modo Sandbox / Fallback no Terminal
    console.log(`\n======================================================`);
    console.log(`📬 [DEV EMAIL SANDBOX] Código de Acesso para: ${toEmail}`);
    console.log(`🔑 CÓDIGO OTP: ${code}`);
    console.log(`⏱️ Validade: 15 minutos`);
    console.log(`======================================================\n`);

    return { success: true, preview: `Código: ${code} (Modo Sandbox)` };
  },

  /**
   * Envia o email de confirmação de pedido para o cliente
   */
  async sendOrderConfirmationEmail(order: any): Promise<{ success: boolean }> {
    const subject = `Pedido Recebido! #${order.id} — Pedra Mania Armarinho 🧶✨`;

    const itemsHtml = (order.items || []).map((it: any) => `
      <tr style="border-bottom: 1px solid #F1F5F9;">
        <td style="padding: 10px 0; font-size: 13px; font-weight: bold; color: #1E293B;">
          ${it.product_name || it.name}
          ${it.selected_color ? `<br><span style="font-size: 11px; font-weight: normal; color: #64748B;">Cor: ${it.selected_color}</span>` : ''}
        </td>
        <td style="padding: 10px 0; font-size: 13px; text-align: center; color: #475569;">
          ${it.qty}x
        </td>
        <td style="padding: 10px 0; font-size: 13px; font-weight: bold; text-align: right; color: #2563EB;">
          R$ ${((it.unit_price || it.price || 0) * it.qty).toFixed(2).replace('.', ',')}
        </td>
      </tr>
    `).join('');

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #F0F7FF; margin: 0; padding: 20px; color: #1E293B; }
          .card { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 20px; padding: 32px; border: 1px solid #BFDBFE; box-shadow: 0 4px 14px rgba(37,99,235,0.08); }
          .header { text-align: center; margin-bottom: 24px; }
          .logo { font-size: 28px; font-weight: bold; color: #2563EB; margin: 0; }
          .badge-status { display: inline-block; background: #DBEAFE; color: #1D4ED8; font-size: 12px; font-weight: 800; padding: 6px 14px; rounded-full; border-radius: 20px; margin: 12px 0; }
          .order-id { font-size: 20px; font-weight: 900; color: #1E293B; margin: 4px 0; }
          .table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          .total-box { background: #F8FAFC; border-radius: 12px; padding: 16px; margin-top: 16px; border: 1px solid #E2E8F0; }
          .btn-portal { display: block; text-align: center; background: #2563EB; color: #ffffff; font-weight: bold; padding: 14px 20px; border-radius: 12px; text-decoration: none; margin: 24px 0 16px; }
          .links { text-align: center; font-size: 12px; color: #64748B; margin-top: 20px; padding-top: 16px; border-top: 1px solid #E2E8F0; }
          .links a { color: #2563EB; text-decoration: underline; margin: 0 8px; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <h1 class="logo">Pedra Mania</h1>
            <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #64748B; font-weight: bold;">
              Armarinho & Artesanato · Vitória / ES
            </div>
            <div class="badge-status">📦 Pedido Recebido · Em Preparação</div>
            <div class="order-id">Pedido #${order.id}</div>
          </div>

          <p style="font-size: 15px; font-weight: bold; margin-bottom: 6px;">
            Olá, ${order.customer_name}!
          </p>
          <p style="font-size: 14px; line-height: 1.6; color: #475569;">
            Recebemos o seu pedido com muito carinho! A nossa equipe já está a separar os seus insumos e materiais para envio.
          </p>

          <table class="table">
            <thead>
              <tr style="border-bottom: 2px solid #E2E8F0; text-align: left; font-size: 11px; text-transform: uppercase; color: #94A3B8;">
                <th style="padding-bottom: 8px;">Item</th>
                <th style="padding-bottom: 8px; text-align: center;">Qtd</th>
                <th style="padding-bottom: 8px; text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <div class="total-box">
            <div style="display: flex; justify-content: space-between; font-size: 13px; color: #64748B; margin-bottom: 6px;">
              <span>Subtotal dos Produtos:</span>
              <span>R$ ${(order.subtotal || 0).toFixed(2).replace('.', ',')}</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 13px; color: #64748B; margin-bottom: 6px;">
              <span>Frete (${order.shipping_service_name || 'Correios / Jadlog'}):</span>
              <span>R$ ${(order.shipping_cost || 0).toFixed(2).replace('.', ',')}</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 16px; font-weight: 900; color: #1E293B; padding-top: 8px; border-top: 1px dashed #CBD5E1;">
              <span>Valor Total:</span>
              <span style="color: #2563EB;">R$ ${(order.total || 0).toFixed(2).replace('.', ',')}</span>
            </div>
          </div>

          <div style="margin-top: 18px; font-size: 12px; color: #64748B; line-height: 1.5; background: #EFF6FF; padding: 12px 16px; border-radius: 10px;">
            <strong>📍 Endereço de Destino:</strong><br>
            ${order.full_address || `${order.address_street || ''}, ${order.address_number || ''} - ${order.address_district || ''}, ${order.address_city || 'Vitória'} - ${order.address_state || 'ES'}, CEP: ${order.address_zip || ''}`}
          </div>

          <div class="links">
            <p style="font-weight: bold; margin-bottom: 8px; color: #1E293B;">Precisa de ajuda ou deseja acompanhar?</p>
            <a href="https://wa.me/5527996043041" target="_blank">WhatsApp de Atendimento</a> · 
            <a href="#about">Política de Trocas & Devoluções</a> · 
            <a href="#how-to">Como Funciona a Entrega no ES</a>
          </div>
        </div>
      </body>
      </html>
    `;

    const transport = getTransporter();

    if (transport && order.email) {
      try {
        await transport.sendMail({
          from: ENV.EMAIL.FROM,
          to: order.email,
          subject,
          html,
        });
        console.log(`📧 [SMTP] Email de confirmação de pedido enviado para: ${order.email}`);
        return { success: true };
      } catch (err: any) {
        console.warn(`⚠️ [SMTP Falha] Não foi possível enviar confirmação para ${order.email}: ${err.message}`);
      }
    }

    console.log(`\n======================================================`);
    console.log(`📬 [DEV EMAIL SANDBOX] Confirmação de Pedido #${order.id}`);
    console.log(`👤 Cliente: ${order.customer_name} (${order.email})`);
    console.log(`💰 Total: R$ ${(order.total || 0).toFixed(2)}`);
    console.log(`📦 Status: Em Preparação`);
    console.log(`======================================================\n`);

    return { success: true };
  }
};
