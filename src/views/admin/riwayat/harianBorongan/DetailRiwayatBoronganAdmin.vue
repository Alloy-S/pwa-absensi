<template>
    <BasePage>
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-semibold text-slate-800">Detail Absensi Borongan</h1>
            <p class="text-gray-500 text-sm mt-1">Tanggal: {{ absence.date }}</p>
            <p class="text-gray-500 text-sm">Dibuat oleh: {{ absence.createdBy }}</p>
          </div>
          <button @click="goBack" class="text-sm text-blue-600 hover:underline">← Kembali</button>
        </div>
  
        <div class="overflow-x-auto bg-white shadow rounded-xl">
          <table class="w-full text-sm text-left border-collapse">
            <thead class="bg-gray-100 text-gray-700">
              <tr>
                <th class="px-4 py-3 border">Nama</th>
                <th class="px-4 py-3 border">Tipe</th>
                <th class="px-4 py-3 border text-right">Jenis Borongan</th>
                <th class="px-4 py-3 border text-right">Ton Normal</th>
                <th class="px-4 py-3 border text-right">Ton Lembur</th>
                <th class="px-4 py-3 border text-right">Total Harga</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="worker in absence.workers"
                :key="worker.name"
                class="hover:bg-gray-50"
              >
                <td class="px-4 py-2 border">{{ worker.name }}</td>
                <td class="px-4 py-2 border capitalize">{{ worker.type }}</td>
                <td class="px-4 py-2 border text-right">
                  {{ worker.type === 'borongan' ? worker.jobType : '-' }}
                </td>
                <td class="px-4 py-2 border text-right">
                  {{ worker.type === 'borongan' ? worker.tonNormal : '-' }}
                </td>
                <td class="px-4 py-2 border text-right">
                  {{ worker.type === 'borongan' ? worker.tonLembur : '-' }}
                </td>
                <td class="px-4 py-2 border text-right font-semibold text-blue-600">
                  Rp{{ worker.totalPrice.toLocaleString() }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
      <div class="mb-20"></div>
    </BasePage>
  </template>
  
  <script setup>
  import BasePage from '@/layouts/admin/BasePage.vue'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  const goBack = () => router.back()
  
  const absence = ref({
    id: 1,
    date: '2025-03-12',
    createdBy: 'Admin',
    workers: [
      { name: 'Budi', type: 'borongan', jobType: 'Angkut Pakan', tonNormal: 5, tonLembur: 2, totalPrice: 350000 },
      { name: 'Ani', type: 'harian', jobType: '-', tonNormal: 0, tonLembur: 0, totalPrice: 100000 },
      { name: 'Doni', type: 'borongan', jobType: 'Panen Telur', tonNormal: 6, tonLembur: 3, totalPrice: 450000 },
    ],
  })
  </script>
  