// extractors/runner.js
import { extractorV2 } from "./v2.js";
import { extractorV1 } from "./v1.js";

const EXTRACTORS = [extractorV2, extractorV1];
const CONFIDENCE_THRESHOLD = 60;

export async function runExtraction(ctx) {
  let best = null;

  for (const extractor of EXTRACTORS) {
    const result = await extractor.extract(ctx);

    if (!best || result.meta.confidence > best.meta.confidence) {
      best = result;
    }

    if (result.meta.confidence >= CONFIDENCE_THRESHOLD) {
      return {
        ...result,
        meta: {
          ...result.meta,
          fallbackUsed: extractor.version !== "v2",
        },
      };
    }
  }

  return {
    ...best,
    meta: {
      ...best.meta,
      fallbackUsed: true,
    },
  };
}
