const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  platform: process.platform,
  version: process.versions.electron,

  // ── Gemini 2.5 Computer Use ─────────────────────────────────────────────
  // Capture the full screen as a base64 PNG for the AI agent
  captureScreen: () => ipcRenderer.invoke('capture-screen'),

  // Execute a computer-use action (click, type, navigate, scroll)
  executeAction: (action) => ipcRenderer.invoke('execute-action', action),

  // Open a URL in the embedded browser view
  navigateTo: (url) => ipcRenderer.invoke('navigate-to', url),
})
