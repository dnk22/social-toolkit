export function initReelsFeature() {
  // Initialize video controls
  initVideoControls();
  
}

/**
 * Initialize video control features
 */
function initVideoControls() {
  // Wait for videos to load
  setTimeout(() => {
    attachVideoControls();
    
    // Watch for new videos (infinite scroll)
    observeVideoChanges();
  }, 1000);
}

/**
 * Attach controls to existing videos
 */
function attachVideoControls() {
  // Find all video elements in reels
  const videos = document.querySelectorAll('video');
  
  videos.forEach((video, index) => {
    if (!video.hasAttribute('data-reels-control-added')) {
      addControlsToVideo(video as HTMLVideoElement, index);
      video.setAttribute('data-reels-control-added', 'true');
    }
  });
}

/**
 * Add play/pause controls to a specific video
 */
function addControlsToVideo(video: HTMLVideoElement, index: number) {
  const container = video.closest('div[role="button"]') || video.parentElement;
  if (!container) return;

  // Create control overlay
  const controlOverlay = document.createElement('div');
  controlOverlay.className = 'reels-control-overlay';
  controlOverlay.style.cssText = `
    position: absolute;
    top: 78%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100000;
    pointer-events: none;
    transition: all 0.3s ease;
    opacity: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  `;

  // Create progress bar container
  const progressContainer = document.createElement('div');
  progressContainer.className = 'reels-progress-container';
  progressContainer.style.cssText = `
    width: 200px;
    height: 6px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
    position: relative;
    cursor: pointer;
    pointer-events: auto;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  `;

  // Create progress bar
  const progressBar = document.createElement('div');
  progressBar.className = 'reels-progress-bar';
  progressBar.style.cssText = `
    height: 100%;
    background: linear-gradient(90deg, #ff6b6b, #4ecdc4);
    border-radius: 3px;
    width: 0%;
    transition: width 0.1s ease;
    box-shadow: 0 0 10px rgba(255, 107, 107, 0.3);
  `;

  // Create progress handle
  const progressHandle = document.createElement('div');
  progressHandle.className = 'reels-progress-handle';
  progressHandle.style.cssText = `
    position: absolute;
    top: 50%;
    left: 0%;
    transform: translate(-50%, -50%);
    width: 16px;
    height: 16px;
    background: white;
    border-radius: 50%;
    cursor: grab;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    opacity: 0;
    transition: all 0.2s ease;
  `;

  // Create controls container
  const controlsContainer = document.createElement('div');
  controlsContainer.className = 'reels-controls-container';
  controlsContainer.style.cssText = `
    display: flex;
    align-items: center;
    gap: 15px;
    pointer-events: auto;
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(20px);
    padding: 12px 20px;
    border-radius: 25px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  `;

  // Create rewind button (-15s)
  const rewindBtn = document.createElement('button');
  rewindBtn.className = 'reels-rewind-btn';
  rewindBtn.style.cssText = `
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: none;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(20px);
    color: white;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    pointer-events: auto;
    transition: all 0.2s ease;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.2);
  `;
  rewindBtn.innerHTML = '⏪';
  rewindBtn.setAttribute('title', 'Rewind 15s');

  // Create play/pause button
  const playPauseBtn = document.createElement('button');
  playPauseBtn.className = 'reels-play-pause-btn';
  playPauseBtn.style.cssText = `
    width: 56px;
    height: 56px;
    border-radius: 50%;
    border: none;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(20px);
    color: white;
    font-size: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    pointer-events: auto;
    transition: all 0.2s ease;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.2);
  `;

  // Create fast forward button (+15s)
  const fastForwardBtn = document.createElement('button');
  fastForwardBtn.className = 'reels-fastforward-btn';
  fastForwardBtn.style.cssText = `
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: none;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(20px);
    color: white;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    pointer-events: auto;
    transition: all 0.2s ease;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.2);
  `;
  fastForwardBtn.innerHTML = '⏩';
  fastForwardBtn.setAttribute('title', 'Fast forward 15s');

  // Set initial icon
  updatePlayPauseIcon(playPauseBtn, video.paused);

  // Add hover effects for all buttons
  [rewindBtn, playPauseBtn, fastForwardBtn].forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.style.background = 'rgba(255, 255, 255, 0.25)';
      btn.style.transform = 'scale(1.05)';
      btn.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.4)';
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.background = 'rgba(255, 255, 255, 0.15)';
      btn.style.transform = 'scale(1)';
      btn.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)';
    });
  });

  // Add progress bar interactions
  let isDragging = false;
  
  progressContainer.addEventListener('mouseenter', () => {
    progressHandle.style.opacity = '1';
  });
  
  progressContainer.addEventListener('mouseleave', () => {
    if (!isDragging) {
      progressHandle.style.opacity = '0';
    }
  });

  progressContainer.addEventListener('click', (e) => {
    const rect = progressContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * (video.duration || 0);
    video.currentTime = newTime;
    updateProgressBar();
  });

  progressHandle.addEventListener('mousedown', (e) => {
    isDragging = true;
    progressHandle.style.cursor = 'grabbing';
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const rect = progressContainer.getBoundingClientRect();
      const moveX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
      const percentage = moveX / rect.width;
      const newTime = percentage * (video.duration || 0);
      video.currentTime = newTime;
      updateProgressBar();
    }
  });

  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      progressHandle.style.cursor = 'grab';
      progressHandle.style.opacity = '0';
    }
  });

  // Add click handlers
  rewindBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    seekVideo(video, -15);
    addSeekFeedback(rewindBtn);
  });

  playPauseBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleVideoPlayback(video, playPauseBtn);
  });

  fastForwardBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    seekVideo(video, 15);
    addSeekFeedback(fastForwardBtn);
  });

  // Add keyboard controls
  document.addEventListener('keydown', (e) => {
    if (isVideoInViewport(video)) {
      if (e.code === 'Space') {
        e.preventDefault();
        toggleVideoPlayback(video, playPauseBtn);
      }
    }
  });

  // Show/hide controls on hover
  const parentContainer = container.parentElement || container;
  parentContainer.addEventListener('mouseenter', () => {
    controlOverlay.style.opacity = '1';
    downloadContainer.style.opacity = '1';
  });

  parentContainer.addEventListener('mouseleave', () => {
    controlOverlay.style.opacity = '0';
    downloadContainer.style.opacity = '0';
  });

  // Listen for video events
  video.addEventListener('play', () => updatePlayPauseIcon(playPauseBtn, false));
  video.addEventListener('pause', () => updatePlayPauseIcon(playPauseBtn, true));
  video.addEventListener('timeupdate', updateProgressBar);
  video.addEventListener('loadedmetadata', updateProgressBar);

  // Update progress bar function
  function updateProgressBar() {
    if (video.duration) {
      const percentage = (video.currentTime / video.duration) * 100;
      progressBar.style.width = `${percentage}%`;
      progressHandle.style.left = `${percentage}%`;
    }
  }

  // Assemble UI
  progressContainer.appendChild(progressBar);
  progressContainer.appendChild(progressHandle);
  controlsContainer.appendChild(rewindBtn);
  controlsContainer.appendChild(playPauseBtn);
  controlsContainer.appendChild(fastForwardBtn);
  controlOverlay.appendChild(progressContainer);
  controlOverlay.appendChild(controlsContainer);

  // Create download button (positioned separately on the right)
  const downloadContainer = document.createElement('div');
  downloadContainer.className = 'reels-download-container';
  downloadContainer.style.cssText = `
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 100001;
    pointer-events: none;
    transition: all 0.3s ease;
    opacity: 0;
  `;

  const downloadBtn = document.createElement('button');
  downloadBtn.className = 'reels-download-btn';
  downloadBtn.style.cssText = `
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: none;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(20px);
    color: white;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    pointer-events: auto;
    transition: all 0.2s ease;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.2);
  `;
  downloadBtn.innerHTML = '📥';
  downloadBtn.setAttribute('title', 'Download video');

  // Add hover effect for download button
  downloadBtn.addEventListener('mouseenter', () => {
    downloadBtn.style.background = 'rgba(0, 0, 0, 0.5)';
    downloadBtn.style.transform = 'scale(1.1)';
    downloadBtn.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.4)';
  });

  downloadBtn.addEventListener('mouseleave', () => {
    downloadBtn.style.background = 'rgba(0, 0, 0, 0.3)';
    downloadBtn.style.transform = 'scale(1)';
    downloadBtn.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.3)';
  });

  // Add download functionality
  downloadBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    downloadVideo(video);
    addDownloadFeedback(downloadBtn);
  });

  downloadContainer.appendChild(downloadBtn);
  
  // Position relative to video container
  const videoContainer = container;
  if (videoContainer && getComputedStyle(videoContainer).position === 'static') {
    (videoContainer as HTMLElement).style.position = 'relative';
  }
  
  videoContainer?.appendChild(controlOverlay);
  videoContainer?.appendChild(downloadContainer);

}

