import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import "./Form.css";
import * as React from "react";

interface RegisterFormData {
  email: string;
  name: string;
  surname: string;
  patronymic: string;
  groupNumber: string;
  password: string;
  passwordConfirm: string;
}

interface RegisterFormProps {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: RegisterFormData) => Promise<void>,
  onLoginSwitch: () => void,
  loading: boolean
}

const RegisterForm = ({
  onSubmit,
  onLoginSwitch,
  loading
}: RegisterFormProps) => {
  const { t } = useTranslation();
  const [errors, setErrors] = useState<Partial<RegisterFormData>>({});
  const [form, setForm] = useState<RegisterFormData>({
    email: '',
    name: "", 
    surname: "",
    patronymic: "",
    groupNumber: "",
    password: "",
    passwordConfirm: "",
  });

  const handleFormChange = (field: keyof RegisterFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({...prev, [field]: null}));
  };

  const validate = (): boolean => {
    const newErrors: Partial<RegisterFormData> = {};
    
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    }
    if (!form.email.includes('@')) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!form.surname.trim()) {
      newErrors.surname = 'Surname is required';
    }
    if (!form.patronymic.trim()) {
      newErrors.patronymic = 'Patronymic is required';
    }
    if (!form.groupNumber.trim()) {
      newErrors.groupNumber = 'Group number is required';
    }
    if (!form.password.trim()) {
      newErrors.password = 'Password is required';
    }
    if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (form.password !== form.passwordConfirm) {
      newErrors.passwordConfirm = 'Passwords do not match';
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
    <form onSubmit={handleSubmit}>
      <div className="fields-wrapper">
        <div className="fields">
          <div className="p-field">
            <label htmlFor="register-email" className="form-label">
              {t('page.welcome.form.email.label')}
            </label>
            <InputText
              id="register-email"
              value={form.email}
              onChange={(e) => handleFormChange("email", e.target.value)}
              placeholder={t("page.welcome.form.email.placeholder")}
            />
            {errors.email && <small className="p-error">{errors.email}</small>}
          </div>

          <div className="p-field">
            <label htmlFor="register-name" className="form-label">
              {t('page.welcome.form.name.label')}
            </label>
            <InputText
              id="register-name"
              value={form.name}
              onChange={
                (e) =>
                  handleFormChange("name", e.target.value)}
              placeholder={t('page.welcome.form.name.placeholder')}
            />
            {errors.name && <small className="p-error">{errors.name}</small>}
          </div>

          <div className="p-field">
            <label htmlFor="register-surname" className="form-label">
              {t('page.welcome.form.surname.label')}
            </label>
            <InputText
              id="register-surname"
              value={form.surname}
              onChange={(e) =>
                handleFormChange("surname", e.target.value)
              }
              placeholder={t('page.welcome.form.surname.placeholder')}
            />
            {errors.surname && <small className="p-error">{errors.surname}</small>}
          </div>

          <div className="p-field">
            <label htmlFor="register-patronymic" className="form-label">
              {t('page.welcome.form.patronymic.label')}
            </label>
            <InputText
              id="register-patronymic"
              value={form.patronymic}
              onChange={(e) =>
                handleFormChange("patronymic", e.target.value)
              }
              placeholder={t('page.welcome.form.patronymic.placeholder')}
            />
            {errors.patronymic && <small className="p-error">{errors.patronymic}</small>}
          </div>

          <div className="p-field">
            <label htmlFor="register-group" className="form-label">
              {t('page.welcome.form.group.label')}
            </label>
            <InputText
              id="register-group"
              value={form.groupNumber}
              onChange={(e) =>
                handleFormChange("groupNumber", e.target.value)
              }
              placeholder={t('page.welcome.form.group.placeholder')}
              autoComplete="student-group"
            />
            {errors.groupNumber && <small className="p-error">{errors.groupNumber}</small>}
          </div>
          <div className="p-field">
            <label htmlFor="register-password" className="form-label">
              {t('page.welcome.form.password.label')}
            </label>
            <Password
              autoComplete="new-password"
              inputId="register-password"
              value={form.password}
              onChange={(e) =>
                handleFormChange("password", e.target.value)
              }
              placeholder={t('page.welcome.form.password.placeholder.register')}
              toggleMask
              inputClassName="password"
            />
            {errors.password && <small className="p-error">{errors.password}</small>}
          </div>

          <div className="p-field">
            <label htmlFor="register-confirm-password" className="form-label">
              {t('page.welcome.form.passwordConfirm.label')}
            </label>
            <Password
              autoComplete="new-password confirm"
              inputId="register-confirm-password"
              value={form.passwordConfirm}
              onChange={(e) =>
                handleFormChange("passwordConfirm", e.target.value)
              }
              placeholder={t('page.welcome.form.passwordConfirm.placeholder')}
              toggleMask
              feedback={false}
              inputClassName="password"
            />
            {errors.passwordConfirm && <small className="p-error">{errors.passwordConfirm}</small>}
          </div>
        </div>
      </div>

      <div className="submit-block">
        <Button
          label={t('page.welcome.form.submit.register')}
          loading={loading}
          className="submit-button"
        />

        <p className="auth-switch">
          {t('page.welcome.redirect.register.text')}
          <button
            onClick={onLoginSwitch}
            className="switch-link"
            type="button"
          >
            {t('page.welcome.redirect.register.link')}
          </button>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;