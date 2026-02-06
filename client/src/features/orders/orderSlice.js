import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  placeOrder,
  startPayment,
  getMyOrders,
} from "./orderService";

/* ======================
   THUNKS
====================== */

export const createOrder = createAsyncThunk(
  "order/create",
  async (items, thunkAPI) => {
    try {
      return await placeOrder(items);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Order failed"
      );
    }
  }
);

export const fetchMyOrders = createAsyncThunk(
  "order/myOrders",
  async (_, thunkAPI) => {
    try {
      return await getMyOrders();   // ✅ already array
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Fetch orders failed"
      );
    }
  }
);

export const payOrder = createAsyncThunk(
  "order/pay",
  async (orderId, thunkAPI) => {
    try {
      return await startPayment(orderId);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Payment failed"
      );
    }
  }
);

/* ======================
   SLICE
====================== */

const orderSlice = createSlice({
  name: "order",

  initialState: {
    currentOrder: null,
    myOrders: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      /* CREATE ORDER */
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* PAY ORDER */
      .addCase(payOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(payOrder.fulfilled, (state, action) => {
        state.loading = false;
        window.location.href = action.payload.url;
      })
      .addCase(payOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* MY ORDERS */
      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.myOrders = action.payload;   // ✅ array
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
