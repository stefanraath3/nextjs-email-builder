"use client";

import { SquareRoundCorner } from "lucide-react";
import React from "react";

import ColorInput from "./color-input";
import FontFamilyInput from "./font-family-input";
import FontSizeInput from "./font-size-input";
import FontWeightInput from "./font-weight-input";
import PaddingInput from "./padding-input";
import SliderInput from "./slider-input";
import TextAlignInput from "./text-align-input";

type PaddingValue = {
  top: number;
  bottom: number;
  right: number;
  left: number;
};

type TStyle = {
  backgroundColor?: string | null;
  borderColor?: string | null;
  borderRadius?: number | null;
  color?: string | null;
  fontFamily?: string | null;
  fontSize?: number | null;
  fontWeight?: string | null;
  padding?: PaddingValue | null;
  textAlign?: "left" | "center" | "right" | null;
};

type SingleStylePropertyPanelProps = {
  name: keyof TStyle;
  value: TStyle;
  onChange: (style: TStyle) => void;
};

function SingleStylePropertyPanel({
  name,
  value,
  onChange,
}: SingleStylePropertyPanelProps) {
  const defaultValue = value[name] ?? null;
  const handleChange = (v: TStyle[typeof name]) => {
    onChange({ ...value, [name]: v });
  };

  switch (name) {
    case "backgroundColor":
      return (
        <ColorInput
          label="Background color"
          defaultValue={defaultValue as string | null}
          onChange={handleChange}
        />
      );
    case "borderColor":
      return (
        <ColorInput
          label="Border color"
          defaultValue={defaultValue as string | null}
          onChange={handleChange}
        />
      );
    case "borderRadius":
      return (
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Border radius
          </label>
          <SliderInput
            label={<SquareRoundCorner className="h-4 w-4" />}
            value={(defaultValue as number | null) ?? 0}
            onChange={handleChange}
            min={0}
            max={48}
            step={4}
          />
        </div>
      );
    case "color":
      return (
        <ColorInput
          label="Text color"
          defaultValue={defaultValue as string | null}
          onChange={handleChange}
        />
      );
    case "fontFamily":
      return (
        <FontFamilyInput
          label="Font family"
          defaultValue={defaultValue as string | null}
          onChange={handleChange}
        />
      );
    case "fontSize":
      return (
        <FontSizeInput
          label="Font size"
          defaultValue={(defaultValue as number | null) ?? 16}
          onChange={handleChange}
        />
      );
    case "fontWeight":
      return (
        <FontWeightInput
          label="Font weight"
          defaultValue={(defaultValue as string | null) ?? "normal"}
          onChange={handleChange}
        />
      );
    case "textAlign":
      return (
        <TextAlignInput
          label="Alignment"
          defaultValue={defaultValue as "left" | "center" | "right" | null}
          onChange={handleChange}
        />
      );
    case "padding":
      return (
        <PaddingInput
          label="Padding"
          defaultValue={defaultValue as PaddingValue | null}
          onChange={handleChange}
        />
      );
  }
}

type MultiStylePropertyPanelProps = {
  names: (keyof TStyle)[];
  value: TStyle | undefined | null;
  onChange: (style: TStyle) => void;
};

export default function MultiStylePropertyPanel({
  names,
  value,
  onChange,
}: MultiStylePropertyPanelProps) {
  return (
    <>
      {names.map((name) => (
        <SingleStylePropertyPanel
          key={name}
          name={name}
          value={value || {}}
          onChange={onChange}
        />
      ))}
    </>
  );
}
