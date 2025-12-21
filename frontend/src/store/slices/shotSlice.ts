import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ShotResponseDto } from "@/api/dto/shots/shot-response.dto.ts";

interface ShotsState {
  shots: ShotResponseDto[];
  connected: boolean;
  error: string | null;
}

const initialState: ShotsState = {
  shots: [],
  connected: false,
  error: null,
};

export const shotSlice = createSlice({
  name: "shots",
  initialState,
  reducers: {
    connected: (state) => {
      state.connected = true;
      state.error = null;
    },
    disconnected: (state) => {
      state.connected = false;
    },
    shotAdded: (state, action: PayloadAction<ShotResponseDto>) => {
      state.shots.push(action.payload);
    },
    shotsSynced: (state, action: PayloadAction<ShotResponseDto[]>) => {
      state.shots = action.payload;
    },
    connectionError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearShots: (state) => {
      state.shots = [];
    },
  },
});

export const {
  connected,
  disconnected,
  shotAdded,
  shotsSynced,
  connectionError,
  clearShots,
} = shotSlice.actions;

export default shotSlice.reducer;
