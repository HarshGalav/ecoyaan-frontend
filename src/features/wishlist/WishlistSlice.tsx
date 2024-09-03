import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../Products/products";
import { addItemToCart } from '../cart/providers/cartSlice';  // Import addToBasket thunk

export interface WishlistState {
    items: Product[];
}

const initialState: WishlistState = {
    items: [],
};

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishlist: (state, action: PayloadAction<Product>) => {
            const item = action.payload;
            const existingItem = state.items.find(wishlistItem => wishlistItem.productId === item.productId);

            if (!existingItem) {
                state.items.push({ ...item});
            }
        },
        removeFromWishlist: (state, action: PayloadAction<{ id: number }>) => {
            const index = state.items.findIndex(wishlistItem => wishlistItem.productId === action.payload.id);

            if (index >= 0) {
                state.items.splice(index, 1);
            } else {
                console.warn(`Cannot remove product (id: ${action.payload.id}) as it's not in the wishlist!`);
            }
        },
        moveToBasket: (state, action: PayloadAction<Product>) => {
            const item = action.payload;
            const index = state.items.findIndex(wishlistItem => wishlistItem.productId === item.productId);

            if (index >= 0) {
                state.items.splice(index, 1); 
            } else {
                console.warn(`Cannot move product (id: ${item.productId}) as it's not in the wishlist!`);
            }
        }
    },
});

export const { addToWishlist, removeFromWishlist, moveToBasket } = wishlistSlice.actions;
export const selectWishlistItems = (state: { wishlist: WishlistState }) => state.wishlist.items;

export default wishlistSlice.reducer;
