"use client";

import React, { useState } from "react";

import SliderInput from "./slider-input";

type SliderWithLabelInputProps = {
  label: string;
  iconLabel: React.ReactNode;
  defaultValue: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  units?: string;
};

export default function SliderWithLabelInput({
  label,
  defaultValue,
  onChange,
  iconLabel,
  ...props
}: SliderWithLabelInputProps) {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (newValue: number) => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <SliderInput
        label={iconLabel}
        value={value}
        onChange={handleChange}
        {...props}
      />
    </div>
  );
}

