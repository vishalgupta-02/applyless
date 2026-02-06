import { extractorV1 } from "./extractors/v1.js";

console.log("✅ background.js loaded");

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "SCRAPE_JOB") {
    chrome.scripting.executeScript(
      {
        target: { tabId: msg.tabId },
        world: "MAIN",
        func: async () => {
          const ctx = {
            url: location.href,
          };

          return await extractorV1.extract(ctx);
        },
      },
      (results) => {
        if (chrome.runtime.lastError) {
          sendResponse({ error: chrome.runtime.lastError.message });
          return;
        }

        sendResponse(results?.[0]?.result || null);
      },
    );

    return true; // 🔴 REQUIRED (MV3 async response)
  }
});

// import { runExtraction } from "./extractors/runner.js";

// console.log("✅ background.js loaded");

// chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
//   if (msg.type === "SCRAPE_JOB") {
//     chrome.scripting.executeScript(
//       {
//         target: { tabId: msg.tabId },
//         world: "MAIN",
//         func: async () => {
//           const ctx = { url: location.href };
//           return await runExtraction(ctx);
//         },
//       },
//       (results) => {
//         if (chrome.runtime.lastError) {
//           sendResponse({ error: chrome.runtime.lastError.message });
//           return;
//         }

//         sendResponse(results?.[0]?.result || null);
//       },
//     );

//     return true;
//   }
// });
