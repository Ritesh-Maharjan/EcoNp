import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: JSON.parse(localStorage.getItem("order")) || {
    shippingInfo: {},
    orderItems: [],
    paymentInfo: [],
    totalPrice: 0,
  },
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.order = action.payload;
      localStorage.setItem("order", JSON.stringify(action.payload));
    },
  },
});

export const getOrder = (state) => state.order.order;

// Action creators are generated for each case reducer function
export const { setOrder } = orderSlice.actions;

export default orderSlice.reducer;
