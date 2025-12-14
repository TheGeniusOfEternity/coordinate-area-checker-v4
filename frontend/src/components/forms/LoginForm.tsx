import './Form.css';
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import * as React from "react";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormProps {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: LoginFormData) => Promise<void>;
  onSwitchToRegister: () => void;
  loading: boolean;
}

const LoginForm = ({
  onSubmit,
  onSwitchToRegister,
  loading
}: LoginFormProps) => {
  const { t } = useTranslation();
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [form, setForm] = useState<LoginFormData>({
    email: '',
    password: ''
  });

  const handleFormChange = (field: keyof LoginFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({...prev, [field]: null}));
  };

  const validate = (): boolean => {
    const newErrors: Partial<LoginFormData> = {};

    if (!form.email.trim()) {
      newErrors.email = t('page.welcome.form.email.errors.empty');
    } else if (!form.email.includes('@')) {
      newErrors.email = t('page.welcome.form.email.errors.invalid');
    }

    if (!form.password.trim()) {
      newErrors.password = t('page.welcome.form.password.errors.empty');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) { return; }
    await onSubmit(form);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="fields">
        <div className="p-field">
          <label htmlFor="login-email" className="form-label">
            {t("page.welcome.form.email.label")}
          </label>
          <InputText
            id="login-email"
            value={form.email}
            onChange={(e) => handleFormChange("email", e.target.value)}
            placeholder={t("page.welcome.form.email.placeholder")}
            autoComplete="email"
          />
          {errors.email && <small className="p-error">{errors.email}</small>}
        </div>

        <div className="p-field">
          <label htmlFor="login-password" className="form-label">
            {t("page.welcome.form.password.label")}
          </label>
          <Password
            inputId="login-password"
            value={form.password}
            onChange={(e) => handleFormChange("password", e.target.value)}
            placeholder={t("page.welcome.form.password.placeholder.login")}
            autoComplete="current-password"
            inputClassName="password"
          />
          {errors.password && <small className="p-error">{errors.password}</small>}
        </div>
      </div>

      <div className="submit-block">
        <Button
          label={t(`page.welcome.form.submit.login`)}
          loading={loading}
          className="submit-button"
        />

        <p className="auth-switch">
          {t("page.welcome.redirect.login.text")}
          <button
            onClick={onSwitchToRegister}
            className="switch-link"
            type="button"
          >
            {t("page.welcome.redirect.login.link")}
          </button>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;