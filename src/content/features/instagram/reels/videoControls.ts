import { ProgressBarState } from './types';
import { updatePlayPauseIcon } from './videoUtils';
import {
  createControlOverlay,
  createProgressContainer,
  createProgressBar,
  createProgressHandle,
  createControlsContainer,
  createRewindButton,
  createPlayPauseButton,
  createFastForwardButton,
  createDownloadContainer,
  createDownloadButton
} from './uiCreators';
import {
  addButtonHoverEffects,
  addDownloadButtonHoverEffects,
  addProgressBarInteractions,
  addButtonClickHandlers,
  addKeyboardControls,
  addHoverVisibilityControls,
  addVideoEventListeners
} from './eventHandlers';

/**
 * Video controls assembler - creates and assembles all video control components
 */

/**
 * Add video controls to a specific video element
 */
export function addControlsToVideo(video: HTMLVideoElement): void {
  const container = video.closest('div[role="button"]') || video.parentElement;
  if (!container) return;

  // Create UI elements
  const controlOverlay = createControlOverlay();
  const progressContainer = createProgressContainer();
  const progressBar = createProgressBar();
  const progressHandle = createProgressHandle();
  const controlsContainer = createControlsContainer();
  const rewindBtn = createRewindButton();
  const playPauseBtn = createPlayPauseButton();
  const fastForwardBtn = createFastForwardButton();
  const downloadContainer = createDownloadContainer();
  const downloadBtn = createDownloadButton();

  // Set initial play/pause icon
  updatePlayPauseIcon(playPauseBtn, video.paused);

  // Create progress bar state
  const progressBarState: ProgressBarState = { isDragging: false };

  // Update progress bar function
  function updateProgressBar(): void {
    if (video.duration) {
      const percentage = (video.currentTime / video.duration) * 100;
      progressBar.style.width = `${percentage}%`;
      progressHandle.style.left = `${percentage}%`;
    }
  }

  // Add event handlers
  addButtonHoverEffects([rewindBtn, playPauseBtn, fastForwardBtn]);
  addDownloadButtonHoverEffects(downloadBtn);
  addProgressBarInteractions(progressContainer, progressHandle, video, progressBarState, updateProgressBar);
  addButtonClickHandlers(rewindBtn, playPauseBtn, fastForwardBtn, downloadBtn, video);
  addKeyboardControls(video, playPauseBtn);
  addHoverVisibilityControls(container, controlOverlay, downloadContainer);
  addVideoEventListeners(video, playPauseBtn, updateProgressBar);

  // Assemble UI
  progressContainer.appendChild(progressBar);
  progressContainer.appendChild(progressHandle);
  controlsContainer.appendChild(rewindBtn);
  controlsContainer.appendChild(playPauseBtn);
  controlsContainer.appendChild(fastForwardBtn);
  controlOverlay.appendChild(progressContainer);
  controlOverlay.appendChild(controlsContainer);
  downloadContainer.appendChild(downloadBtn);
  
  // Position relative to video container
  const videoContainer = container;
  if (videoContainer && getComputedStyle(videoContainer).position === 'static') {
    (videoContainer as HTMLElement).style.position = 'relative';
  }
  
  videoContainer?.appendChild(controlOverlay);
  videoContainer?.appendChild(downloadContainer);
}