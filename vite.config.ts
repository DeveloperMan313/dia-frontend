import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import mkcert from "vite-plugin-mkcert";
import fs from "node:fs";
import path from "node:path";

const vitePWA = VitePWA({
  registerType: "autoUpdate",
  devOptions: {
    enabled: true,
  },
  manifest: {
    name: "Let There Be Light",
    short_name: "Let There Be Light",
    start_url: "/",
    display: "standalone",
    background_color: "#fdfdfd",
    theme_color: "#f7ca59",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/favicon.svg",
        type: "image/svg",
        sizes: "any",
      },
      {
        src: "/favicon.svg",
        type: "image/svg",
        sizes: "512x512",
      },
    ],
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mkcert(), vitePWA],
  base: "dia-frontend",
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "cert.key")),
      cert: fs.readFileSync(path.resolve(__dirname, "cert.crt")),
    },
    proxy: {
      "/api": {
        target: "http://localhost:8001",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
