"use client";

import { create } from "zustand";

import { TEditorConfiguration } from "./core";

type TValue = {
  document: TEditorConfiguration;

  selectedBlockId: string | null;
  selectedSidebarTab: "block-configuration" | "styles";
  selectedMainTab: "editor" | "preview" | "json" | "html";
  selectedScreenSize: "desktop" | "mobile";

  inspectorDrawerOpen: boolean;
  samplesDrawerOpen: boolean;

  // Track which AddBlockMenu popover is currently open (null = none open)
  openAddBlockMenuId: string | null;
};

const editorStateStore = create<TValue>(() => ({
  document: {
    root: {
      type: "EmailLayout",
      data: {
        backdropColor: "#F5F5F5",
        canvasColor: "#FFFFFF",
        textColor: "#262626",
        fontFamily: "MODERN_SANS",
        childrenIds: [],
      },
    },
  },
  selectedBlockId: null,
  selectedSidebarTab: "styles",
  selectedMainTab: "editor",
  selectedScreenSize: "desktop",

  inspectorDrawerOpen: true,
  samplesDrawerOpen: true,
  openAddBlockMenuId: null,
}));

export function useDocument() {
  return editorStateStore((s) => s.document);
}

export function useSelectedBlockId() {
  return editorStateStore((s) => s.selectedBlockId);
}

export function useSelectedScreenSize() {
  return editorStateStore((s) => s.selectedScreenSize);
}

export function useSelectedMainTab() {
  return editorStateStore((s) => s.selectedMainTab);
}

export function setSelectedMainTab(selectedMainTab: TValue["selectedMainTab"]) {
  return editorStateStore.setState({ selectedMainTab });
}

export function useSelectedSidebarTab() {
  return editorStateStore((s) => s.selectedSidebarTab);
}

export function useInspectorDrawerOpen() {
  return editorStateStore((s) => s.inspectorDrawerOpen);
}

export function useSamplesDrawerOpen() {
  return editorStateStore((s) => s.samplesDrawerOpen);
}

export function setSelectedBlockId(selectedBlockId: TValue["selectedBlockId"]) {
  const selectedSidebarTab =
    selectedBlockId === null ? "styles" : "block-configuration";
  const options: Partial<TValue> = {};
  if (selectedBlockId !== null) {
    options.inspectorDrawerOpen = true;
  }
  return editorStateStore.setState({
    selectedBlockId,
    selectedSidebarTab,
    ...options,
  });
}

export function setSidebarTab(
  selectedSidebarTab: TValue["selectedSidebarTab"]
) {
  return editorStateStore.setState({ selectedSidebarTab });
}

export function resetDocument(document: TValue["document"]) {
  return editorStateStore.setState({
    document,
    selectedSidebarTab: "styles",
    selectedBlockId: null,
  });
}

export function setDocument(document: TValue["document"]) {
  const originalDocument = editorStateStore.getState().document;
  return editorStateStore.setState({
    document: {
      ...originalDocument,
      ...document,
    },
  });
}

export function toggleInspectorDrawerOpen() {
  const inspectorDrawerOpen = !editorStateStore.getState().inspectorDrawerOpen;
  return editorStateStore.setState({ inspectorDrawerOpen });
}

export function toggleSamplesDrawerOpen() {
  const samplesDrawerOpen = !editorStateStore.getState().samplesDrawerOpen;
  return editorStateStore.setState({ samplesDrawerOpen });
}

export function setSelectedScreenSize(
  selectedScreenSize: TValue["selectedScreenSize"]
) {
  return editorStateStore.setState({ selectedScreenSize });
}

export function useOpenAddBlockMenuId() {
  return editorStateStore((s) => s.openAddBlockMenuId);
}

export function setOpenAddBlockMenuId(menuId: string | null) {
  return editorStateStore.setState({ openAddBlockMenuId: menuId });
}
