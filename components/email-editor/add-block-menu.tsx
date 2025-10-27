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
import React, { useState } from "react";

import { TEditorBlock } from "@/lib/editor/core";

type AddBlockMenuProps = {
  onSelect: (block: TEditorBlock) => void;
  placeholder?: boolean;
};

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
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: BlockOption) => {
    onSelect(option.block());
    setIsOpen(false);
  };

  if (placeholder) {
    return (
      <div className="group flex min-h-[100px] items-center justify-center border-2 border-dashed border-gray-200 bg-gray-50 transition-colors hover:border-blue-400 hover:bg-blue-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative rounded-full bg-blue-500 p-2 text-white shadow-lg transition-transform hover:scale-110 hover:bg-blue-600"
        >
          <Plus className="h-5 w-5" />
          {isOpen && (
            <div className="absolute left-0 top-full z-50 mt-2 w-64 rounded-lg border border-gray-200 bg-white shadow-xl">
              <div className="p-2">
                <p className="mb-2 px-2 text-xs font-semibold text-gray-500">
                  ADD BLOCK
                </p>
                <div className="max-h-96 overflow-y-auto">
                  {BLOCK_OPTIONS.map((option) => (
                    <button
                      key={option.label}
                      onClick={() => handleSelect(option)}
                      className="flex w-full items-center gap-3 rounded px-3 py-2 text-left text-sm hover:bg-gray-100"
                    >
                      {option.icon}
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="group relative flex items-center justify-center py-1">
      <div className="h-px w-full bg-gray-200 group-hover:bg-blue-400" />
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute rounded-full bg-white p-1.5 text-gray-400 shadow-md ring-1 ring-gray-200 transition-all hover:bg-blue-500 hover:text-white hover:ring-blue-500"
      >
        <Plus className="h-3 w-3" />
        {isOpen && (
          <div className="absolute left-1/2 top-full z-50 mt-2 w-64 -translate-x-1/2 rounded-lg border border-gray-200 bg-white shadow-xl">
            <div className="p-2">
              <p className="mb-2 px-2 text-xs font-semibold text-gray-500">
                ADD BLOCK
              </p>
              <div className="max-h-96 overflow-y-auto">
                {BLOCK_OPTIONS.map((option) => (
                  <button
                    key={option.label}
                    onClick={() => handleSelect(option)}
                    className="flex w-full items-center gap-3 rounded px-3 py-2 text-left text-sm hover:bg-gray-100"
                  >
                    {option.icon}
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </button>
    </div>
  );
}
