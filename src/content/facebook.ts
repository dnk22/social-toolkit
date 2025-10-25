import { initTimeUsageTracker } from "./features/common/timeUsage";
import { Products } from "../utils/constants";

async function setupFacebookContentScript() {
  console.log("🚀 Facebook Content Script Loaded");
  
  // Initialize time usage tracker
  await initTimeUsageTracker(Products.FACEBOOK);
  
  // Add Facebook-specific features here later
  console.log("⚙️ Facebook features ready");
}

setupFacebookContentScript();
