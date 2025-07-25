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
import { definePreset } from '@primeuix/themes';
import ConfirmationService from 'primevue/confirmationservice';

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("Update baru tersedia. Muat ulang sekarang?")) {
      updateSW(true);
    }
  },
});

const MyPreset = definePreset(Aura, {
  semantic: {
      primary: {
          50: '{blue.50}',
          100: '{blue.100}',
          200: '{blue.200}',
          300: '{blue.300}',
          400: '{blue.400}',
          500: '{blue.500}',
          600: '{blue.600}',
          700: '{blue.700}',
          800: '{blue.800}',
          900: '{blue.900}',
          950: '{blue.950}'
      }
  }
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
    preset: MyPreset,
    options: {
      darkModeSelector: "none",
    },
  },
});
app.use(ConfirmationService);
app.mount("#app");
