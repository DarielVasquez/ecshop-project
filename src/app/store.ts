import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice";
import cartReducer from "../features/cart/cartSlice";
import categoryReducer from "../features/categories/categoriesSlice";
import categoryProductsReducer from "../features/categoryProducts/categoryProductsSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    categories: categoryReducer,
    categoryProducts: categoryProductsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
