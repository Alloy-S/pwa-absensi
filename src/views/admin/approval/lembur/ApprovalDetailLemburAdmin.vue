<template>
    <BasePage>
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-semibold text-slate-800">Detail Lembur</h1>
            <p class="text-sm text-gray-500">Informasi lembur pada tanggal {{ lembur.date }}</p>
          </div>
          <button @click="goBack" class="text-sm text-blue-600 hover:underline">
            ← Kembali
          </button>
        </div>
  
        <div class="bg-white shadow rounded-lg p-5 space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span class="font-medium text-slate-600">Tanggal:</span> {{ lembur.date }}
            </div>
            <div>
              <span class="font-medium text-slate-600">Jam Mulai:</span> {{ lembur.time_start }}
            </div>
            <div>
              <span class="font-medium text-slate-600">Jam Selesai:</span> {{ lembur.time_end }}
            </div>
            <div>
              <span class="font-medium text-slate-600">Status:</span>
              <span
                :class="{
                  'text-green-600': lembur.status === 'Disetujui',
                  'text-yellow-600': lembur.status === 'Menunggu',
                  'text-red-600': lembur.status === 'Ditolak',
                }"
              >
                {{ lembur.status }}
              </span>
            </div>
          </div>
        </div>
  
        <!-- Tombol Approval -->
        <div v-if="lembur.status === 'Menunggu'" class="flex justify-end gap-4 mt-4">
          <button
            @click="tolakLembur"
            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Tolak
          </button>
          <button
            @click="setujuiLembur"
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
  
  const lembur = ref({
    date: '2025-04-06',
    time_start: '18:00',
    time_end: '20:30',
    status: 'Menunggu' // Bisa juga 'Disetujui' atau 'Ditolak'
  })
  
  const setujuiLembur = () => {
    lembur.value.status = 'Disetujui'
    alert('Lembur telah disetujui.')
    // TODO: Kirim status ke server menggunakan axios
  }
  
  const tolakLembur = () => {
    lembur.value.status = 'Ditolak'
    alert('Lembur telah ditolak.')
    // TODO: Kirim status ke server menggunakan axios
  }
  </script>
  