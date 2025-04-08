<template>
    <BasePage>
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-semibold text-slate-800">Approval Absensi</h1>
            <p class="text-sm text-gray-500">Setujui atau tolak absensi pada {{ absensi.date }}</p>
          </div>
          <button @click="goBack" class="text-sm text-blue-600 hover:underline">← Kembali</button>
        </div>
  
        <!-- Info Umum -->
        <div class="bg-white shadow rounded-lg p-5 space-y-3">
          <h2 class="text-xl font-semibold text-slate-700">Informasi Umum</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div><span class="font-medium text-slate-600">Tanggal:</span> {{ absensi.date }}</div>
            <div><span class="font-medium text-slate-600">Lokasi:</span> {{ absensi.lokasi }}</div>
            <div><span class="font-medium text-slate-600">Metode:</span> {{ absensi.metode }}</div>
            <div><span class="font-medium text-slate-600">Status:</span> {{ absensi.status }}</div>
            <div><span class="font-medium text-slate-600">Catatan:</span> {{ absensi.catatan }}</div>
            <div><span class="font-medium text-slate-600">Shift:</span> {{ absensi.shift }}</div>
          </div>
        </div>
  
        <!-- Detail Absensi -->
        <div class="bg-white shadow rounded-lg p-5 space-y-3">
          <h2 class="text-xl font-semibold text-slate-700">Detail Absensi</h2>
          <div class="space-y-4">
            <div v-for="(detail, index) in detailAbsensi" :key="index" class="border rounded p-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div><span class="font-medium text-slate-600">Tanggal:</span> {{ detail.date }}</div>
                <div><span class="font-medium text-slate-600">Tipe:</span> {{ detail.type }}</div>
                <div><span class="font-medium text-slate-600">Status Approval:</span> {{ detail.status_apprv }}</div>
                <div><span class="font-medium text-slate-600">Status Absensi:</span> {{ detail.status_absensi }}</div>
                <div><span class="font-medium text-slate-600">Longitude:</span> {{ detail.longitude }}</div>
                <div><span class="font-medium text-slate-600">Latitude:</span> {{ detail.latitude }}</div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Tombol Approval -->
        <div class="flex justify-end space-x-4">
          <button
            @click="rejectAll"
            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Tolak
          </button>
          <button
            @click="approveAll"
            class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Setujui
          </button>
        </div>
      </div>
  
      <div class="mb-20"></div>
    </BasePage>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import BasePage from '@/layouts/admin/BasePage.vue'
  
  const router = useRouter()
  const goBack = () => router.back()
  
  const absensi = ref({
    date: '2025-04-06',
    lokasi: 'Kandang A',
    metode: 'Face Recognition',
    catatan: 'Tepat waktu',
    status: 'Menunggu Persetujuan',
    shift: 'Normal (08:00 - 16:00)',
  })
  
  const detailAbsensi = ref([
    {
      date: '2025-04-06 07:00',
      type: 'Masuk',
      status_apprv: 'Menunggu',
      status_absensi: 'Hadir',
      longitude: '106.123456',
      latitude: '-6.123456',
    },
    {
      date: '2025-04-06 17:00',
      type: 'Pulang',
      status_apprv: 'Menunggu',
      status_absensi: 'Hadir',
      longitude: '106.123456',
      latitude: '-6.123456',
    }
  ])
  
  const approveAll = () => {
    alert('Semua absensi telah disetujui.')
    // TODO: Kirim API approval di sini
  }
  
  const rejectAll = () => {
    alert('Semua absensi telah ditolak.')
    // TODO: Kirim API penolakan di sini
  }
  </script>
  