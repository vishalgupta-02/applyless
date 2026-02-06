// migrations/db-adapter.js
import { connectDB } from "../../db/mongo.js";

export async function fetchJobsBatch(cursor, limit = 50) {
  const { jobs } = await connectDB();

  const query = cursor ? { _id: { $gt: cursor } } : {};

  const docs = await jobs.find(query).sort({ _id: 1 }).limit(limit).toArray();

  return {
    jobs: docs,
    nextCursor: docs.length ? docs[docs.length - 1]._id : null,
  };
}
