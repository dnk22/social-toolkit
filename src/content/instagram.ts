import { initReelsFeature } from "./features/instagram/reels";
import { initTimeUsageTracker } from "./features/common/timeUsage";
import { Products } from "../utils/constants";

async function setupInstagramContentScript() {
  console.log("🚀 Instagram Content Script Loaded");
  
  // Initialize time usage tracker
  await initTimeUsageTracker(Products.INSTAGRAM);
  
  // Setup page-specific features
  const path = location.pathname;
  switch (path) {
    case '/reel':
    case '/reels':
      initReelsFeature();
      break;
  
    default:
      break;
  }
}

setupInstagramContentScript();
