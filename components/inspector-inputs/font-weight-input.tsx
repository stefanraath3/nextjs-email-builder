"use client";

import React, { useState } from "react";

import RadioGroupInput, { ToggleButton } from "./radio-group-input";

type FontWeightInputProps = {
  label: string;
  defaultValue: string;
  onChange: (value: string) => void;
};

export default function FontWeightInput({
  label,
  defaultValue,
  onChange,
}: FontWeightInputProps) {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <RadioGroupInput label={label} defaultValue={value} onChange={handleChange}>
      <ToggleButton value="normal">Regular</ToggleButton>
      <ToggleButton value="bold">Bold</ToggleButton>
    </RadioGroupInput>
  );
}

