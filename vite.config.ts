import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      // Configuración detallada del optimizador de imágenes
      test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,
      includePublic: true,
      logStats: true,
      ansiColors: true,
      svg: {
        multipass: true,
        plugins: [
          {
            name: "preset-default",
            params: {
              overrides: {
                cleanupNumericValues: false,
                removeViewBox: false,
              },
            },
          },
          "prefixIds",
        ],
      },
      png: {
        quality: 80,
        compressionLevel: 9,
      },
      jpeg: {
        quality: 80,
      },
      jpg: {
        quality: 80,
      },
      tiff: {
        quality: 80,
      },
      webp: {
        quality: 80,
        lossless: false,
      },
      avif: {
        quality: 70,
        lossless: false,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@types": path.resolve(__dirname, "./src/types"),
    },
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("framer-motion")) return "chunk-motion";
            if (id.includes("@stripe")) return "chunk-stripe";
            if (id.includes("react")) return "chunk-react";
          }
        },
      },
    },
  },
  server: {
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '3da0-2806-105e-8-f5be-6107-d619-370-2e1e.ngrok-free.app'
    ]
  },
});
