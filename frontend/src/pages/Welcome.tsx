import "../App.css";
import * as React from "react";
import { useContext, useRef, useState } from "react";
import { Button } from "primereact/button";
import { PrimeReactContext } from "primereact/api";

const Welcome = () => {
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
        <div ref={buttonRef}>
          <Button
            label="Сменить тему"
            onClick={switchTheme}
          />
        </div>
      </div>
    </>
  );
};

export default Welcome;