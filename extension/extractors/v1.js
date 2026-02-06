export const extractorV1 = {
  version: "v1",

  async extract(ctx) {
    if (!ctx.url.includes("/jobs/view/")) {
      return {
        data: null,
        meta: {
          extractor: "v1",
          error: "Not a LinkedIn job page",
        },
      };
    }

    /* ---------- wait for company via MutationObserver ---------- */

    function waitForCompany(timeout = 10000) {
      return new Promise((resolve) => {
        const seen = new Set();

        function findCompany() {
          const links = document.querySelectorAll('a[href*="/company/"]');

          for (const a of links) {
            const name = a.innerText?.trim();

            if (
              name &&
              name.length > 1 &&
              name.length < 80 &&
              !seen.has(name) &&
              !/notification|premium|followers|linkedin/i.test(name)
            ) {
              return name;
            }
          }

          return null;
        }

        const immediate = findCompany();
        if (immediate) return resolve(immediate);

        const observer = new MutationObserver(() => {
          const company = findCompany();
          if (company) {
            observer.disconnect();
            resolve(company);
          }
        });

        observer.observe(document.body, {
          childList: true,
          subtree: true,
        });

        setTimeout(() => {
          observer.disconnect();
          resolve(null);
        }, timeout);
      });
    }

    /* ---------- extractors (UNCHANGED LOGIC) ---------- */

    function extractTitle() {
      return document.title
        .replace(/\s*\|\s*LinkedIn.*$/, "")
        .replace(/\s+at\s+.+$/i, "")
        .trim();
    }

    function extractLocation(text) {
      return (
        text.match(
          /(Remote|Hybrid|On[- ]?site|[A-Z][a-zA-Z]+,\s*[A-Z][a-zA-Z]+)/,
        )?.[0] || null
      );
    }

    function extractPosted(text) {
      return text.match(/(\d+)\s*(hour|day|week|month)s?\s*ago/i)?.[0] || null;
    }

    function extractDescription(text) {
      const i = text.indexOf("About the job");
      return i !== -1
        ? text
            .slice(i + 13)
            .split("Show less")[0]
            .slice(0, 5000)
            .trim()
        : null;
    }

    /* ---------- execution ---------- */

    const company = await waitForCompany();
    const text = document.body.innerText;

    const data = {
      title: extractTitle(),
      company,
      location: extractLocation(text),
      posted: extractPosted(text),
      description: extractDescription(text),
      url: ctx.url,
    };

    const meta = {
      extractor: "v1",
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
  if (job.company) score += 20;
  if (job.description) score += 30;
  if (job.location) score += 10;
  if (job.posted) score += 10;
  return score;
}
