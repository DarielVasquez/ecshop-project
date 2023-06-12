import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductsState } from "../../interfaces/product.interfaces";

const initialState: ProductsState = {
  data: [],
  loading: false,
  error: "",
};

export const fetchCategoryProducts = createAsyncThunk(
  "categoryProducts/fetchCategoryProducts",
  async (category: string) => {
    const response = await fetch(
      `https://fakestoreapi.com/products/category/${category}`
    );
    const result = await response.json();
    return result;
  }
);

const categoryProductsSlice = createSlice({
  name: "categoryProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategoryProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchCategoryProducts.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.data = action.payload;
      }
    );
    builder.addCase(fetchCategoryProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Unknown error occurred.";
    });
  },
});

export default categoryProductsSlice.reducer;
