import { jwtDecode } from "jwt-decode";
import type { User } from "@/store/slices/authSlice.ts";

export interface JWTPayload {
  sub: string;
  user: User;
  iat: number;
  exp: number;
}

export const JwtUtil = {
  decode: (token: string): {
    user: User | null,
    error: string | null
  } => {
    try {
      const { user } = jwtDecode<JWTPayload>(token);
      return { user, error: null };
    } catch (e: any) {
      return {
        user: null,
        error: e.message,
      };
    }
  }
};