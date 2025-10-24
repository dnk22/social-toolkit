# Social Toolkit - Chrome Extension

A modern Chrome extension built with **React**, **TypeScript**, and **Vite** for fast development and optimal performance.

## 🚀 Features

- ⚛️ **React 18** - Modern React with hooks
- 📘 **TypeScript** - Full type safety
- ⚡ **Vite** - Lightning fast HMR and builds
- 🎨 **Modern UI** - Beautiful gradient design
- 💾 **Chrome Storage API** - Persistent data storage
- 📨 **Message Passing** - Communication between popup, content script, and background worker
- 🔧 **Manifest V3** - Latest Chrome extension standard

## 📁 Project Structure

```
Social/
├── public/
│   ├── manifest.json          # Extension manifest
│   └── icons/                 # Extension icons (16, 48, 128)
├── src/
│   ├── popup/
│   │   ├── popup.html        # Popup HTML entry
│   │   ├── index.tsx         # React entry point (TypeScript)
│   │   ├── App.tsx           # Main React component (TypeScript)
│   │   └── popup.css         # Popup styles
│   ├── content/
│   │   └── content.ts        # Content script (TypeScript)
│   ├── background/
│   │   └── background.ts     # Background service worker (TypeScript)
│   └── utils/
│       └── constants.ts      # Shared constants and types
├── tsconfig.json             # TypeScript configuration
├── package.json
├── vite.config.ts            # Vite configuration (TypeScript)
└── README.md
```

## 🛠️ Setup & Development

### 1. Install Dependencies

```bash
npm install
```

### 2. Build the Extension

For development (with watch mode):
```bash
npm run dev
```

For production:
```bash
npm run build
```

The built extension will be in the `dist/` folder.

### 3. Load Extension in Chrome

1. Open Chrome and go to `chrome://extensions/`
2. Enable **Developer mode** (toggle in top-right corner)
3. Click **Load unpacked**
4. Select the `dist/` folder from this project
5. The extension icon should appear in your toolbar! 🎉

### 4. Development Workflow

1. Run `npm run dev` to start watch mode
2. Make changes to your code
3. Go to `chrome://extensions/` and click the **reload** icon on your extension
4. Test your changes

## 📝 How It Works

### Popup (React UI)
- Built with React components
- Uses Chrome Storage API to persist data
- Sends messages to content script when button is clicked

### Content Script
- Runs on all web pages
- Listens for messages from popup
- Creates floating notifications on the page

### Background Service Worker
- Runs in the background
- Handles extension lifecycle events
- Creates context menu items
- Monitors tab updates

## 🎨 Customization

### Change Extension Name/Description
Edit `public/manifest.json`:
```json
{
  "name": "Your Extension Name",
  "description": "Your description"
}
```

### Add New Features
1. Update popup UI in `src/popup/App.tsx`
2. Add content script logic in `src/content/content.ts`
3. Add background tasks in `src/background/background.ts`

### Styling
Modify `src/popup/popup.css` for the popup interface design.

### TypeScript
All files are in TypeScript for type safety:
- Use interfaces and types for better code quality
- Chrome API types are fully supported
- Run `npx tsc --noEmit` to check types

## 📦 Building for Distribution

1. Update version in `public/manifest.json`
2. Run `npm run build`
3. Zip the `dist/` folder
4. Upload to Chrome Web Store

## 🔧 Technologies

- React 18.2.0
- TypeScript 5.4.2
- Vite 5.1.0
- Chrome Extension Manifest V3

## 📚 Documentation

- `TYPESCRIPT-MIGRATION.md` - TypeScript migration guide
- `TYPESCRIPT-DONE.md` - TypeScript conversion summary
- `HUONG-DAN.md` - Vietnamese guide
- `QUICKSTART.md` - Quick start guide

## 📄 License

MIT

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

Built with ❤️ using React + Vite
# social-toolkit
