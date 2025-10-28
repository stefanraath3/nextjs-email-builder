"use client";

import React from "react";

type TextDimensionInputProps = {
  label: string;
  defaultValue: number | null | undefined;
  onChange: (value: number | null) => void;
};

export default function TextDimensionInput({
  label,
  defaultValue,
  onChange,
}: TextDimensionInputProps) {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (ev) => {
    const value = parseInt(ev.target.value);
    onChange(isNaN(value) ? null : value);
  };

  return (
    <div className="flex flex-col">
      <label className="mb-1 text-sm font-medium text-foreground">{label}</label>
      <div className="relative">
        <input
          type="number"
          onChange={handleChange}
          defaultValue={defaultValue ?? ""}
          placeholder="auto"
          className="w-full rounded border border-input px-3 py-2 pr-10 text-sm focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-text-tertiary">
          px
        </span>
      </div>
    </div>
  );
}

