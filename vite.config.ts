import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['react', 'react-dom']
  },
  build: {
    // Otimizações para reduzir uso de memória e JavaScript não utilizado
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react'],
          ads: ['./src/components/AdSmartlink', './src/components/AdverticaBanner', './src/components/VisualAd']
        },
        // Tree shaking mais agressivo
        experimentalMinChunkSize: 10000
      }
    },
    // Otimizações para reduzir bundle size
    minify: 'esbuild'
  },
  server: {
    // Configurações do servidor para usar menos memória
    hmr: {
      overlay: false
    },
    // Limitar recursos
    fs: {
      strict: false
    }
  },
  // Otimizações para resolver ERR_INSUFFICIENT_RESOURCES
  esbuild: {
    target: 'es2020'
  }
})
