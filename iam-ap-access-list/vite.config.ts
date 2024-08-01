import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vitePluginSingleSpa from "vite-plugin-single-spa";

// https://vitejs.dev/config/
export default function ({ command }: { command: string }) {
  return defineConfig({
    plugins: [
      vue(),
      vitePluginSingleSpa({
        serverPort: 9002,
        spaEntryPoints: "src/spa.ts",
        type: "mife",
        cssStrategy: "singleMife"
      })
    ],
    resolve: {
      alias: {
        "@/": "./src"
      }
    },
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        input: "src/spa.ts",
        preserveEntrySignatures: "strict"
      }
    },
    preview: {
      port: 9002
    },
    base: command === "build" ? "/m/ap-access-list/" : "./",
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./node_modules/pn-design-assets/pn-assets/styles/pn-styles.scss";`
        }
      }
    }
  });
}
