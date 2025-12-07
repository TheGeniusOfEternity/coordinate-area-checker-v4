import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

const getPreferredTheme = (): "light" | "dark" => {
  const themeMode = localStorage.getItem("theme-mode");
  if (themeMode === "light" || themeMode === "dark") { return themeMode; }
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

const initialTheme = getPreferredTheme();

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    currentTheme: initialTheme,
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
