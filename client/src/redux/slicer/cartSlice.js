import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [] || localStorage.getItem("cart"),
  toggleCart: false,
  cartTotal: 0,
};

// {
//   "name": "Trashy Dress",
//   "price": 12,
//   "quanity": 1,
//   "image": "asssd.com",
//   "product": "63bb853425719c23e44d47be"
// }

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    displayCart: (state) => {
      state.toggleCart = !state.toggleCart;
    },
    addToCart: (state, action) => {
      let quantity =
        state.cart.find((el) => el.product === action.payload.product)
          ?.quantity || 0;
      quantity = action.payload.quantity + quantity;

      state.cart = [
        ...state.cart.filter((el) => el.product !== action.payload.product),
        {
          name: action.payload.name,
          price: action.payload.price,
          quantity,
          image: action.payload.image,
          product: action.payload.product,
        },
      ];
      state.cartTotal =
        state.cartTotal + action.payload.quantity * action.payload.price;
    },
    increaseQuantity: (state, action) => {
      let quantity =
        state.cart.find((el) => el.product === action.payload.product)
          ?.quantity + 1;

      state.cart = [
        ...state.cart.filter((el) => el.product !== action.payload.product),
        {
          name: action.payload.name,
          price: action.payload.price,
          quantity,
          image: action.payload.image,
          product: action.payload.product,
        },
      ];
      state.cartTotal = state.cartTotal + action.payload.price;
    },
    decreaseQuantity: (state, action) => {
      let quantity =
        state.cart.find((el) => el.product === action.payload.product)
          ?.quantity - 1;

      state.cart = [
        ...state.cart.filter((el) => el.product !== action.payload.product),
        {
          name: action.payload.name,
          price: action.payload.price,
          quantity,
          image: action.payload.image,
          product: action.payload.product,
        },
      ];
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
    },
  },
});

export const getCart = (state) => state.cart.cart;
export const toggleCart = (state) => state.cart.toggleCart;
export const cartTotal = (state) => state.cart.cartTotal;

// Action creators are generated for each case reducer function
export const {
  displayCart,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
