import axios from "axios";
import { CONSTANTS } from "../../utils/constants";

// Define the data structures
interface Data {
  identifier: string;
  otp?: string;
  source: number;
}

interface ClientInfo {
  user_agent: string;
  os: string;
  browser: string;
  browser_version: string;
  device_type: string;
  screen_resolution: string;
  language: string;
  locale: string;
  time_zone: string;
  network: string;
}

interface CreateUserProfileData {
  code: string;
  client_info: ClientInfo;
}

interface RefreshTokenData {
  refresh_token: string;
  reference_id: number;
  client_info: ClientInfo;
}

// Create an Axios instance with base configuration
const apiClient = axios.create({
  baseURL: `${CONSTANTS.API_ENDPOINT}/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to handle errors if needed
const handleApiError = (error: unknown) => {
  // Customize error handling here if needed
  console.error("API call error:", error);
  throw error;
};

export const sendOtpApi = async (data: Data) => {
  try {
    const response = await apiClient.post("/guests/send_otp", data);
    localStorage.setItem('identifier', data.identifier);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const verifyOtpApi = async (guestId: string, otp: string) => {
  try {
    const response = await apiClient.post(`/guests/${guestId}/verify_otp`, {
      otp,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const createUserProfileApi = async (data: CreateUserProfileData) => {
  try {
    const response = await apiClient.post("/Tokens", data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const resendOtpApi = async (data: { identifier: string }) => {
  try {
    const response = await apiClient.post("/guests/send_otp", data);
    localStorage.setItem('identifier', data.identifier);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const refreshAccessTokenApi = async (data: RefreshTokenData) => {
  try {
    const response = await apiClient.post("/Tokens/refresh-token", data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
