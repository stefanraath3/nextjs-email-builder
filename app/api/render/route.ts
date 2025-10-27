import { NextResponse } from "next/server";

import { renderToStaticMarkup } from "@/lib/email-builder";

export async function POST(req: Request) {
  try {
    const { document } = await req.json();

    if (!document || typeof document !== "object") {
      return NextResponse.json(
        { error: "Invalid document format" },
        { status: 400 }
      );
    }

    const html = renderToStaticMarkup(document, { rootBlockId: "root" });

    return NextResponse.json({ html });
  } catch (error) {
    console.error("Error rendering email:", error);
    return NextResponse.json(
      { error: "Failed to render email" },
      { status: 500 }
    );
  }
}

