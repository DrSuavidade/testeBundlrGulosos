export interface CustomerUser {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  created_at: string;
}

export interface CustomerOrder {
  id: string;
  customer_name: string;
  email: string;
  phone: string;
  fulfillment_type: 'delivery' | 'pickup';
  address_zip?: string;
  full_address?: string;
  subtotal: number;
  shipping_cost: number;
  total: number;
  shipping_service_name?: string;
  shipping_carrier?: string;
  package_tier?: string;
  status: 'new' | 'preparing' | 'ready' | 'delivered';
  created_at: string;
  items: {
    id?: number;
    product_id: string;
    product_name: string;
    product_image?: string;
    selected_color?: string;
    qty: number;
    unit_price: number;
  }[];
}

const TOKEN_KEY = 'pedramania_customer_token_v1';

export const customerService = {
  getToken(): string | null {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },

  setToken(token: string) {
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch (e) {
      console.error(e);
    }
  },

  logout() {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch (e) {
      console.error(e);
    }
  },

  async sendLoginCode(email: string): Promise<{ success: boolean; message: string; preview?: string }> {
    const res = await fetch('/api/customer/auth/send-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Erro ao enviar código.');
    }
    return data;
  },

  async verifyCode(email: string, code: string): Promise<{ success: boolean; customer: CustomerUser; token: string }> {
    const res = await fetch('/api/customer/auth/verify-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code })
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Código inválido ou expirado.');
    }

    if (data.token) {
      this.setToken(data.token);
    }
    return data;
  },

  async getMe(): Promise<CustomerUser | null> {
    const token = this.getToken();
    if (!token) return null;

    try {
      const res = await fetch('/api/customer/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) {
        this.logout();
        return null;
      }
      return await res.json();
    } catch {
      return null;
    }
  },

  async getMyOrders(): Promise<CustomerOrder[]> {
    const token = this.getToken();
    if (!token) return [];

    try {
      const res = await fetch('/api/customer/orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) {
        return [];
      }
      return await res.json();
    } catch {
      return [];
    }
  }
};
