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
      className="h-screen border-l border-gray-200 bg-white"
      style={{ width: INSPECTOR_DRAWER_WIDTH }}
    >
      <div className="flex h-12 items-center border-b border-gray-200 px-4">
        <div className="flex gap-1">
          <button
            onClick={() => setSidebarTab("styles")}
            className={`
              rounded-md px-3 py-1.5 text-sm font-medium transition-colors
              ${
                selectedSidebarTab === "styles"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100"
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
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100"
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

