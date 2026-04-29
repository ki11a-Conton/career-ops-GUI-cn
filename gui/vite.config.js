import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || 'career-ops-GUI-cn'

export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_PAGES ? `/${repoName}/` : '/',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      },
      '/output': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    },
    historyApiFallback: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
