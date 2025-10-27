"use client";

import { SquareRoundCorner } from "lucide-react";
import React, { useState } from "react";

import EmailLayoutPropsSchema, {
  EmailLayoutProps,
} from "@/lib/editor/email-layout-schema";

import BaseSidebarPanel from "../base-sidebar-panel";
import ColorInput from "../color-input";
import FontFamilyInput from "../font-family-input";
import SliderWithLabelInput from "../slider-with-label-input";

type EmailLayoutSidebarPanelProps = {
  data: EmailLayoutProps;
  setData: (v: EmailLayoutProps) => void;
};

export default function EmailLayoutSidebarPanel({
  data,
  setData,
}: EmailLayoutSidebarPanelProps) {
  const [, setErrors] = useState<any | null>(null);

  const updateData = (d: unknown) => {
    const res = EmailLayoutPropsSchema.safeParse(d);
    if (res.success) {
      setData(res.data);
      setErrors(null);
    } else {
      setErrors(res.error);
    }
  };

  return (
    <BaseSidebarPanel title="Global">
      <ColorInput
        label="Backdrop color"
        defaultValue={data.backdropColor ?? "#F5F5F5"}
        onChange={(backdropColor) => updateData({ ...data, backdropColor })}
        nullable={false}
      />
      <ColorInput
        label="Canvas color"
        defaultValue={data.canvasColor ?? "#FFFFFF"}
        onChange={(canvasColor) => updateData({ ...data, canvasColor })}
        nullable={false}
      />
      <ColorInput
        label="Canvas border color"
        defaultValue={data.borderColor ?? null}
        onChange={(borderColor) => updateData({ ...data, borderColor })}
      />
      <SliderWithLabelInput
        iconLabel={<SquareRoundCorner className="h-4 w-4 text-gray-500" />}
        units="px"
        step={4}
        min={0}
        max={48}
        label="Canvas border radius"
        defaultValue={data.borderRadius ?? 0}
        onChange={(borderRadius) => updateData({ ...data, borderRadius })}
      />
      <FontFamilyInput
        label="Font family"
        defaultValue={data.fontFamily ?? "MODERN_SANS"}
        onChange={(fontFamily) => updateData({ ...data, fontFamily })}
      />
      <ColorInput
        label="Text color"
        defaultValue={data.textColor ?? "#262626"}
        onChange={(textColor) => updateData({ ...data, textColor })}
        nullable={false}
      />
    </BaseSidebarPanel>
  );
}
