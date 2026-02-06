// migrations/analytics.js
export function createAnalytics() {
  return {
    total: 0,
    upgraded: 0,
    skipped: 0,

    confidenceBuckets: {
      "0-20": 0,
      "21-40": 0,
      "41-60": 0,
      "61-80": 0,
      "81-100": 0,
    },

    fallbackUsed: {
      yes: 0,
      no: 0,
    },

    missingFields: {
      title: 0,
      company: 0,
      location: 0,
      posted: 0,
      description: 0,
    },

    textLength: [],
  };
}

export function recordAnalytics(analytics, result) {
  analytics.total++;

  const { meta, data } = result;

  // Confidence distribution
  const c = meta.confidence;
  if (c <= 20) analytics.confidenceBuckets["0-20"]++;
  else if (c <= 40) analytics.confidenceBuckets["21-40"]++;
  else if (c <= 60) analytics.confidenceBuckets["41-60"]++;
  else if (c <= 80) analytics.confidenceBuckets["61-80"]++;
  else analytics.confidenceBuckets["81-100"]++;

  // Fallback rate
  meta.fallbackUsed
    ? analytics.fallbackUsed.yes++
    : analytics.fallbackUsed.no++;

  // Missing field frequency
  for (const key of Object.keys(analytics.missingFields)) {
    if (!data[key]) analytics.missingFields[key]++;
  }

  // Text length trend
  analytics.textLength.push(meta.textLength || 0);
}
