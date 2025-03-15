<template>
    <BasePageNoNav>
      <div class="flex flex-col items-center justify-center h-screen text-center p-4">
        <h1 class="text-6xl font-bold text-blue-600">404</h1>
        <p class="text-xl text-gray-700 mt-2">Halaman Tidak Ditemukan</p>
        <p class="text-gray-500 mt-1">Halaman yang Anda cari mungkin telah dipindahkan atau tidak ada.</p>
        <router-link to="/" class="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition">
          Kembali ke Beranda
        </router-link>
      </div>
    </BasePageNoNav>
  </template>
  
  <script setup lang="ts">
  import BasePageNoNav from '../layouts/BasePageNoNav.vue';
  </script>
  