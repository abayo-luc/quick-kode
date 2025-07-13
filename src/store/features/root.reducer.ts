import { combineReducers } from '@reduxjs/toolkit';
import momoReducer from './momo/momo.slice';
import historyReducer from './history/history.slice';

export const rootReducer = combineReducers({
  momo: momoReducer,
  history: historyReducer,
});
