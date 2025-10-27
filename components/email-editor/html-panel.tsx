"use client";

import React, { useMemo } from "react";

import { renderToStaticMarkup } from "@/lib/email-builder";
import { useDocument } from "@/lib/editor/editor-store";

import HighlightedCodePanel from "./highlighted-code-panel";

export default function HtmlPanel() {
  const document = useDocument();
  const code = useMemo(
    () => renderToStaticMarkup(document, { rootBlockId: "root" }),
    [document]
  );
  return <HighlightedCodePanel type="html" value={code} />;
}

