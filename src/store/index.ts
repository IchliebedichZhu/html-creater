import { configureStore } from '@reduxjs/toolkit';
import commonSlice from './common';
import dragSlice from './drag';

const store = configureStore({
  reducer: {
    common: commonSlice.reducer,
    drag: dragSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
