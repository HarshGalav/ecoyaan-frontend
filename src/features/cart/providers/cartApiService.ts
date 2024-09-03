import axios, { AxiosInstance } from 'axios';
import { CONSTANTS } from '../../../utils/constants';

const API_BASE_URL = `${CONSTANTS.API_ENDPOINT}/v1/cart`;

class CartApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    });
  }

  async getCartItems(cartGuid: string) {
    try {
      const response = await this.api.get(`/${cartGuid}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async mergeCartItems(anonymousCartGuid: string) {
    try {
      const response = await this.api.post('/merge', { anonymous_cart_guid: anonymousCartGuid });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async addToCart(items: { product_id: number; quantity: number; is_selected: boolean }[], cartGuid: string) {
    try {
      const response = await this.api.post('', { 
        Items: items,
        cart_guid: cartGuid
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

async updateCartItem(cartGuid: string, productId: number, quantity: number, is_selected: boolean) {
  try {
    const response = await this.api.put(`/${cartGuid}/products/${productId}`, {
      quantity,
      is_selected,
    });
    return response.data;
  } catch (error) {
    this.handleError(error);
  }
}
  

  async removeFromCart(cartGuid: string, productId: number) {
    try {
      await this.api.delete(`/${cartGuid}/products/${productId}`);
    } catch (error) {
      this.handleError(error);
    }
  }

  async createCheckout(cartGuid: string) {
    try {
      const response = await this.api.post(`/${cartGuid}/checkout`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getCheckoutItems(checkoutGuid: string) {
    try {
      const response = await this.api.get(`/checkout/${checkoutGuid}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async createDirectCheckout(productIds: number[]) {
    try {
      const response = await this.api.post('/buy_now', {
        products: productIds.map(id => ({ product_id: id })),
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any) {
    if (axios.isAxiosError(error)) {
      console.error('API call error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'An error occurred');
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
}

export const cartApiService = new CartApiService();