import { REELS_CONSTANTS } from './types';

/**
 * Video observation utilities for detecting new videos in Instagram Reels
 */

/**
 * Watch for new videos being added (infinite scroll)
 */
export function observeVideoChanges(attachVideoControls: () => void): void {
  const observer = new MutationObserver((mutations) => {
    let hasNewVideos = false;
    
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as Element;
          
          // Check if the added node contains videos
          const videos = element.querySelectorAll('video');
          if (videos.length > 0) {
            hasNewVideos = true;
          }
          
          // Check if the added node itself is a video
          if (element.tagName === 'VIDEO') {
            hasNewVideos = true;
          }
        }
      });
    });
    
    if (hasNewVideos) {
      setTimeout(attachVideoControls, REELS_CONSTANTS.MUTATION_OBSERVER_DELAY);
    }
  });

  // Start observing
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}