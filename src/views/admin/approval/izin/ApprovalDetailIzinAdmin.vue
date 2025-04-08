<template>
    <BasePage>
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-semibold text-slate-800">Detail Izin</h1>
            <p class="text-sm text-gray-500">Informasi pengajuan izin karyawan.</p>
          </div>
          <button @click="goBack" class="text-sm text-blue-600 hover:underline">
            ← Kembali
          </button>
        </div>
  
        <div class="bg-white shadow rounded-lg p-5 space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span class="font-medium text-slate-600">Jenis Izin:</span>
              {{ izin.jenis_izin }}
            </div>
            <div>
              <span class="font-medium text-slate-600">Tanggal Pengajuan:</span>
              {{ izin.tgl_pengajuan }}
            </div>
            <div>
              <span class="font-medium text-slate-600">Tanggal Izin:</span>
              {{ izin.tgl_izin }}
            </div>
            <div>
              <span class="font-medium text-slate-600">Status:</span>
              <span :class="{
                'text-green-600': izin.status === 'Disetujui',
                'text-yellow-600': izin.status === 'Menunggu',
                'text-red-600': izin.status === 'Ditolak',
              }">
                {{ izin.status }}
              </span>
            </div>
            <div class="md:col-span-2">
              <span class="font-medium text-slate-600">Keterangan:</span>
              {{ izin.keterangan }}
            </div>
          </div>
        </div>
  
        <!-- Tombol Approval -->
        <div v-if="izin.status === 'Menunggu'" class="flex justify-end gap-4 mt-4">
          <button
            @click="tolakIzin"
            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Tolak
          </button>
          <button
            @click="setujuiIzin"
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
  import BasePage from '@/layouts/admin/BasePage.vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  const goBack = () => router.back()
  
  // Data izin
  const izin = ref({
    jenis_izin: 'Sakit',
    tgl_pengajuan: '2025-04-05',
    tgl_izin: '2025-04-06',
    keterangan: 'Demam tinggi dan istirahat di rumah',
    status: 'Menunggu', // Bisa 'Menunggu', 'Disetujui', atau 'Ditolak'
  })
  
  // Fungsi tombol
  const setujuiIzin = () => {
    izin.value.status = 'Disetujui'
    alert('Izin telah disetujui.')
    // TODO: Panggil API PATCH/POST untuk update status
  }
  
  const tolakIzin = () => {
    izin.value.status = 'Ditolak'
    alert('Izin telah ditolak.')
    // TODO: Panggil API PATCH/POST untuk update status
  }
  </script>
  