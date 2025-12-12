import "./App.css";
import "./assets/css/variables.css";
import * as React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { useContext, useEffect } from "react";
import Home from "./pages/home/Home.tsx";
import { PrimeReactContext } from "primereact/api";
import type { RootState } from "./store";
import Welcome from "./pages/welcome/Welcome.tsx";
import { useDispatch, useSelector } from "react-redux";
import {
  initializeSessionRestore,
} from "@/store/slices/authSlice";
import { ProtectedRoute } from "@/components/routes/ProtectedRoute";
import { PublicRoute } from "@/components/routes/PublicRoute";

const BASE = import.meta.env.BASE_URL;
const basename = import.meta.env.DEV ? BASE : '';

let previousTheme = "";

const App = ()=> {
  const dispatch = useDispatch();
  const { changeTheme } = useContext(PrimeReactContext);
  const isSwitching = useSelector((state: RootState) => state.theme.isSwitching);
  const growthPosition = useSelector((state: RootState) => state.theme.overlayGrowthPosition);
  const { currentTheme } = useSelector((state: RootState) => state.theme);

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
    const token = localStorage.getItem('access_token');
    if (token !== null) {
      dispatch(initializeSessionRestore(token));
    }
  }, [dispatch]);

  return (
      <>
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
          <BrowserRouter basename={basename}>
            <Routes>
              <Route
                path="/auth"
                element={
                  <PublicRoute>
                    <Welcome />
                  </PublicRoute>
                }
              />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </div>
      </>
  );
};

export default App;
