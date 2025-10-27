"use client";

import React, { useState } from "react";

import TextDimensionInput from "./text-dimension-input";

type TWidthValue = number | null | undefined;
type FixedWidths = [TWidthValue, TWidthValue, TWidthValue];

type ColumnWidthsInputProps = {
  defaultValue: FixedWidths | null | undefined;
  onChange: (value: FixedWidths | null | undefined) => void;
  columnsCount?: 2 | 3;
};

export default function ColumnWidthsInput({
  defaultValue,
  onChange,
  columnsCount = 3,
}: ColumnWidthsInputProps) {
  const [currentValue, setCurrentValue] = useState<
    [TWidthValue, TWidthValue, TWidthValue]
  >(() => {
    if (defaultValue) {
      return defaultValue;
    }
    return [null, null, null];
  });

  const setIndexValue = (
    index: 0 | 1 | 2,
    value: number | null | undefined
  ) => {
    const nValue: FixedWidths = [...currentValue];
    nValue[index] = value;
    setCurrentValue(nValue);
    onChange(nValue);
  };

  return (
    <div className="flex gap-2">
      <TextDimensionInput
        label="Column 1"
        defaultValue={currentValue?.[0]}
        onChange={(v) => setIndexValue(0, v)}
      />
      <TextDimensionInput
        label="Column 2"
        defaultValue={currentValue?.[1]}
        onChange={(v) => setIndexValue(1, v)}
      />
      {columnsCount === 3 && (
        <TextDimensionInput
          label="Column 3"
          defaultValue={currentValue?.[2]}
          onChange={(v) => setIndexValue(2, v)}
        />
      )}
    </div>
  );
}

