import { combineReducers } from '@reduxjs/toolkit';
import momoReducer from './momo/momo.slice';

export const rootReducer = combineReducers({
  momo: momoReducer,
});
