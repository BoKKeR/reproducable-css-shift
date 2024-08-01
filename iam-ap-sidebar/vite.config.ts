import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vitePluginSingleSpa from 'vite-plugin-single-spa';

// https://vitejs.dev/config/
export default function ({ command }: { command: string }) {
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
  });
}
