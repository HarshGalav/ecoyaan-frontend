import axios from 'axios';
import { CONSTANTS } from "../../utils/constants";
interface Phone {
    code: string;
    number: string;
  }
  

export type UserData = {
  first_name: string;
  email: string;
  phone: Phone;
};

const getGuestData = async (guestId: string, accessToken: string): Promise<UserData> => {
  try {
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    const response = await axios.get(`${CONSTANTS.API_ENDPOINT}/v1/guests/${guestId}`);
    const { first_name, email, phone: {  number: phone } } = response.data.guest;
    return { first_name, email, phone:{code :"" , number:phone} };
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};


const updateGuestData = async (guestId: string|null, accessToken: string|null, updatedData: UserData): Promise<void> => {
  try {
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    await axios.put(`${CONSTANTS.API_ENDPOINT}/v1/guests/${guestId}`, updatedData);
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error;
  }
};

export { getGuestData, updateGuestData };
