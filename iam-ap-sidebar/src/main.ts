import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

import { defineCustomElements } from '@postnord/web-components/loader';
defineCustomElements();

const pinia = createPinia();
const app = createApp(App);

app.use(pinia).mount('#app');
