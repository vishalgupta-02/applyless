const jobCollectionsExample = {
  _id: ObjectId,
  jobId: "1234567890", // LinkedIn job id
  url: "https://linkedin.com/jobs/view/123",

  data: {
    title: String | null,
    company: String | null,
    location: String | null,
    posted: String | null,
    description: String | null,
  },

  meta: {
    extractor: "v1" | "v2",
    confidence: Number, // 0–100
    fallbackUsed: Boolean,
    textLength: Number,
    scrapedAt: ISODate,
    migratedAt: ISODate, //Optional data - add this "?"
  },

  rawText: String, // document.body.innerText (CRITICAL)

  createdAt: ISODate,
  updatedAt: ISODate,
};
