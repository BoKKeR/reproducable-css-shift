import './app.css';
import { registerApplication, start } from 'single-spa';

const app = undefined;

const spa = {
  sidebar: '@postnord/iam-ap-sidebar',
  access_list: '@postnord/iam-ap-access-list',
  topbar: '@postnord/iam-ap-topbar',
};

registerApplication({
  name: '@postnord/iam-ap-sidebar',
  // @ts-ignore
  app: () => import(/* @vite-ignore */ spa.sidebar),
  activeWhen: (location) => location.pathname.startsWith('/'),
});

start();

export default app;
