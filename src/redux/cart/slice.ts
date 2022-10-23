import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, initialState } from '../cart/types';

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    //Add Item to Cart
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((item) => item.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.items.reduce((sum, item) => item.price * item.count + sum, 0);
    },
    //Remove Item in Cart
    removeItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((item) => item.id === action.payload);
      if (findItem) {
        findItem.count--;
        state.totalPrice -= findItem.price;
      }
    },
    //Remove All select Item in Cart
    removeAllItems(state, action: PayloadAction<CartItem>) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      state.totalPrice -= action.payload.count * action.payload.price;
    },
    //Clear All Cart
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, removeAllItems, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
