import { randomUUID } from 'node:crypto'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_DEV_RUN_ID': JSON.stringify(randomUUID()),
  },
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
    headers: { 'Cache-Control': 'no-store' },
  },
})
