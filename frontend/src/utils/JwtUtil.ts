import { jwtDecode } from "jwt-decode";
import { store } from "@/store";
import { setToastMessage } from "@/store/slices/toastSlice.ts";

export interface UserJWTPayload {
  id: number;
  email: string;
  name: string;
  surname: string;
  patronymic: string;
  studyGroup: string;
}

export const JwtUtil = {
  decode: (token: string): UserJWTPayload | null => {
    try {
      return jwtDecode<UserJWTPayload>(token);
    } catch (e: any) {
      store.dispatch(setToastMessage(e.message));
      return null;
    }
  }
};