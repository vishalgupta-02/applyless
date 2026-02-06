// db/create-indexes.js
import { connectDB } from "./mongo.js";

export async function ensureIndexes() {
  const { jobs, analytics, migrations } = await connectDB();

  await jobs.createIndex({ jobId: 1 }, { unique: true });
  await jobs.createIndex({ "meta.extractor": 1 });
  await jobs.createIndex({ "meta.confidence": -1 });
  await jobs.createIndex({ createdAt: -1 });

  await analytics.createIndex({ date: -1 });

  await migrations.createIndex({ jobId: 1 });
  await migrations.createIndex({ migratedAt: -1 });
}
