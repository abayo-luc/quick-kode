import { combineReducers } from '@reduxjs/toolkit';
import momoReducer from './momo/momo.slice';
import historyReducer from './history/history.slice';
import settingsReducer from './settings/settings.slice';

export const rootReducer = combineReducers({
  momo: momoReducer,
  history: historyReducer,
  settings: settingsReducer,
});
