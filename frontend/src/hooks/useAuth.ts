import { useNavigate } from "react-router-dom";
import type { LoginFormData } from "@/components/forms/LoginForm.tsx";
import type { LoginResponseDto } from "@/api/dto/auth/login-response.dto.ts";
import { AuthResolver } from "@/api/resolvers/auth.resolver.ts";
import type { RegisterFormData } from "@/components/forms/RegisterForm.tsx";
import { useState } from "react";

export const useAuth = () => {
  const navigate = useNavigate();
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
      case 200:
        localStorage.setItem(
          "access_token",
          (response.data as LoginResponseDto).jwtToken
        );
        navigate("/");
        break;
      case 400:
        break;
      default:
        break;
    }
    setLoading(false);
  };

  return {
    authorize,
    loading
  };
};