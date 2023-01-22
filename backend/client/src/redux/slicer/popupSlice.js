import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggleStatus: false,
  alert: false
};

export const cartSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    togglePopup: (state) => {
      state.toggleStatus = !state.toggleStatus;
    },
    toggleAlert:(state, actions) => {
      state.alert = actions.payload;
    },
  },
});

export const getPopup = (state) => state.popup.toggleStatus;
export const getAlert = (state) => state.popup.alert;

// Action creators are generated for each case reducer function
export const { togglePopup, toggleAlert } = cartSlice.actions;

export default cartSlice.reducer;
