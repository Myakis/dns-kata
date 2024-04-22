import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      shared: '/src/shared',
      widgets: '/src/widgets',
      entities: '/src/entities',
      features: '/src/features',
      pages: '/src/pages',
    }
  },
})
