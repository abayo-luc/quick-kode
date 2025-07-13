import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../..';

const initialState: { history: IHistoryData[] } = {
  history: [],
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addHistoryEntry(state, action) {
      state.history = [action.payload];
    },
  },
});

const { actions, reducer } = historySlice;

export const { addHistoryEntry } = actions;
export default reducer;

export const selectHistoryEntries = (state: RootState) => state.history.history;
export const selectRecentHistoryEntries = (state: RootState) =>
  state.history.history.slice(0, 5);

export const selectTransactionHistoryFees = (state: RootState) =>
  state.history.history.reduce((total, entry) => {
    if (entry.transaction?.fees) {
      const fees = parseFloat(entry.transaction.fees);
      return total + (isNaN(fees) ? 0 : fees);
    }
    return total;
  }, 0);
