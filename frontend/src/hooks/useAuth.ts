import { useNavigate } from "react-router-dom";
import type { LoginFormData } from "@/components/forms/loginform/LoginForm.tsx";
import type { AuthResponseDto } from "@/api/dto/auth/auth-response.dto.ts";
import { AuthResolver } from "@/api/resolvers/auth.resolver.ts";
import type { RegisterFormData } from "@/components/forms/registerform/RegisterForm.tsx";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAuthToken } from "@/store/slices/authSlice.ts";
import { setToastMessage } from "@/store/slices/toastSlice.ts";
import type { ValidationErrorResponseDto } from "@/api/dto/common/validation-error-response.dto.ts";

export const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const authResolver = new AuthResolver();

  const authorize = async (
    data: LoginFormData | RegisterFormData,
    mode: "login" | "register",
  ) => {
    setLoading(true);
    const response =
      mode === "login"
        ? await authResolver.login(data as LoginFormData)
        : await authResolver.register(data as RegisterFormData);
    switch (response.status) {
      case 200: {
        const token = (response.data as AuthResponseDto).jwtToken;
        localStorage.setItem("access_token", token);
        dispatch(setAuthToken(token));
        navigate("/");
        dispatch(
          setToastMessage({
            severity: "success",
            summary: `request.${mode}.success.summary`,
            detail: `request.${mode}.success.detail`,
          }),
        );
        break;
      }
      case 400: {
        (response.data as ValidationErrorResponseDto[]).forEach((error) => {
          dispatch(
            setToastMessage({
              severity: "error",
              summary: "request.common.error.summary",
              detail: error.message,
            }),
          );
        });
        break;
      }
      default: {
        dispatch(
          setToastMessage({
            severity: "error",
            summary: "request.common.error.summary",
            detail: response.data as string,
          }),
        );
        break;
      }
    }
    setLoading(false);
  };

  return {
    authorize,
    loading,
  };
};
