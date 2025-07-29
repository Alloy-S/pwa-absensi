<template>
  <BasePageNoNav>
    <div class="min-h-screen flex flex-col items-center  bg-white px-4">
      
      <div class="mb-6">
        <img src="@/assets/logo.png" alt="Logo Perusahaan" class="h-72 w-auto" />
      </div>

      
      <h1 class="text-2xl font-bold text-gray-800 mb-4">Masuk ke Akun Anda</h1>

      
      <form @submit.prevent="handleLogin" class="w-full max-w-sm space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Username</label>
          <input type="text" v-model="request.username" required
            class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" v-model="request.password" required
            class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
        </div>

        <div class="flex items-center justify-between">

          <a href="#" class="text-sm text-blue-600 hover:underline">Lupa Password?</a>
        </div>

        <button type="submit"
          class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition font-semibold">
          Login
        </button>
      </form>
    </div>
  </BasePageNoNav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BasePageNoNav from '@/layouts/user/BasePageNoNav.vue'
import { useRouter } from 'vue-router'
import { LoginRequest } from '@/models/authModel';
import { hitLogin } from '@/services/authService';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const router = useRouter();
const messaging = getMessaging();

const request = ref<LoginRequest>({
  username: '',
  password: ''
})
const fcmToken = ref<string | null>(null);

getToken(messaging, { vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY }).then((currentToken) => {
  if (currentToken) {
    request.value.fcm_token = currentToken;
  } else {
    console.log('No registration token available. Request permission to generate one.');
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
});

const handleLogin = async () => {

  const toastId = toast.loading("Loading...");

  try {
    const response = await hitLogin(request.value);
    
    const accessToken = response.token;
    const userRole = response.role;
    const username = response.username;
    const fullname = response.fullname;

    const userData = {
      userRole,
      username,
      fullname
    }

    if (accessToken && userRole) {
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('user_role', userRole);
      localStorage.setItem('user_data', JSON.stringify(userData));

      toast.remove(toastId);

      router.replace('/');
    } else {
      throw new Error("Respons login dari server tidak valid.");
    }
  } catch (error: any) {
    toast.remove(toastId);
  }

}
</script>