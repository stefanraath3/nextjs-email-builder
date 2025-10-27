"use client";

import React, { useState } from "react";

import { FONT_FAMILIES } from "@/lib/editor/font-families";

type FontFamilyInputProps = {
  label: string;
  onChange: (value: string | null) => void;
  defaultValue: string | null;
};

export default function FontFamilyInput({
  label,
  onChange,
  defaultValue,
}: FontFamilyInputProps) {
  const [value, setValue] = useState(defaultValue ?? "inherit");

  const handleChange = (newValue: string) => {
    setValue(newValue);
    onChange(newValue === "inherit" ? null : newValue);
  };

  return (
    <div className="flex flex-col">
      <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
      <select
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        className="rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <option value="inherit">Match email settings</option>
        {FONT_FAMILIES.map((option) => (
          <option
            key={option.key}
            value={option.key}
            style={{ fontFamily: option.value }}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

