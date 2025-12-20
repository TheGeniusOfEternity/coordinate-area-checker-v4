import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserResponseDto } from "@/api/dto/user/user-response.dto.ts";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null as UserResponseDto | null,
  },
  reducers: {
    setUser: (state, action: PayloadAction<UserResponseDto>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
