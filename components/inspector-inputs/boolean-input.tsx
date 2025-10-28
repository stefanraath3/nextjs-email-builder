"use client";

import React, { useState } from "react";

type BooleanInputProps = {
  label: string;
  defaultValue: boolean;
  onChange: (value: boolean) => void;
};

export default function BooleanInput({
  label,
  defaultValue,
  onChange,
}: BooleanInputProps) {
  const [value, setValue] = useState(defaultValue);

  const handleChange = () => {
    const newValue = !value;
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          checked={value}
          onChange={handleChange}
          className="sr-only peer"
        />
        <div className="h-6 w-11 rounded-full bg-muted peer-checked:bg-accent-primary peer-focus:ring-2 peer-focus:ring-accent-primary peer-focus:ring-offset-2 transition-colors"></div>
        <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-background transition-transform peer-checked:translate-x-5"></div>
      </div>
      <span className="text-sm font-medium text-foreground">{label}</span>
    </label>
  );
}
