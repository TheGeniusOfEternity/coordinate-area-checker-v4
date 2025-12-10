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
import ProtectedRoute from "@/components/routes/ProtectedRoute";

const BASE = import.meta.env.BASE_URL;

let previousTheme = "";

const App = ()=> {
  const dispatch = useDispatch();
  const { changeTheme } = useContext(PrimeReactContext);
  const isSwitching = useSelector((state: RootState) => state.theme.isSwitching);
  const isAuthed = useSelector((state: RootState) => state.auth.accessToken !== null);
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
          <BrowserRouter basename={BASE}>
            <Routes>
              <Route
                path="/static/auth"
                element={
                  isAuthed
                    ? <Navigate to="/" replace />
                    : <Welcome />
                }
              />
              <Route
                path="/static/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/static/" replace />} />
            </Routes>
          </BrowserRouter>
        </div>
      </>
  );
};

export default App;
