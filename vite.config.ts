import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  base: "https://dw-frontend.connectvirtue.com/",
  build: {
    chunkSizeWarningLimit: 1000, // Adjust the limit as needed
    outDir: 'dist',
  },
  
});
 