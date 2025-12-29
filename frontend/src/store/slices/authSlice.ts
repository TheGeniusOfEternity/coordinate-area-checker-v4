import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { JwtUtil } from "@/utils/JwtUtil.ts";
import { toastSlice } from "@/store/slices/toastSlice.ts";

export interface User {
  id: number;
  email: string;
  name: string;
  surname: string;
  patronymic: string;
  studyGroup: string;
}

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null as string | null,
    refreshRequested: false,
    user: null as User | null
  },
  reducers: {
    setAuthToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      const decoded = JwtUtil.decode(action.payload);
      if (decoded.error === null) {
        state.user = decoded.user;
      }
      else {
        toastSlice.actions.setToastMessage({
          severity: "error",
          summary: "Decode error",
          detail: decoded.error,
        });
      }
    },
    clearAuthToken: (state) => {
      state.accessToken = null;
      state.user = null;
    },
    setRefreshRequested: (state, action: PayloadAction<boolean>) => {
      state.refreshRequested = action.payload;
    },
  },
});

export const { setAuthToken, clearAuthToken, setRefreshRequested } = authSlice.actions;
export default authSlice.reducer;