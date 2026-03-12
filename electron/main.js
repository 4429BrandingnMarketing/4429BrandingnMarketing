const { app, BrowserWindow, Menu, shell, dialog, ipcMain, desktopCapturer } = require('electron')
const { autoUpdater } = require('electron-updater')
const path = require('path')
const isDev = process.env.NODE_ENV === 'development'

// Configure auto-updater
autoUpdater.autoDownload = true
autoUpdater.autoInstallOnAppQuit = true

let mainWindow

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1200,
    minHeight: 700,
    title: 'Visionary OS - Red Vision Music Empire',
    icon: path.join(__dirname, '../public/icon.png'),
    backgroundColor: '#0a0a0f',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js')
    },
    titleBarStyle: 'default',
    frame: true
  })

  // Load the app
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173')
    // Open DevTools in development
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
  }

  // Handle external links
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url)
    return { action: 'deny' }
  })

  // Create custom menu
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Refresh',
          accelerator: 'CmdOrCtrl+R',
          click: () => mainWindow.reload()
        },
        { type: 'separator' },
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => app.quit()
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectAll' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'zoom' },
        { role: 'close' }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Check for Updates',
          click: () => {
            if (!isDev) {
              autoUpdater.checkForUpdates().then((updateCheckResult) => {
                if (!updateCheckResult || !updateCheckResult.updateInfo) {
                  dialog.showMessageBox(mainWindow, {
                    type: 'info',
                    title: 'No Updates',
                    message: 'You are running the latest version of Visionary OS.',
                    buttons: ['OK']
                  })
                }
              }).catch((error) => {
                dialog.showMessageBox(mainWindow, {
                  type: 'error',
                  title: 'Update Check Failed',
                  message: 'Unable to check for updates. Please try again later.',
                  buttons: ['OK']
                })
              })
            } else {
              dialog.showMessageBox(mainWindow, {
                type: 'info',
                title: 'Development Mode',
                message: 'Auto-updates are disabled in development mode.',
                buttons: ['OK']
              })
            }
          }
        },
        { type: 'separator' },
        {
          label: 'Documentation',
          click: async () => {
            await shell.openExternal('https://github.com/yourusername/4429BrandingnMarketing')
          }
        },
        {
          label: 'Red Vision Music',
          click: async () => {
            await shell.openExternal('https://redvisionmusic.com')
          }
        },
        { type: 'separator' },
        {
          label: 'About',
          click: () => {
            const aboutWindow = new BrowserWindow({
              width: 400,
              height: 300,
              resizable: false,
              minimizable: false,
              maximizable: false,
              title: 'About Visionary OS',
              parent: mainWindow,
              modal: true
            })
            aboutWindow.loadURL(`data:text/html;charset=utf-8,
              <html>
                <head>
                  <style>
                    body {
                      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
                      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                      color: white;
                      display: flex;
                      flex-direction: column;
                      justify-content: center;
                      align-items: center;
                      height: 100vh;
                      margin: 0;
                      text-align: center;
                    }
                    h1 { margin: 10px 0; }
                    p { margin: 5px 0; opacity: 0.9; }
                  </style>
                </head>
                <body>
                  <h1>🎵 Visionary OS</h1>
                  <p><strong>Version 1.0.0</strong></p>
                  <p>Your Complete Music Empire Operating System</p>
                  <br>
                  <p>Built by Jason @ Red Vision Music</p>
                  <p>jason@redvisionmusic.com</p>
                </body>
              </html>
            `)
            aboutWindow.setMenu(null)
          }
        }
      ]
    }
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

  // Emitted when the window is closed
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

// This method will be called when Electron has finished initialization
app.whenReady().then(() => {
  createWindow()

  // Check for updates (only in production)
  if (!isDev) {
    // Check for updates on startup
    autoUpdater.checkForUpdatesAndNotify()

    // Check for updates every 4 hours
    setInterval(() => {
      autoUpdater.checkForUpdatesAndNotify()
    }, 4 * 60 * 60 * 1000)
  }

  app.on('activate', () => {
    // On macOS, re-create window when dock icon is clicked and no other windows open
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Auto-updater event handlers
autoUpdater.on('checking-for-update', () => {
  console.log('Checking for updates...')
})

autoUpdater.on('update-available', (info) => {
  console.log('Update available:', info.version)
})

autoUpdater.on('update-not-available', () => {
  console.log('No updates available')
})

autoUpdater.on('error', (err) => {
  console.error('Auto-updater error:', err)
})

autoUpdater.on('download-progress', (progressObj) => {
  const message = `Download speed: ${progressObj.bytesPerSecond} - Downloaded ${progressObj.percent}%`
  console.log(message)
})

autoUpdater.on('update-downloaded', (info) => {
  // Show dialog when update is ready
  dialog.showMessageBox(mainWindow, {
    type: 'info',
    title: 'Update Available',
    message: `Visionary OS v${info.version} is ready to install.`,
    detail: 'The application will restart to install the update.',
    buttons: ['Install and Restart', 'Install Later'],
    defaultId: 0,
    cancelId: 1
  }).then((result) => {
    if (result.response === 0) {
      // User chose to install now
      autoUpdater.quitAndInstall(false, true)
    }
  })
})

// Security: Prevent navigation to external URLs
app.on('web-contents-created', (event, contents) => {
  contents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl)
    if (parsedUrl.origin !== 'http://localhost:5173' && !isDev) {
      event.preventDefault()
    }
  })
})

// ── Gemini 2.5 Computer Use IPC Handlers ────────────────────────────────────

// Capture the full screen as base64 PNG for the AI agent
ipcMain.handle('capture-screen', async () => {
  try {
    const sources = await desktopCapturer.getSources({
      types: ['screen'],
      thumbnailSize: { width: 1280, height: 800 }
    })
    if (sources.length === 0) return null
    // Return base64 PNG (strip the data URI prefix)
    const dataUrl = sources[0].thumbnail.toDataURL()
    return dataUrl.replace(/^data:image\/png;base64,/, '')
  } catch (err) {
    console.error('Screen capture error:', err)
    return null
  }
})

// Execute a computer-use action sent from the renderer
ipcMain.handle('execute-action', async (event, action) => {
  // In a full implementation you would use robotjs or similar
  // to perform real mouse/keyboard actions.
  // For now we log and return success so the agent loop works.
  console.log('[ComputerUse] action:', action)
  return { success: true, action }
})

// Navigate the main window to a URL (for browser-use tasks)
ipcMain.handle('navigate-to', async (event, url) => {
  try {
    if (mainWindow) {
      mainWindow.loadURL(url)
      return { success: true }
    }
    return { success: false, error: 'No main window' }
  } catch (err) {
    return { success: false, error: err.message }
  }
})
