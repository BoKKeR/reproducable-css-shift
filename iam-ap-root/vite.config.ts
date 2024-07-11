import { defineConfig } from 'vite';
import vitePluginSingleSpa from 'vite-plugin-single-spa';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vitePluginSingleSpa({
      type: 'root',
      imo: '3.1.1',
      imoUi: {
        // variant: "popup",
        buttonPos: 'bottom-right',
        localStorageKey: 'imoUi',
      },
    }),
  ],
  preview: {
    port: 9000,
  },
});
