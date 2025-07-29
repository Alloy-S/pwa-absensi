<script setup lang="ts">
import 'flowbite';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { updateFCMToken } from './services/userService';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};


const app = initializeApp(firebaseConfig);
const router = useRouter();
const messaging = getMessaging();


onMounted(() => {
  const token = localStorage.getItem('access_token');

  if (token) {
    getToken(messaging, { vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY }).then((currentToken) => {
      if (currentToken) {
        updateFCMToken({ fcm_token: currentToken });
      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
  }

  onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    if (payload.data && payload.data.action === 'FORCE_LOGOUT') {
      localStorage.clear();
      toast.warn("Anda telah logout karena login di perangkat lain.");
      router.push('/login');

    } else if (payload.notification) {
      toast.info(`${payload.notification.title}: ${payload.notification.body}`);
    }
  });

  navigator.serviceWorker.addEventListener('message', event => {
    if (event.data && event.data.action === 'FORCE_LOGOUT') {
      localStorage.clear();
      toast.warn(event.data.message);
      router.push('/login');
    }
  });
});
</script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style scoped></style>
