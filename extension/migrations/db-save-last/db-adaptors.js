// migrations/db-adapter.js
export async function saveUpgradedJob(job, newResult) {
  const { jobs, migrations } = await connectDB();

  await jobs.updateOne(
    { _id: job._id },
    {
      $set: {
        data: newResult.data,
        meta: newResult.meta,
        updatedAt: new Date(),
      },
    },
  );

  await migrations.insertOne({
    jobId: job.jobId,
    oldExtractor: job.meta.extractor,
    newExtractor: newResult.meta.extractor,
    oldConfidence: job.meta.confidence,
    newConfidence: newResult.meta.confidence,
    migratedAt: new Date(),
  });
}
