# Instagram Reels Video Controls

A comprehensive video control system for Instagram Reels with modern UI design and advanced functionality.

## Features

### 🎮 Video Controls
- **Play/Pause**: Central button with visual feedback
- **Seek Controls**: ±15 second backward/forward buttons
- **Progress Bar**: Interactive timeline with drag-to-seek
- **Keyboard Shortcuts**: Space bar for play/pause

### 📥 Download Functionality
- **One-click Download**: Save Instagram Reels videos locally
- **Fallback Support**: Opens video in new tab if download fails
- **Visual Feedback**: Confirmation animation after download

### 🎨 Modern UI Design
- **Liquid Glass Effect**: Apple-style backdrop blur and transparency
- **Gradient Progress Bar**: Colorful progress indication
- **Hover Animations**: Smooth scale and glow effects
- **Responsive Layout**: Adapts to different video sizes

### 🔄 Auto-Detection
- **Mutation Observer**: Automatically detects new videos (infinite scroll)
- **Viewport Detection**: Only applies controls to visible videos
- **Smart Initialization**: Waits for video load before applying controls

## Architecture

### Module Structure

```
reels/
├── index.ts              # Main exports
├── types.ts              # TypeScript interfaces and constants
├── videoControls.ts      # Main video controls assembler
├── videoUtils.ts         # Video playback utilities
├── downloadUtils.ts      # Download functionality
├── uiCreators.ts         # UI element creation
├── eventHandlers.ts      # Event management
└── videoObserver.ts      # Mutation observer for new videos
```

### Dependencies

- **Parent Module**: `../reels.ts` (main entry point)
- **Build System**: Vite with TypeScript
- **Target**: Chrome Extension Content Script

## Usage

### Basic Integration

```typescript
import { initReelsFeature } from './features/instagram/reels';

// Initialize on Instagram Reels page
if (window.location.pathname.includes('/reels')) {
  initReelsFeature();
}
```

### Advanced Usage

```typescript
import { 
  addControlsToVideo, 
  observeVideoChanges,
  downloadVideo 
} from './features/instagram/reels';

// Manual control attachment
const video = document.querySelector('video');
if (video) {
  addControlsToVideo(video);
}

// Custom video observer
observeVideoChanges(() => {
  console.log('New videos detected');
});
```

## Configuration

### Constants (types.ts)

```typescript
export const REELS_CONSTANTS = {
  SEEK_SECONDS: 15,                    // Seek amount in seconds
  VIDEO_LOAD_DELAY: 1000,             // Wait time before initialization
  MUTATION_OBSERVER_DELAY: 500,       // Delay before processing new videos
  VIEWPORT_THRESHOLD: 0.5,            // Video visibility threshold
  FEEDBACK_DURATION: 150,             // Button animation duration
  DOWNLOAD_FEEDBACK_DURATION: 1000,   // Download confirmation duration
};
```

### Styling (types.ts)

```typescript
export const CONTROL_STYLES = {
  COLORS: {
    PRIMARY_GRADIENT: 'linear-gradient(90deg, #ff6b6b, #4ecdc4)',
    CONTROL_BACKGROUND: 'rgba(255, 255, 255, 0.15)',
    DOWNLOAD_BACKGROUND: 'rgba(0, 0, 0, 0.3)',
  },
  SIZES: {
    PLAY_PAUSE_BUTTON: 56,
    SEEK_BUTTON: 48,
    DOWNLOAD_BUTTON: 50,
    PROGRESS_BAR_WIDTH: 200,
  },
};
```

## Components

### Video Controls Layout

```
┌─────────────────────────────┐
│ [📥] Download Button        │ (top-left)
│                             │
│                             │
│      ████████████▓░░░       │ ← Progress Bar
│     [⏪] [▶️] [⏩]          │ ← Control Buttons  
│                             │ (bottom-center)
└─────────────────────────────┘
```

### Event Flow

1. **Page Load** → `initReelsFeature()`
2. **Video Detection** → `attachVideoControls()`
3. **Control Creation** → `addControlsToVideo()`
4. **Event Binding** → Various event handlers
5. **Mutation Watching** → `observeVideoChanges()`

### Error Handling

- **Video Source Missing**: Graceful fallback to tab opening
- **Download Failure**: Console logging with fallback
- **DOM Errors**: Try-catch blocks with error logging
- **Missing Elements**: Null checks before manipulation

## Performance

### Optimizations

- **Debounced Observers**: Prevents excessive re-initialization
- **Event Delegation**: Efficient event handling
- **Lazy Loading**: Controls added only when needed
- **Memory Management**: Proper cleanup of event listeners

### Browser Compatibility

- **Chrome**: Primary target (Manifest V3)
- **Firefox**: Compatible with WebExtensions
- **Safari**: Limited support (WebKit restrictions)

## Development

### Building

```bash
yarn build  # Builds all content scripts including reels
```

### Testing

1. Load extension in Chrome
2. Navigate to instagram.com/reels
3. Hover over videos to see controls
4. Test all functionality:
   - Play/pause
   - Seek buttons
   - Progress bar dragging
   - Download button
   - Keyboard shortcuts

### Debugging

```typescript
// Enable detailed logging
console.log('🎬 Reels controls activated');
console.log('🎥 Found X videos');
console.log('⏱️ Seeked ±15s to Xs');
console.log('💾 Video download initiated');
```

## Troubleshooting

### Common Issues

1. **Controls not appearing**
   - Check if on Instagram Reels page
   - Verify video elements exist
   - Check console for errors

2. **Download not working**
   - Instagram video sources may be protected
   - Fallback opens video in new tab
   - Check network permissions

3. **Progress bar not updating**
   - Verify video has duration metadata
   - Check timeupdate events are firing
   - Ensure video is not muted/blocked

### Performance Issues

- **High CPU usage**: Reduce mutation observer frequency
- **Memory leaks**: Ensure proper event listener cleanup
- **UI lag**: Optimize CSS animations and transitions

## Future Enhancements

### Planned Features

- **Speed Control**: 0.5x, 1x, 1.25x, 1.5x, 2x playback speeds
- **Volume Control**: Audio level adjustment
- **Fullscreen Mode**: Enhanced viewing experience
- **Playlist Mode**: Auto-play next video
- **Quality Selection**: Choose video resolution
- **Captions**: Subtitle support and styling

### Technical Improvements

- **Web Components**: Convert to custom elements
- **Service Worker**: Background processing
- **IndexedDB**: Local storage for preferences
- **WebRTC**: Peer-to-peer sharing
- **Canvas API**: Advanced video effects

## License

Part of the Social Toolkit Chrome Extension project.