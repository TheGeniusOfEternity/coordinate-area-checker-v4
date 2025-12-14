import { fork } from "redux-saga/effects";
import { themeSaga } from "./themeSaga.ts";
import { authSaga } from "./authSaga.ts";

export const rootSaga = function* rootSaga(): Generator<any, void> {
  yield fork(themeSaga);
  yield fork(authSaga);
};
