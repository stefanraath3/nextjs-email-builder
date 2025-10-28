"use client";

import {
  Box,
  Columns,
  Heading as HeadingIcon,
  Image as ImageIcon,
  Minus,
  Plus,
  Square,
  Text as TextIcon,
  UserCircle,
  Code,
  SmartphoneIcon as ButtonIcon,
} from "lucide-react";
import React, { useEffect, useState, useRef } from "react";

import { TEditorBlock } from "@/lib/editor/core";
import {
  useOpenAddBlockMenuId,
  setOpenAddBlockMenuId,
} from "@/lib/editor/editor-store";

type AddBlockMenuProps = {
  onSelect: (block: TEditorBlock) => void;
  placeholder?: boolean;
};

// Generate unique ID for each AddBlockMenu instance
let instanceCounter = 0;
function generateMenuId() {
  return `add-menu-${instanceCounter++}`;
}

type BlockOption = {
  label: string;
  icon: React.ReactNode;
  block: () => TEditorBlock;
};

const BLOCK_OPTIONS: BlockOption[] = [
  {
    label: "Heading",
    icon: <HeadingIcon className="h-4 w-4" />,
    block: () => ({
      type: "Heading",
      data: {
        props: { text: "Hello friend" },
        style: {
          padding: { top: 16, bottom: 16, left: 24, right: 24 },
        },
      },
    }),
  },
  {
    label: "Text",
    icon: <TextIcon className="h-4 w-4" />,
    block: () => ({
      type: "Text",
      data: {
        props: { text: "My new text block" },
        style: {
          padding: { top: 16, bottom: 16, left: 24, right: 24 },
          fontWeight: "normal",
        },
      },
    }),
  },
  {
    label: "Button",
    icon: <ButtonIcon className="h-4 w-4" />,
    block: () => ({
      type: "Button",
      data: {
        props: {
          text: "Button",
          url: "https://www.example.com",
        },
        style: { padding: { top: 16, bottom: 16, left: 24, right: 24 } },
      },
    }),
  },
  {
    label: "Image",
    icon: <ImageIcon className="h-4 w-4" />,
    block: () => ({
      type: "Image",
      data: {
        props: {
          url: "https://placehold.co/600x400@2x/F8F8F8/CCC?text=Your%20image",
          alt: "Sample image",
          contentAlignment: "middle",
          linkHref: null,
        },
        style: { padding: { top: 16, bottom: 16, left: 24, right: 24 } },
      },
    }),
  },
  {
    label: "Avatar",
    icon: <UserCircle className="h-4 w-4" />,
    block: () => ({
      type: "Avatar",
      data: {
        props: {
          imageUrl: "https://ui-avatars.com/api/?size=128",
          shape: "circle",
        },
        style: { padding: { top: 16, bottom: 16, left: 24, right: 24 } },
      },
    }),
  },
  {
    label: "Divider",
    icon: <Minus className="h-4 w-4" />,
    block: () => ({
      type: "Divider",
      data: {
        style: { padding: { top: 16, right: 0, bottom: 16, left: 0 } },
        props: {
          lineColor: "#CCCCCC",
        },
      },
    }),
  },
  {
    label: "Spacer",
    icon: <Square className="h-4 w-4" />,
    block: () => ({
      type: "Spacer",
      data: {},
    }),
  },
  {
    label: "Html",
    icon: <Code className="h-4 w-4" />,
    block: () => ({
      type: "Html",
      data: {
        props: { contents: "<strong>Hello world</strong>" },
        style: {
          fontSize: 16,
          textAlign: null,
          padding: { top: 16, bottom: 16, left: 24, right: 24 },
        },
      },
    }),
  },
  {
    label: "Columns",
    icon: <Columns className="h-4 w-4" />,
    block: () => ({
      type: "ColumnsContainer",
      data: {
        props: {
          columnsGap: 16,
          columnsCount: 3,
          columns: [
            { childrenIds: [] },
            { childrenIds: [] },
            { childrenIds: [] },
          ],
        },
        style: { padding: { top: 16, bottom: 16, left: 24, right: 24 } },
      },
    }),
  },
  {
    label: "Container",
    icon: <Box className="h-4 w-4" />,
    block: () => ({
      type: "Container",
      data: {
        style: { padding: { top: 16, bottom: 16, left: 24, right: 24 } },
      },
    }),
  },
];

