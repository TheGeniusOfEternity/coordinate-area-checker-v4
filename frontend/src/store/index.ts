import {
  combineReducers,
  configureStore,
  createAction,
  type UnknownAction,
} from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';
import { themeSlice } from "./slices/themeSlice.ts";
import { authSlice } from "@/store/slices/authSlice";
import { rootSaga } from "@/store/sagas/rootSaga.ts";
import { toastSlice } from "@/store/slices/toastSlice.ts";
import { shotSlice } from "@/store/slices/shotSlice.ts";

const sagaMiddleware = createSagaMiddleware();

export const resetStore = createAction("RESET_STORE");

const appReducer = combineReducers({
  auth: authSlice.reducer,
  theme: themeSlice.reducer,
  toast: toastSlice.reducer,
  shot: shotSlice.reducer,
});

type AppRootState = ReturnType<typeof appReducer>;

const rootReducer = (state: AppRootState | undefined, action: UnknownAction) => {
  if (action.type === resetStore.type) {
    // eslint-disable-next-line no-undefined
    return appReducer(undefined, { type: ""});
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
