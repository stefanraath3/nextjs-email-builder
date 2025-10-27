"use client";

import { Maximize2 } from "lucide-react";
import React, { useState } from "react";

import {
  SpacerProps,
  SpacerPropsDefaults,
  SpacerPropsSchema,
} from "@/lib/blocks/spacer";

import BaseSidebarPanel from "../base-sidebar-panel";
import SliderWithLabelInput from "../slider-with-label-input";

type SpacerSidebarPanelProps = {
  data: SpacerProps;
  setData: (v: SpacerProps) => void;
};

export default function SpacerSidebarPanel({
  data,
  setData,
}: SpacerSidebarPanelProps) {
  const [, setErrors] = useState<any | null>(null);

  const updateData = (d: unknown) => {
    const res = SpacerPropsSchema.safeParse(d);
    if (res.success) {
      setData(res.data);
      setErrors(null);
    } else {
      setErrors(res.error);
    }
  };

  return (
    <BaseSidebarPanel title="Spacer block">
      <SliderWithLabelInput
        label="Height"
        iconLabel={<Maximize2 className="h-4 w-4 text-gray-500" />}
        units="px"
        step={4}
        min={4}
        max={128}
        defaultValue={data.props?.height ?? SpacerPropsDefaults.height}
        onChange={(height) =>
          updateData({ ...data, props: { ...data.props, height } })
        }
      />
    </BaseSidebarPanel>
  );
}

