import React from "react";
import { renderToStaticMarkup as baseRenderToStaticMarkup } from "react-dom/server";

import Reader from "./reader";
import { TReaderDocument } from "./schemas";

type TOptions = {
  rootBlockId: string;
};

export default function renderToStaticMarkup(
  document: TReaderDocument,
  { rootBlockId }: TOptions
) {
  return (
    "<!DOCTYPE html>" +
    baseRenderToStaticMarkup(
      <html>
        <body>
          <Reader document={document} rootBlockId={rootBlockId} />
        </body>
      </html>
    )
  );
}
