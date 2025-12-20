import { jwtDecode } from "jwt-decode";

export interface UserJWTPayload {
  id: number;
  email: string;
  name: string;
  surname: string;
  patronymic: string;
  studyGroup: string;
}

export const JwtUtil = {
  decode: (token: string): {
    user: UserJWTPayload | null,
    error: string | null
  } => {
    try {
      const user = jwtDecode<UserJWTPayload>(token);
      return { user, error: null };
    } catch (e: any) {
      return {
        user: null,
        error: e.message,
      };
    }
  }
};