"use client";

import React, { useEffect, useState } from "react";

import { highlightHtml, highlightJson } from "@/lib/utils/highlighters";

type HighlightedCodePanelProps = {
  type: "json" | "html";
  value: string;
};

export default function HighlightedCodePanel({
  type,
  value,
}: HighlightedCodePanelProps) {
  const [code, setCode] = useState<string | null>(null);

  useEffect(() => {
    switch (type) {
      case "html":
        highlightHtml(value).then(setCode);
        return;
      case "json":
        highlightJson(value).then(setCode);
        return;
    }
  }, [value, type]);

  if (code === null) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-text-secondary">Loading...</p>
      </div>
    );
  }

  return (
    <pre
      className="m-0 cursor-pointer overflow-x-auto p-4 text-xs whitespace-pre-wrap break-all bg-background text-foreground"
      style={{ maxWidth: "100%", overflowWrap: "break-word" }}
      dangerouslySetInnerHTML={{ __html: code }}
      onClick={(ev) => {
        const s = window.getSelection();
        if (s === null) {
          return;
        }
        s.selectAllChildren(ev.currentTarget);
      }}
    />
  );
}
