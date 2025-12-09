import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { themeSaga } from "./sagas/themeSaga.ts";
import { themeSlice } from "./slices/themeSlice.ts";
import { authFormSlice } from "@/store/slices/authFormSlice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    auth: authFormSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(themeSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
