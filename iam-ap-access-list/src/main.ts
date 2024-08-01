import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import App from "./App.vue";

import { defineCustomElements } from "@postnord/web-components/loader";
defineCustomElements();

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

createApp(App);

// app.use(pinia).use(ApComponents).mount('#app');
