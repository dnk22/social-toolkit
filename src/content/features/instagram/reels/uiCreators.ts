import { CONTROL_STYLES } from './types';

/**
 * UI element creation utilities for Instagram Reels controls
 */

/**
 * Create the main control overlay container
 */
export function createControlOverlay(): HTMLDivElement {
  const controlOverlay = document.createElement('div');
  controlOverlay.className = 'reels-control-overlay';
  controlOverlay.style.cssText = `
    position: absolute;
    top: 78%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: ${CONTROL_STYLES.Z_INDEX.CONTROLS};
    pointer-events: none;
    transition: all 0.3s ease;
    opacity: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  `;
  return controlOverlay;
}

/**
 * Create progress bar container
 */
export function createProgressContainer(): HTMLDivElement {
  const progressContainer = document.createElement('div');
  progressContainer.className = 'reels-progress-container';
  progressContainer.style.cssText = `
    width: ${CONTROL_STYLES.SIZES.PROGRESS_BAR_WIDTH}px;
    height: ${CONTROL_STYLES.SIZES.PROGRESS_BAR_HEIGHT}px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
    position: relative;
    cursor: pointer;
    pointer-events: auto;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  `;
  return progressContainer;
}

/**
 * Create progress bar element
 */
export function createProgressBar(): HTMLDivElement {
  const progressBar = document.createElement('div');
  progressBar.className = 'reels-progress-bar';
  progressBar.style.cssText = `
    height: 100%;
    background: ${CONTROL_STYLES.COLORS.PRIMARY_GRADIENT};
    border-radius: 3px;
    width: 0%;
    transition: width 0.1s ease;
    box-shadow: 0 0 10px rgba(255, 107, 107, 0.3);
  `;
  return progressBar;
}

/**
 * Create progress handle
 */
export function createProgressHandle(): HTMLDivElement {
  const progressHandle = document.createElement('div');
  progressHandle.className = 'reels-progress-handle';
  progressHandle.style.cssText = `
    position: absolute;
    top: 50%;
    left: 0%;
    transform: translate(-50%, -50%);
    width: ${CONTROL_STYLES.SIZES.PROGRESS_HANDLE}px;
    height: ${CONTROL_STYLES.SIZES.PROGRESS_HANDLE}px;
    background: white;
    border-radius: 50%;
    cursor: grab;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    opacity: 0;
    transition: all 0.2s ease;
  `;
  return progressHandle;
}

/**
 * Create controls container
 */
export function createControlsContainer(): HTMLDivElement {
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
  return controlsContainer;
}

/**
 * Create a control button with specified size and content
 */
function createControlButton(className: string, size: number, fontSize: number, content: string, title: string): HTMLButtonElement {
  const button = document.createElement('button');
  button.className = className;
  button.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    border-radius: 50%;
    border: none;
    background: ${CONTROL_STYLES.COLORS.CONTROL_BACKGROUND};
    backdrop-filter: blur(20px);
    color: white;
    font-size: ${fontSize}px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    pointer-events: auto;
    transition: all 0.2s ease;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.2);
  `;
  button.innerHTML = content;
  button.setAttribute('title', title);
  return button;
}

/**
 * Create rewind button
 */
export function createRewindButton(): HTMLButtonElement {
  return createControlButton(
    'reels-rewind-btn',
    CONTROL_STYLES.SIZES.SEEK_BUTTON,
    18,
    '⏪',
    'Rewind 15s'
  );
}

/**
 * Create play/pause button
 */
export function createPlayPauseButton(): HTMLButtonElement {
  return createControlButton(
    'reels-play-pause-btn',
    CONTROL_STYLES.SIZES.PLAY_PAUSE_BUTTON,
    22,
    '▶️',
    'Play video (Space)'
  );
}

/**
 * Create fast forward button
 */
export function createFastForwardButton(): HTMLButtonElement {
  return createControlButton(
    'reels-fastforward-btn',
    CONTROL_STYLES.SIZES.SEEK_BUTTON,
    18,
    '⏩',
    'Fast forward 15s'
  );
}

/**
 * Create download container
 */
export function createDownloadContainer(): HTMLDivElement {
  const downloadContainer = document.createElement('div');
  downloadContainer.className = 'reels-download-container';
  downloadContainer.style.cssText = `
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: ${CONTROL_STYLES.Z_INDEX.DOWNLOAD};
    pointer-events: none;
    transition: all 0.3s ease;
    opacity: 0;
  `;
  return downloadContainer;
}

/**
 * Create download button
 */
export function createDownloadButton(): HTMLButtonElement {
  const downloadBtn = document.createElement('button');
  downloadBtn.className = 'reels-download-btn';
  downloadBtn.style.cssText = `
    width: ${CONTROL_STYLES.SIZES.DOWNLOAD_BUTTON}px;
    height: ${CONTROL_STYLES.SIZES.DOWNLOAD_BUTTON}px;
    border-radius: 50%;
    border: none;
    background: ${CONTROL_STYLES.COLORS.DOWNLOAD_BACKGROUND};
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
  return downloadBtn;
}