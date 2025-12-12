import { jwtDecode } from "jwt-decode";

interface JWTPayload {
  id: number;
}

export const JwtUtil = {
  decode: (token: string): JWTPayload => jwtDecode<JWTPayload>(token)
};