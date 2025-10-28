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
        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted"
        style={{
          background: `linear-gradient(to right, var(--accent-primary) 0%, var(--accent-primary) ${((value - min) / (max - min)) * 100}%, var(--muted) ${((value - min) / (max - min)) * 100}%, var(--muted) 100%)`,
        }}
      />
      <div className="min-w-12 shrink-0 text-right text-sm text-text-secondary">
        {value}
        {units}
      </div>
    </div>
  );
}
