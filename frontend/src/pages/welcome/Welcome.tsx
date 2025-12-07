import "./Welcome.css";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";
import { Password } from "primereact/password";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Welcome = () => {
  const { t } = useTranslation();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [loginForm, setLoginForm] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const [registerForm, setRegisterForm] = useState<RegisterFormData>({
    email: '',
    name: '',
    surname: '',
    patronymic: '',
    groupNumber: '',
    password: '',
    confirmPassword: '',
  });

  const handleLoginChange = (field: keyof LoginFormData, value: string) => {
    setLoginForm((prev) => ({ ...prev, [field]: value }));
    setError(null);
    setSuccess(null);
  };

  const handleRegisterChange = (field: keyof RegisterFormData, value: string) => {
    setRegisterForm((prev) => ({ ...prev, [field]: value }));
    setError(null);
    setSuccess(null);
  };

  const validateLoginForm = (): boolean => {
    if (!loginForm.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!loginForm.password.trim()) {
      setError('Password is required');
      return false;
    }
    if (!loginForm.email.includes('@')) {
      setError('Please enter a valid email');
      return false;
    }
    return true;
  };

  const validateRegisterForm = (): boolean => {
    if (!registerForm.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!registerForm.email.includes('@')) {
      setError('Please enter a valid email');
      return false;
    }
    if (!registerForm.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!registerForm.surname.trim()) {
      setError('Surname is required');
      return false;
    }
    if (!registerForm.patronymic.trim()) {
      setError('Patronymic is required');
      return false;
    }
    if (!registerForm.groupNumber.trim()) {
      setError('Group number is required');
      return false;
    }
    if (!registerForm.password.trim()) {
      setError('Password is required');
      return false;
    }
    if (registerForm.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (registerForm.password !== registerForm.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleLoginSubmit = async () => {
    if (!validateLoginForm()) { return; }

    setLoading(true);
    try {
      // Replace with your actual API call
      console.log('Login:', loginForm);
      // Example: const response = await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify(loginForm) });

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
    if (!validateRegisterForm()) {return;}

    setLoading(true);
    try {
      // Replace with your actual API call
      const { confirmPassword, ...registerData } = registerForm;
      console.log('Register:', registerData);
      // Example: const response = await fetch('/api/auth/register', { method: 'POST', body: JSON.stringify(registerData) });

      setSuccess('Registration successful! You can now log in.');
      setTimeout(() => {
        setMode('login');
        setRegisterForm({
          email: '',
          name: '',
          surname: '',
          patronymic: '',
          groupNumber: '',
          password: '',
          confirmPassword: '',
        });
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
      <Card
        title={t(`page.welcome.title.${mode}`)}
        className="auth-card"
      >
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

        {mode === "login" ? (
          <form className="form-group">
            <div className="p-field">
              <label htmlFor="login-email" className="form-label">
                {t("page.welcome.form.email.label")}
              </label>
              <InputText
                id="login-email"
                value={loginForm.email}
                onChange={(e) => handleLoginChange("email", e.target.value)}
                placeholder={t("page.welcome.form.email.placeholder")}
                className="w-full"
                autoComplete="email"
              />
            </div>

            <div className="p-field">
              <label htmlFor="login-password" className="form-label">
                {t("page.welcome.form.password.label")}
              </label>
              <Password
                inputId="login-password"
                value={loginForm.password}
                onChange={(e) => handleLoginChange("password", e.target.value)}
                placeholder={t("page.welcome.form.password.placeholder.login")}
                toggleMask
                className="w-full"
                inputClassName="w-full"
                autoComplete="current-password"
              />
            </div>

            <Button
              label={t(`page.welcome.form.submit.login`)}
              onClick={handleLoginSubmit}
              loading={loading}
              className="w-full submit-button"
            />

            <p className="auth-switch">
              {t("page.welcome.redirect.login.text")}
              <button
                onClick={switchToRegister}
                className="switch-link"
                type="button"
              >
                {t("page.welcome.redirect.login.link")}
              </button>
            </p>
          </form>
        ) : (
          <form className="form-group">
            <div className="p-field">
              <label htmlFor="login-password" className="form-label">
                {t("page.welcome.form.password.label")}
              </label>
              <Password
                inputId="login-password"
                value={loginForm.password}
                onChange={(e) => handleLoginChange("password", e.target.value)}
                placeholder={t("page.welcome.form.password.placeholder.login")}
                toggleMask
                className="w-full"
                inputClassName="w-full"
                autoComplete="current-password"
              />
            </div>
            <div className="p-field">
              <label htmlFor="register-email" className="form-label">
                {t('page.welcome.form.email.label')}
              </label>
              <InputText
                id="register-email"
                value={registerForm.email}
                onChange={(e) => handleRegisterChange("email", e.target.value)}
                placeholder={t("page.welcome.form.email.placeholder")}
                className="w-full"
              />
            </div>

            <div className="p-field">
              <label htmlFor="register-name" className="form-label">
                {t('page.welcome.form.name.label')}
              </label>
              <InputText
                id="register-name"
                value={registerForm.name}
                onChange={(e) => handleRegisterChange("name", e.target.value)}
                placeholder={t('page.welcome.form.name.placeholder')}
                className="w-full"
              />
            </div>

            <div className="p-field">
              <label htmlFor="register-surname" className="form-label">
                {t('page.welcome.form.surname.label')}
              </label>
              <InputText
                id="register-surname"
                value={registerForm.surname}
                onChange={(e) =>
                  handleRegisterChange("surname", e.target.value)
                }
                placeholder={t('page.welcome.form.surname.placeholder')}
                className="w-full"
              />
            </div>

            <div className="p-field">
              <label htmlFor="register-patronymic" className="form-label">
                {t('page.welcome.form.patronymic.label')}
              </label>
              <InputText
                id="register-patronymic"
                value={registerForm.patronymic}
                onChange={(e) =>
                  handleRegisterChange("patronymic", e.target.value)
                }
                placeholder={t('page.welcome.form.patronymic.placeholder')}
                className="w-full"
              />
            </div>

            <div className="p-field">
              <label htmlFor="register-group" className="form-label">
                {t('page.welcome.form.group.label')}
              </label>
              <InputText
                id="register-group"
                value={registerForm.groupNumber}
                onChange={(e) =>
                  handleRegisterChange("groupNumber", e.target.value)
                }
                placeholder={t('page.welcome.form.group.placeholder')}
                className="w-full"
                autoComplete="student-group"
              />
            </div>
            <div className="p-field">
              <label htmlFor="register-password" className="form-label">
                {t('page.welcome.form.password.label')}
              </label>
              <Password
                autoComplete="new-password"
                inputId="register-password"
                value={registerForm.password}
                onChange={(e) =>
                  handleRegisterChange("password", e.target.value)
                }
                placeholder={t('page.welcome.form.password.placeholder.register')}
                toggleMask
                className="w-full"
                inputClassName="w-full"
              />
            </div>

            <div className="p-field">
              <label htmlFor="register-confirm-password" className="form-label">
                {t('page.welcome.form.passwordConfirm.label')}
              </label>
              <Password
                autoComplete="new-password confirm"
                inputId="register-confirm-password"
                value={registerForm.confirmPassword}
                onChange={(e) =>
                  handleRegisterChange("confirmPassword", e.target.value)
                }
                placeholder={t('page.welcome.form.passwordConfirm.placeholder')}
                toggleMask
                feedback={false}
                className="w-full"
                inputClassName="w-full"
              />
            </div>

            <Button
              label={t('page.welcome.form.submit.register')}
              onClick={handleRegisterSubmit}
              loading={loading}
              className="w-full submit-button"
            />

            <p className="auth-switch">
              {t('page.welcome.redirect.register.text')}
              <button
                onClick={switchToLogin}
                className="switch-link"
                type="button"
              >
                {t('page.welcome.redirect.register.link')}
              </button>
            </p>
          </form>
        )}
      </Card>
    </div>
  );
};

export default Welcome;