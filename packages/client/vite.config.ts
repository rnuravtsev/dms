import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import path from 'path'
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
        additionalData: `@import '~/styles/vars.scss';`,
      },
    },
  },
  resolve: {
    alias: {
      app: path.join(__dirname, './src/app'),
      '~': path.join(__dirname, './src'),
    },
  },
})
