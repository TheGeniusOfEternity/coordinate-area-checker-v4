import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    currentTheme: "dark",
    isSwitching: false
  },
  reducers: {
    setCurrentTheme: (state, action: PayloadAction<string>) => {
      state.currentTheme = action.payload;
    },
    setIsSwitching: (state, action: PayloadAction<boolean>) => {
      state.isSwitching = action.payload;
    }
  },
});

export const { setCurrentTheme, setIsSwitching } = themeSlice.actions;
export default themeSlice.reducer;
