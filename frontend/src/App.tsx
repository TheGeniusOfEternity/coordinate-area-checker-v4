import "./App.css";
import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PrimeReactContext } from "primereact/api";
import type { RootState } from "./store";
import Welcome from "./pages/Welcome.tsx";
import { setIsSwitching } from "./store/slices/themeSlice.ts";

let previousTheme = "";

const App = ()=> {
  const { changeTheme } = useContext(PrimeReactContext);
  const dispatch = useDispatch();
  const isSwitching = useSelector((state: RootState) => state.theme.isSwitching);
  const growthPosition = useSelector((state: RootState) => state.theme.overlayGrowthPosition);
  const { currentTheme } = useSelector((state: RootState) => state.theme);

  useEffect(() => {
    if (changeTheme) {
      previousTheme = currentTheme === 'dark' ? 'light' : 'dark';
      changeTheme(previousTheme, currentTheme, 'theme-link');
      setTimeout(() => {
        dispatch(setIsSwitching(false));
      }, 100);
    }
  }, [changeTheme, currentTheme, dispatch]);

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
              <Route path="/static/" element={<Welcome />}/>
            </Routes>
          </BrowserRouter>
        </div>
      </>
  );
};

export default App;
