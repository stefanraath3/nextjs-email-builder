"use client";

import React from "react";

import AvatarSidebarPanel from "@/components/inspector-inputs/panels/avatar-sidebar-panel";
import ButtonSidebarPanel from "@/components/inspector-inputs/panels/button-sidebar-panel";
import ColumnsContainerSidebarPanel from "@/components/inspector-inputs/panels/columns-container-sidebar-panel";
import ContainerSidebarPanel from "@/components/inspector-inputs/panels/container-sidebar-panel";
import DividerSidebarPanel from "@/components/inspector-inputs/panels/divider-sidebar-panel";
import EmailLayoutSidebarPanel from "@/components/inspector-inputs/panels/email-layout-sidebar-panel";
import HeadingSidebarPanel from "@/components/inspector-inputs/panels/heading-sidebar-panel";
import HtmlSidebarPanel from "@/components/inspector-inputs/panels/html-sidebar-panel";
import ImageSidebarPanel from "@/components/inspector-inputs/panels/image-sidebar-panel";
import SpacerSidebarPanel from "@/components/inspector-inputs/panels/spacer-sidebar-panel";
import TextSidebarPanel from "@/components/inspector-inputs/panels/text-sidebar-panel";
import { TEditorBlock } from "@/lib/editor/core";
import {
  setDocument,
  useDocument,
  useSelectedBlockId,
} from "@/lib/editor/editor-store";

function renderMessage(val: string) {
  return (
    <div className="m-6 border border-dashed border-gray-300 p-4">
      <p className="text-sm text-gray-500">{val}</p>
    </div>
  );
}

export default function ConfigurationPanel() {
  const document = useDocument();
  const selectedBlockId = useSelectedBlockId();

  if (!selectedBlockId) {
    return renderMessage("Click on a block to inspect.");
  }
  const block = document[selectedBlockId];
  if (!block) {
    return renderMessage(
      `Block with id ${selectedBlockId} was not found. Click on a block to reset.`
    );
  }

  const setBlock = (conf: TEditorBlock) =>
    setDocument({ [selectedBlockId]: conf });
  const { data, type } = block;

  switch (type) {
    case "Avatar":
      return (
        <AvatarSidebarPanel
          key={selectedBlockId}
          data={data}
          setData={(data) => setBlock({ type, data })}
        />
      );
    case "Button":
      return (
        <ButtonSidebarPanel
          key={selectedBlockId}
          data={data}
          setData={(data) => setBlock({ type, data })}
        />
      );
    case "ColumnsContainer":
      return (
        <ColumnsContainerSidebarPanel
          key={selectedBlockId}
          data={data}
          setData={(data) => setBlock({ type, data })}
        />
      );
    case "Container":
      return (
        <ContainerSidebarPanel
          key={selectedBlockId}
          data={data}
          setData={(data) => setBlock({ type, data })}
        />
      );
    case "Divider":
      return (
        <DividerSidebarPanel
          key={selectedBlockId}
          data={data}
          setData={(data) => setBlock({ type, data })}
        />
      );
    case "Heading":
      return (
        <HeadingSidebarPanel
          key={selectedBlockId}
          data={data}
          setData={(data) => setBlock({ type, data })}
        />
      );
    case "Html":
      return (
        <HtmlSidebarPanel
          key={selectedBlockId}
          data={data}
          setData={(data) => setBlock({ type, data })}
        />
      );
    case "Image":
      return (
        <ImageSidebarPanel
          key={selectedBlockId}
          data={data}
          setData={(data) => setBlock({ type, data })}
        />
      );
    case "EmailLayout":
      return (
        <EmailLayoutSidebarPanel
          key={selectedBlockId}
          data={data}
          setData={(data) => setBlock({ type, data })}
        />
      );
    case "Spacer":
      return (
        <SpacerSidebarPanel
          key={selectedBlockId}
          data={data}
          setData={(data) => setBlock({ type, data })}
        />
      );
    case "Text":
      return (
        <TextSidebarPanel
          key={selectedBlockId}
          data={data}
          setData={(data) => setBlock({ type, data })}
        />
      );
    default:
      return <pre className="p-4">{JSON.stringify(block, null, 2)}</pre>;
  }
}

