"use client";

import { Code, Edit, Eye, FileJson } from "lucide-react";
import React from "react";

import Reader from "@/lib/email-builder/reader";
import EditorBlock from "@/lib/editor/EditorBlock";
import {
  setSelectedMainTab,
  useDocument,
  useSelectedMainTab,
  useSelectedScreenSize,
} from "@/lib/editor/editor-store";

import HtmlPanel from "./html-panel";
import JsonPanel from "./json-panel";
import {
  DownloadJsonButton,
  ImportJsonButton,
  ScreenSizeToggle,
  ShareButton,
  ToggleInspectorPanelButton,
  ToggleSamplesPanelButton,
} from "./toolbar-controls";

const tabs = [
  { value: "editor", label: "Edit", icon: Edit },
  { value: "preview", label: "Preview", icon: Eye },
  { value: "html", label: "HTML", icon: Code },
  { value: "json", label: "JSON", icon: FileJson },
] as const;

export default function EditorCanvas() {
  const document = useDocument();
  const selectedMainTab = useSelectedMainTab();
  const selectedScreenSize = useSelectedScreenSize();

  const mainBoxClasses =
    selectedScreenSize === "mobile"
      ? "mx-auto my-8 h-[800px] w-[370px] shadow-lg"
      : "h-full";

  const renderMainPanel = () => {
    switch (selectedMainTab) {
      case "editor":
        return (
          <div className={mainBoxClasses}>
            <EditorBlock id="root" />
          </div>
        );
      case "preview":
        return (
          <div className={mainBoxClasses}>
            <Reader document={document} rootBlockId="root" />
          </div>
        );
      case "html":
        return <HtmlPanel />;
      case "json":
        return <JsonPanel />;
    }
  };

  return (
    <div className="flex h-screen flex-1 flex-col">
      {/* Toolbar */}
      <div className="sticky top-0 z-10 flex h-12 items-center justify-between border-b border-gray-200 bg-white px-2">
        <ToggleSamplesPanelButton />

        <div className="flex flex-1 items-center justify-between gap-4 px-4">
          {/* Main tabs */}
          <div className="flex gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.value}
                  onClick={() => setSelectedMainTab(tab.value)}
                  className={`
                    flex items-center gap-2 rounded px-3 py-1.5 text-sm font-medium transition-colors
                    ${
                      selectedMainTab === tab.value
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:bg-gray-100"
                    }
                  `}
                  title={tab.label}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <DownloadJsonButton />
            <ImportJsonButton />
            <ScreenSizeToggle />
            <ShareButton />
          </div>
        </div>

        <ToggleInspectorPanelButton />
      </div>

      {/* Main content area */}
      <div className="min-w-[370px] flex-1 overflow-auto">
        {renderMainPanel()}
      </div>
    </div>
  );
}
