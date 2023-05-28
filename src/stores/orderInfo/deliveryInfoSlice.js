import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  deliveryInfo: {},
};

export const deliveryInfoSlice = createSlice({
  name: 'deliveryInfo',
  initialState,
  reducers: {
    setDeliveryInfo: (state, action) => {
      return { deliveryInfo: action.payload };
    },
    clearDeliveryInfo: (state) => {
      return { deliveryInfo: {} };
    },
  },
});

export const getDeliveryInfo = (state) => state.deliveryInfo.deliveryInfo;

export const { setDeliveryInfo, clearDeliveryInfo } = deliveryInfoSlice.actions;

export default deliveryInfoSlice.reducer;
