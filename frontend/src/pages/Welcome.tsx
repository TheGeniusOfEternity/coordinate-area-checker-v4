import {
  setIsSwitching,
  setOverlayGrowthPosition,
  setTheme,
} from "../store/slices/themeSlice";
import { Button } from "primereact/button";
import { useDispatch } from "react-redux";
import { useRef } from "react";

const Welcome = () => {
  const dispatch = useDispatch();
  const buttonRef = useRef<HTMLDivElement>(null);

  const changeTheme = () => {
    if (buttonRef.current === null) { return; }

    const rect = buttonRef.current.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const btn = (buttonRef.current.children[0] as HTMLButtonElement);

    btn.disabled = true;
    dispatch(setOverlayGrowthPosition({ x, y }));
    dispatch(setIsSwitching(true));
    setTimeout(() => {
      dispatch(setTheme());
      btn.disabled = false;
    }, 500);
  };

  return (
    <>
      <div>
        <div ref={buttonRef}>
          <Button
            label="Сменить тему"
            onClick={changeTheme}
          />
        </div>
      </div>
    </>
  );
};

export default Welcome;