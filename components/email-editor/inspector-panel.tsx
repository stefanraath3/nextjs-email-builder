"use client";

import React from "react";

import {
  setSidebarTab,
  useInspectorDrawerOpen,
  useSelectedSidebarTab,
} from "@/lib/editor/editor-store";

import ConfigurationPanel from "./configuration-panel";
import StylesPanel from "./styles-panel";

export const INSPECTOR_DRAWER_WIDTH = 320;

export default function InspectorPanel() {
  const selectedSidebarTab = useSelectedSidebarTab();
  const inspectorDrawerOpen = useInspectorDrawerOpen();

  const renderCurrentSidebarPanel = () => {
    switch (selectedSidebarTab) {
      case "block-configuration":
        return <ConfigurationPanel />;
      case "styles":
        return <StylesPanel />;
    }
  };

  if (!inspectorDrawerOpen) {
    return null;
  }

  return (
    <div
      className="h-screen border-l border-border bg-background"
      style={{ width: INSPECTOR_DRAWER_WIDTH }}
    >
      <div className="flex h-12 items-center border-b border-border px-4">
        <div className="flex gap-1">
          <button
            onClick={() => setSidebarTab("styles")}
            className={`
              rounded-md px-3 py-1.5 text-sm font-medium transition-colors
              ${
                selectedSidebarTab === "styles"
                  ? "bg-accent-bg text-accent-primary"
                  : "text-text-secondary hover:bg-bg-hover"
              }
            `}
          >
            Styles
          </button>
          <button
            onClick={() => setSidebarTab("block-configuration")}
            className={`
              rounded-md px-3 py-1.5 text-sm font-medium transition-colors
              ${
                selectedSidebarTab === "block-configuration"
                  ? "bg-accent-bg text-accent-primary"
                  : "text-text-secondary hover:bg-bg-hover"
              }
            `}
          >
            Inspect
          </button>
        </div>
      </div>
      <div className="h-[calc(100vh-3rem)] overflow-auto">
        {renderCurrentSidebarPanel()}
      </div>
    </div>
  );
}

