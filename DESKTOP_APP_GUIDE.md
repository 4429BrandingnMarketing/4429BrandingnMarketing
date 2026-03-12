# 🖥️ Visionary OS - Desktop App Guide
## Standalone Desktop Application for Windows, macOS, and Linux

Your complete music empire now runs as a native desktop application!

---

## 🚀 Quick Start

### Running in Development Mode

```bash
# Start the desktop app with hot reload
npm run electron:dev
```

This will:
1. Start Vite dev server on http://localhost:5173
2. Wait for it to be ready
3. Launch Electron window
4. Auto-reload on code changes

---

## 📦 Building Distributables

### Build for Current Platform

```bash
# Build for whatever platform you're on
npm run electron:build
```

Output: `release/` folder with installable app

### Build for Specific Platform

**Windows:**
```bash
npm run electron:build:win
```
Outputs:
- `Visionary-OS-1.0.0-x64.exe` - Installer (NSIS)
- `Visionary-OS-1.0.0-arm64.exe` - ARM64 installer
- `Visionary-OS-1.0.0-x64-portable.exe` - Portable version

**macOS:**
```bash
npm run electron:build:mac
```
Outputs:
- `Visionary-OS-1.0.0-x64.dmg` - Intel Mac installer
- `Visionary-OS-1.0.0-arm64.dmg` - Apple Silicon (M1/M2/M3) installer
- `Visionary-OS-1.0.0-x64.zip` - Intel Mac archive
- `Visionary-OS-1.0.0-arm64.zip` - Apple Silicon archive

**Linux:**
```bash
npm run electron:build:linux
```
Outputs:
- `Visionary-OS-1.0.0-x64.AppImage` - Universal Linux (recommended)
- `Visionary-OS-1.0.0-arm64.AppImage` - ARM64 AppImage
- `Visionary-OS-1.0.0-x64.deb` - Debian/Ubuntu package
- `Visionary-OS-1.0.0-arm64.deb` - ARM64 Debian package
- `Visionary-OS-1.0.0-x64.rpm` - Red Hat/Fedora package

**All Platforms:**
```bash
npm run electron:build:all
```
Builds for Windows, macOS, and Linux simultaneously.

---

## 📁 File Structure

```
4429BrandingnMarketing/
├── electron/
│   ├── main.js           # Electron main process
│   └── preload.js        # Preload script (security)
├── build/
│   ├── icon.ico          # Windows icon (256x256)
│   ├── icon.icns         # macOS icon
│   └── icons/            # Linux icons (16x16 to 512x512)
├── electron-builder.json # Build configuration
├── release/              # Built apps (gitignored)
└── dist/                 # Vite build output
```

---

## 🎨 Custom App Icon

### Creating Icons

**1. Start with a 1024x1024 PNG**
- Your logo or branding
- Transparent background recommended
- Named `icon.png`

**2. Generate Platform-Specific Icons:**

**Windows (.ico):**
```bash
# Online tool: https://convertio.co/png-ico/
# Or use ImageMagick:
convert icon.png -define icon:auto-resize=256,128,64,48,32,16 build/icon.ico
```

**macOS (.icns):**
```bash
# Use online tool: https://cloudconvert.com/png-to-icns
# Or use iconutil on Mac:
mkdir icon.iconset
sips -z 16 16     icon.png --out icon.iconset/icon_16x16.png
sips -z 32 32     icon.png --out icon.iconset/icon_16x16@2x.png
sips -z 32 32     icon.png --out icon.iconset/icon_32x32.png
sips -z 64 64     icon.png --out icon.iconset/icon_32x32@2x.png
sips -z 128 128   icon.png --out icon.iconset/icon_128x128.png
sips -z 256 256   icon.png --out icon.iconset/icon_128x128@2x.png
sips -z 256 256   icon.png --out icon.iconset/icon_256x256.png
sips -z 512 512   icon.png --out icon.iconset/icon_256x256@2x.png
sips -z 512 512   icon.png --out icon.iconset/icon_512x512.png
sips -z 1024 1024 icon.png --out icon.iconset/icon_512x512@2x.png
iconutil -c icns icon.iconset -o build/icon.icns
```

