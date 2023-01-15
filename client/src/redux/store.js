import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slicer/userSlice";
import cartReducer from "./slicer/cartSlice";
import popupReducer from "./slicer/popupSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    popup: popupReducer
  },
});