/**
 * Toggle video playback
 */
function toggleVideoPlayback(video: HTMLVideoElement, button: HTMLButtonElement) {
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
    }, 150);
    
  } catch (error) {
    console.error('❌ Error toggling video:', error);
  }
}

/**
 * Seek video by specified seconds
 */
function seekVideo(video: HTMLVideoElement, seconds: number) {
  try {
    const newTime = Math.max(0, Math.min(video.duration || 0, video.currentTime + seconds));
    video.currentTime = newTime;
    console.log(`⏱️ Seeked ${seconds > 0 ? '+' : ''}${seconds}s to ${newTime.toFixed(1)}s`);
  } catch (error) {
    console.error('❌ Error seeking video:', error);
  }
}

/**
 * Add visual feedback for seek buttons
 */
function addSeekFeedback(button: HTMLButtonElement) {
  button.style.transform = 'scale(0.85)';
  setTimeout(() => {
    button.style.transform = 'scale(1)';
  }, 150);
}

/**
 * Download video functionality
 */
function downloadVideo(video: HTMLVideoElement) {
  try {
    const videoSrc = video.src || video.currentSrc;
    if (!videoSrc) {
      console.error('❌ No video source found');
      return;
    }

    // Create a temporary anchor element for download
    const link = document.createElement('a');
    link.href = videoSrc;
    link.download = `instagram-reel-${Date.now()}.mp4`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log('💾 Video download initiated');
  } catch (error) {
    console.error('❌ Error downloading video:', error);
    
    // Fallback: open video in new tab
    try {
      const videoSrc = video.src || video.currentSrc;
      if (videoSrc) {
        window.open(videoSrc, '_blank');
        console.log('🔗 Video opened in new tab as fallback');
      }
    } catch (fallbackError) {
      console.error('❌ Fallback also failed:', fallbackError);
    }
  }
}

