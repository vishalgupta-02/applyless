// db/mongo.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

export async function connectDB() {
  if (!client.topology?.isConnected()) {
    await client.connect();
  }

  const db = client.db("linkedin_scraper");

  return {
    jobs: db.collection("jobs"),
    analytics: db.collection("analytics_snapshots"),
    migrations: db.collection("migration_logs"),
  };
}
