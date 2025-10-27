"use client";

import React from "react";

import EmailLayoutSidebarPanel from "@/components/inspector-inputs/panels/email-layout-sidebar-panel";
import { setDocument, useDocument } from "@/lib/editor/editor-store";

export default function StylesPanel() {
  const block = useDocument().root;
  if (!block) {
    return <p className="p-4 text-sm text-gray-500">Block not found</p>;
  }

  const { data, type } = block;
  if (type !== "EmailLayout") {
    throw new Error('Expected "root" element to be of type EmailLayout');
  }

  return (
    <EmailLayoutSidebarPanel
      key="root"
      data={data}
      setData={(data) => setDocument({ root: { type, data } })}
    />
  );
}

