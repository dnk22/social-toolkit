import { initReelsFeature } from "./features/instagram/reels";
// import { initTimeUsageTracker } from "./features/common/timeUsage";
// import { Products } from "../utils/constants";

async function setupInstagramContentScript() {
  console.log("🚀 Instagram Content Script Loaded");

  // Initialize time usage tracker
  // await initTimeUsageTracker(Products.INSTAGRAM);

  // Setup page-specific features
  const path = location.pathname;
  if (path.includes("/reels")) {
    initReelsFeature();
  }
}

setupInstagramContentScript();
