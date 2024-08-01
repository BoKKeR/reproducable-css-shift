import { createApp, h } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import App from "./App.vue";
import singleSpaVue from "single-spa-vue";
import { cssLifecycleFactory } from "vite-plugin-single-spa/ex";

import { defineCustomElements } from "@postnord/web-components/loader";
defineCustomElements();

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const lc = singleSpaVue({
  createApp,
  appOptions: {
    render() {
      return h(App, {
        // name: this.name,
        // @ts-ignore
        // mountParcel: this.mountParcel,
        // @ts-ignore
        // singleSpa: this.singleSpa
      });
    }
  },
  handleInstance: () => {}
});

const cssLc = cssLifecycleFactory("spa");
export const bootstrap = [cssLc.bootstrap, lc.bootstrap];
export const mount = [cssLc.mount, lc.mount];
export const unmount = [cssLc.unmount, lc.unmount];
