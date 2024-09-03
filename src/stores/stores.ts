import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/providers/cartSlice";
import authProvider from "../providers/authentication/authProvider";
import toastProvider from "../providers/toast/toastProvider";
import wishlistReducer from '../features/wishlist/WishlistSlice';


const rootReducer = combineReducers({
  authProvider: authProvider,
  cart: cartReducer,
  wishlist: wishlistReducer,
  toastProvider: toastProvider,
});


export const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
