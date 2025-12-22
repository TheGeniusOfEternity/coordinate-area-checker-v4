import { call, delay, put, take, takeLatest, race } from "redux-saga/effects";
import { setAuthToken } from "@/store/slices/authSlice";
import { AuthResolver } from "@/api/resolvers/auth.resolver";
import { jwtDecode } from "jwt-decode";
import { redirectTo } from "@/utils/NavigationUtil.ts";
import { setToastMessage } from "@/store/slices/toastSlice.ts";
import { resetStore, store } from "@/store";

const SAFETY_GAP_MS = 15_000;

const scheduleTokenRefresh = function* scheduleTokenRefresh(): Generator<any, void>  {
  while (true) {
    try {
      const { accessToken } = store.getState().auth;
      if (!accessToken) { return; }

      const decoded: { exp: number } = jwtDecode(accessToken);
      const nowSec = Math.floor(Date.now() / 1000);
      const msUntilExp = (decoded.exp - nowSec) * 1000;
      const delayMs = msUntilExp - SAFETY_GAP_MS;
      if (delayMs <= 0) {
        yield put(resetStore());
        return;
      }

      const { cancelled } = yield race({
        timeout: delay(delayMs),
        cancelled: take([resetStore.type, setAuthToken.type])
      });

      if (cancelled) { return; }

      const authResolver = new AuthResolver();
      const response = yield call([authResolver, authResolver.refreshJWT]);

      if (response.status !== 200) {
        yield put(resetStore());
        return;
      }

      const newToken: string = response.data.jwtToken;

      localStorage.setItem("access_token", newToken);
      yield put(setToastMessage({
        severity: "success",
        summary: "request.refreshJwt.success.summary",
        detail: "request.refreshJwt.success.detail"
      }));
      yield put(setAuthToken(newToken));
    } catch (e: any) {
      yield put(setToastMessage({
        severity: "error",
        summary: "request.common.error.summary",
        detail: e.message
      }));
      yield put(resetStore());
    }
  }
};

const clearToken = function* clearToken() {
  localStorage.removeItem("access_token");
  redirectTo("/auth");
  yield;
};

export const authSaga = function* authSaga() {
  yield takeLatest(resetStore.type, clearToken);
  yield takeLatest(setAuthToken, scheduleTokenRefresh);
};
