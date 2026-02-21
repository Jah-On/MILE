// import { defineConfig } from "vite";
// import { viteSingleFile } from "vite-plugin-singlefile";

// export default defineConfig({
// 	plugins: [viteSingleFile()],
// 	root: "src",
// 	build: {
// 		minify: false,
// 		cssMinify: false,
// 		outDir: "../dist",
// 		emptyOutDir: true,
// 	},
// });

import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: "src",
  build: {
    outDir: "../dist",
    rollupOptions:{
      input: {
        main: "src/index.html",
        project: "src/project.html",
        problem: "src/problem.html",
      }
    }
  }
});