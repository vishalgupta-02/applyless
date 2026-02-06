// migrations/migrate-jobs.js
import { fetchJobsBatch, saveUpgradedJob } from "./db-adapter.js";
import { saveAnalyticsSnapshot } from "./save-analytics.js";
import { reprocessRawText } from "./runner.js";
import { createAnalytics, recordAnalytics } from "./analytics.js";

async function migrateAll() {
  let cursor = null;
  const analytics = createAnalytics();

  while (true) {
    const { jobs, nextCursor } = await fetchJobsBatch(cursor);
    if (!jobs.length) break;

    for (const job of jobs) {
      const oldConfidence = job.meta?.confidence || 0;

      const result = await reprocessRawText(job.rawText, job.url);
      recordAnalytics(analytics, result);

      if (result.meta.confidence > oldConfidence) {
        analytics.upgraded++;
        await saveUpgradedJob(job, result);
      } else {
        analytics.skipped++;
      }
    }

    cursor = nextCursor;
    if (!cursor) break;
  }

  await saveAnalyticsSnapshot(analytics);
  console.log("✅ Migration + analytics saved");
}

migrateAll().catch(console.error);