export default function AddBlockMenu({
  onSelect,
  placeholder,
}: AddBlockMenuProps) {
  const [menuId] = useState(() => generateMenuId());
  const [visible, setVisible] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  const openMenuId = useOpenAddBlockMenuId();
  const isOpen = openMenuId === menuId;

  // Hover detection for non-placeholder buttons
  useEffect(() => {
    if (placeholder) return;

    function listener({ clientX, clientY }: MouseEvent) {
      // Don't show hover if ANY menu is open
      if (openMenuId !== null) {
        setVisible(false);
        return;
      }

      if (!buttonRef.current) {
        return;
      }
      const rect = buttonRef.current.getBoundingClientRect();
      const rectY = rect.y;
      const bottomX = rect.x;
      const topX = bottomX + rect.width;

      // Show if mouse is within 20px vertically of the divider
      if (Math.abs(clientY - rectY) < 20) {
        if (bottomX < clientX && clientX < topX) {
          setVisible(true);
          return;
        }
      }
      setVisible(false);
    }

    window.addEventListener("mousemove", listener);
    return () => {
      window.removeEventListener("mousemove", listener);
    };
  }, [placeholder, openMenuId]);

  const handleOpen = () => {
    setOpenAddBlockMenuId(menuId);
  };

  const handleClose = () => {
    setOpenAddBlockMenuId(null);
  };

  const handleSelect = (option: BlockOption) => {
    onSelect(option.block());
    handleClose();
  };

  // Placeholder button (always visible, for empty containers)
  if (placeholder) {
    return (
      <div className="relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (isOpen) {
              handleClose();
            } else {
              handleOpen();
            }
          }}
          className="flex h-12 w-full items-center justify-center bg-secondary hover:bg-bg-hover"
        >
          <div className="rounded-full bg-accent-primary p-0.5 text-primary-foreground">
            <Plus className="h-4 w-4" />
          </div>
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-100"
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
            />
            <div className="absolute left-1/2 top-full z-101 mt-2 w-64 -translate-x-1/2 rounded-lg border border-border bg-popover shadow-xl">
              <div className="p-2">
                <p className="mb-2 px-2 text-xs font-semibold text-text-tertiary">
                  ADD BLOCK
                </p>
                <div className="grid grid-cols-2 gap-2 p-1">
                  {BLOCK_OPTIONS.map((option) => (
                    <button
                      key={option.label}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelect(option);
                      }}
                      className="flex flex-col items-center gap-2 rounded-lg border border-border p-3 text-center text-sm text-foreground hover:border-accent-primary hover:bg-accent-bg"
                    >
                      <div className="text-foreground">{option.icon}</div>
                      <span className="text-xs text-foreground">
                        {option.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  // Divider button (only visible on hover when NO menu is open)
  return (
    <div ref={buttonRef} className="relative" style={{ position: "relative" }}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (isOpen) {
            handleClose();
          } else {
            handleOpen();
          }
        }}
        className={`
          absolute left-1/2 top-[-12px] z-50 -translate-x-1/2 rounded-full p-0.5 transition-opacity
          ${visible || isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
          bg-accent-primary text-primary-foreground shadow-md hover:bg-accent-hover
        `}
      >
        <Plus className="h-4 w-4" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-100"
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
          />
          <div className="absolute left-1/2 top-2 z-101 w-64 -translate-x-1/2 rounded-lg border border-border bg-popover shadow-xl">
            <div className="p-2">
              <p className="mb-2 px-2 text-xs font-semibold text-text-tertiary">
                ADD BLOCK
              </p>
              <div className="grid grid-cols-2 gap-2 p-1">
                {BLOCK_OPTIONS.map((option) => (
                  <button
                    key={option.label}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(option);
                    }}
                    className="flex flex-col items-center gap-2 rounded-lg border border-border p-3 text-center text-sm text-foreground hover:border-accent-primary hover:bg-accent-bg"
                  >
                    <div className="text-foreground">{option.icon}</div>
                    <span className="text-xs text-foreground">
                      {option.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
