import path from 'path'

import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  plugins: [react(), svgr()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use '~/assets/styles/vars.scss' as *;`,
      },
    },
  },
  resolve: {
    alias: {
      '~': path.join(__dirname, './src'),
    },
  },
})
