import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Genera chunks más pequeños para mejor caching del browser
    rollupOptions: {
      output: {
        // En Vite 8 (rolldown), manualChunks debe ser una función
        manualChunks(id) {
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) {
            return 'vendor'
          }
          if (id.includes('node_modules/react-router-dom') || id.includes('node_modules/react-router/')) {
            return 'router'
          }
        },
      },
    },
    // Umbral de advertencia de tamaño de chunk
    chunkSizeWarningLimit: 600,
    // Vite 8 usa oxc por defecto (ya incluido, no requiere instalación)
  },
})
