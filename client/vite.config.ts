import { defineConfig } from "vite";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

// https://vitejs.dev/config/

//"$schema": "https://json.schemastore.org/web-manifest-combined.json"

const viteOptions: Partial<VitePWAOptions> = {
  registerType: "autoUpdate",
  injectRegister: "auto",
  workbox: {
    globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
    cleanupOutdatedCaches: true,
    sourcemap: true,
  },
  devOptions: {
    enabled: true,
    /* other options */
  },
  includeAssets: [
    "favicon.ico",
    "apple-touch-logo.png",
    "icon16.png",
    "icon32.png",
    "maskakable_icon.png",
    "olgabyte.svg",
    "pwa-192x192.png",
    "pwa-256x256",
    "pwa-384x384",
    "pwa-512x512",
  ],
  manifest: {
    name: "OLGABYTE",
    short_name: "OLGABYTE REGISTER",
    description: "Attendance Management System.",
    theme_color: "#134074",
    background_color: "#f0e7db",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
    icons: [
      {
        src: "/pwa-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/pwa-384x384.png",
        sizes: "384x384",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/pwa-256x256.png",
        sizes: "256x256",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  },
};

//,tsconfigPaths(), VitePWA(viteOptions)

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    host: true,
    watch: {
      usePolling: true,
    },
  },
});
