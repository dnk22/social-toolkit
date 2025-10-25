import { REELS_CONSTANTS } from './reels/types';
import { addControlsToVideo } from './reels/videoControls';
import { observeVideoChanges } from './reels/videoObserver';

/**
 * Instagram Reels video controls feature
 * 
 * This module provides comprehensive video controls for Instagram Reels including:
 * - Play/pause controls
 * - Seek backward/forward (±15 seconds)
 * - Progress bar with drag functionality
 * - Download video functionality with blob URL support
 * - Keyboard shortcuts (Space for play/pause)
 * - Automatic detection of new videos via mutation observer
 */

export function initReelsFeature(): void {
  console.log('🎬 Initializing Instagram Reels controls...');
  // Initialize video controls
  initVideoControls();
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

/**
 * Attach controls to existing videos
 */
function attachVideoControls(): void {
  // Find all video elements in reels
  const videos = document.querySelectorAll('video');
  console.log(`🎥 Found ${videos.length} videos on page`);
  
  videos.forEach((video) => {
    if (!video.hasAttribute('data-reels-control-added')) {
      addControlsToVideo(video as HTMLVideoElement);
      video.setAttribute('data-reels-control-added', 'true');
      console.log('✅ Controls added to video');
    }
  });
}