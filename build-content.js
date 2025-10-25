import { build } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Check if watch mode is enabled
const isWatch = process.argv.includes('--watch');

async function buildContentScript(name, entry) {
  console.log(`\n📦 Building ${name} content script${isWatch ? ' (watch mode)' : ''}...`);
  
  const config = {
    configFile: false,
    build: {
      outDir: 'dist',
      emptyOutDir: false,
      watch: isWatch ? {} : null,
      lib: {
        entry: resolve(__dirname, entry),
        formats: ['iife'],
        name: 'ContentScript',
        fileName: () => `${name}.js`,
      },
      rollupOptions: {
        output: {
          extend: true,
        },
      },
      minify: false,
    },
  };
  
  if (isWatch) {
    // Watch mode - returns a watcher
    const watcher = await build(config);
    console.log(`👁️  Watching ${name}.js for changes...`);
    return watcher;
  } else {
    // Build once
    await build(config);
    console.log(`✅ ${name}.js built successfully`);
  }
}

async function main() {
  try {
    if (isWatch) {
      console.log('👁️  Starting content scripts in watch mode...\n');
      
      // Start watchers (don't await, let them run in parallel)
      await Promise.all([
        buildContentScript('instagram', 'src/content/instagram.ts'),
        buildContentScript('facebook', 'src/content/facebook.ts'),
      ]);
      
      console.log('\n✅ All content scripts are being watched!');
      console.log('Press Ctrl+C to stop watching\n');
    } else {
      // Build Instagram content script
      await buildContentScript('instagram', 'src/content/instagram.ts');
      
      // Build Facebook content script
      await buildContentScript('facebook', 'src/content/facebook.ts');
      
      console.log('\n🎉 All content scripts built!');
    }
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

main();
