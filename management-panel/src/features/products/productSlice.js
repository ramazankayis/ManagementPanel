import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
};

export const getAllProducts = createAsyncThunk("products", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  return response.data;
});

export const userSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // http isteği olmaz ise
    handleDeleteProduct: (state, action) => {
      const productId = action.payload;
      state.products = state.products.filter(
        (product) => product.id !== productId
      );
    },
    addProduct: (state, action) => {
      const newProduct = {
        ...action.payload,
        id: Date.now(),
      };

      state.products = [...state.products, newProduct];
    },
    updateProduct: (state, action) => {
      const { id, title, body } = action.payload;
      const existingProduct = state.products.find(
        (product) => product.id === id
      );
      if (existingProduct) {
        existingProduct.title = title;
        existingProduct.body = body;
      }
    },
  },
  extraReducers: (builder) => {
    // http isteklerinde kullanılır.
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});
export const { handleDeleteProduct, addProduct, updateProduct } =
  userSlice.actions;

export default userSlice.reducer;
