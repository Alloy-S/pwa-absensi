<template>
    <BasePage>
      <div class="space-y-6">
        <!-- Judul Halaman -->
        <div class="mt-4">
          <h1 class="text-3xl font-semibold text-slate-800">Dashboard Admin</h1>
          <p class="text-slate-600 text-sm mt-1">Selamat datang kembali 👋</p>
        </div>
  
        <!-- Ringkasan Statistik -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="bg-white p-4 rounded-xl shadow border">
            <p class="text-gray-500 text-sm">Total Karyawan</p>
            <h2 class="text-2xl font-bold text-slate-800">124</h2>
          </div>
          <div class="bg-white p-4 rounded-xl shadow border">
            <p class="text-gray-500 text-sm">Absensi Hari Ini</p>
            <h2 class="text-2xl font-bold text-slate-800">89</h2>
          </div>
          <div class="bg-white p-4 rounded-xl shadow border">
            <p class="text-gray-500 text-sm">Reimburse Aktif</p>
            <h2 class="text-2xl font-bold text-slate-800">12</h2>
          </div>
          <div class="bg-white p-4 rounded-xl shadow border">
            <p class="text-gray-500 text-sm">Izin / Cuti</p>
            <h2 class="text-2xl font-bold text-slate-800">5</h2>
          </div>
        </div>
  
        
      </div>
    </BasePage>
  </template>
  
  <script setup lang="ts">
  import BasePage from '@/layouts/admin/BasePage.vue'
  </script>
  