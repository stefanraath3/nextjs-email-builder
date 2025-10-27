"use client";

import React, { useMemo } from "react";

import { useDocument } from "@/lib/editor/editor-store";

import HighlightedCodePanel from "./highlighted-code-panel";

export default function JsonPanel() {
  const document = useDocument();
  const code = useMemo(() => JSON.stringify(document, null, 2), [document]);
  return <HighlightedCodePanel type="json" value={code} />;
}

