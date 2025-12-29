import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ShotResponseDto } from "@/api/dto/shots/shot-response.dto.ts";
import type { ShotRequestDto } from "@/api/dto/shots/shot-request.dto.ts";

interface ShotsState {
  shots: ShotResponseDto[];
  isConnected: boolean;
  queue: {
    id: string;
    data: ShotRequestDto
  }[]
}

const initialState: ShotsState = {
  shots: [],
  isConnected: false,
  queue: []
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
    addToQueue: (
      state,
      action: PayloadAction<{ data: ShotRequestDto, id: string}>
    ) => {
      state.queue.push(action.payload);
    },
    removeFromQueue: (state, action: PayloadAction<string>) => {
      state.queue = state.queue.filter(
        (shot) => shot.id !== action.payload
      );
    },
  },
});

export const {
  setIsConnected,
  shotAdded,
  shotsSynced,
  addToQueue,
  removeFromQueue,
} = shotSlice.actions;

export default shotSlice.reducer;
