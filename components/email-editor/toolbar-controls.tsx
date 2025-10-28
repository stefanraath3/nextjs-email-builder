"use client";

import {
  Download,
  Upload,
  Share2,
  Monitor,
  Smartphone,
  Menu,
  PanelRightClose,
} from "lucide-react";
import React, { useMemo, useState } from "react";

import validateJsonStringValue from "@/lib/utils/validate-json";
import {
  resetDocument,
  setSelectedScreenSize,
  toggleInspectorDrawerOpen,
  toggleSamplesDrawerOpen,
  useDocument,
  useSelectedScreenSize,
} from "@/lib/editor/editor-store";

export function DownloadJsonButton() {
  const doc = useDocument();
  const href = useMemo(() => {
    return `data:text/plain,${encodeURIComponent(JSON.stringify(doc, null, 2))}`;
  }, [doc]);

  return (
    <a
      href={href}
      download="emailTemplate.json"
      className="flex h-8 w-8 items-center justify-center rounded hover:bg-bg-hover"
      title="Download JSON"
    >
      <Download className="h-4 w-4" />
    </a>
  );
}

export function ImportJsonButton() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (v: string) => {
    setValue(v);
    const { error } = validateJsonStringValue(v);
    setError(error ?? null);
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const { error, data } = validateJsonStringValue(value);
    setError(error ?? null);
    if (!data) {
      return;
    }
    resetDocument(data);
    setOpen(false);
    setValue("");
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex h-8 w-8 items-center justify-center rounded hover:bg-bg-hover"
        title="Import JSON"
      >
        <Upload className="h-4 w-4" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-2xl rounded-lg bg-popover shadow-xl">
            <div className="border-b border-border px-6 py-4">
              <h2 className="text-xl font-semibold">Import JSON</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6">
                <p className="mb-4 text-sm text-text-secondary">
                  Copy and paste an EmailBuilder.js JSON template.
                </p>
                {error && (
                  <div className="mb-4 rounded border border-danger/20 bg-danger-bg p-3 text-sm text-danger">
                    {error}
                  </div>
                )}
                <textarea
                  value={value}
                  onChange={(e) => handleChange(e.target.value)}
                  rows={10}
                  className="w-full rounded border border-input p-3 text-sm font-mono focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
                  placeholder='{"root": {...}}'
                />
                <p className="mt-2 text-xs text-text-tertiary">
                  This will override your current template.
                </p>
              </div>
              <div className="flex justify-end gap-2 border-t border-border px-6 py-4">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded px-4 py-2 text-sm hover:bg-bg-hover"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={error !== null}
                  className="rounded bg-accent-primary px-4 py-2 text-sm text-primary-foreground hover:bg-accent-hover disabled:bg-muted disabled:cursor-not-allowed"
                >
                  Import
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export function ShareButton() {
  const document = useDocument();
  const [message, setMessage] = useState<string | null>(null);

  const onClick = async () => {
    const c = encodeURIComponent(JSON.stringify(document));
    location.hash = `#code/${btoa(c)}`;
    setMessage("URL updated - copy it to share your template!");
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <>
      <button
        onClick={onClick}
        className="flex h-8 w-8 items-center justify-center rounded hover:bg-bg-hover"
        title="Share"
      >
        <Share2 className="h-4 w-4" />
      </button>

      {message && (
        <div className="fixed top-4 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-bg-tertiary px-6 py-3 text-foreground shadow-lg border border-border">
          {message}
        </div>
      )}
    </>
  );
}

export function ScreenSizeToggle() {
  const selectedScreenSize = useSelectedScreenSize();

  return (
    <div className="inline-flex rounded-md shadow-sm" role="group">
      <button
        type="button"
        onClick={() => setSelectedScreenSize("desktop")}
        className={`
          flex h-8 items-center justify-center px-3
          border border-input first:rounded-l-md
          hover:bg-bg-hover
          ${selectedScreenSize === "desktop" ? "bg-accent-primary text-primary-foreground border-accent-primary" : "bg-background"}
        `}
        title="Desktop view"
      >
        <Monitor className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => setSelectedScreenSize("mobile")}
        className={`
          flex h-8 items-center justify-center px-3
          border border-input last:rounded-r-md
          hover:bg-bg-hover
          ${selectedScreenSize === "mobile" ? "bg-accent-primary text-primary-foreground border-accent-primary" : "bg-background"}
        `}
        title="Mobile view"
      >
        <Smartphone className="h-4 w-4" />
      </button>
    </div>
  );
}

export function ToggleSamplesPanelButton() {
  return (
    <button
      onClick={toggleSamplesDrawerOpen}
      className="flex h-8 w-8 items-center justify-center rounded hover:bg-bg-hover"
      title="Toggle templates panel"
    >
      <Menu className="h-5 w-5" />
    </button>
  );
}

export function ToggleInspectorPanelButton() {
  return (
    <button
      onClick={toggleInspectorDrawerOpen}
      className="flex h-8 w-8 items-center justify-center rounded hover:bg-bg-hover"
      title="Toggle inspector panel"
    >
      <PanelRightClose className="h-5 w-5" />
    </button>
  );
}
