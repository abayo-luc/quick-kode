import { configureStore } from '@reduxjs/toolkit';
import momoReducer from './features/momo.feature';

export const store = configureStore({
  reducer: {
    momo: momoReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
