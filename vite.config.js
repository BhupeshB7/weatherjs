import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // Used for resolving paths

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@/": `${path.resolve(__dirname, "src")}/`, // Ensures @ maps to src folder
      "@shadcn/ui": path.resolve(__dirname, "node_modules/@shadcn/ui"), // Alias for shadcn components
    },
  },
  server: {
    port: 3000,
    host:true,
    open: true,
  },
});
