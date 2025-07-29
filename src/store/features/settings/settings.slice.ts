import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../..';
import { to_snake_case } from '../../../common/helpers/utils';

const initialState: { transactionLabels: Record<string, TransactionLabel> } = {
  transactionLabels: {},
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    addTransactionLabel(
      state,
      action: { payload: Pick<TransactionLabel, 'name'>; type: string },
    ) {
      state.transactionLabels = {
        ...state.transactionLabels,
        [to_snake_case(action.payload.name)]: {
          name: action.payload.name,
          updatedAt: new Date().toISOString(),
        },
      };
    },

    removeTransactionLabel(
      state,
      action: { payload: Pick<TransactionLabel, 'name'>; type: string },
    ) {
      delete state.transactionLabels[to_snake_case(action.payload.name)];
    },
  },
});

const { actions, reducer } = settingsSlice;

export const { addTransactionLabel, removeTransactionLabel } = actions;

export default reducer;

export const selectTransactionLabels = (state: RootState) =>
  state.settings.transactionLabels;
