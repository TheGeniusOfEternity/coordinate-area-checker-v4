import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: null as string | null,
    isLoading: false,
  },
  reducers: {
    initializeSessionRestore: (
      state,
      action: PayloadAction<string>
    ) => {
      state.accessToken = action.payload;
    },
  }
});

export const { initializeSessionRestore } = authSlice.actions;
export default authSlice.reducer;