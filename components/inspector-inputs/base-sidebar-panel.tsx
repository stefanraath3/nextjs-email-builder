import React from "react";

type BaseSidebarPanelProps = {
  title: string;
  children: React.ReactNode;
};

export default function BaseSidebarPanel({
  title,
  children,
}: BaseSidebarPanelProps) {
  return (
    <div className="p-4">
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
        {title}
      </h3>
      <div className="space-y-6">{children}</div>
    </div>
  );
}
