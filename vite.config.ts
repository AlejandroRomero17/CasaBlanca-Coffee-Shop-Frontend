// vite.config.ts
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// ✅ Recuperar __dirname estilo ESM
const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
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
