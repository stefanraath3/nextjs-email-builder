"use client";

import { Trash2 } from "lucide-react";
import React from "react";

import { setDocument, useDocument } from "@/lib/editor/editor-store";

type TuneMenuProps = {
  blockId: string;
};

export default function TuneMenu({ blockId }: TuneMenuProps) {
  const document = useDocument();

  const handleDelete = () => {
    // Remove the block from the document
    const newDocument = { ...document };
    delete newDocument[blockId];

    // Also need to remove references from parent blocks
    // This is a simplified version - in production you'd want to find the parent
    // and remove the blockId from its childrenIds array
    Object.keys(newDocument).forEach((key) => {
      const block = newDocument[key];
      if (block.type === "EmailLayout" || block.type === "Container") {
        const childrenIds = (block.data as any).childrenIds;
        if (childrenIds && Array.isArray(childrenIds)) {
          (block.data as any).childrenIds = childrenIds.filter(
            (id: string) => id !== blockId
          );
        }
      }
      if (block.type === "ColumnsContainer") {
        const columns = (block.data as any).props?.columns;
        if (columns && Array.isArray(columns)) {
          columns.forEach((column: any) => {
            if (column.childrenIds && Array.isArray(column.childrenIds)) {
              column.childrenIds = column.childrenIds.filter(
                (id: string) => id !== blockId
              );
            }
          });
        }
      }
    });

    setDocument(newDocument);
  };

  return (
    <div className="absolute -top-8 right-0 z-10 flex items-center gap-1 rounded-md border border-gray-200 bg-white p-1 shadow-lg">
      <button
        onClick={handleDelete}
        className="flex h-7 w-7 items-center justify-center rounded hover:bg-red-50 hover:text-red-600"
        title="Delete block"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}
