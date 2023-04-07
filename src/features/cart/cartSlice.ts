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
    removeOneFromCart(state, action: PayloadAction<CartProduct>) {
      const cart = state.cartItems.map((item) => {
        return item.id === action.payload.id
          ? {
              ...item,
              amount: item.amount - 1,
              total: item.price * (item.amount - 1),
            }
          : { ...item };
      });
      const cartFilter = cart.filter((item) => {
        return item.amount !== 0;
      });
      state.cartItems = [...cartFilter];
      state.totalCost = state.totalCost - action.payload.price;
      state.totalAmount = state.totalAmount - 1;
    },
    removeItemFromCart(state, action: PayloadAction<CartProduct>) {
      const cartFilter = state.cartItems.filter((item) => {
        return item.id !== action.payload.id;
      });
      state.cartItems = [...cartFilter];
      state.totalCost = state.totalCost - action.payload.total;
      state.totalAmount = state.totalAmount - action.payload.amount;
    },
  },
});

export default cartSlice.reducer;
export const { addToCart, removeOneFromCart, removeItemFromCart } =
  cartSlice.actions;
