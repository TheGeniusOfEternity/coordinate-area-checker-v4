import { jwtDecode } from "jwt-decode";

interface JWTPayload {
  id: number;
}

export const JWTUtil = {
  decode: (token: string): JWTPayload => jwtDecode<JWTPayload>(token)
};