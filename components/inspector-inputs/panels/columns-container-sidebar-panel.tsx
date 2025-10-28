"use client";

import {
  AlignVerticalDistributeStart,
  AlignVerticalDistributeCenter,
  AlignVerticalDistributeEnd,
  Space,
} from "lucide-react";
import React, { useState } from "react";

import ColumnsContainerPropsSchema, {
  ColumnsContainerProps,
} from "@/lib/editor/columns-container-schema";

import BaseSidebarPanel from "../base-sidebar-panel";
import ColumnWidthsInput from "../column-widths-input";
import RadioGroupInput, { ToggleButton } from "../radio-group-input";
import SliderWithLabelInput from "../slider-with-label-input";
import MultiStylePropertyPanel from "../style-inputs";
import { z } from "zod";

type ColumnsContainerPanelProps = {
  data: ColumnsContainerProps;
  setData: (v: ColumnsContainerProps) => void;
};

export default function ColumnsContainerPanel({
  data,
  setData,
}: ColumnsContainerPanelProps) {
  const [, setErrors] = useState<z.ZodError | null>(null);

  const updateData = (d: unknown) => {
    const res = ColumnsContainerPropsSchema.safeParse(d);
    if (res.success) {
      setData(res.data);
      setErrors(null);
    } else {
      setErrors(res.error);
    }
  };

  const columnsCount = data.props?.columnsCount ?? 3;

  return (
    <BaseSidebarPanel title="Columns block">
      <RadioGroupInput
        label="Number of columns"
        defaultValue={columnsCount === 2 ? "2" : "3"}
        onChange={(v) => {
          updateData({
            ...data,
            props: { ...data.props, columnsCount: v === "2" ? 2 : 3 },
          });
        }}
      >
        <ToggleButton value="2">2</ToggleButton>
        <ToggleButton value="3">3</ToggleButton>
      </RadioGroupInput>
      <ColumnWidthsInput
        defaultValue={
          data.props?.fixedWidths as
            | [
                number | null | undefined,
                number | null | undefined,
                number | null | undefined,
              ]
            | null
            | undefined
        }
        columnsCount={columnsCount}
        onChange={(fixedWidths) => {
          updateData({ ...data, props: { ...data.props, fixedWidths } });
        }}
      />
      <SliderWithLabelInput
        label="Columns gap"
        iconLabel={<Space className="h-4 w-4 text-text-tertiary" />}
        units="px"
        step={4}
        min={0}
        max={80}
        defaultValue={data.props?.columnsGap ?? 0}
        onChange={(columnsGap) =>
          updateData({ ...data, props: { ...data.props, columnsGap } })
        }
      />
      <RadioGroupInput
        label="Alignment"
        defaultValue={data.props?.contentAlignment ?? "middle"}
        onChange={(contentAlignment) => {
          updateData({ ...data, props: { ...data.props, contentAlignment } });
        }}
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
        names={["backgroundColor", "padding"]}
        value={data.style}
        onChange={(style) => updateData({ ...data, style })}
      />
    </BaseSidebarPanel>
  );
}
