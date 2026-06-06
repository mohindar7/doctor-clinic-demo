import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ['chrome >= 109', 'defaults', 'not IE 11'],
      modernTargets: ['chrome >= 109'],
      modernPolyfills: true,
    }),
  ],
  build: {
    // Use terser for better minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,     // Remove console.log in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.warn'],
      },
    },
    // Split vendor chunks for better caching
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
    // Increase chunk warning limit slightly (our CSS is intentionally large)
    chunkSizeWarningLimit: 600,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Generate source maps only in development
    sourcemap: false,
    // Inline small assets to reduce HTTP requests
    assetsInlineLimit: 4096,
  },
  // Optimize deps pre-bundling
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
})
