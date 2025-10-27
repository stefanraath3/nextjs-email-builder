import React from "react";

import { ColumnsContainer as BaseColumnsContainer } from "@/lib/blocks/columns-container";
import { ColumnsContainerProps } from "@/lib/editor/columns-container-schema";

import { ReaderBlock } from "./reader";

export default function ColumnsContainerReader({
  style,
  props,
}: ColumnsContainerProps) {
  const { columns, ...restProps } = props ?? {};
  let cols = undefined;
  if (columns) {
    cols = columns.map((col) =>
      col.childrenIds.map((childId) => (
        <ReaderBlock key={childId} id={childId} />
      ))
    );
  }

  return (
    <BaseColumnsContainer props={restProps} columns={cols} style={style} />
  );
}

