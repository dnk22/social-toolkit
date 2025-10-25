# Social Toolkit - Chrome Extension

A modern Chrome extension built with **React**, **TypeScript**, **SCSS**, and **Vite** for social media platforms (Instagram, Facebook).

## ⚠️ Important: Node.js Setup

Project requires **Node.js 22+** via **NVM** (not Homebrew Node).

### Quick Setup:
```bash
# Load NVM (if not auto-loaded)
source ./load-nvm.sh

# Or use wrapper scripts
./yarn.sh build
./npm.sh run dev
```

**See [FIX-NPM-YARN-ERROR.md](FIX-NPM-YARN-ERROR.md)** if you encounter icu4c errors.

## 🚀 Quick Start

### Development (với watch mode):
```bash
source ./load-nvm.sh  # Load NVM first
npm run dev
# hoặc
./dev.sh  # NVM auto-loaded
```

### Production build:
```bash
source ./load-nvm.sh  # Load NVM first
npm run build
# hoặc
./yarn.sh build  # Wrapper with NVM
```

### Load vào Chrome:
1. Mở `chrome://extensions/`
2. Bật "Developer mode"
3. Click "Load unpacked"
4. Chọn thư mục `dist/`

## ✨ Features

### ⏰ Time Usage Tracker
- Đếm thời gian sử dụng real-time cho từng platform
- Hiển thị timer góc trên phải: `📸 Time: 00:15:32`
- Lưu data theo ngày vào Chrome Storage
- Reset tự động mỗi ngày mới

### 🎬 Instagram Reels Support
- Detect Reels pages tự động
- Visual indicator khi active
- Sẵn sàng cho features (download, auto-play, etc.)

### 🎨 Modern UI
- SCSS với modular structure
- Gradient design đẹp mắt
- Toggle switches cho từng platform
- Responsive layout

## 📁 Project Structure

```
social-toolkit/
├── src/
│   ├── popup/                      # Extension popup
│   │   ├── App.tsx                 # React component
│   │   ├── index.jsx               # Entry point
│   │   ├── popup.scss              # Main styles
│   │   └── styles/                 # SCSS modules
│   │       ├── _variables.scss     # Design tokens
│   │       ├── _base.scss          # Base styles
│   │       ├── _settings.scss      # Settings section
│   │       ├── _toggle.scss        # Toggle switches
│   │       └── _features.scss      # Features info
│   ├── content/                    # Content scripts
│   │   ├── instagram.ts            # Instagram (IIFE)
│   │   ├── facebook.ts             # Facebook (IIFE)
│   │   └── features/
│   │       ├── common/
│   │       │   └── timeUsage.ts    # Time tracker
│   │       └── instagram/
│   │           └── reels.ts        # Reels feature
│   ├── background/
│   │   └── background.ts           # Service worker
│   └── utils/
│       └── constants.ts            # Enums & types
├── public/
│   ├── manifest.json               # Extension manifest
│   └── icons/
├── dist/                           # Build output
├── build-content.js                # IIFE builder
├── dev.sh                          # Dev script
└── vite.config.ts                  # Vite config
```

## 🛠️ Development

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Watch mode (auto-rebuild) |
| `npm run build` | Production build |
| `npm run build:main` | Build popup & background |
| `npm run build:content` | Build content scripts (IIFE) |
| `npm run load` | Show extension load guide |

### Tech Stack

- ⚛️ **React 18** - Modern React with hooks
- 📘 **TypeScript** - Full type safety
- ⚡ **Vite** - Lightning fast builds
- 🎨 **SCSS** - Modular styles with variables & mixins
- 🔧 **Manifest V3** - Latest Chrome extension standard

## 🧪 Testing

### Instagram:
```
https://www.instagram.com/
→ Thấy timer: 📸 Time: 00:00:01 (góc trên phải)
```

### Facebook:
```
https://www.facebook.com/
→ Thấy timer: 👥 Time: 00:00:01
```

### Instagram Reels:
```
https://www.instagram.com/reels/
→ Thấy badge: 🎬 Instagram Reels Toolkit Active
→ Và timer: 📸 Time: 00:00:01
```

### Check Data:
```javascript
// Mở Console (F12)
chrome.storage.local.get(null, console.log);

// Output:
{
  timeUsage_instagram_today: {
    date: "2025-10-25",
    totalSeconds: 932,
    ...
  }
}
```

## 🐛 Troubleshooting

### "Cannot use import statement outside a module"
✅ **Fixed!** Content scripts được build thành IIFE format.

**Verify:**
```bash
head -1 dist/instagram.js
# Phải thấy: (function() {
```

### Timer không hiển thị
- Reload extension trong `chrome://extensions/`
- Check Console cho errors
- Verify permissions trong manifest.json

### Dev mode không watch
```bash
# Restart
pkill -f "vite|build-content"
npm run dev
```

## 📚 Documentation

- [TIME-USAGE-TRACKER.md](TIME-USAGE-TRACKER.md) - Time tracker chi tiết
- [DEV-WORKFLOW.md](DEV-WORKFLOW.md) - Development workflow
- [FIX-ES-MODULE-ERROR.md](FIX-ES-MODULE-ERROR.md) - ES module fix
- [SCSS-MIGRATION.md](SCSS-MIGRATION.md) - SCSS setup guide

## 🎨 SCSS Customization

### Colors:
```scss
// src/popup/styles/_variables.scss
$primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
$color-success: #10b981;
```

### Mixins:
```scss
@use './variables' as *;

.my-component {
  @include flex-center;
  @include glassmorphism;
}
```

## � Adding New Features

### 1. Create Feature Module:
```typescript
// src/content/features/instagram/newFeature.ts
export function initNewFeature() {
  console.log('New feature initialized');
  // Your code here
}
```

### 2. Import vào Content Script:
```typescript
// src/content/instagram.ts
import { initNewFeature } from './features/instagram/newFeature';

if (condition) {
  initNewFeature();
}
```

### 3. Rebuild:
```bash
npm run build:content
```

## 📦 Build for Production

```bash
# Full production build
npm run build

# Verify output
ls -la dist/

# Test locally
Load dist/ vào chrome://extensions/

# Package
cd dist && zip -r ../social-toolkit-v1.0.0.zip .
```

## 📄 License

MIT

---

**Built with ❤️ using React + TypeScript + Vite + SCSS**

For issues or questions, check documentation files or create an issue on GitHub.
