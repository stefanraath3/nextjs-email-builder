import React from "react";

import { ServerReaderBlock } from "./server-reader";
import { type TReaderDocument } from "./schemas";

export async function renderToStaticMarkup(
  document: TReaderDocument,
  { rootBlockId }: { rootBlockId: string }
) {
  const { renderToStaticMarkup: baseRenderToStaticMarkup } = await import(
    "react-dom/server"
  );
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
  </head>
  <body>
    ${baseRenderToStaticMarkup(<ServerReaderBlock document={document} id={rootBlockId} />)}
  </body>
</html>`;
}
