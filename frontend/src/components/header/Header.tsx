import "@/components/header/Header.css";
import { useDispatch, useSelector } from "react-redux";
import { type RootState, store } from "@/store";
import { setIsSwitching, setOverlayGrowthPosition } from "@/store/slices/themeSlice.ts";
import { Button } from "primereact/button";
import { useRef } from "react";
import { clearAuthToken } from "@/store/slices/authSlice.ts";
import { useTranslation } from "react-i18next";

export const Header = () => {
  const { i18n } = useTranslation();

  const dispatch = useDispatch();
  const buttonRef = useRef<HTMLDivElement>(null);

  const isSwitching = useSelector(
    (state: RootState) => state.theme.isSwitching,
  );

  const user = useSelector(
    (state: RootState) => state.auth.user
  );

  const switchLang = () => {
    const newLang = i18n.language === "en" ? "ru" : "en";
    i18n.changeLanguage(newLang);
  };

  const changeTheme = () => {
    if (buttonRef.current === null) {
      return;
    }

    const rect = buttonRef.current.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    dispatch(setOverlayGrowthPosition({ x, y }));
    dispatch(setIsSwitching(true));
  };

  console.log(store.getState().auth)

  return (
    <div className="header">
      <nav>
        <div ref={buttonRef}>
          <Button
            icon="pi pi-palette"
            severity="info"
            onClick={changeTheme}
            disabled={isSwitching}
          />
        </div>
        <Button
          className="p-button-icon-only lang-btn"
          label={i18n.language}
          severity="info"
          onClick={switchLang}
        />
        <div className="profile-info">
          <p className="full-name">
            <span className="surname">{user?.surname}</span>
            <span className="name">{user?.name}</span>
            <span className="patronymic">{user?.patronymic}</span>
          </p>
          <p className="study-group">{ user?.studyGroup }</p>
        </div>
        <Button
          className="sign-out-btn"
          icon="pi pi-sign-out"
          onClick={() => dispatch(clearAuthToken())}
        />
      </nav>
    </div>
  );
};