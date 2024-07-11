import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vitePluginSingleSpa from 'vite-plugin-single-spa';

// https://vitejs.dev/config/
export default function ({ command }: { command: string }) {
  console.log({ command });

  return defineConfig({
    plugins: [
      vue(),
      vitePluginSingleSpa({
        serverPort: 9001,
        spaEntryPoints: 'src/spa.ts',
        type: 'mife',
        cssStrategy: 'singleMife',
      }),
    ],
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        input: 'src/spa.ts',
        preserveEntrySignatures: 'strict',
      },
    },
    preview: {
      port: 9001,
    },
    base: command === 'build' ? 'http://localhost:9001' : './',
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @import "./node_modules/pn-design-assets/pn-assets/styles/_pn-colors.scss";
          @import "./node_modules/pn-design-assets/pn-assets/styles/_pn-fonts.scss";
          @import "./node_modules/pn-design-assets/pn-assets/styles/_pn-resets.scss";`,
        },
      },
    },
  });
}
