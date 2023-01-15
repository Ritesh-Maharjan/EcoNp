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

      state.cart = [
        // returns all the product that is not the one send by checking the product i.e. product id
        ...state.cart.filter((el) => el.product !== action.payload.product),
        {
          name: action.payload.name,
          price: action.payload.price,
          quantity,
          image: action.payload.image,
          product: action.payload.product,
        },
      ];
      // changing the cart total
      state.cartTotal =
        state.cartTotal + action.payload.quantity * action.payload.price;

      state.totalItems = state.cart.length;
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
