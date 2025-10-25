import { CONTROL_STYLES, REELS_CONSTANTS, ProgressBarState } from './types';
import { toggleVideoPlayback, seekVideo, isVideoInViewport, updatePlayPauseIcon } from './videoUtils';
import { downloadVideo, addDownloadFeedback, addSeekFeedback } from './downloadUtils';

/**
 * Event handlers for Instagram Reels video controls
 */

/**
 * Add hover effects to control buttons
 */
export function addButtonHoverEffects(buttons: HTMLButtonElement[]): void {
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.style.background = CONTROL_STYLES.COLORS.CONTROL_BACKGROUND_HOVER;
      btn.style.transform = 'scale(1.05)';
      btn.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.4)';
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.background = CONTROL_STYLES.COLORS.CONTROL_BACKGROUND;
      btn.style.transform = 'scale(1)';
      btn.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)';
    });
  });
}

/**
 * Add hover effects to download button
 */
export function addDownloadButtonHoverEffects(downloadBtn: HTMLButtonElement): void {
  downloadBtn.addEventListener('mouseenter', () => {
    downloadBtn.style.background = CONTROL_STYLES.COLORS.DOWNLOAD_BACKGROUND_HOVER;
    downloadBtn.style.transform = 'scale(1.1)';
    downloadBtn.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.4)';
  });

  downloadBtn.addEventListener('mouseleave', () => {
    downloadBtn.style.background = CONTROL_STYLES.COLORS.DOWNLOAD_BACKGROUND;
    downloadBtn.style.transform = 'scale(1)';
    downloadBtn.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.3)';
  });
}

/**
 * Add progress bar interactions
 */
export function addProgressBarInteractions(
  progressContainer: HTMLDivElement,
  progressHandle: HTMLDivElement,
  video: HTMLVideoElement,
  state: ProgressBarState,
  updateProgressBar: () => void
): void {
  progressContainer.addEventListener('mouseenter', () => {
    progressHandle.style.opacity = '1';
  });
  
  progressContainer.addEventListener('mouseleave', () => {
    if (!state.isDragging) {
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
    state.isDragging = true;
    progressHandle.style.cursor = 'grabbing';
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (state.isDragging) {
      const rect = progressContainer.getBoundingClientRect();
      const moveX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
      const percentage = moveX / rect.width;
      const newTime = percentage * (video.duration || 0);
      video.currentTime = newTime;
      updateProgressBar();
    }
  });

  document.addEventListener('mouseup', () => {
    if (state.isDragging) {
      state.isDragging = false;
      progressHandle.style.cursor = 'grab';
      progressHandle.style.opacity = '0';
    }
  });
}

/**
 * Add button click handlers
 */
export function addButtonClickHandlers(
  rewindBtn: HTMLButtonElement,
  playPauseBtn: HTMLButtonElement,
  fastForwardBtn: HTMLButtonElement,
  downloadBtn: HTMLButtonElement,
  video: HTMLVideoElement
): void {
  rewindBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    seekVideo(video, -REELS_CONSTANTS.SEEK_SECONDS);
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
    seekVideo(video, REELS_CONSTANTS.SEEK_SECONDS);
    addSeekFeedback(fastForwardBtn);
  });

  downloadBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    downloadVideo(video);
    addDownloadFeedback(downloadBtn);
  });
}

/**
 * Add keyboard controls
 */
export function addKeyboardControls(video: HTMLVideoElement, playPauseBtn: HTMLButtonElement): void {
  document.addEventListener('keydown', (e) => {
    if (isVideoInViewport(video)) {
      if (e.code === 'Space') {
        e.preventDefault();
        toggleVideoPlayback(video, playPauseBtn);
      }
    }
  });
}

/**
 * Add hover visibility controls
 */
export function addHoverVisibilityControls(
  container: Element,
  controlOverlay: HTMLDivElement,
  downloadContainer: HTMLDivElement
): void {
  const parentContainer = container.parentElement || container;
  
  parentContainer.addEventListener('mouseenter', () => {
    controlOverlay.style.opacity = '1';
    downloadContainer.style.opacity = '1';
  });

  parentContainer.addEventListener('mouseleave', () => {
    controlOverlay.style.opacity = '0';
    downloadContainer.style.opacity = '0';
  });
}

/**
 * Add video event listeners
 */
export function addVideoEventListeners(
  video: HTMLVideoElement,
  playPauseBtn: HTMLButtonElement,
  updateProgressBar: () => void
): void {
  video.addEventListener('play', () => updatePlayPauseIcon(playPauseBtn, false));
  video.addEventListener('pause', () => updatePlayPauseIcon(playPauseBtn, true));
  video.addEventListener('timeupdate', updateProgressBar);
  video.addEventListener('loadedmetadata', updateProgressBar);
}