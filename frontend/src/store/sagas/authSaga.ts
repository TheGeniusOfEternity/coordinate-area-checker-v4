import { call, delay, put, select, take, takeLatest, race } from "redux-saga/effects";
import { clearAuthToken, setAuthToken } from "@/store/slices/authSlice";
import { AuthResolver } from "@/api/resolvers/auth.resolver";
import { jwtDecode } from "jwt-decode";

const SAFETY_GAP_MS = 15_000;
const selectAuth = (state: any) => state.auth;

const scheduleTokenRefresh = function* scheduleTokenRefresh(): Generator<any, void>  {
  while (true) {
    const { token } = (yield select(selectAuth)) as { token: string | null };

    if (!token) { return; }

    const decoded: { exp: number } = jwtDecode(token);
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

    try {
      const authResolver = new AuthResolver();
      const response = yield call([authResolver, authResolver.refreshJWT]);

      if (response.status !== 200) {
        yield put(clearAuthToken());
        return;
      }

      const newToken: string = response.data.jwtToken;

      localStorage.setItem("access_token", newToken);
      yield put(setAuthToken(newToken));
    } catch (e) {
      console.error(e);
      yield put(clearAuthToken());
    }
  }
};

export const authSaga = function* authSaga() {
  yield takeLatest(clearAuthToken.type, () => true );
  yield takeLatest(
    [setAuthToken.type, setAuthToken.type],
    scheduleTokenRefresh
  );
};
