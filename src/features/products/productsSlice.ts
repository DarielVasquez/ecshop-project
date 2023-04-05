import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  category: string;
  description: string;
  id: number;
  price: number;
  rating: { count: number; rate: number };
  image: string;
  title: string;
}

interface ProductsState {
  data: Product[];
  loading: boolean;
  error: string;
}

const initialState: ProductsState = {
  data: [],
  loading: false,
  error: "",
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch(
      "https://fakestoreapi.com/products/category/electronics?limit=4"
    );
    const result = await response.json();
    return result;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchProducts.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.data = action.payload;
      }
    );
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Unknown error occurred.";
    });
  },
});

export default productsSlice.reducer;
