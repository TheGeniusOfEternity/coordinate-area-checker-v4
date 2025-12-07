import {
  setIsSwitching,
  setOverlayGrowthPosition,
} from "../store/slices/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "primereact/button";
import type { RootState } from "../store";
import { useRef } from "react";

const Main = () => {
  const dispatch = useDispatch();
  const buttonRef = useRef<HTMLDivElement>(null);
  const isSwitching = useSelector((state: RootState) => state.theme.isSwitching);

  const changeTheme = () => {
    if (buttonRef.current === null) { return; }

    const rect = buttonRef.current.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    dispatch(setOverlayGrowthPosition({ x, y }));
    dispatch(setIsSwitching(true));
  };

  return (
    <>
      <div>
        <div ref={buttonRef}>
          <Button
            label="Сменить тему"
            onClick={changeTheme}
            disabled={isSwitching}
          />
        </div>
      </div>
    </>
  );
};

export default Main;