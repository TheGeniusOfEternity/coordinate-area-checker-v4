import {
  authFormSlice,
  switchToLogin,
  switchToRegister,
} from "@/store/slices/authFormSlice";
import { delay, put, takeEvery } from "redux-saga/effects";

const switchAnimationSaga = function* switchAnimationSaga(
  action: ReturnType<typeof switchToRegister | typeof switchToLogin>
) {
  const nextMode = action.type === 'auth/switchToRegister' ? 'register' : 'login';

  yield delay(400);

  yield put(authFormSlice.actions.setMode(nextMode));

  yield delay(50);
  yield put(authFormSlice.actions.finishAnimation());
};

export const authFormSaga = function* authFormSaga() {
  yield takeEvery(switchToRegister.type, switchAnimationSaga);
  yield takeEvery(switchToLogin.type, switchAnimationSaga);
};
