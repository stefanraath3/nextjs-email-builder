"use client";

import React, { useState } from "react";

import { TextProps, TextPropsSchema } from "@/lib/blocks/text";

import BaseSidebarPanel from "../base-sidebar-panel";
import BooleanInput from "../boolean-input";
import MultiStylePropertyPanel from "../style-inputs";
import TextInput from "../text-input";

type TextSidebarPanelProps = {
  data: TextProps;
  setData: (v: TextProps) => void;
};

export default function TextSidebarPanel({
  data,
  setData,
}: TextSidebarPanelProps) {
  const [, setErrors] = useState<any | null>(null);

  const updateData = (d: unknown) => {
    const res = TextPropsSchema.safeParse(d);
    if (res.success) {
      setData(res.data);
      setErrors(null);
    } else {
      setErrors(res.error);
    }
  };

  return (
    <BaseSidebarPanel title="Text block">
      <TextInput
        label="Content"
        rows={5}
        defaultValue={data.props?.text ?? ""}
        onChange={(text) =>
          updateData({ ...data, props: { ...data.props, text } })
        }
      />
      <BooleanInput
        label="Markdown"
        defaultValue={data.props?.markdown ?? false}
        onChange={(markdown) =>
          updateData({ ...data, props: { ...data.props, markdown } })
        }
      />

      <MultiStylePropertyPanel
        names={[
          "color",
          "backgroundColor",
          "fontFamily",
          "fontSize",
          "fontWeight",
          "textAlign",
          "padding",
        ]}
        value={data.style}
        onChange={(style) => updateData({ ...data, style })}
      />
    </BaseSidebarPanel>
  );
}

