import "./App.css";
import * as React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { useContext, useEffect } from "react";
import Home from "./pages/home/Home.tsx";
import { PrimeReactContext } from "primereact/api";
import type { RootState } from "./store";
import Welcome from "./pages/welcome/Welcome.tsx";
import { useSelector } from "react-redux";


let previousTheme = "";

const App = ()=> {
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
          <BrowserRouter>
            <Routes>
              <Route path="/static/auth" element={<Welcome />}/>
              <Route path="/static/" element={<Home />}/>
              <Route path="*" element={<Navigate to="/static/" replace />} />
            </Routes>
          </BrowserRouter>
        </div>
      </>
  );
};

export default App;
