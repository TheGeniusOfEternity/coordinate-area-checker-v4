import "./Welcome.css";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import LoginForm from "@/components/forms/LoginForm";
import RegisterForm from "@/components/forms/RegisterForm";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { setMode } from "@/store/slices/authFormSlice";

const Welcome = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { mode, isAnimating } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async () => {
    setLoading(true);
    await new Promise(() => { setLoading(false); });
  };

  const handleRegisterSubmit = async () => {
    setLoading(true);
    await new Promise(() => { setLoading(false); });
  };

  const switchToRegister = () => {
    dispatch(setMode("register"));
  };

  const switchToLogin = () => {
    dispatch(setMode("login"));
  };

  return (
    <div className="auth-container">
      <div className={`wrapper ${mode}`}>
        <div className={
          `auth-card ${mode === 'login' ? '' : 'hidden'} 
          ${isAnimating ? 'animating' : ''}`
        }>
          <h3>{t(`page.welcome.title.login`)}</h3>
          <LoginForm
            onSubmit={handleLoginSubmit}
            onSwitchToRegister={switchToRegister}
            loading={loading}
          />
        </div>
        <div className={
          `auth-card 
          ${mode === 'register' ? '' : 'hidden'} 
          ${isAnimating ? 'animating' : ''}`
        }>
          <h3>{t(`page.welcome.title.register`)}</h3>
          <RegisterForm
            onSubmit={handleRegisterSubmit}
            onLoginSwitch={switchToLogin}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default Welcome;