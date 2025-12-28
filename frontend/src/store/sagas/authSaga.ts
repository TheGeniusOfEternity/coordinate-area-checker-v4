import { takeLatest } from "redux-saga/effects";
import { redirectTo } from "@/utils/NavigationUtil.ts";
import { resetStore } from "@/store";

const clearToken = function* clearToken() {
  localStorage.removeItem("access_token");
  redirectTo("/auth");
  yield;
};

export const authSaga = function* authSaga() {
  yield takeLatest(resetStore.type, clearToken);
};
