import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [] || localStorage.getItem("cart"),
  toggleCart: false,
  cartTotal: 0,
  totalItems: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    displayCart: (state) => {
      state.toggleCart = !state.toggleCart;
    },
    addToCart: (state, action) => {
      // Putting the quantity of the product else defaulting to 0
      let quantity =
        state.cart.find((el) => el.product === action.payload.product)
          ?.quantity || 0;
      // Adding the quantity to the quantity
      quantity = action.payload.quantity + quantity;

      // checking if the product exists in the cart or not
      const isPresent = state.cart.findIndex(
        (el) => el.product === action.payload.product
      );
      // if product exists then just change the quantity
      if (isPresent >= 0) {
        let tempObj = state.cart[isPresent];
        tempObj.quantity = quantity;
        state.cart[isPresent] = tempObj;
      } else {
        state.cart.push(action.payload);
      }

      // changing the cart total
      state.cartTotal =
        state.cartTotal + action.payload.quantity * action.payload.price;

      // set total item
      state.totalItems = state.cart.length;
    },
    increaseQuantity: (state, action) => {
      let quantity =
        state.cart.find((el) => el.product === action.payload.product)
          ?.quantity + 1;

      const isPresent = state.cart.findIndex(
        (el) => el.product === action.payload.product
      );
      if (isPresent >= 0) {
        let tempObj = state.cart[isPresent];
        tempObj.quantity = quantity;
        state.cart[isPresent] = tempObj;
      } else {
        state.cart.push(action.payload);
      }
      state.cartTotal = state.cartTotal + action.payload.price;
    },
    decreaseQuantity: (state, action) => {
      let quantity =
        state.cart.find((el) => el.product === action.payload.product)
          ?.quantity - 1;
      const isPresent = state.cart.findIndex(
        (el) => el.product === action.payload.product
      );
      if (isPresent >= 0) {
        let tempObj = state.cart[isPresent];
        tempObj.quantity = quantity;
        state.cart[isPresent] = tempObj;
      } else {
        state.cart.push(action.payload);
      }

      state.cartTotal = state.cartTotal - action.payload.price;
    },
    removeFromCart: (state, action) => {
      const quantity = state.cart.find(
        (el) => el.product === action.payload.product
      )?.quantity;
      const price = state.cart.find(
        (el) => el.product === action.payload.product
      )?.price;
      state.cart = [
        ...state.cart.filter((el) => el.product !== action.payload.product),
      ];

      state.cartTotal = state.cartTotal - quantity * price;
      state.totalItems = state.cart.length;
    },
  },
});

export const getCart = (state) => state.cart.cart;
export const toggleCart = (state) => state.cart.toggleCart;
export const cartTotal = (state) => state.cart.cartTotal;
export const totalItems = (state) => state.cart.totalItems;

// Action creators are generated for each case reducer function
export const {
  displayCart,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
