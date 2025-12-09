import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  mode: 'login' | 'register';
  isAnimating: boolean;
  nextMode: 'login' | 'register' | null;
}

const initialState: AuthState = {
  mode: 'login',
  isAnimating: false,
  nextMode: null
};

export const authFormSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    switchToLogin: (state) => {
      state.nextMode = 'login';
      state.isAnimating = true;
    },
    switchToRegister: (state) => {
      state.nextMode = 'register';
      state.isAnimating = true;
    },
    setAnimating: (state, action: PayloadAction<boolean>) => {
      state.isAnimating = action.payload;
    },
    setMode: (state, action: PayloadAction<'login' | 'register'>) => {
      state.mode = action.payload;
      state.nextMode = null;
    },
    finishAnimation: (state) => {
      state.isAnimating = false;
    }
  },
});

export const {
  switchToLogin,
  switchToRegister,
  setAnimating,
  setMode,
  finishAnimation
} = authFormSlice.actions;

export default authFormSlice.reducer;
