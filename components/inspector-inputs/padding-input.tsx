"use client";

import {
  AlignHorizontalDistributeStart,
  AlignHorizontalDistributeEnd,
  AlignVerticalDistributeStart,
  AlignVerticalDistributeEnd,
} from "lucide-react";
import React, { useState } from "react";

import SliderInput from "./slider-input";

type PaddingValue = {
  top: number;
  bottom: number;
  right: number;
  left: number;
};

type PaddingInputProps = {
  label: string;
  defaultValue: PaddingValue | null;
  onChange: (value: PaddingValue) => void;
};

export default function PaddingInput({
  label,
  defaultValue,
  onChange,
}: PaddingInputProps) {
  const [value, setValue] = useState<PaddingValue>(() => {
    if (defaultValue) {
      return defaultValue;
    }
    return {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    };
  });

  function handleChange(key: keyof PaddingValue, newValue: number) {
    const updated = {
      ...value,
      [key]: newValue,
    };
    setValue(updated);
    onChange(updated);
  }

  return (
    <div className="space-y-3 pb-2">
      <label className="text-sm font-medium text-foreground">{label}</label>

      <SliderInput
        label={<AlignVerticalDistributeStart className="h-4 w-4" />}
        value={value.top}
        onChange={(v) => handleChange("top", v)}
        min={0}
        max={80}
        step={4}
      />

      <SliderInput
        label={<AlignVerticalDistributeEnd className="h-4 w-4" />}
        value={value.bottom}
        onChange={(v) => handleChange("bottom", v)}
        min={0}
        max={80}
        step={4}
      />

      <SliderInput
        label={<AlignHorizontalDistributeStart className="h-4 w-4" />}
        value={value.left}
        onChange={(v) => handleChange("left", v)}
        min={0}
        max={80}
        step={4}
      />

      <SliderInput
        label={<AlignHorizontalDistributeEnd className="h-4 w-4" />}
        value={value.right}
        onChange={(v) => handleChange("right", v)}
        min={0}
        max={80}
        step={4}
      />
    </div>
  );
}

