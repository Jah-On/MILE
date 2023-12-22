import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
  plugins: [viteSingleFile()],
  root:    "src",
  build: {
    minify:      true,
    cssMinify:   false,
    outDir:      "../dist",
    emptyOutDir: true,
  },
});
