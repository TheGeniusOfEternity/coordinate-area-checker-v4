import * as React from "react";
import { useContext, useRef, useState } from "react";
import { Button } from "primereact/button";
import { PrimeReactContext } from "primereact/api";
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

const App = ()=> {
  const { changeTheme } = useContext(PrimeReactContext);
  const [currentTheme, setCurrentTheme] = useState("dark");
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isGrowing, setIsGrowing] = useState(false);
  const [growthPosition, setGrowthPosition] = useState({ x: 0, y: 0 });
  const [isSwitching, setIsSwitching] = useState(false);

  const switchTheme = () => {
    if (!changeTheme || !buttonRef.current) { return; }

    const rect = buttonRef.current.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const btn = (buttonRef.current.children[0] as HTMLButtonElement);
    btn.disabled = true;

    setGrowthPosition({x, y});
    setIsGrowing(true);
    setIsSwitching(true);

    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    setTimeout(() => {
      changeTheme(currentTheme, nextTheme, "theme-link");
      setCurrentTheme(nextTheme);
      setIsSwitching(false);
      setIsGrowing(false);
      btn.disabled = false;
    }, 800);
  };

  return (
      <>
        {isGrowing && (
            <div
                className="theme-overlay"
                style={{
                  "--growth-x": `${growthPosition.x}px`,
                  "--growth-y": `${growthPosition.y}px`,
                } as React.CSSProperties}
            />
        )}
        <div className={`App ${isSwitching ? "theme-transition" : ""}`}>
          <div>
            <a href="https://vitejs.dev" target="_blank">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://reactjs.org" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <h1>Vite + PrimeReact</h1>
          <div>
            <h2>PrimeReact Typescript Issue Template</h2>
            <p>
              Please create a test case and attach the link to the to your github
              issue report.
            </p>
          </div>
          <div className="card">
            <div ref={buttonRef} className="wrapper">
              <Button
                  label="Светлая тема"
                  onClick={switchTheme}
              />
            </div>
            <p>
              Edit <code>src/App.tsx</code> and save to test PrimeReact
            </p>
          </div>
          <p className="read-the-docs">
            Click on the Vite and React logos to learn more
          </p>
        </div>
      </>
  );
};

export default App;
