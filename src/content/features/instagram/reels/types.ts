/**
 * Types and interfaces for Instagram Reels video controls
 */

export interface VideoControlElements {
  controlOverlay: HTMLDivElement;
  progressContainer: HTMLDivElement;
  progressBar: HTMLDivElement;
  progressHandle: HTMLDivElement;
  controlsContainer: HTMLDivElement;
  rewindBtn: HTMLButtonElement;
  playPauseBtn: HTMLButtonElement;
  fastForwardBtn: HTMLButtonElement;
  downloadContainer: HTMLDivElement;
  downloadBtn: HTMLButtonElement;
}

export interface ProgressBarState {
  isDragging: boolean;
}

export const REELS_CONSTANTS = {
  SEEK_SECONDS: 15,
  CONTROL_OPACITY_DELAY: 300,
  VIDEO_LOAD_DELAY: 500,
  MUTATION_OBSERVER_DELAY: 500,
  VIEWPORT_THRESHOLD: 0.5,
  FEEDBACK_DURATION: 150,
  DOWNLOAD_FEEDBACK_DURATION: 1000,
} as const;

export const CONTROL_STYLES = {
  Z_INDEX: {
    CONTROLS: 100000,
    DOWNLOAD: 100001,
  },
  COLORS: {
    PRIMARY_GRADIENT: 'linear-gradient(90deg, #ff6b6b, #4ecdc4)',
    CONTROL_BACKGROUND: 'rgba(255, 255, 255, 0.15)',
    CONTROL_BACKGROUND_HOVER: 'rgba(255, 255, 255, 0.25)',
    DOWNLOAD_BACKGROUND: 'rgba(0, 0, 0, 0.3)',
    DOWNLOAD_BACKGROUND_HOVER: 'rgba(0, 0, 0, 0.5)',
  },
  SIZES: {
    PLAY_PAUSE_BUTTON: 56,
    SEEK_BUTTON: 48,
    DOWNLOAD_BUTTON: 50,
    PROGRESS_HANDLE: 16,
    PROGRESS_BAR_WIDTH: 200,
    PROGRESS_BAR_HEIGHT: 6,
  },
} as const;