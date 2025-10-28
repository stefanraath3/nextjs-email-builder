"use client";

import { Type } from "lucide-react";
import React, { useState } from "react";

import SliderInput from "./slider-input";

type FontSizeInputProps = {
  label: string;
  defaultValue: number;
  onChange: (value: number) => void;
};

export default function FontSizeInput({
  label,
  defaultValue,
  onChange,
}: FontSizeInputProps) {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (newValue: number) => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <SliderInput
        label={<Type className="h-4 w-4" />}
        value={value}
        onChange={handleChange}
        min={10}
        max={48}
        step={1}
      />
    </div>
  );
}

