import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {
    balance: null,
    totalSent: null,
    totalFees: null,
  },
};

const momoSlice = createSlice({
  name: 'momo',
  initialState,
  reducers: {
    setBalance(state, action) {
      state.data.balance = action.payload;
    },
  },
});

export const { setBalance } = momoSlice.actions;
export default momoSlice.reducer;
