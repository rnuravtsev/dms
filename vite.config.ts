import { resolve } from 'path'

import alias from '@rollup/plugin-alias'
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
  plugins: [
    react(),
    svgr(),
    alias({
      entries: [
        {
          find: '@components',
          replacement: resolve(__dirname, 'src/components'),
        },
        {
          find: '@shared',
          replacement: resolve(__dirname, 'src/shared'),
        },
        {
          find: '@assets',
          replacement: resolve(__dirname, 'src/assets'),
        },
        {
          find: '@store',
          replacement: resolve(__dirname, 'src/store'),
        },
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use 'src/assets/styles/vars.scss' as *;`,
      },
    },
  },
})
