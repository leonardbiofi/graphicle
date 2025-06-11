import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  root: __dirname,
  server: {
    open: true,
    watch: {
      // watch the dist folder to reload on changes
      ignored: ["!**/../dist/**"],
    },
  },
  // resolve: {
  //   alias: {
  //     // Optional: resolve imports to built dist
  //     "@graphicle": path.resolve(__dirname, "../../dist"),
  //   },
  // },
});
