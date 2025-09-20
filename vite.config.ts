import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        client: resolve(__dirname, 'src/entry-client.tsx'),
        server: resolve(__dirname, 'src/entry-server.tsx')
      },
      output: {
        entryFileNames: (chunkInfo) => {
          return chunkInfo.name === 'server' ? 'server.js' : '[name]-[hash].js'
        }
      }
    },
    ssrManifest: true,
    manifest: true
  },
  ssr: {
    noExternal: ['react', 'react-dom', 'react-router-dom']
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "./src/styles/variables.scss" as *;`
      }
    }
  }
})
