import { createApp } from "vue";
import { createPinia } from "pinia";
import "./index.css";
import App from "./App.vue";
import router from "./router";
import { registerSW } from "virtual:pwa-register";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Vue3Toastify from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("Update baru tersedia. Muat ulang sekarang?")) {
      updateSW(true);
    }
  },
});

const pinia = createPinia();

const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(Vue3Toastify, {
  autoClose: 3000,
  position: "top-right",
  style: {
    marginTop: "50px",
  },
});
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: "none",
    },
  },
});
app.mount("#app");
