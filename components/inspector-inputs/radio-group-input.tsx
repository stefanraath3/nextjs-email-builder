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
      <label className="mb-1 text-sm font-medium text-foreground">{label}</label>
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
        border border-input
        hover:bg-bg-hover
        focus:z-10 focus:outline-none focus:ring-2 focus:ring-accent-primary
        ${
          isActive
            ? "bg-accent-primary text-primary-foreground border-accent-primary hover:bg-accent-hover"
            : "bg-background text-foreground"
        }
      `}
    >
      {children}
    </button>
  );
}
