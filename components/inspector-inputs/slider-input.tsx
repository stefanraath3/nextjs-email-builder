"use client";

import React from "react";

type SliderInputProps = {
  label: string | React.ReactNode;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  units?: string;
};

export default function SliderInput({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  units = "px",
}: SliderInputProps) {
  return (
    <div className="flex w-full items-center gap-3">
      <div className="flex min-w-6 shrink-0 items-center">{label}</div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
        style={{
          background: `linear-gradient(to right, rgb(59, 130, 246) 0%, rgb(59, 130, 246) ${((value - min) / (max - min)) * 100}%, rgb(229, 231, 235) ${((value - min) / (max - min)) * 100}%, rgb(229, 231, 235) 100%)`,
        }}
      />
      <div className="min-w-12 shrink-0 text-right text-sm text-gray-600">
        {value}
        {units}
      </div>
    </div>
  );
}

