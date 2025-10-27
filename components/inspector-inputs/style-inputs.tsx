"use client";

import { RoundedCorner } from "lucide-react";
import React from "react";

import ColorInput from "./color-input";
import FontFamilyInput from "./font-family-input";
import FontSizeInput from "./font-size-input";
import FontWeightInput from "./font-weight-input";
import PaddingInput from "./padding-input";
import SliderInput from "./slider-input";
import TextAlignInput from "./text-align-input";

type TStyle = {
  backgroundColor?: any;
  borderColor?: any;
  borderRadius?: any;
  color?: any;
  fontFamily?: any;
  fontSize?: any;
  fontWeight?: any;
  padding?: any;
  textAlign?: any;
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
  const handleChange = (v: any) => {
    onChange({ ...value, [name]: v });
  };

  switch (name) {
    case "backgroundColor":
      return (
        <ColorInput
          label="Background color"
          defaultValue={defaultValue}
          onChange={handleChange}
        />
      );
    case "borderColor":
      return (
        <ColorInput
          label="Border color"
          defaultValue={defaultValue}
          onChange={handleChange}
        />
      );
    case "borderRadius":
      return (
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Border radius
          </label>
          <SliderInput
            label={<RoundedCorner className="h-4 w-4" />}
            value={defaultValue ?? 0}
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
          defaultValue={defaultValue}
          onChange={handleChange}
        />
      );
    case "fontFamily":
      return (
        <FontFamilyInput
          label="Font family"
          defaultValue={defaultValue}
          onChange={handleChange}
        />
      );
    case "fontSize":
      return (
        <FontSizeInput
          label="Font size"
          defaultValue={defaultValue ?? 16}
          onChange={handleChange}
        />
      );
    case "fontWeight":
      return (
        <FontWeightInput
          label="Font weight"
          defaultValue={defaultValue ?? "normal"}
          onChange={handleChange}
        />
      );
    case "textAlign":
      return (
        <TextAlignInput
          label="Alignment"
          defaultValue={defaultValue}
          onChange={handleChange}
        />
      );
    case "padding":
      return (
        <PaddingInput
          label="Padding"
          defaultValue={defaultValue}
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
