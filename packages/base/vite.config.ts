import { defineConfig } from "vite";
import path from "path";
// import { viteStaticCopy } from "vite-plugin-static-copy";
import dts from "vite-plugin-dts";
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "graphicle",
      formats: ["es", "cjs"],
      fileName: (format) => `graphicle.${format}.js`,
    },
    rollupOptions: {
      external: ["pixi.js"], // Externalize pixi.js unless you want to bundle it
    },
  },
  plugins: [
    dts(),
    // viteStaticCopy({
    //   targets: [
    //     {
    //       src: "assets/**/*",
    //       dest: "assets",
    //     },
    //   ],
    // }),
  ],
});
