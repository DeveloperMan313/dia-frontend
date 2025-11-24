import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { DEST_ROOT } from "./target_config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: DEST_ROOT,
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8001",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
