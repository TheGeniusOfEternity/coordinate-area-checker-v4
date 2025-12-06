import { configureStore } from '@reduxjs/toolkit';
import { themeSlice } from "./slices/themeSlice.ts";

export const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
