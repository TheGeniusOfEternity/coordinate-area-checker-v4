import "./Welcome.css";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import LoginForm from "@/components/forms/loginform/LoginForm.tsx";
import RegisterForm from "@/components/forms/registerform/RegisterForm.tsx";
import { useAuth } from "@/hooks/useAuth.ts";
import { useTitle } from "@/hooks/useTitle.ts";

const Welcome = () => {
  const { t } = useTranslation();
  const { authorize, loading } = useAuth();

  const [ mode, setMode ] = useState<"login" | "register">("login");

  const switchToRegister = () => {
    setMode("register");
  };

  const switchToLogin = () => {
    setMode("login");
  };

  useTitle(
    mode === "login"
      ? t("page.welcome.pageTitle.login")
      : t("page.welcome.pageTitle.register")
  );

  return (
    <div className="auth-container">
      <div className={`wrapper ${mode}`}>
        <div className={
          `auth-card ${mode === 'login' ? '' : 'hidden'}`
        }>
          <h3>{t(`page.welcome.title.login`)}</h3>
          <LoginForm
            onSubmit={(data) => authorize(data, mode)}
            onSwitchToRegister={switchToRegister}
            loading={loading}
          />
        </div>
        <div className={
          `auth-card ${mode === 'register' ? '' : 'hidden'}`
        }>
          <h3>{t(`page.welcome.title.register`)}</h3>
          <RegisterForm
            onSubmit={(data) => authorize(data, mode)}
            onLoginSwitch={switchToLogin}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default Welcome;