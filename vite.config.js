import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    fs: {
      // Exclude auto-claude directory from Vite's file watcher
      deny: ['**/auto-claude/**']
    }
  },
  optimizeDeps: {
    // Exclude auto-claude from dependency optimization
    exclude: ['auto-claude']
  }
})
