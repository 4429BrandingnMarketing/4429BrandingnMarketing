#!/bin/bash
# Build macOS DMG on Mac
# Run this script on your Mac to create the .dmg file

set -e

echo "🍎 Building Visionary OS for macOS..."
echo ""

# Check if on macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
    echo "❌ Error: This script must be run on macOS"
    echo "Current OS: $OSTYPE"
    echo ""
    echo "To build on Mac:"
    echo "1. Transfer this entire project folder to your Mac"
    echo "2. Open Terminal on Mac"
    echo "3. cd to this directory"
    echo "4. Run: chmod +x build-mac-dmg.sh"
    echo "5. Run: ./build-mac-dmg.sh"
    exit 1
fi

# Check Node.js version
echo "Checking Node.js version..."
NODE_VERSION=$(node --version)
echo "Node version: $NODE_VERSION"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Build the app
echo ""
echo "🔨 Building Visionary OS..."
npm run build

# Build macOS DMG
echo ""
echo "📀 Creating macOS DMG installer..."
npx electron-builder --mac --config electron-builder.json

# Check if build succeeded
if [ -f "release/Visionary OS-1.0.0-x64.dmg" ]; then
    echo ""
    echo "✅ SUCCESS! macOS DMG created:"
    echo ""
    ls -lh release/*.dmg
    echo ""
    echo "📍 DMG files location:"
    echo "$(pwd)/release/"
    echo ""

    # Copy to Desktop
    echo "📋 Copying DMG to Desktop..."
    cp release/*.dmg ~/Desktop/
    echo ""
    echo "✅ DMG files copied to your Desktop!"
    echo ""

    # Show file info
    echo "📊 Build Summary:"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    du -sh release/*.dmg
    echo ""
    echo "🎉 Ready to distribute!"
    echo ""
    echo "Next steps:"
    echo "1. Test the DMG by opening it"
    echo "2. Upload to GitHub Releases"
    echo "3. Share with users!"
    echo ""
else
    echo ""
    echo "❌ Build failed. Check error messages above."
    exit 1
fi
