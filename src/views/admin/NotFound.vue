<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
    <h1 class="text-6xl font-bold text-blue-600">404</h1>
    <p class="text-xl text-gray-700 mt-2">Halaman Admin Tidak Ditemukan</p>
    <button
      @click="router.push('/admin')"
      class="mt-4 px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
    >
      Kembali ke Dashboard Admin
    </button>
  </div>
</template>