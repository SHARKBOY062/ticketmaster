import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: ".", // mantém index.html na raiz
  resolve: {
    alias: {
      "@": "/resource",
    },
  },
});
