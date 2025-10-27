import React from "react";

import { Container as BaseContainer } from "@/lib/blocks/container";
import { ContainerProps } from "@/lib/editor/container-schema";

import { ReaderBlock } from "./reader";

export default function ContainerReader({ style, props }: ContainerProps) {
  const childrenIds = props?.childrenIds ?? [];
  return (
    <BaseContainer style={style}>
      {childrenIds.map((childId) => (
        <ReaderBlock key={childId} id={childId} />
      ))}
    </BaseContainer>
  );
}

