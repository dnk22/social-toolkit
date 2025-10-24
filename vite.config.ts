import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { copyFileSync, mkdirSync, existsSync, readFileSync, writeFileSync } from 'fs';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'chrome-extension-build',
      closeBundle() {
        // Ensure icons directory exists
        mkdirSync('dist/icons', { recursive: true });
        
        // Copy manifest and icons
        copyFileSync('public/manifest.json', 'dist/manifest.json');
        copyFileSync('public/icons/icon16.svg', 'dist/icons/icon16.svg');
        copyFileSync('public/icons/icon48.svg', 'dist/icons/icon48.svg');
        copyFileSync('public/icons/icon128.svg', 'dist/icons/icon128.svg');
        
        // Fix popup.html paths (change absolute to relative)
        const htmlPath = 'dist/src/popup/popup.html';
        const targetHtmlPath = 'dist/popup.html';
        
        if (existsSync(htmlPath)) {
          let html = readFileSync(htmlPath, 'utf-8');
          html = html.replace(/src="\/index\.tsx"/g, 'src="index.js"');
          html = html.replace(/src="\/index\.jsx"/g, 'src="index.js"');
          html = html.replace(/href="\/popup\.css"/g, 'href="popup.css"');
          writeFileSync(targetHtmlPath, html);
          console.log('✓ Fixed popup.html paths and copied to dist root');
        }
      }
    }
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'src/popup/index.tsx'),
        background: resolve(__dirname, 'src/background/background.ts'),
        content: resolve(__dirname, 'src/content/content.ts'),
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'popup.css') return 'popup.css';
          return '[name].[ext]';
        },
      },
    },
  },
});
