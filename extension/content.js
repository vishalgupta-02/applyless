// This runs on LinkedIn job pages
console.log("🚀 Chrono Extension Loaded!");

// Check if we're on a job page
console.log("Current URL:", window.location.href);

// Let's see if we can find the job title
// const jobTitle = document.title.replace(/\s*\|.*$/, "").trim();
// console.log("Job Title:", jobTitle);

// const jobId = window.location.href.match(/\/jobs\/view\/(\d+)/)?.[1];
// console.log("Job Id", jobId);

// const jobDescription = [...document.querySelectorAll("div")].find((d) =>
//   d.innerText.includes("About the job"),
// )?.innerText;
// console.log("Job Description: ", jobDescription);

// const jobLink = window.location.href;
// console.log("Job Link: ", jobLink);

// const jobLocation = [...document.querySelectorAll("span")]
//   .find((s) => s.innerText.includes(",") && s.innerText.length < 60)
//   ?.innerText?.trim();
// console.log("Job Location: ", jobLocation);

// const jobPosted = [...document.querySelectorAll("span")]
//   .find((s) => /day|week|hour|month/i.test(s.innerText))
//   ?.innerText?.trim();
// console.log("Job Posted:", jobPosted);

// const company = document.querySelector('a[href*="/company/"]')?.innerText;
// console.log("Company found: ", company);

(function scrapeLinkedInJob() {
  // Guard: only run on job pages
  if (!location.pathname.includes("/jobs/view/")) {
    console.warn("Not a LinkedIn job page");
    return null;
  }

  // --- JOB ID (stable) ---
  const jobId =
    location.href.match(/\/jobs\/view\/(\d+)/)?.[1] ||
    location.href.match(/currentJobId=(\d+)/)?.[1] ||
    null;

  // --- JOB TITLE (ONLY reliable source) ---
  const title = document.title
    .replace(/\s*\|\s*LinkedIn.*$/, "")
    .replace(/\s+at\s+.+$/i, "")
    .trim();

  // --- COMPANY NAME ---
  // const company =
  //   document.querySelector('a[href*="/company/"]')?.innerText ||
  //   "Company name not found";
  // document.querySelector('a[href^="/company/"]')?.innerText?.trim() || null;
  // const company = document.querySelector('a[href*="/company/"]')?.innerText;
  // console.log("Company found: ", company);

  const getCompany = () => {
    // Case 1: link exists but text is inside child
    const companyLink = document.querySelector('a[href*="/company/"]');
    if (companyLink?.innerText?.trim()) {
      return companyLink.innerText.trim();
    }

    // Case 2: text-only rendering near top card
    return (
      [...document.querySelectorAll("span")]
        .find(
          (s) =>
            s.innerText &&
            s.innerText.length < 60 &&
            s.closest('a[href*="/company/"]'),
        )
        ?.innerText?.trim() || null
    );
  };
  const company = getCompany();
  console.log("Company:", company);

  // --- JOB DESCRIPTION ---
  // const jobDescription = [...document.querySelectorAll("div")].find((d) =>
  //   d.innerText.includes("About the job"),
  // )?.innerText;
  // console.log("Job Description: ", jobDescription);
  // const el =
  //   document.querySelector('[aria-label="Job description"]') ||
  //   document.querySelector("[data-test-job-description]");

  // const description = el?.innerText?.trim() || null;

  const getDescription = () => {
    const el = document.querySelector('[aria-label="Job description"]');

    return el?.innerText?.trim() || null;
  };
  const description = getDescription();
  console.log("Description:", description);

  // Job Posted
  const jobPosted = [...document.querySelectorAll("span")]
    .find((s) => /day|week|hour|month/i.test(s.innerText))
    ?.innerText?.trim();

  // Job Location
  const jobLocation = [...document.querySelectorAll("span")]
    .find((s) => s.innerText.includes(",") && s.innerText.length < 60)
    ?.innerText?.trim();

  // --- FINAL OBJECT ---
  const job = {
    id: jobId,
    title,
    company,
    description: description,
    url: location.href,
    posted: jobPosted,
    location: jobLocation,
    scrapedAt: new Date().toISOString(),
  };

  console.log("✅ LinkedIn Job Scraped:", job);
  return job;
})();
