import hljs from "highlight.js/lib/core";
import json from "highlight.js/lib/languages/json";
import xml from "highlight.js/lib/languages/xml";
import prettier from "prettier/standalone";
import prettierPluginEstree from "prettier/plugins/estree";
import prettierPluginHtml from "prettier/plugins/html";

hljs.registerLanguage("json", json);
hljs.registerLanguage("html", xml);

export async function highlightHtml(value: string): Promise<string> {
  try {
    const prettyValue = await prettier.format(value, {
      parser: "html",
      plugins: [prettierPluginHtml, prettierPluginEstree],
    });
    return hljs.highlight(prettyValue, { language: "html" }).value;
  } catch (e) {
    // If formatting fails, just highlight without formatting
    return hljs.highlight(value, { language: "html" }).value;
  }
}

export async function highlightJson(value: string): Promise<string> {
  try {
    const prettyValue = await prettier.format(value, {
      parser: "json",
      plugins: [prettierPluginHtml, prettierPluginEstree],
    });
    return hljs.highlight(prettyValue, { language: "json" }).value;
  } catch (e) {
    // If formatting fails, just highlight without formatting
    return hljs.highlight(value, { language: "json" }).value;
  }
}