**Linux (PNG set):**
```bash
mkdir -p build/icons
convert icon.png -resize 16x16 build/icons/16x16.png
convert icon.png -resize 32x32 build/icons/32x32.png
convert icon.png -resize 48x48 build/icons/48x48.png
convert icon.png -resize 64x64 build/icons/64x64.png
convert icon.png -resize 128x128 build/icons/128x128.png
convert icon.png -resize 256x256 build/icons/256x256.png
convert icon.png -resize 512x512 build/icons/512x512.png
```

---

## ⚙️ Configuration

### App Metadata (`package.json`)

```json
{
  "name": "visionary-os",
  "version": "1.0.0",
  "description": "Your Complete Music Empire Operating System",
  "author": "Jason Salvador <jason@redvisionmusic.com>",
  "homepage": "https://redvisionmusic.com"
}
```

Update version before each release.

### Build Configuration (`electron-builder.json`)

Key settings:

```json
{
  "appId": "com.redvisionmusic.visionaryos",
  "productName": "Visionary OS",
  "copyright": "Copyright © 2024 Red Vision Music"
}
```

---

## 🔐 Code Signing (Optional but Recommended)

### macOS

**1. Get Apple Developer Account ($99/year)**

**2. Create certificates:**
- Developer ID Application
- Developer ID Installer

**3. Add to `electron-builder.json`:**
```json
{
  "mac": {
    "identity": "Developer ID Application: Your Name (TEAM_ID)"
  }
}
```

**4. Notarize:**
```json
{
  "afterSign": "scripts/notarize.js"
}
```

### Windows

**1. Get code signing certificate**
- DigiCert, Sectigo, etc. (~$100-400/year)

**2. Add to `electron-builder.json`:**
```json
{
  "win": {
    "certificateFile": "path/to/cert.pfx",
    "certificatePassword": "password"
  }
}
```

---

## 📤 Distribution

### Option 1: Direct Download (Simple)

1. Build apps: `npm run electron:build:all`
2. Upload `release/` files to your website
3. Share download links

**Example download page:**
- Windows: `https://redvisionmusic.com/downloads/windows`
- macOS: `https://redvisionmusic.com/downloads/mac`
- Linux: `https://redvisionmusic.com/downloads/linux`

### Option 2: GitHub Releases (Recommended)

**1. Create GitHub Release:**
```bash
# Tag version
git tag v1.0.0
git push origin v1.0.0
```

**2. GitHub Actions (auto-build):**
Create `.github/workflows/build.yml`:

```yaml
name: Build Desktop Apps

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [macos-latest, ubuntu-latest, windows-latest]

    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18

      - run: npm install
      - run: npm run electron:build

      - uses: actions/upload-artifact@v3
        with:
          name: ${{ matrix.os }}-build
          path: release/*
```

**3. Auto-upload to releases:**
Users download from GitHub Releases page automatically.

### Option 3: Auto-Updates

**Enable in `electron-builder.json`:**
```json
{
  "publish": {
    "provider": "github",
    "owner": "yourusername",
    "repo": "4429BrandingnMarketing"
  }
}
```

**Users get automatic updates!**

---

## 🎯 Platform-Specific Notes

### Windows

**Installer Types:**
- **NSIS** - Traditional installer (recommended)
- **Portable** - No installation, run from anywhere

