import { createSlice } from "@reduxjs/toolkit";

const cartFromStorage = JSON.parse(
  localStorage.getItem("cartItems")
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: cartFromStorage || [],
  },

  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existing = state.items.find(
        (x) => x._id === item._id
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }

      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.items)
      );
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (x) => x._id !== action.payload
      );

      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.items)
      );
    },

    updateQty: (state, action) => {
      const { id, qty } = action.payload;
      const item = state.items.find((x) => x._id === id);
      if (item) item.quantity = qty;

      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.items)
      );
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cartItems");
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
