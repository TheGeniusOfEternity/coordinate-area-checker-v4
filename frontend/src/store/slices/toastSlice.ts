import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type ToastSeverity = 'success' | 'info' | 'warn' | 'error';

export interface ToastMessage {
  severity: ToastSeverity;
  summary: string;
  detail: string;
}

export const toastSlice = createSlice({
  name: 'toast',
  initialState: {
    message: null as null | ToastMessage
  },
  reducers: {
    setToastMessage: (
      state,
      action: PayloadAction<ToastMessage>
    ) => {
      state.message = action.payload;
    },
    clearToastMessage: (state) => {
      state.message = null;
    }
  },
});

export const { setToastMessage, clearToastMessage } = toastSlice.actions;
export default toastSlice.reducer;
