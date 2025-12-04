import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/CV-BUILDER/", // nom du repo GitHub
  plugins: [react()],
});