/**
 * Add visual feedback for download button
 */
function addDownloadFeedback(button: HTMLButtonElement) {
  const originalIcon = button.innerHTML;
  button.innerHTML = '✅';
  button.style.transform = 'scale(0.9)';
  
  setTimeout(() => {
    button.innerHTML = originalIcon;
    button.style.transform = 'scale(1)';
  }, 1000);
}

/**
 * Update play/pause button icon
 */
function updatePlayPauseIcon(button: HTMLButtonElement, isPaused: boolean) {
  if (isPaused) {
    button.innerHTML = '▶️'; // Play icon
    button.setAttribute('title', 'Play video (Space)');
  } else {
    button.innerHTML = '⏸️'; // Pause icon
    button.setAttribute('title', 'Pause video (Space)');
  }
}

/**
 * Pause all other videos except the current one
 */
function pauseAllOtherVideos(currentVideo: HTMLVideoElement) {
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
function isVideoInViewport(video: HTMLVideoElement): boolean {
  const rect = video.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= windowHeight &&
    rect.right <= windowWidth &&
    rect.height > windowHeight * 0.5 // At least 50% visible
  );
}

/**
 * Watch for new videos being added (infinite scroll)
 */
function observeVideoChanges() {
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
      setTimeout(attachVideoControls, 500);
    }
  });

  // Start observing
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

}
