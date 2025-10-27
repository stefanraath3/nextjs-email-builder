"use client";

import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";
import React, { useState } from "react";

import RadioGroupInput, { ToggleButton } from "./radio-group-input";

type TextAlignInputProps = {
  label: string;
  defaultValue: string | null;
  onChange: (value: string | null) => void;
};

export default function TextAlignInput({
  label,
  defaultValue,
  onChange,
}: TextAlignInputProps) {
  const [value, setValue] = useState(defaultValue ?? "left");

  const handleChange = (newValue: string) => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <RadioGroupInput label={label} defaultValue={value} onChange={handleChange}>
      <ToggleButton value="left">
        <AlignLeft className="h-4 w-4" />
      </ToggleButton>
      <ToggleButton value="center">
        <AlignCenter className="h-4 w-4" />
      </ToggleButton>
      <ToggleButton value="right">
        <AlignRight className="h-4 w-4" />
      </ToggleButton>
    </RadioGroupInput>
  );
}

