# 🚀 Quick Start Guide - Social Toolkit

## ✅ What's Done

Your Chrome extension is **fully built and ready to load**! 

## 📦 Project Structure

```
/Users/duynk/Documents/project/Social/
├── dist/                    ← 🎯 Load this folder in Chrome
│   ├── manifest.json
│   ├── popup.html
│   ├── popup.js
│   ├── popup.css
│   ├── background.js
│   ├── content.js
│   └── icons/
├── src/
│   ├── popup/
│   │   ├── App.jsx         ← React component
│   │   ├── main.jsx        ← React entry
│   │   └── popup.css
│   ├── content/
│   │   └── content.js
│   └── background/
│       └── background.js
└── public/
    ├── manifest.json
    └── icons/
```

## 🔧 Load Extension in Chrome

1. **Open Chrome** and navigate to:
   ```
   chrome://extensions/
   ```

2. **Enable Developer Mode**  
   Toggle the switch in the top-right corner

3. **Click "Load unpacked"**

4. **Select the `dist` folder**:
   ```
   /Users/duynk/Documents/project/Social/dist
   ```

5. **Done!** 🎉  
   The Social Toolkit icon should appear in your Chrome toolbar

## 🎮 Test the Extension

1. Click the extension icon in Chrome toolbar
2. You'll see a beautiful purple gradient popup
3. Click "Activate Feature" button
4. Visit any website and see a notification appear!
5. The counter persists across sessions using Chrome Storage

## 🛠️ Development Commands

### Install dependencies (if needed):
```bash
npm install
```

### Build for production:
```bash
npm run build
```

### Development mode (auto-rebuild on changes):
```bash
npm run dev
```

**Note:** After running `npm run dev`, you need to:
1. Go to `chrome://extensions/`
2. Click the reload icon on your extension
3. Test your changes

## 📝 Making Changes

### Update the Popup UI
Edit: `src/popup/App.jsx` and `src/popup/popup.css`

### Add Content Script Features
Edit: `src/content/content.js`

### Add Background Tasks
Edit: `src/background/background.js`

### Change Extension Settings
Edit: `public/manifest.json`

**After any change:**
1. Run `npm run build` (or keep `npm run dev` running)
2. Reload extension in Chrome

## 🎨 Features Included

✅ React 18 with modern hooks  
✅ Beautiful gradient UI design  
✅ Chrome Storage API integration  
✅ Message passing between components  
✅ Content script with page notifications  
✅ Background service worker  
✅ Context menu integration  
✅ Manifest V3 compliant  

## 🔍 Troubleshooting

**Extension doesn't load?**
- Make sure you selected the `dist` folder, not the project root
- Check console in `chrome://extensions/` for errors

**Changes not showing?**
- Rebuild: `npm run build`
- Reload extension in `chrome://extensions/`

**Popup not opening?**
- Check browser console (F12) for errors
- Verify `dist/popup.html` exists

## 🚀 Next Steps

- Customize the UI in `src/popup/App.jsx`
- Add your social media features
- Update icons in `public/icons/`
- Add more permissions in `public/manifest.json` if needed

---

**Enjoy building your Chrome extension!** 🎉
