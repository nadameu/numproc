import { defineConfig } from "vite";

export default defineConfig({
  build: { target: "firefox91", sourcemap: true },
});
