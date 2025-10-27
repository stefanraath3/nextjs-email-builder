"use client";

import {
  AlignVerticalDistributeStart,
  AlignVerticalDistributeCenter,
  AlignVerticalDistributeEnd,
} from "lucide-react";
import React, { useState } from "react";

import { ImageProps, ImagePropsSchema } from "@/lib/blocks/image";

import BaseSidebarPanel from "../base-sidebar-panel";
import RadioGroupInput, { ToggleButton } from "../radio-group-input";
import MultiStylePropertyPanel from "../style-inputs";
import TextDimensionInput from "../text-dimension-input";
import TextInput from "../text-input";

type ImageSidebarPanelProps = {
  data: ImageProps;
  setData: (v: ImageProps) => void;
};

export default function ImageSidebarPanel({
  data,
  setData,
}: ImageSidebarPanelProps) {
  const [, setErrors] = useState<any | null>(null);

  const updateData = (d: unknown) => {
    const res = ImagePropsSchema.safeParse(d);
    if (res.success) {
      setData(res.data);
      setErrors(null);
    } else {
      setErrors(res.error);
    }
  };

  return (
    <BaseSidebarPanel title="Image block">
      <TextInput
        label="Source URL"
        defaultValue={data.props?.url ?? ""}
        onChange={(v) => {
          const url = v.trim().length === 0 ? null : v.trim();
          updateData({ ...data, props: { ...data.props, url } });
        }}
      />

      <TextInput
        label="Alt text"
        defaultValue={data.props?.alt ?? ""}
        onChange={(alt) =>
          updateData({ ...data, props: { ...data.props, alt } })
        }
      />
      <TextInput
        label="Click through URL"
        defaultValue={data.props?.linkHref ?? ""}
        onChange={(v) => {
          const linkHref = v.trim().length === 0 ? null : v.trim();
          updateData({ ...data, props: { ...data.props, linkHref } });
        }}
      />
      <div className="grid grid-cols-2 gap-4">
        <TextDimensionInput
          label="Width"
          defaultValue={data.props?.width}
          onChange={(width) =>
            updateData({ ...data, props: { ...data.props, width } })
          }
        />
        <TextDimensionInput
          label="Height"
          defaultValue={data.props?.height}
          onChange={(height) =>
            updateData({ ...data, props: { ...data.props, height } })
          }
        />
      </div>

      <RadioGroupInput
        label="Alignment"
        defaultValue={data.props?.contentAlignment ?? "middle"}
        onChange={(contentAlignment) =>
          updateData({ ...data, props: { ...data.props, contentAlignment } })
        }
      >
        <ToggleButton value="top">
          <AlignVerticalDistributeStart className="h-4 w-4" />
        </ToggleButton>
        <ToggleButton value="middle">
          <AlignVerticalDistributeCenter className="h-4 w-4" />
        </ToggleButton>
        <ToggleButton value="bottom">
          <AlignVerticalDistributeEnd className="h-4 w-4" />
        </ToggleButton>
      </RadioGroupInput>

      <MultiStylePropertyPanel
        names={["backgroundColor", "textAlign", "padding"]}
        value={data.style}
        onChange={(style) => updateData({ ...data, style })}
      />
    </BaseSidebarPanel>
  );
}

