import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { redirectTo } from "@/utils/NavigationUtil.ts";
import { resetStore } from "@/store";
import {
  clearAuthToken,
  setAuthToken,
  setRefreshRequested,
} from "@/store/slices/authSlice.ts";
import { AuthResolver } from "@/api/resolvers/auth.resolver.ts";
import type { CommonResponseDto } from "@/api/dto/common/common-response.dto.ts";
import type { AuthResponseDto } from "@/api/dto/auth/auth-response.dto.ts";
import { setToastMessage } from "@/store/slices/toastSlice.ts";

const clearToken = function* clearToken() {
  localStorage.removeItem("access_token");
  yield put(resetStore());
  redirectTo("/auth");
};

const refreshTokens = function* refreshTokens(
  action: ReturnType<typeof setRefreshRequested>,
) {
  if (action.payload) {
    yield put(clearAuthToken());

    const authResolver = new AuthResolver();
    const response: CommonResponseDto<AuthResponseDto | string> = yield call(
      authResolver.refreshTokens,
    );
    if (response.status === 200) {
      const token = (response.data as AuthResponseDto).jwtToken;
      localStorage.setItem("access_token", token);
      yield put(setAuthToken(token));
      redirectTo("/");
      yield put(
        setToastMessage({
          severity: "success",
          summary: `request.refreshJWT.success.summary`,
          detail: `request.refreshJWT.success.detail`,
        }),
      );
      yield put(setRefreshRequested(false));
    }
    else {
      clearToken();
    }
  }
};

export const authSaga = function* authSaga() {
  yield takeLatest(resetStore.type, clearToken);
  yield takeEvery(setRefreshRequested, refreshTokens);
};
