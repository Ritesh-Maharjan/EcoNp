import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slicer/userSlice";
import cartReducer from "./slicer/cartSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});
