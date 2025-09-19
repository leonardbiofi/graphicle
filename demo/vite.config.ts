import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import viteTsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
// import { viteStaticCopy } from "vite-plugin-static-copy";
const config = defineConfig({
  plugins: [
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tailwindcss(),
    tanstackStart({
      target: "netlify",
      customViteReactPlugin: true,
    }),
    // viteStaticCopy({
    //   targets: [
    //     {
    //       src: "data/*.json",
    //       dest: "data/*.json",
    //     },
    //   ],
    // }),
    viteReact(),
  ],
});

export default config;
