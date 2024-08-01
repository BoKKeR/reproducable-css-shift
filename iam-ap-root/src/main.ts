import "./app.css";
import { registerApplication, start } from "single-spa";

const app = undefined;

const spa = {
  sidebar: "@postnord/iam-ap-sidebar",
  access_list: "@postnord/iam-ap-access-list"
};

registerApplication({
  name: "@postnord/iam-ap-sidebar",
  // @ts-ignore
  app: () => import(/* @vite-ignore */ spa.sidebar),
  activeWhen: (location) => location.pathname.startsWith("/")
});

registerApplication({
  name: "@postnord/iam-ap-access-list",
  // @ts-ignore
  app: () => import(/* @vite-ignore */ spa.access_list),
  activeWhen: (location) => location.pathname.startsWith("/access-list")
});

start();

export default app;
