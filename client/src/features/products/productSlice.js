import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts } from "./productService";
import { fetchProductsAPI } from "./productAPI";
import { getProductById } from "./productService";

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await fetchProductsAPI();
      console.log("PRODUCT RESPONSE:", res.data);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to load products"
      );
    }
  }
);

export const fetchProductById = createAsyncThunk('products/fetchOne', async(id, thunkAPI) => {
  try {
    return await getProductById(id);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
}
);




const productSlice = createSlice({
  name: "products",
  initialState: {
    list: [],
    single: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
      })
      .addCase(fetchProductById.pending, (state) => {
  state.loading = true;
})
.addCase(fetchProductById.fulfilled, (state, action) => {
  state.loading = false;
  state.single = action.payload.data;
})
.addCase(fetchProductById.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      
  },
});




export default productSlice.reducer;
