import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  publicDir: 'public',
  optimizeDeps: {
    include: ['react', 'react-dom', 'styled-components'],
  },
  ssr: {
    // Bundlé pour le pré-rendu : l’export CommonJS de styled-components casse l’interop ESM de Node.
    noExternal: ['styled-components'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    // Le build SSR ne sert qu’au pré-rendu : inutile d’y copier public/.
    copyPublicDir: !isSsrBuild,
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor';
          }
          if (
            id.includes('node_modules/three') ||
            id.includes('node_modules/@react-three/fiber') ||
            id.includes('node_modules/@react-three/drei')
          ) {
            return 'three';
          }
          if (id.includes('node_modules/framer-motion')) return 'animations';
          if (id.includes('node_modules/react-icons')) return 'icons';
        },
      },
    },
  },
  server: {
    port: 3000,
  },
}))
