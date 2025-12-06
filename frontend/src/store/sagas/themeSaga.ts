import { delay, put, takeEvery } from 'redux-saga/effects';
import {
  finishThemeSwitch,
  setTheme,
} from "../slices/themeSlice";

const handleThemeSwitchSaga = function* handleThemeSwitchSaga() {
  yield delay(400);
  yield put(setTheme());
  yield delay(100);
  yield put(finishThemeSwitch());
};

export const themeSaga = function* themeSaga() {
  yield takeEvery('theme/setIsSwitching', handleThemeSwitchSaga);
};
