import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Frontend-only Vite configuration for ALANA Project
export default defineConfig({
  plugins: [react()],
  
  // Frontend-only build configuration
  build: {
    target: 'es2015',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    minify: 'esbuild',
    
    // Ensure no server-side code is included
    rollupOptions: {
      external: ['deno', 'supabase'],
      output: {
        manualChunks: undefined
      }
    }
  },
  
  // Development server (frontend only)
  server: {
    port: 3000,
    host: true,
    open: true
  },
  
  // No SSR - client-side only
  ssr: false,
  
  // Define environment for frontend-only app
  define: {
    __FRONTEND_ONLY__: true,
    __DISABLE_SUPABASE__: true
  },
  
  // Resolve configuration
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})