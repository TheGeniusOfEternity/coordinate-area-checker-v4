import { useNavigate } from "react-router-dom";
import type { LoginFormData } from "@/components/forms/LoginForm.tsx";
import type { AuthResponseDto } from "@/api/dto/auth/auth-response.dto.ts";
import { AuthResolver } from "@/api/resolvers/auth.resolver.ts";
import type { RegisterFormData } from "@/components/forms/RegisterForm.tsx";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAuthToken } from "@/store/slices/authSlice.ts";

export const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const authResolver = new AuthResolver();

  const authorize = async (
    data: LoginFormData | RegisterFormData,
    mode: "login" | "register"
  ) => {
    setLoading(true);
    const response = mode === "login"
      ? await authResolver.login(data as LoginFormData)
      : await authResolver.register(data as RegisterFormData);
    switch(response.status) {
      case 200: {
        const token = (response.data as AuthResponseDto).jwtToken;
        localStorage.setItem("access_token", token);
        dispatch(setAuthToken(token));
        navigate("/");
        break;
      }
      case 400:
        break;
      default:
        break;
    }
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/auth";
  };

  return {
    authorize,
    logout,
    loading
  };
};