import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getStats, getAllProducts, deleteProduct } from "./adminService";
import { getAllOrders, updateOrderStatus } from "./adminService";


/* ======================
   THUNKS
====================== */

export const fetchStats = createAsyncThunk(
  "admin/stats",
  async (_, thunkAPI) => {
    try {
      return await getStats();
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to load stats"
      );
    }
  }
);
export const fetchAllOrders = createAsyncThunk(
  "admin/orders",
  async (_, thunkAPI) => {
    try {
      return await getAllOrders();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const changeOrderStatus = createAsyncThunk(
  "admin/changeStatus",
  async ({ id, status }, thunkAPI) => {
    try {
      return await updateOrderStatus(id, status);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const fetchAllProducts = createAsyncThunk(
  "admin/products",
  async (_, thunkAPI) => {
    try {
      return await getAllProducts();
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to load products"
      );
    }
  }
);

export const removeProduct = createAsyncThunk(
  "admin/deleteProduct",
  async (id, thunkAPI) => {
    try {
      return await deleteProduct(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Delete failed"
      );
    }
  }
);

/* ======================
   SLICE
====================== */

const adminSlice = createSlice({
  name: "admin",

  initialState: {
    stats: null,
    products: [],
    orders: [],
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder

      /* STATS */
      .addCase(fetchStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.data;
      })
      .addCase(fetchStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* PRODUCTS */
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* DELETE PRODUCT */
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (p) => p._id !== action.meta.arg
        );
      }).addCase(fetchAllOrders.fulfilled, (state, action) => {
  state.orders = action.payload.data;
})
.addCase(changeOrderStatus.fulfilled, (state, action) => {
  const idx = state.orders.findIndex(
    (o) => o._id === action.payload.data._id
  );
  state.orders[idx] = action.payload.data;
});

  },
});

export default adminSlice.reducer;
