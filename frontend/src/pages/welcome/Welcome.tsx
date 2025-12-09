import "./Welcome.css";
import { Message } from "primereact/message";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import LoginForm from "@/components/forms/LoginForm";
import RegisterForm from "@/components/forms/RegisterForm";

const Welcome = () => {
  const { t } = useTranslation();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleLoginSubmit = async () => {
    setLoading(true);
    try {
      setSuccess('Login successful! Redirecting...');
      setTimeout(() => {
        // Handle redirect to main page
        console.log('Redirect to main page');
      }, 2000);
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async () => {
    setLoading(true);
    try {
      setSuccess('Registration successful! You can now log in.');
      setTimeout(() => {
        setMode('login');
        setSuccess(null);
      }, 2000);
    } catch (_: unknown) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const switchToRegister = () => {
    setMode('register');
    setError(null);
    setSuccess(null);
  };

  const switchToLogin = () => {
    setMode('login');
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="auth-container">
      <div className={`wrapper ${mode}`}>
        <div className={`auth-card ${mode}`}>
          <h3>{t(`page.welcome.title.${mode}`)}</h3>
          {error && (
            <Message
              severity="error"
              text={error}
              style={{ width: "100%", marginBottom: "1rem" }}
            />
          )}
          {success && (
            <Message
              severity="success"
              text={success}
              style={{ width: "100%", marginBottom: "1rem" }}
            />
          )}

          {
            mode === "login"
              ? (
                <LoginForm
                  onSubmit={handleLoginSubmit}
                  onSwitchToRegister={switchToRegister}
                  loading={loading}
                />
              ) : (
                <RegisterForm
                  onSubmit={handleRegisterSubmit}
                  onLoginSwitch={switchToLogin}
                  loading={loading}
                />
              )
          }
        </div>
      </div>
    </div>
  );
};

export default Welcome;