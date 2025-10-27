"use client";

import React, { useState } from "react";

type RadioGroupInputProps = {
  label: string | React.ReactNode;
  children: React.ReactNode;
  defaultValue: string;
  onChange: (value: string) => void;
};

export default function RadioGroupInput({
  label,
  children,
  defaultValue,
  onChange,
}: RadioGroupInputProps) {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    onChange(newValue);
  };

  // Clone children and inject the active state and click handler
  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const props = child.props as Record<string, unknown>;
      return React.cloneElement(child, {
        isActive: props.value === value,
        onClick: () => handleChange(props.value as string),
      } as Partial<typeof props>);
    }
    return child;
  });

  return (
    <div className="flex flex-col items-start">
      <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
      <div className="inline-flex rounded-md shadow-sm" role="group">
        {enhancedChildren}
      </div>
    </div>
  );
}

type ToggleButtonProps = {
  value: string;
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
};

export function ToggleButton({
  children,
  isActive,
  onClick,
}: ToggleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        px-4 py-2 text-sm font-medium
        first:rounded-l-md last:rounded-r-md
        border border-gray-300
        hover:bg-gray-50
        focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500
        ${
          isActive
            ? "bg-blue-500 text-white border-blue-500 hover:bg-blue-600"
            : "bg-white text-gray-700"
        }
      `}
    >
      {children}
    </button>
  );
}
