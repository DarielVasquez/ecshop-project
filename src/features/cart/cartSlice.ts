import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartProduct, CartState } from "../../interfaces/product.interfaces";

const initialState: CartState = {
  cartItems: [],
  totalAmount: 0,
  totalCost: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartProduct>) {
      const isRepeated = state.cartItems.some((item) => {
        return item.id === action.payload.id;
      });
      const cart = state.cartItems.map((item) => {
        return item.id === action.payload.id
          ? {
              ...item,
              amount: item.amount + 1,
              total: item.price * (item.amount + 1),
            }
          : { ...item };
      });
      state.cartItems = isRepeated
        ? [...cart]
        : [...state.cartItems, action.payload];
      state.totalCost = state.totalCost + action.payload.price;
      state.totalAmount = state.totalAmount + 1;
    },
    removeFromCart(state, action: PayloadAction<CartProduct>) {
      state.cartItems = [...state.cartItems, action.payload];
    },
  },
});

export default cartSlice.reducer;
export const { addToCart, removeFromCart } = cartSlice.actions;
