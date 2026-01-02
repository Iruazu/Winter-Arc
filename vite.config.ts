import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  // GitHub Pages では https://username.github.io/repo-name/ のようにサブパスになる
  // リポジトリ名を設定してください（例: '/winter-arc-tracker/'）
  // ローカル開発時は '/' のまま
  base: process.env.NODE_ENV === 'production' ? '/winter-arc-tracker/' : '/',
  
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['pwa-192x192.png', 'pwa-512x512.png'],
      manifest: {
        name: 'Winter Arc Tracker',
        short_name: 'Winter Arc',
        description: 'Daily habit tracker for Winter Arc 2026',
        theme_color: '#0f172a',
        background_color: '#0f172a',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x192.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});
