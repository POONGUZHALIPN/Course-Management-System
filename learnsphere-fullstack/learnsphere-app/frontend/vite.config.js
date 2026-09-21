import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The backend (server.js, in the parent folder) runs on port 3000 and
// exposes /api/*. In development, Vite serves the React app on port 5173
// and proxies any /api request straight through to that backend, so the
// browser only ever talks to one origin and cookies/sessions work exactly
// like they do in production.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: "dist",
  },
});
