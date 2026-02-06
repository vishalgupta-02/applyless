// migrations/runner.js
import { runExtraction } from "../../extractors/runner.js";

export async function reprocessRawText(rawText, url) {
  // Fake page context for Node
  global.document = {
    body: { innerText: rawText },
    title: rawText.split("\n")[0] || "",
  };
  global.location = { href: url };

  return await runExtraction({ url });
}
