import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ShotResponseDto } from "@/api/dto/shots/shot-response.dto.ts";

interface ShotsState {
  shots: ShotResponseDto[];
  isConnected: boolean;
}

const initialState: ShotsState = {
  shots: [],
  isConnected: false,
};

export const shotSlice = createSlice({
  name: "shots",
  initialState,
  reducers: {
    setIsConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    shotAdded: (state, action: PayloadAction<ShotResponseDto>) => {
      state.shots.push(action.payload);
    },
    shotsSynced: (state, action: PayloadAction<ShotResponseDto[]>) => {
      state.shots = action.payload;
    },
  },
});

export const {
  setIsConnected,
  shotAdded,
  shotsSynced,
} = shotSlice.actions;

export default shotSlice.reducer;
