import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
  tailwindcss(),
  VitePWA({
    registerType: 'autoUpdate', // auto check for updates
    strategies: 'generateSW',   // Workbox generateSW
    srcDir: 'src',
    filename: 'sw.ts',          // optional if using injectManifest
    manifest: {
      name: 'My App',
      short_name: 'MyApp',
      description: 'My awesome Vite + React PWA',
      theme_color: '#0ea5a4',
      background_color: '#ffffff',
      display: 'standalone',
      start_url: '/',
      scope: '/',
      icons: [
        {
          src: '/pwa-192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/pwa-512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: '/pwa-maskable.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        }
      ]
    },
    workbox: {
      // customize caching rules if needed
      runtimeCaching: [
        {
          urlPattern: ({ request }) => request.destination === 'document',
          handler: 'NetworkFirst',
          options: {
            cacheName: 'html-cache'
          }
        },
        {
          urlPattern: ({ request }) => request.destination === 'script' || request.destination === 'style' || request.destination === 'image',
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'assets-cache'
          }
        }
      ]
    }
  })],
})
