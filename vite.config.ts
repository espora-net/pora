import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { copyFileSync, mkdirSync, existsSync } from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-assets',
      closeBundle() {
        // Ensure assets directory exists
        const assetsDir = path.resolve(__dirname, 'dist/assets')
        if (!existsSync(assetsDir)) {
          mkdirSync(assetsDir, { recursive: true })
        }
        
        // Copy logo to assets directory for splash screen
        try {
          copyFileSync(
            path.resolve(__dirname, 'public/images/baobab.png'),
            path.resolve(__dirname, 'dist/assets/baobab.png')
          )
          console.log('✓ Logo copied to assets directory')
        } catch (err) {
          console.error('Error copying logo:', err)
        }
      }
    }
  ],
  base: './', // Relative paths for compatibility
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/index.scss";',
        api: "modern-compiler",
      },
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom']
        }
      }
    }
  },
  server: {
    port: 5173,
    strictPort: true, // Don't try another port if 5173 is in use
  }
})
