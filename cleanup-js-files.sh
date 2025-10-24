#!/bin/bash
# Script để xóa các file JavaScript cũ sau khi đã chuyển sang TypeScript

echo "🧹 Cleaning up old JavaScript files..."
echo ""

# Backup trước khi xóa
echo "📦 Creating backup..."
mkdir -p .backup
cp -r src .backup/src-backup-$(date +%Y%m%d-%H%M%S)

# Xóa file JSX/JS cũ
echo "🗑️  Removing old files..."

if [ -f "src/popup/App.jsx" ]; then
    rm src/popup/App.jsx
    echo "   ✓ Removed src/popup/App.jsx"
fi

if [ -f "src/popup/index.jsx" ]; then
    rm src/popup/index.jsx
    echo "   ✓ Removed src/popup/index.jsx"
fi

if [ -f "src/content/content.js" ]; then
    rm src/content/content.js
    echo "   ✓ Removed src/content/content.js"
fi

if [ -f "src/background/background.js" ]; then
    rm src/background/background.js
    echo "   ✓ Removed src/background/background.js"
fi

if [ -f "vite.config.js" ]; then
    rm vite.config.js
    echo "   ✓ Removed vite.config.js"
fi

echo ""
echo "✅ Cleanup complete!"
echo ""
echo "📁 Backup created in: .backup/"
echo ""
echo "🔍 Remaining files:"
find src -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.css" -o -name "*.html" \) | sort

echo ""
echo "🚀 Now you can build with TypeScript:"
echo "   npm run build"
