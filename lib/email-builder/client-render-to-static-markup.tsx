"use client";
import React from "react";
import { renderToStaticMarkup as baseRenderToStaticMarkup } from "react-dom/server";

import Reader from "./reader";
import { type TReaderDocument } from "./schemas";

export function renderToStaticMarkup(
  document: TReaderDocument,
  { rootBlockId }: { rootBlockId: string }
) {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
  </head>
  <body>
    ${baseRenderToStaticMarkup(<Reader document={document} rootBlockId={rootBlockId} />)}
  </body>
</html>`;
}
