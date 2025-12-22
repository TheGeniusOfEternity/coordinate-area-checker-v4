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
  data: ShotFormData;
  // eslint-disable-next-line no-unused-vars
  onXChange: (x: number) => void;
  // eslint-disable-next-line no-unused-vars
  onYChange: (y: number) => void;
  // eslint-disable-next-line no-unused-vars
  onRChange: (r: number) => void;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: ShotFormData) => Promise<void>;
}

export const ShotForm = ({
  data,
  onXChange,
  onYChange,
  onRChange,
  onSubmit,
}: ShotFormProps) => {
  const { t } = useTranslation();

  const xValues = [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2];
  const rValues = [0.5, 1, 1.5, 2];

  const sliderRef = useRef<Slider>(null);

  const [isOpened, setIsOpened] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(data);
  };

  const resetForm = () => {
    onXChange(0);
    onYChange(0);
    onRChange(1);
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
          value={data.x}
          onChange={(e) => onXChange(e.value)}
          options={xValues}
        />
      </div>
      <div className="yInput p-field">
        <label htmlFor="y-input">
          <p className="p-component">Y</p>
          <p className="p-component">{t("page.home.form.yLabel")}:</p>
          <p className="p-component">{data.y}</p>
        </label>
        <Slider
          ref={sliderRef}
          className="input"
          id="y-input"
          value={data.y}
          min={-3}
          max={5}
          step={0.5}
          onChange={(e) => onYChange(e.value as number)}
        />
      </div>
      <div className="rInput p-field">
        <label htmlFor="r-input">R</label>
        <ListBox
          className="input"
          id="r-input"
          value={data.r}
          onChange={(e) => onRChange(e.value)}
          options={rValues}
        />
      </div>
      <div className="buttons">
        <Button
          className="reset btn"
          severity="info"
          outlined
          type="reset"
          label={t("page.home.form.reset")}
          onClick={resetForm}
        />
        <Button
          className="submit btn"
          type="submit"
          label={t("page.home.form.submit")}
          onClick={handleSubmit}
        />
      </div>
    </form>
  );
};