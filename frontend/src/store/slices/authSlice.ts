import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: null as string | null,
    isLoading: false,
  },
  reducers: {
    setAuthToken: (
      state,
      action: PayloadAction<string>
    ) => {
      state.accessToken = action.payload;
    },
    clearAuthToken: (
      state
    ) => {
      state.accessToken = null;
    }
  }
});

export const { setAuthToken, clearAuthToken } = authSlice.actions;
export default authSlice.reducer;