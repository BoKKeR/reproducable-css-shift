import { createApp, h } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import singleSpaVue from 'single-spa-vue';
import { cssLifecycleFactory } from 'vite-plugin-single-spa/ex';

const pinia = createPinia();

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
    },
  },
  handleInstance: (app) => {
    app.use(pinia);
  },
});

const cssLc = cssLifecycleFactory('spa');
export const bootstrap = [cssLc.bootstrap, lc.bootstrap];
export const mount = [cssLc.mount, lc.mount];
export const unmount = [cssLc.unmount, lc.unmount];
