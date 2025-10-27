"use client";

import React, { useState } from "react";

import ContainerPropsSchema, {
  ContainerProps,
} from "@/lib/editor/container-schema";

import BaseSidebarPanel from "../base-sidebar-panel";
import MultiStylePropertyPanel from "../style-inputs";

type ContainerSidebarPanelProps = {
  data: ContainerProps;
  setData: (v: ContainerProps) => void;
};

export default function ContainerSidebarPanel({
  data,
  setData,
}: ContainerSidebarPanelProps) {
  const [, setErrors] = useState<any | null>(null);

  const updateData = (d: unknown) => {
    const res = ContainerPropsSchema.safeParse(d);
    if (res.success) {
      setData(res.data);
      setErrors(null);
    } else {
      setErrors(res.error);
    }
  };

  return (
    <BaseSidebarPanel title="Container block">
      <MultiStylePropertyPanel
        names={["backgroundColor", "borderColor", "borderRadius", "padding"]}
        value={data.style}
        onChange={(style) => updateData({ ...data, style })}
      />
    </BaseSidebarPanel>
  );
}

