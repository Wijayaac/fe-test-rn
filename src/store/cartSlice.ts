import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Product} from '../types/product';

type CartItem = Product & {quantity: number};

interface CartState {
  items: CartItem[];
  isCheckoutVisible: boolean;
}

const initialState: CartState = {
  items: [],
  isCheckoutVisible: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        item => item.id === action.payload.id,
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{itemId: number; increment: boolean}>,
    ) => {
      const item = state.items.find(item => item.id === action.payload.itemId);
      if (item) {
        item.quantity = action.payload.increment
          ? item.quantity + 1
          : Math.max(0, item.quantity - 1);
      }
      state.items = state.items.filter(item => item.quantity > 0);
    },
    setCheckoutVisible: (state, action: PayloadAction<boolean>) => {
      state.isCheckoutVisible = action.payload;
    },
    clearCart: state => {
      state.items = [];
      state.isCheckoutVisible = false;
    },
  },
});

export const {addToCart, updateQuantity, setCheckoutVisible, clearCart} =
  cartSlice.actions;
export default cartSlice.reducer;
