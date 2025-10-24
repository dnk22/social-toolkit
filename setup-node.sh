#!/bin/bash
# Helper script to set up the correct Node.js version

export PATH="/Users/duynk/.nvm/versions/node/v22.17.0/bin:$PATH"

echo "✓ Node.js path configured"
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"
echo ""
echo "You can now run:"
echo "  npm install"
echo "  npm run build"
echo "  npm run dev"
