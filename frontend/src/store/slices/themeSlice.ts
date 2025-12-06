import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    currentTheme: "dark",
    isSwitching: false,
    overlayGrowthPosition: {
      x: 0,
      y: 0,
    }
  },
  reducers: {
    setIsSwitching: (state, action: PayloadAction<boolean>) => {
      state.isSwitching = action.payload;
    },
    setOverlayGrowthPosition: (state, action: PayloadAction<{x: number, y: number}>) => {
      state.overlayGrowthPosition = { ...action.payload };
    },
    setTheme: (state) => {
      state.currentTheme = state.currentTheme === "dark" ? "light" : "dark";
    },
    finishThemeSwitch: (state) => {
      state.isSwitching = false;
    }
  },
});

export const { setTheme, setIsSwitching, setOverlayGrowthPosition, finishThemeSwitch } = themeSlice.actions;
export default themeSlice.reducer;
