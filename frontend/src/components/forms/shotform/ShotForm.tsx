import "@/components/forms/shotform/ShotForm.css";
import * as React from "react";
import { ListBox } from "primereact/listbox";
import {
  useRef,
  useState,
} from "react";
import { Slider } from "primereact/slider";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";

export interface ShotFormData {
  x: number;
  y: number;
  r: number;
}

interface ShotFormProps {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: ShotFormData) => number
}

export const ShotForm = ({
  onSubmit,
}: ShotFormProps) => {
  const { t } = useTranslation();

  const xValues = [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2];
  const rValues = [0.5, 1, 1.5, 2];

  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const [r, setR] = useState<number>(1);

  const sliderRef = useRef<Slider>(null);

  const [isOpened, setIsOpened] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({x, y, r});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`shotForm ${isOpened ? "" : "hidden"}`}
    >
      <h3>{t("page.home.form.title")}</h3>
      <i
        className="toggle-btn pi pi-angle-down"
        style={{ fontSize: "1.5rem" }}
        onClick={() => setIsOpened(!isOpened)}
        data-opened={isOpened}
      ></i>
      <div className="xInput p-field">
        <label htmlFor="x-input">X</label>
        <ListBox
          className="input"
          id="x-input"
          value={x}
          onChange={(e) => setX(e.value)}
          options={xValues}
        />
      </div>
      <div className="yInput p-field">
        <label htmlFor="y-input">
          <p className="p-component">Y</p>
          <p className="p-component">{t("page.home.form.yLabel")}:</p>
          <p className="p-component">{y}</p>
        </label>
        <Slider
          ref={sliderRef}
          className="input"
          id="y-input"
          value={y}
          min={-3}
          max={5}
          step={0.5}
          onChange={(e) => setY(e.value as number)}
        />
      </div>
      <div className="rInput p-field">
        <label htmlFor="r-input">R</label>
        <ListBox
          className="input"
          id="r-input"
          value={r}
          onChange={(e) => setR(e.value)}
          options={rValues}
        />
      </div>
      <Button
        className="reset btn"
        severity="info"
        outlined
        label={t("page.home.form.reset")}
      />
      <Button
        className="submit btn"
        type="submit"
        label={t("page.home.form.submit")}
      />
    </form>
  );
};