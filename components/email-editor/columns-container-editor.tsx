"use client";

import React from "react";

import EditorChildrenIds, {
  EditorChildrenChange,
} from "@/components/email-editor/editor-children-ids";
import { ColumnsContainer as BaseColumnsContainer } from "@/lib/blocks/columns-container";
import { useCurrentBlockId } from "@/lib/editor/EditorBlock";
import ColumnsContainerPropsSchema, {
  ColumnsContainerProps,
} from "@/lib/editor/columns-container-schema";
import {
  setDocument,
  setSelectedBlockId,
} from "@/lib/editor/editor-store";

const EMPTY_COLUMNS = [
  { childrenIds: [] },
  { childrenIds: [] },
  { childrenIds: [] },
];

export default function ColumnsContainerEditor({
  style,
  props,
}: ColumnsContainerProps) {
  const currentBlockId = useCurrentBlockId();

  const { columns, ...restProps } = props ?? {};
  const columnsValue = columns ?? EMPTY_COLUMNS;

  const updateColumn = (
    columnIndex: 0 | 1 | 2,
    { block, blockId, childrenIds }: EditorChildrenChange
  ) => {
    const nColumns = [...columnsValue];
    nColumns[columnIndex] = { childrenIds };
    setDocument({
      [blockId]: block,
      [currentBlockId]: {
        type: "ColumnsContainer",
        data: ColumnsContainerPropsSchema.parse({
          style,
          props: {
            ...restProps,
            columns: nColumns,
          },
        }),
      },
    });
    setSelectedBlockId(blockId);
  };

  return (
    <BaseColumnsContainer
      props={restProps}
      style={style}
      columns={[
        <EditorChildrenIds
          key={0}
          childrenIds={columns?.[0]?.childrenIds}
          onChange={(change) => updateColumn(0, change)}
        />,
        <EditorChildrenIds
          key={1}
          childrenIds={columns?.[1]?.childrenIds}
          onChange={(change) => updateColumn(1, change)}
        />,
        <EditorChildrenIds
          key={2}
          childrenIds={columns?.[2]?.childrenIds}
          onChange={(change) => updateColumn(2, change)}
        />,
      ]}
    />
  );
}

