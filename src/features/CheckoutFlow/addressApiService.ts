import axios, { AxiosInstance } from 'axios';
import { CONSTANTS } from '../../utils/constants';

const API_BASE_URL = `${CONSTANTS.API_ENDPOINT}/v1/guests`;

interface AddressModel {
  name: string;
  email: string;
  phone_number: string;
  address_line: string;
  city: string;
  state: string;
  pincode: string;
  default_address?:boolean;
}

interface AddressResponseModel extends AddressModel {
  address_guid?: string;
}

class AddressApiService {
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

  async getAddress(address_guid: string) {
    try {
      const response = await this.api.get(`/addresses/${address_guid}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getAllAddresses() {
    try {
      const response = await this.api.get('/addresses');
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async createAddress(addressCreate: AddressModel) {
    try {
      const addressToCreate = { ...addressCreate };
      const response = await this.api.post('/address', addressToCreate);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async toggleDefaultAddress(address_guid: string) {
    try {
      const response = await this.api.patch(`/address/${address_guid}/default`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }
  async getDefaultAddress() {
    try {
      const response = await this.api.get('/addresses?default_only=true');
      return response.data[0];
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateAddress(address_guid: string, address: AddressResponseModel) {
    try {
      const response = await this.api.put(`/addresses/${address_guid}`, address);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async deleteAddress(address_guid: string) {
    try {
      await this.api.delete(`/addresses/${address_guid}`);
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

export const addressApiService = new AddressApiService();