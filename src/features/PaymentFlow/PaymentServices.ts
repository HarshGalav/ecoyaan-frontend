import axios from 'axios';

export const initiatePayment = async (paymentData: any): Promise<any> => {
  try {
    const response = await axios.post('https://localhost:5003/v1/payments', paymentData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error initiating payment:', error.response?.data || error.message);
    } else if (error instanceof Error) {
      console.error('Error initiating payment:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error; // Rethrow the error for further handling
  }
};

export const initiateRefund = async (refundData: any): Promise<any> => {
  try {
    const response = await fetch('https://localhost:5003/api/Payment/InitiateRefund', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(refundData),
    });

    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
      const result = await response.json();
      return result;
    } else {
      const text = await response.text();
      throw new Error(`Failed to initiate refund: ${text}`);
    }
  } catch (error) {
    console.error('Error initiating refund:', error);
    throw error; // Rethrow the error for further handling
  }
};