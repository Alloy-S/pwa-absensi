import { createApp } from 'vue'
import { createPinia } from 'pinia';
import './index.css'
import App from './App.vue'
import router from './router';
import { registerSW } from "virtual:pwa-register";
import '@fortawesome/fontawesome-free/css/all.min.css';
// @ts-ignore
// import VueCameraLib from 'vue-camera-lib'




const updateSW = registerSW({
    onNeedRefresh() {
      if (confirm("Update baru tersedia. Muat ulang sekarang?")) {
        updateSW(true);
      }
    },
  });

const pinia = createPinia();
  

const app = createApp(App);
// app.use(VueCameraLib)
app.use(pinia);
app.use(router);
app.mount('#app');
