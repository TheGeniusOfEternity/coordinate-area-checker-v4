import { call, delay, put, select, take, takeLatest, race } from "redux-saga/effects";
import { clearAuthToken, setAuthToken } from "@/store/slices/authSlice";
import { AuthResolver } from "@/api/resolvers/auth.resolver";
import { jwtDecode } from "jwt-decode";
import { redirectTo } from "@/utils/NavigationUtil.ts";
import { setToastMessage } from "@/store/slices/toastSlice.ts";

const SAFETY_GAP_MS = 15_000;
const selectAuth = (state: any) => state.auth;

const scheduleTokenRefresh = function* scheduleTokenRefresh(): Generator<any, void>  {
  while (true) {
    try {
      const { accessToken } = (yield select(selectAuth)) as { accessToken: string | null };
      if (!accessToken) { return; }

      const decoded: { exp: number } = jwtDecode(accessToken);
      const nowSec = Math.floor(Date.now() / 1000);
      const msUntilExp = (decoded.exp - nowSec) * 1000;
      const delayMs = msUntilExp - SAFETY_GAP_MS;
      if (delayMs <= 0) {
        yield put(clearAuthToken());
        return;
      }

      const { cancelled } = yield race({
        timeout: delay(delayMs),
        cancelled: take([clearAuthToken.type, setAuthToken.type])
      });

      if (cancelled) { return; }

      const authResolver = new AuthResolver();
      const response = yield call([authResolver, authResolver.refreshJWT]);

      if (response.status !== 200) {
        yield put(clearAuthToken());
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
      yield put(clearAuthToken());
    }
  }
};

const clearToken = function* clearToken() {
  localStorage.removeItem("access_token");
  redirectTo("/auth");
  yield;
};

export const authSaga = function* authSaga() {
  yield takeLatest(clearAuthToken.type, clearToken);
  yield takeLatest(setAuthToken, scheduleTokenRefresh);
};
