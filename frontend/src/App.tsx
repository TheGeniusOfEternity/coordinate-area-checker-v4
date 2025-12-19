import "./App.css";
import "./assets/css/variables.css";
import * as React from "react";
import { Navigate, Route, Routes } from "react-router";
import { useContext, useEffect, useRef } from "react";
import Home from "./pages/home/Home.tsx";
import { PrimeReactContext } from "primereact/api";
import type { RootState } from "./store";
import Welcome from "./pages/welcome/Welcome.tsx";
import { useDispatch, useSelector } from "react-redux";
import {
  setAuthToken,
} from "@/store/slices/authSlice";
import { PublicRoute } from "@/components/routes/PublicRoute";
import { useLocation, useNavigate } from "react-router-dom";
import { setNavigate } from "@/utils/NavigationUtil.ts";
import { Toast } from "primereact/toast";
import { clearToastMessage } from "@/store/slices/toastSlice.ts";
import { useTranslation } from "react-i18next";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/transitions/PageTransition.tsx";

let previousTheme = "";

const App = ()=> {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const location = useLocation();

  const toast = useRef<Toast>(null);

  const { changeTheme } = useContext(PrimeReactContext);

  const toastMessage = useSelector((state: RootState) => state.toast.message);
  const isSwitching = useSelector((state: RootState) => state.theme.isSwitching);
  const growthPosition = useSelector((state: RootState) => state.theme.overlayGrowthPosition);

  const { currentTheme } = useSelector((state: RootState) => state.theme);

  useEffect(() => {
    const summary = toastMessage === null
      ? null
      : t(toastMessage.summary);
    const detail = toastMessage === null
      ? null
      : toastMessage.severity === "error"
        ? toastMessage.detail
        : t(toastMessage.detail);

    if (summary !== null && detail !== null) {
      toast.current?.show({
        ...toastMessage,
        summary,
        detail,
        life: 3000
      });
    }
  }, [toastMessage, dispatch, t]);

  useEffect(() => {
    if (changeTheme) {
      previousTheme = currentTheme === 'dark' ? 'light' : 'dark';
      changeTheme(previousTheme, currentTheme, 'theme-link');
      localStorage.setItem("theme-mode", currentTheme);
    }
  }, [currentTheme, changeTheme]);

  useEffect(() => {
    document.body.classList.add('hydrated');
  }, []);

  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token !== null) {
      dispatch(setAuthToken(token));
    }
  }, [dispatch]);

  return (
      <>
        <Toast
          ref={toast}
          onHide={() => dispatch(clearToastMessage())}
        />
        {isSwitching && (
          <div
            className={`theme-overlay ${previousTheme}`}
            style={{
              "--growth-x": `${growthPosition.x}px`,
              "--growth-y": `${growthPosition.y}px`,
            } as React.CSSProperties}
          />
        )}
        <div className={`App ${isSwitching ? "theme-transition" : ""} ${currentTheme}`}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/auth"
                element={
                  <PublicRoute>
                    <PageTransition>
                      <Welcome />
                    </PageTransition>
                  </PublicRoute>
                }
              />
              <Route
                path="/"
                element={
                  // <ProtectedRoute>
                    <PageTransition>
                      <Home />
                    </PageTransition>
                  // </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </div>
      </>
  );
};

export default App;
