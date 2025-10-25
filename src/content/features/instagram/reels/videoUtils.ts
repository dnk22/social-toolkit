import { REELS_CONSTANTS } from './types';

/**
 * Video playback control utilities
 */

/**
 * Toggle video playback
 */
export function toggleVideoPlayback(video: HTMLVideoElement, button: HTMLButtonElement): void {
  try {
    if (video.paused) {
      // Pause other videos first
      pauseAllOtherVideos(video);
      video.play();
    } else {
      video.pause();
    }
    
    // Add visual feedback
    button.style.transform = 'scale(0.9)';
    setTimeout(() => {
      button.style.transform = 'scale(1)';
    }, REELS_CONSTANTS.FEEDBACK_DURATION);
    
  } catch (error) {
    console.error('❌ Error toggling video:', error);
  }
}

/**
 * Seek video by specified seconds
 */
export function seekVideo(video: HTMLVideoElement, seconds: number): void {
  try {
    const newTime = Math.max(0, Math.min(video.duration || 0, video.currentTime + seconds));
    video.currentTime = newTime;
    console.log(`⏱️ Seeked ${seconds > 0 ? '+' : ''}${seconds}s to ${newTime.toFixed(1)}s`);
  } catch (error) {
    console.error('❌ Error seeking video:', error);
  }
}

/**
 * Pause all other videos except the current one
 */
export function pauseAllOtherVideos(currentVideo: HTMLVideoElement): void {
  const allVideos = document.querySelectorAll('video');
  allVideos.forEach(video => {
    if (video !== currentVideo && !video.paused) {
      video.pause();
    }
  });
}

/**
 * Check if video is in viewport
 */
export function isVideoInViewport(video: HTMLVideoElement): boolean {
  const rect = video.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= windowHeight &&
    rect.right <= windowWidth &&
    rect.height > windowHeight * REELS_CONSTANTS.VIEWPORT_THRESHOLD
  );
}

/**
 * Update play/pause button icon
 */
export function updatePlayPauseIcon(button: HTMLButtonElement, isPaused: boolean): void {
  if (isPaused) {
    button.innerHTML = '▶️'; // Play icon
    button.setAttribute('title', 'Play video (Space)');
  } else {
    button.innerHTML = '⏸️'; // Pause icon
    button.setAttribute('title', 'Pause video (Space)');
  }
}