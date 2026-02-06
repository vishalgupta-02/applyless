// migrations/migrate-jobs.js
import { reprocessRawText } from "../runner.js";
import { createAnalytics, recordAnalytics } from "./analytics.js";

/* ---------------- DB ADAPTERS ---------------- */

/**
 * Replace these with real DB calls.
 * Mongo / SQL / Firebase / file — doesn’t matter.
 */

async function fetchJobsBatch(cursor, limit = 50) {
  // Example stub
  return {
    jobs: [], // [{ id, rawText, data, meta, url }]
    nextCursor: null,
  };
}

async function saveUpgradedJob(jobId, payload) {
  // Example stub
  console.log(`✅ Upgraded job ${jobId}`);
}

/* ---------------- MIGRATION ---------------- */

async function migrateAllJobs() {
  let cursor = null;
  const analytics = createAnalytics();

  while (true) {
    const { jobs, nextCursor } = await fetchJobsBatch(cursor);
    if (!jobs.length) break;

    for (const job of jobs) {
      const oldConfidence = job.meta?.confidence || 0;

      const result = await reprocessRawText(job.rawText, job.url);
      recordAnalytics(analytics, result);

      const newConfidence = result.meta.confidence;

      if (newConfidence > oldConfidence) {
        analytics.upgraded++;

        await saveUpgradedJob(job.id, {
          data: result.data,
          meta: {
            ...result.meta,
            previousExtractor: job.meta.extractor,
            migratedAt: new Date().toISOString(),
          },
        });
      } else {
        analytics.skipped++;
      }
    }

    cursor = nextCursor;
    if (!cursor) break;
  }

  printAnalytics(analytics);
}

/* ---------------- REPORTING ---------------- */

function printAnalytics(a) {
  console.log("\n📊 MIGRATION ANALYTICS\n");

  console.log("Total jobs processed:", a.total);
  console.log("Upgraded:", a.upgraded);
  console.log("Skipped:", a.skipped);

  console.log("\nConfidence distribution:");
  console.table(a.confidenceBuckets);

  console.log("\nFallback usage:");
  console.table(a.fallbackUsed);

  console.log("\nMissing field frequency:");
  console.table(a.missingFields);

  const avgText =
    a.textLength.reduce((s, v) => s + v, 0) / (a.textLength.length || 1);

  console.log("\nAverage text length:", Math.round(avgText));
}

/* ---------------- RUN ---------------- */

migrateAllJobs().catch(console.error);
