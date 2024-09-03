import { createSlice, createAsyncThunk, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { cartApiService } from './cartApiService';
import { RootState } from '../../../stores/stores';
import { v4 as uuidv4 } from 'uuid';


interface CartItem {
  id: number;
  product_id: number;
  quantity: number;
  is_selected: boolean;
  product_name: string;
  product_description: string;
  product_price: number;
  orginal_price: number;
  discount: number;
  reviews: number;
  rating: number;
  image: string;
  cart_guid: string;
  total_amount: number;
  guest_fk: number;
}

export interface CheckoutItem extends CartItem {
  checkout_guid: string;
}

interface CartState {
  cartGuid: string | null;
  items: CartItem[];
  checkoutGuid: string | null;
  checkoutItems: CheckoutItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const getInitialCartGuid = () => {
  return localStorage.getItem('cartGuid') || null;
};
const getInitialCheckoutGuid = () => {
  return localStorage.getItem('checkoutGuid') || null;
};
const initialState: CartState = {
  cartGuid: getInitialCartGuid(),
  items: [],
  checkoutGuid: getInitialCheckoutGuid(),
  checkoutItems: [],
  error: null,
  status: 'idle',
};

export const generateGuid = () => {
  return uuidv4();
};

export const mergeAnonymousCart = createAsyncThunk(
  'cart/mergeAnonymousCart',
  async (anonymousCartGuid: string, {dispatch, rejectWithValue}) => {
    try {
      const response = await cartApiService.mergeCartItems(anonymousCartGuid);
      dispatch(setCartGuid(response.cartGuid));
      return response.items;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchCartItems = createAsyncThunk(
  'cart/fetchItems',
  async (cartGuid: string | null, { rejectWithValue }) => {
    if (!cartGuid) {
      return rejectWithValue('Cart GUID is null');
    }
    try {
      return await cartApiService.getCartItems(cartGuid);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const addItemToCart = createAsyncThunk(
  'cart/addItem',
  async (items: { product_id: number; quantity: number; is_selected: boolean }[], { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const cartGuid = state.cart.cartGuid || generateGuid();
      const response = await cartApiService.addToCart(items, cartGuid);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateCartItem = createAsyncThunk(
  'cart/updateItem',
  async ({ cartGuid, productId, quantity, is_selected }: { cartGuid: string; productId: number; quantity: number; is_selected: boolean }, { rejectWithValue }) => {
    try {
      return await cartApiService.updateCartItem(cartGuid, productId, quantity, is_selected);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const removeCartItem = createAsyncThunk(
  'cart/removeItem',
  async ({ cartGuid, productId }: { cartGuid: string; productId: number }, { rejectWithValue }) => {
    try {
      await cartApiService.removeFromCart(cartGuid, productId);
      return productId;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const createCheckout = createAsyncThunk(
  'cart/createCheckout',
  async (cartGuid: string, { rejectWithValue }) => {
    try {
      return await cartApiService.createCheckout(cartGuid);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const getCheckoutItems = createAsyncThunk(
  'cart/getCheckoutItems',
  async (checkoutGuid: string, { rejectWithValue }) => {
    try {
      return await cartApiService.getCheckoutItems(checkoutGuid);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
export const buyNow = createAsyncThunk(
  'cart/buyNow',
  async (productIds: number[], { rejectWithValue }) => {
    try {
      const response = await cartApiService.createDirectCheckout(productIds);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartGuid: (state, action: PayloadAction<string>) => {
      state.cartGuid = action.payload;
      localStorage.setItem('cartGuid', action.payload);
    },
    setCheckoutGuid: (state, action: PayloadAction<string>) => {
      state.checkoutGuid = action.payload;
      localStorage.setItem('checkoutGuid', action.payload);
    },
    clearCart: (state) => {
      state.items = [];
      state.cartGuid = null;
      state.checkoutGuid = null;
      localStorage.removeItem('cartGuid');
      localStorage.removeItem('checkoutGuid');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        if (action.payload.length > 0 && action.payload[0].cart_guid && !state.cartGuid) {
          state.cartGuid = action.payload[0].cart_guid;
          localStorage.setItem('cartGuid', action.payload[0].cart_guid);
        }
      })
      .addCase(mergeAnonymousCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.items.push(...action.payload);
        if (action.payload.length > 0 && action.payload[0].cart_guid && !state.cartGuid) {
          state.cartGuid = action.payload[0].cart_guid;
          localStorage.setItem('cartGuid', action.payload[0].cart_guid);
        }
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const { cartGuid, productId, quantity, is_selected } = action.meta.arg;
        const item = state.items.find(item => item.cart_guid === cartGuid && item.product_id === productId);
        if (item) {
          item.quantity = quantity;
          item.is_selected = is_selected;
        }
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.product_id !== action.payload);
      })
      .addCase(createCheckout.fulfilled, (state, action) => {
        state.checkoutGuid = action.payload.checkout_guid;
        localStorage.setItem('checkoutGuid', action.payload.checkout_guid);
      })
      .addCase(getCheckoutItems.fulfilled, (state, action: PayloadAction<CheckoutItem[]>) => {
        state.checkoutItems = action.payload;
        if (action.payload.length > 0) {
          state.checkoutGuid = action.payload[0].checkout_guid;
          localStorage.setItem('checkoutGuid', action.payload[0].checkout_guid);
        }
      })
      .addCase(buyNow.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(buyNow.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.checkoutGuid = action.payload.checkout_guid;
        state.checkoutItems = action.payload.checkoutItems;
        localStorage.setItem('checkoutGuid', action.payload.checkout_guid);
      })
      .addCase(buyNow.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});
export const {setCheckoutGuid, setCartGuid, clearCart } = cartSlice.actions;
export const selectItems = (state: RootState) => state.cart.items;
export const selectCartGuid = (state: RootState) => state.cart.cartGuid;
export const selectCheckoutGuid = (state: RootState) => state.cart.checkoutGuid;
export const selectCheckoutItems = (state: RootState) => state.cart.checkoutItems;
export const selectTotal = createSelector(
  [selectItems],
  (items) => items.reduce((total, item) => {
    if (item.is_selected) {
      return total + item.product_price * item.quantity;
    }
    return total;
  }, 0)
);

export default cartSlice.reducer;