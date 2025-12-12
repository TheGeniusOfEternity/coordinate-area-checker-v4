import { takeEvery } from "redux-saga/effects";
import { initializeSessionRestore } from "@/store/slices/authSlice";
import { JwtUtil } from "@/utils/JwtUtil.ts";

const sessionRestore = function* sessionRestore(
  action: ReturnType<typeof initializeSessionRestore>
) {
  const token = action.payload;
  const { id } = JwtUtil.decode(token);
  yield id;
};

export const authSaga = function* authSaga() {
  yield takeEvery(initializeSessionRestore.type, sessionRestore);
};