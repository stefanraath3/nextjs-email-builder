"use client";

import { ArrowUp, ArrowDown, Trash2 } from "lucide-react";
import React from "react";

import { TEditorBlock } from "@/lib/editor/core";
import {
  resetDocument,
  setSelectedBlockId,
  useDocument,
} from "@/lib/editor/editor-store";

type TuneMenuProps = {
  blockId: string;
};

export default function TuneMenu({ blockId }: TuneMenuProps) {
  const document = useDocument();

  const handleDelete = () => {
    const filterChildrenIds = (childrenIds: string[] | null | undefined) => {
      if (!childrenIds) {
        return childrenIds;
      }
      return childrenIds.filter((f) => f !== blockId);
    };

    const nDocument: typeof document = { ...document };
    for (const [id, b] of Object.entries(nDocument)) {
      const block = b as TEditorBlock;
      if (id === blockId) {
        continue;
      }
      switch (block.type) {
        case "EmailLayout":
          nDocument[id] = {
            ...block,
            data: {
              ...block.data,
              childrenIds: filterChildrenIds(block.data.childrenIds),
            },
          };
          break;
        case "Container":
          nDocument[id] = {
            ...block,
            data: {
              ...block.data,
              props: {
                ...block.data.props,
                childrenIds: filterChildrenIds(block.data.props?.childrenIds),
              },
            },
          };
          break;
        case "ColumnsContainer": {
          const columnsData = block.data as {
            style?: {
              backgroundColor?: string | null;
              padding?: {
                top: number;
                bottom: number;
                right: number;
                left: number;
              } | null;
            } | null;
            props?: {
              columns?: Array<{ childrenIds: string[] }>;
              columnsCount?: number;
              columnsGap?: number;
              contentAlignment?: string;
              fixedWidths?: Array<number | null | undefined>;
            } | null;
          };
          nDocument[id] = {
            type: "ColumnsContainer",
            data: {
              style: columnsData.style,
              props: {
                ...columnsData.props,
                columns: columnsData.props?.columns?.map((c) => ({
                  childrenIds: filterChildrenIds(c.childrenIds),
                })),
              },
            },
          } as TEditorBlock;
          break;
        }
        default:
          nDocument[id] = block;
      }
    }
    delete nDocument[blockId];
    resetDocument(nDocument);
  };

  const handleMove = (direction: "up" | "down") => {
    const moveChildrenIds = (ids: string[] | null | undefined) => {
      if (!ids) {
        return ids;
      }
      const index = ids.indexOf(blockId);
      if (index < 0) {
        return ids;
      }
      const childrenIds = [...ids];
      if (direction === "up" && index > 0) {
        [childrenIds[index], childrenIds[index - 1]] = [
          childrenIds[index - 1],
          childrenIds[index],
        ];
      } else if (direction === "down" && index < childrenIds.length - 1) {
        [childrenIds[index], childrenIds[index + 1]] = [
          childrenIds[index + 1],
          childrenIds[index],
        ];
      }
      return childrenIds;
    };

    const nDocument: typeof document = { ...document };
    for (const [id, b] of Object.entries(nDocument)) {
      const block = b as TEditorBlock;
      if (id === blockId) {
        continue;
      }
      switch (block.type) {
        case "EmailLayout":
          nDocument[id] = {
            ...block,
            data: {
              ...block.data,
              childrenIds: moveChildrenIds(block.data.childrenIds),
            },
          };
          break;
        case "Container":
          nDocument[id] = {
            ...block,
            data: {
              ...block.data,
              props: {
                ...block.data.props,
                childrenIds: moveChildrenIds(block.data.props?.childrenIds),
              },
            },
          };
          break;
        case "ColumnsContainer": {
          const columnsData = block.data as {
            style?: {
              backgroundColor?: string | null;
              padding?: {
                top: number;
                bottom: number;
                right: number;
                left: number;
              } | null;
            } | null;
            props?: {
              columns?: Array<{ childrenIds: string[] }>;
              columnsCount?: number;
              columnsGap?: number;
              contentAlignment?: string;
              fixedWidths?: Array<number | null | undefined>;
            } | null;
          };
          nDocument[id] = {
            type: "ColumnsContainer",
            data: {
              style: columnsData.style,
              props: {
                ...columnsData.props,
                columns: columnsData.props?.columns?.map((c) => ({
                  childrenIds: moveChildrenIds(c.childrenIds),
                })),
              },
            },
          } as TEditorBlock;
          break;
        }
        default:
          nDocument[id] = block;
      }
    }

    resetDocument(nDocument);
    setSelectedBlockId(blockId);
  };

  return (
    <div
      className="absolute left-[-56px] top-0 z-50 flex flex-col gap-0 rounded-full bg-white px-2 py-3 shadow-lg"
      onClick={(ev) => ev.stopPropagation()}
    >
      <button
        onClick={() => handleMove("up")}
        className="flex h-8 w-8 items-center justify-center rounded-full text-gray-700 hover:bg-gray-100"
        title="Move up"
      >
        <ArrowUp className="h-4 w-4" />
      </button>
      <button
        onClick={() => handleMove("down")}
        className="flex h-8 w-8 items-center justify-center rounded-full text-gray-700 hover:bg-gray-100"
        title="Move down"
      >
        <ArrowDown className="h-4 w-4" />
      </button>
      <button
        onClick={handleDelete}
        className="flex h-8 w-8 items-center justify-center rounded-full text-gray-700 hover:bg-red-50 hover:text-red-600"
        title="Delete"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}
