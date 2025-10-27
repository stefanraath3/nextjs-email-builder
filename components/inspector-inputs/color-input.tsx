"use client";

import { Plus, X } from "lucide-react";
import React, { useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";

const DEFAULT_PRESET_COLORS = [
  "#E11D48",
  "#DB2777",
  "#C026D3",
  "#9333EA",
  "#7C3AED",
  "#4F46E5",
  "#2563EB",
  "#0284C7",
  "#0891B2",
  "#0D9488",
  "#059669",
  "#16A34A",
  "#65A30D",
  "#CA8A04",
  "#D97706",
  "#EA580C",
  "#DC2626",
  "#FFFFFF",
  "#FAFAFA",
  "#F5F5F5",
  "#E5E5E5",
  "#D4D4D4",
  "#A3A3A3",
  "#737373",
  "#525252",
  "#404040",
  "#262626",
  "#171717",
  "#0A0A0A",
  "#000000",
];

type ColorInputProps = {
  label: string;
  onChange: (value: string | null) => void;
  defaultValue: string | null;
  nullable?: boolean;
};

export default function ColorInput({
  label,
  defaultValue,
  onChange,
  nullable = true,
}: ColorInputProps) {
  const [anchorEl, setAnchorEl] = useState(false);
  const [value, setValue] = useState(defaultValue);

  const handleChange = (newValue: string | null) => {
    setValue(newValue);
    onChange(newValue);
  };

  const renderResetButton = () => {
    if (!nullable) {
      return null;
    }
    if (!value || value.trim().length === 0) {
      return null;
    }
    return (
      <button
        onClick={() => handleChange(null)}
        className="flex h-8 w-8 items-center justify-center rounded text-gray-500 hover:bg-gray-100"
      >
        <X className="h-4 w-4" />
      </button>
    );
  };

  const renderOpenButton = () => {
    if (value) {
      return (
        <button
          onClick={() => setAnchorEl(!anchorEl)}
          className="h-8 w-8 rounded border border-gray-300 bg-white"
          style={{ backgroundColor: value }}
        />
      );
    }
    return (
      <button
        onClick={() => setAnchorEl(!anchorEl)}
        className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 bg-white hover:bg-gray-50"
      >
        <Plus className="h-4 w-4" />
      </button>
    );
  };

  return (
    <div className="flex flex-col items-start">
      <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center gap-2">
        {renderOpenButton()}
        {renderResetButton()}
      </div>

      {anchorEl && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setAnchorEl(false)}
          />
          <div className="relative z-50 mt-2 rounded-lg border border-gray-200 bg-white p-3 shadow-xl">
            <div className="space-y-3">
              <HexColorPicker
                color={value || "#000000"}
                onChange={handleChange}
              />
              <div className="grid grid-cols-10 gap-1">
                {DEFAULT_PRESET_COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => handleChange(color)}
                    className="h-6 w-6 rounded border border-gray-200 hover:scale-110"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <HexColorInput
                prefixed
                color={value || "#000000"}
                onChange={handleChange}
                className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
