import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import legacy from '@vitejs/plugin-legacy'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    legacy({
      targets: ["ie>=11"],
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
    })
  ],
  base: './',
  server: {
    host: '127.0.0.1',
    allowedHosts: ['2635-203-121-229-38.ngrok-free.app'],
    // port: 3000,
    open: true // 啟動後自動開瀏覽器
  }
})
