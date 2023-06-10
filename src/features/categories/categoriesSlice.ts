import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  Category,
  CategoriesState,
} from "../../interfaces/category.interfaces";

const initialState: CategoriesState = {
  data: [],
  loading: false,
  error: "",
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await fetch(
      "https://fakestoreapi.com/products/categories"
    );
    const result = await response.json();
    return result;
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchCategories.fulfilled,
      (state, action: PayloadAction<Category[]>) => {
        state.loading = false;
        state.data = action.payload;
      }
    );
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Unknown error occurred.";
    });
  },
});

export default categoriesSlice.reducer;
