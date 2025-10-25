/**
 * Instagram Reels Video Controls Module
 *
 * A modular implementation of video controls for Instagram Reels featuring:
 * - Play/pause controls with keyboard shortcuts
 * - Seek backward/forward (±15 seconds)
 * - Interactive progress bar with drag functionality
 * - Video download functionality
 * - Automatic video detection via mutation observer
 * - Liquid glass UI design with Apple-style aesthetics
 */

// Core functionality modules
export { addControlsToVideo } from "./videoControls";
export { observeVideoChanges } from "./videoObserver";

// Types and constants
export * from "./types";
import { REELS_CONSTANTS } from "./types";
import { addControlsToVideo } from "./videoControls";
import { observeVideoChanges } from "./videoObserver";

/**
 * Attach controls to existing videos
 */
function attachVideoControls(): void {
  // Find all video elements in reels
  const videos = document.querySelectorAll("video");

  videos.forEach((video) => {
    if (!video.hasAttribute("data-reels-control-added")) {
      addControlsToVideo(video as HTMLVideoElement);
      video.setAttribute("data-reels-control-added", "true");
    }
  });
}
/**
 * Initialize video control features
 */
function initVideoControls(): void {
  // Wait for videos to load
  setTimeout(() => {
    attachVideoControls();

    // Watch for new videos (infinite scroll)
    observeVideoChanges(attachVideoControls);
  }, REELS_CONSTANTS.VIDEO_LOAD_DELAY);
}

export function initReelsFeature(): void {
  // Initialize video controls
  initVideoControls();
}
