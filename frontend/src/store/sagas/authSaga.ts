import { call, put, takeLatest } from "redux-saga/effects";
import { redirectTo } from "@/utils/NavigationUtil.ts";
import { resetStore } from "@/store";
import {
  setAuthToken,
  setRefreshRequested,
} from "@/store/slices/authSlice.ts";
import { AuthResolver } from "@/api/resolvers/auth.resolver.ts";
import type { CommonResponseDto } from "@/api/dto/common/common-response.dto.ts";
import type { AuthResponseDto } from "@/api/dto/auth/auth-response.dto.ts";
import { setToastMessage } from "@/store/slices/toastSlice.ts";

const clearToken = function* clearToken() {
  localStorage.removeItem("access_token");
  redirectTo("/auth");
  yield;
};

const refreshTokens = function* refreshTokens(
  action: ReturnType<typeof setRefreshRequested>,
) {
  if (action.payload) {
    const authResolver = new AuthResolver();

    const response: CommonResponseDto<AuthResponseDto | string> = yield call(
      [authResolver, authResolver.refreshTokens]
    );

    if (response.status === 200) {
      const token = (response.data as AuthResponseDto).jwtToken;
      localStorage.setItem("access_token", token);
      yield put(setAuthToken(token));
      redirectTo("/");
      yield put(
        setToastMessage({
          severity: "success",
          summary: `request.refreshJwt.success.summary`,
          detail: `request.refreshJwt.success.detail`,
        }),
      );
      yield put(setRefreshRequested(false));
    }
    else {
      yield* clearToken();
    }
  }
};

export const authSaga = function* authSaga() {
  yield takeLatest(resetStore.type, clearToken);
  yield takeLatest(setRefreshRequested.type, refreshTokens);
};
