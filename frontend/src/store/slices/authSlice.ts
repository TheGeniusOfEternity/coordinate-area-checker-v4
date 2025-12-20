import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { JwtUtil, type UserJWTPayload } from "@/utils/JwtUtil.ts";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null as string | null,
    user: null as UserJWTPayload | null,
  },
  reducers: {
    setAuthToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      state.user = JwtUtil.decode(action.payload);
    },
    clearAuthToken: (state) => {
      state.accessToken = null;
      state.user = null;
    },
  },
});

export const { setAuthToken, clearAuthToken } = authSlice.actions;
export default authSlice.reducer;