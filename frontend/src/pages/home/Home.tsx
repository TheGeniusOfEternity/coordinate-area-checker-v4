import "@/pages/home/Home.css";
import {
  setIsSwitching,
  setOverlayGrowthPosition,
} from "@/store/slices/themeSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "primereact/button";
import type { RootState } from "@/store";
import { useRef, useState } from "react";
import { clearAuthToken } from "@/store/slices/authSlice.ts";
import { Graph } from "@/components/graph/Graph.tsx";
import { ShotForm, type ShotFormData } from "@/components/forms/shotform/ShotForm.tsx";

const Home = () => {
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

  const [isOpened, setIsOpened] = useState(false);

  const shotSubmit = async (data: ShotFormData) => {

  };

  return (
    <>
      <div className="container">
        <div className="header">
          <div ref={buttonRef}>
            <Button
              label="Сменить тему"
              onClick={changeTheme}
              disabled={isSwitching}
            />
            <Button
              label="Выйти"
              onClick={() => dispatch(clearAuthToken())}
            />
          </div>
        </div>
        <div className="main">
          <Graph />
          <ShotForm
            onSubmit={(data) => shotSubmit(data)}
          />
        </div>
      </div>
    </>
  );
};

export default Home;