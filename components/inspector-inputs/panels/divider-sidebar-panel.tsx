"use client";

import { Minus } from "lucide-react";
import React, { useState } from "react";

import {
  DividerProps,
  DividerPropsDefaults,
  DividerPropsSchema,
} from "@/lib/blocks/divider";

import BaseSidebarPanel from "../base-sidebar-panel";
import ColorInput from "../color-input";
import SliderWithLabelInput from "../slider-with-label-input";
import MultiStylePropertyPanel from "../style-inputs";

type DividerSidebarPanelProps = {
  data: DividerProps;
  setData: (v: DividerProps) => void;
};

export default function DividerSidebarPanel({
  data,
  setData,
}: DividerSidebarPanelProps) {
  const [, setErrors] = useState<any | null>(null);

  const updateData = (d: unknown) => {
    const res = DividerPropsSchema.safeParse(d);
    if (res.success) {
      setData(res.data);
      setErrors(null);
    } else {
      setErrors(res.error);
    }
  };

  const lineColor = data.props?.lineColor ?? DividerPropsDefaults.lineColor;
  const lineHeight = data.props?.lineHeight ?? DividerPropsDefaults.lineHeight;

  return (
    <BaseSidebarPanel title="Divider block">
      <ColorInput
        label="Color"
        defaultValue={lineColor}
        onChange={(lineColor) =>
          updateData({ ...data, props: { ...data.props, lineColor } })
        }
        nullable={false}
      />
      <SliderWithLabelInput
        label="Height"
        iconLabel={<Minus className="h-4 w-4 text-gray-500" />}
        units="px"
        step={1}
        min={1}
        max={24}
        defaultValue={lineHeight}
        onChange={(lineHeight) =>
          updateData({ ...data, props: { ...data.props, lineHeight } })
        }
      />
      <MultiStylePropertyPanel
        names={["backgroundColor", "padding"]}
        value={data.style}
        onChange={(style) => updateData({ ...data, style })}
      />
    </BaseSidebarPanel>
  );
}

