import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import components from "@/components/UI";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";
import "@/assets/fonts/TT_Hoves.css";
import "@/assets/fonts/TT_Norms_Pro.css";
import "@/assets/styles/media.scss";

const app = createApp(App);
components.forEach((component) => {
   app.component(component.name, component);
});
app.use(store).use(router).use(bootstrap).mount("#app");
