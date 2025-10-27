"use client";

import React from "react";

import EditorChildrenIds from "@/components/email-editor/editor-children-ids";
import { Container as BaseContainer } from "@/lib/blocks/container";
import { useCurrentBlockId } from "@/lib/editor/EditorBlock";
import { ContainerProps } from "@/lib/editor/container-schema";
import {
  setDocument,
  setSelectedBlockId,
  useDocument,
} from "@/lib/editor/editor-store";

export default function ContainerEditor({ style, props }: ContainerProps) {
  const childrenIds = props?.childrenIds ?? [];

  const document = useDocument();
  const currentBlockId = useCurrentBlockId();

  return (
    <BaseContainer style={style}>
      <EditorChildrenIds
        childrenIds={childrenIds}
        onChange={({ block, blockId, childrenIds }) => {
          setDocument({
            [blockId]: block,
            [currentBlockId]: {
              type: "Container",
              data: {
                ...document[currentBlockId].data,
                props: { childrenIds: childrenIds },
              },
            },
          });
          setSelectedBlockId(blockId);
        }}
      />
    </BaseContainer>
  );
}