**Installation Location:**
- `C:\Program Files\Visionary OS\`

**Start Menu Entry:**
- Yes, created automatically

**Desktop Shortcut:**
- Yes, optional during install

### macOS

**File Types:**
- **DMG** - Drag-and-drop installer (recommended)
- **ZIP** - Archive for advanced users

**Installation:**
- Drag to Applications folder
- Launch from Launchpad or Applications

**First Launch:**
- Right-click → Open (first time only)
- Or: System Settings → Privacy & Security → Open Anyway

**Apple Silicon Support:**
- Native ARM64 builds for M1/M2/M3 Macs
- Faster and more efficient than Rosetta 2

### Linux

**Formats:**
- **AppImage** - Universal, no installation needed (recommended)
- **DEB** - Debian/Ubuntu package manager
- **RPM** - Red Hat/Fedora package manager

**AppImage Usage:**
```bash
# Make executable
chmod +x Visionary-OS-1.0.0-x64.AppImage

# Run
./Visionary-OS-1.0.0-x64.AppImage
```

**DEB Installation:**
```bash
sudo dpkg -i Visionary-OS-1.0.0-x64.deb
sudo apt-get install -f  # Fix dependencies
```

**RPM Installation:**
```bash
sudo rpm -i Visionary-OS-1.0.0-x64.rpm
```

---

## 🐛 Troubleshooting

### Build Fails

**"Cannot find module 'electron'":**
```bash
rm -rf node_modules package-lock.json
npm install
```

**"ENOENT: no such file or directory":**
- Make sure you ran `npm run build` first
- Check `dist/` folder exists

**Icon not showing:**
- Verify icon files exist in `build/` folder
- Check file names match `electron-builder.json`

### App Won't Start

**White screen:**
- Check browser console (View → Toggle DevTools)
- Verify `dist/index.html` exists

**"App is damaged" (macOS):**
```bash
# Remove quarantine flag
xattr -cr /Applications/Visionary\ OS.app
```

**Linux permissions:**
```bash
chmod +x Visionary-OS-1.0.0-x64.AppImage
```

### Development Mode

**Vite dev server not starting:**
```bash
# Check port 5173 is available
lsof -i :5173
kill -9 <PID>
```

**Electron window blank:**
- Wait for Vite to finish starting
- Check `http://localhost:5173` in browser first

---

## 📊 File Sizes (Approximate)

| Platform | Format | Size |
|----------|--------|------|
| Windows | NSIS Installer | ~100 MB |
| Windows | Portable | ~100 MB |
| macOS | DMG (x64) | ~110 MB |
| macOS | DMG (arm64) | ~105 MB |
| Linux | AppImage | ~115 MB |
| Linux | DEB | ~100 MB |

Sizes include:
- Electron runtime (~50 MB)
- Chromium (~40 MB)
- Your app code (~5-10 MB)
- Dependencies (~10-20 MB)

---

## 🔄 Version Management

**Before releasing new version:**

1. **Update version:**
```bash
npm version patch  # 1.0.0 → 1.0.1
npm version minor  # 1.0.0 → 1.1.0
npm version major  # 1.0.0 → 2.0.0
```

2. **Build:**
```bash
npm run electron:build:all
```

3. **Test on all platforms**

4. **Release:**
- Upload to website
- Or create GitHub release
- Update download links

---

## ✅ Release Checklist

Before distributing:

- [ ] Update version in `package.json`
- [ ] Test app on target platforms
- [ ] Create custom app icons
- [ ] Update copyright year
- [ ] Code sign (if possible)
- [ ] Test installer/DMG/AppImage
- [ ] Write release notes
- [ ] Update website download links
- [ ] Announce on social media

---

## 🎉 You're Ready!

Your Visionary OS is now a **professional desktop application** that:

✅ Runs natively on Windows, macOS, and Linux
✅ Installs like any commercial software
✅ Works offline (after initial launch)
✅ Has custom icon and branding
✅ Auto-updates (if configured)
✅ Looks and feels like a real app

**No browser required. No command line. Just double-click and run.**

---

## 📞 Support

**Build Issues:**
- Electron Builder Docs: https://www.electron.build/
- Electron Docs: https://www.electronjs.org/docs/latest/

**Your Visionary OS:**
- Email: jason@redvisionmusic.com
- GitHub: Your repository issues

---

*Your empire, now in app form. Distribute with pride!* 🚀
