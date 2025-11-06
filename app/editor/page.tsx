"use client";

import React from "react";

import EditorCanvas from "@/components/email-editor/editor-canvas";
import InspectorPanel from "@/components/email-editor/inspector-panel";
import TemplatesPanel from "@/components/email-editor/templates-panel";

export default function EditorPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <TemplatesPanel />
      <EditorCanvas />
      <InspectorPanel />
    </div>
  );
}
