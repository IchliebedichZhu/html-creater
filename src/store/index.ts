import { configureStore } from '@reduxjs/toolkit';
import commonSlice from './common';

const store = configureStore({
  reducer: {
    common: commonSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
