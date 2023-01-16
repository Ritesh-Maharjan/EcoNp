import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggleStatus: false,
};

export const cartSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    togglePopup: (state, action) => {
      state.toggleStatus = !state.toggleStatus;
    },
  },
});

export const getPopup = (state) => state.popup.toggleStatus;

// Action creators are generated for each case reducer function
export const { togglePopup } = cartSlice.actions;

export default cartSlice.reducer;
