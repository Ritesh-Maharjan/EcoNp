import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: null || localStorage.getItem("cart"),
  toggleCart: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    displayCart: (state) => {
      state.toggleCart = !state.toggleCart;
    },
    addToCart: (state, action) => {},
    removeFromCart: (state, action) => {},
  },
});

export const getCart = (state) => state.cart.cart;
export const toggleCart = (state) => state.cart.toggleCart;

// Action creators are generated for each case reducer function
export const { displayCart, addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
