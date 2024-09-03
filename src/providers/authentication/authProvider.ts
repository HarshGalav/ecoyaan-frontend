import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { CONSTANTS } from '../../../src/utils/constants';

interface AuthState {
  isLoggedIn: boolean;
  isSignup: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: AuthState = {
  isLoggedIn: false,
  isSignup: false,
  status: 'idle',
};

export const verifyAuth = createAsyncThunk('auth/verifyAuth', async () => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    try {
      const response = await axios.get(`${CONSTANTS.API_ENDPOINT}/v1/Tokens/validate-token`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.status === 200;
    } catch (error) {
      console.error('Token verification failed:', error);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('cartGuid');
      localStorage.removeItem('checkoutGuid');
      return false;
    }
  }
  return false;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
    setIsSignup(state, action: PayloadAction<boolean>) {
      state.isSignup = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyAuth.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(verifyAuth.fulfilled, (state, action: PayloadAction<boolean>) => {
        state.isLoggedIn = action.payload;
        state.status = 'succeeded';
      })
      .addCase(verifyAuth.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setIsLoggedIn, setIsSignup } = authSlice.actions;

export default authSlice.reducer;
