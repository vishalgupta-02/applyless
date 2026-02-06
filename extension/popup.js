console.log("✅ popup.js loaded");

document.getElementById("scrape").onclick = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    chrome.runtime.sendMessage({ type: "SCRAPE_JOB", tabId: tab.id }, (res) => {
      if (chrome.runtime.lastError) {
        console.error("❌ Error:", chrome.runtime.lastError.message);
        return;
      }

      console.log("✅ SCRAPED RESULT:", res);
    });
  });
};
