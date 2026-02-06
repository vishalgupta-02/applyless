// migrations/save-analytics.js
import { connectDB } from "../db/mongo.js";

export async function saveAnalyticsSnapshot(analytics) {
  const { analytics: collection } = await connectDB();

  const avgText =
    analytics.textLength.reduce((s, v) => s + v, 0) /
    (analytics.textLength.length || 1);

  await collection.insertOne({
    date: new Date(),

    totals: {
      jobsProcessed: analytics.total,
      upgraded: analytics.upgraded,
      skipped: analytics.skipped,
    },

    confidenceBuckets: analytics.confidenceBuckets,
    fallback: analytics.fallbackUsed,
    missingFields: analytics.missingFields,
    avgTextLength: Math.round(avgText),
  });
}
