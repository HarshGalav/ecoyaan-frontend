import axios, { AxiosInstance } from 'axios';
import { CONSTANTS } from '../../utils/constants';

const API_BASE_URL = `${CONSTANTS.API_ENDPOINT}/v1`;

export interface PaymentData {
  checkout_guid: string;
  total_amount: string;
  address: string;
  name: string;
  email: string;
  pincode: string;
  city: string;
  phone_number: string;
  state: string;
  additional_parameters: {
    additionalProp2: string | null;
  };
}

interface RefundData {
  orderId: string;
  trackingId: string;
  totalAmount: number;
}

interface PaymentDetails {
  orderStatus: string;
  trackingId: string;
}

class PaymentApiService {
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

  async initiatePayment(paymentData: PaymentData) {
    try {
      const response = await this.api.post('/payments', paymentData);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async initiateRefund(refundData: RefundData) {
    try {
      const response = await this.api.post('/payments/refund', refundData);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async fetchOrderStatus(orderId: string): Promise<PaymentDetails> {
    try {
      const response = await this.api.get<PaymentDetails>(`/payments/details/${orderId}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
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

export const paymentApiService = new PaymentApiService();