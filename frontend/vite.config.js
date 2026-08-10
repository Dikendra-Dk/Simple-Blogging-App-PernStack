import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      // Any fetch to /api/... from the browser gets forwarded to the
      // backend container. "backend" resolves via Docker's internal DNS
      // because that's the service name in docker-compose.yml.
      "/api": {
        target: "http://backend:4000",
        changeOrigin: true,
      },
    },
  },
});