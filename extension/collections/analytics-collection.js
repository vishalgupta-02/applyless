const analyticsCollectionExample = {
  _id: ObjectId,
  date: ISODate,

  totals: {
    jobsProcessed: Number,
    upgraded: Number,
    skipped: Number,
  },

  confidenceBuckets: {
    "0-20": Number,
    "21-40": Number,
    "41-60": Number,
    "61-80": Number,
    "81-100": Number,
  },

  fallback: {
    yes: Number,
    no: Number,
  },

  missingFields: {
    title: Number,
    company: Number,
    location: Number,
    posted: Number,
    description: Number,
  },

  avgTextLength: Number,
};
