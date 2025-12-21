import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { themeSlice } from "./slices/themeSlice.ts";
import { authSlice } from "@/store/slices/authSlice";
import { rootSaga } from "@/store/sagas/rootSaga.ts";
import { toastSlice } from "@/store/slices/toastSlice.ts";
import { shotSlice } from "@/store/slices/shotSlice.ts";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    theme: themeSlice.reducer,
    toast: toastSlice.reducer,
    shot: shotSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
