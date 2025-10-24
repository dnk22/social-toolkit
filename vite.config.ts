import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve, dirname } from 'path';
import { copyFileSync, mkdirSync, existsSync, readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
        
        // Copy and fix popup.html
        const sourceHtmlPath = 'src/popup/popup.html';
        const targetHtmlPath = 'dist/popup.html';
        
        if (existsSync(sourceHtmlPath)) {
          let html = readFileSync(sourceHtmlPath, 'utf-8');
          // Update script path to point to built index.js
          html = html.replace(/src="\.\/index\.jsx"/g, 'src="index.js"');
          html = html.replace(/src="\.\/index\.tsx"/g, 'src="index.js"');
          // Add CSS link if not present
          if (!html.includes('popup.css') && !html.includes('index.css')) {
            html = html.replace('</head>', '  <link rel="stylesheet" href="index.css">\n</head>');
          }
          writeFileSync(targetHtmlPath, html);
          console.log('✓ Copied popup.html to dist root with fixed paths');
        }
      }
    }
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'src/popup/index.jsx'),
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
