import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../..';

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
    setMoMoBalance(state, action) {
      state.data.balance = action.payload;
    },
  },
});

const { actions, reducer } = momoSlice;

export const { setMoMoBalance } = actions;

export default reducer;

export const selectMoMoBalance = (state: RootState) => state.momo.data.balance;
