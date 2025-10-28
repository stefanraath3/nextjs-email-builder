"use client";

import React, { useState } from "react";

type TextInputProps = {
  label: string;
  rows?: number;
  placeholder?: string;
  helperText?: string | React.ReactNode;
  defaultValue: string;
  onChange: (value: string) => void;
};

export default function TextInput({
  helperText,
  label,
  placeholder,
  rows,
  defaultValue,
  onChange,
}: TextInputProps) {
  const [value, setValue] = useState(defaultValue);
  const isMultiline = typeof rows === "number" && rows > 1;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange(newValue);
  };

  const inputClasses = `
    w-full rounded-md border border-input px-3 py-2 text-sm
    focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary
  `;

  return (
    <div className="flex flex-col">
      <label className="mb-1 text-sm font-medium text-foreground">{label}</label>
      {isMultiline ? (
        <textarea
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          className={inputClasses}
        />
      ) : (
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          className={inputClasses}
        />
      )}
      {helperText && (
        <p className="mt-1 text-xs text-text-tertiary">{helperText}</p>
      )}
    </div>
  );
}

