// extractors/v2.js
export const extractorV2 = {
  version: "v2",

  async extract(ctx) {
    if (!ctx.url.includes("/jobs/view/")) {
      return {
        data: null,
        meta: {
          extractor: "v2",
          error: "Not a LinkedIn job page",
        },
      };
    }

    const text = document.body.innerText;
    const lines = text
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    /* ---------- title ---------- */

    function extractTitle() {
      return document.title
        .replace(/\s*\|\s*LinkedIn.*$/, "")
        .replace(/\s+at\s+.+$/i, "")
        .trim();
    }

    /* ---------- improved company extraction ---------- */

    function extractCompany(title) {
      const titleIndex = lines.indexOf(title);
      if (titleIndex === -1) return null;

      const candidates = lines.slice(titleIndex + 1, titleIndex + 6);

      for (const c of candidates) {
        if (
          c.length > 1 &&
          c.length < 80 &&
          !/remote|hybrid|onsite|followers|applicants|ago/i.test(c)
        ) {
          return c;
        }
      }

      return null;
    }

    /* ---------- improved description extraction ---------- */

    function extractDescription() {
      const markers = [
        "About the job",
        "Job description",
        "What you will do",
        "Responsibilities",
        "The role",
      ];

      for (const m of markers) {
        const idx = text.indexOf(m);
        if (idx !== -1) {
          return text
            .slice(idx + m.length)
            .split("Show less")[0]
            .slice(0, 6000)
            .trim();
        }
      }

      return null;
    }

    /* ---------- unchanged helpers ---------- */

    function extractLocation() {
      return (
        text.match(
          /(Remote|Hybrid|On[- ]?site|[A-Z][a-zA-Z]+,\s*[A-Z][a-zA-Z]+)/,
        )?.[0] || null
      );
    }

    function extractPosted() {
      return text.match(/(\d+)\s*(hour|day|week|month)s?\s*ago/i)?.[0] || null;
    }

    /* ---------- execution ---------- */

    const title = extractTitle();

    const data = {
      title,
      company: extractCompany(title),
      location: extractLocation(),
      posted: extractPosted(),
      description: extractDescription(),
      url: ctx.url,
    };

    const meta = {
      extractor: "v2",
      confidence: confidenceScore(data),
      textLength: text.length,
      scrapedAt: new Date().toISOString(),
    };

    return { data, meta };
  },
};

/* ---------- confidence scoring ---------- */

function confidenceScore(job) {
  let score = 0;
  if (job.title) score += 30;
  if (job.company) score += 25; // v2 focuses on company
  if (job.description) score += 30;
  if (job.location) score += 10;
  if (job.posted) score += 5;
  return score;
}
