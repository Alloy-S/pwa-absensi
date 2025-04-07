<template>
    <BasePageNoNav>
      <div class="min-h-screen flex flex-col items-center  bg-white px-4">
        <!-- Logo -->
        <div class="mb-6">
          <img
            src="@/assets/logo.png"
            alt="Logo Perusahaan"
            class="h-72 w-auto"
          />
        </div>
  
        <!-- Judul -->
        <h1 class="text-2xl font-bold text-gray-800 mb-4">Masuk ke Akun Anda</h1>
  
        <!-- Form Login -->
        <form @submit.prevent="handleLogin" class="w-full max-w-sm space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="email"
              v-model="email"
              required
              class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
  
          <div>
            <label class="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              v-model="password"
              required
              class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
  
          <div class="flex items-center justify-between">
  
            <a href="#" class="text-sm text-blue-600 hover:underline">Lupa Password?</a>
          </div>
  
          <button
            type="submit"
            class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition font-semibold"
          >
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

  const router = useRouter();
  
  const email = ref('')
  const password = ref('')
  
  const handleLogin = () => {
    console.log('Email:', email.value)
    console.log('Password:', password.value)
    router.replace('/')
  }
  </script>
  