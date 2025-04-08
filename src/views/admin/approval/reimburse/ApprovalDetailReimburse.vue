<template>
    <BasePage>
      <div class="space-y-6 mt-4">
        <!-- Header -->
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-semibold text-slate-800">Approval Reimburse</h1>
          <RouterLink to="/admin/reimburse" class="text-blue-600 hover:underline">← Kembali</RouterLink>
        </div>
  
        <!-- Informasi Umum -->
        <div class="bg-white shadow-md rounded-lg p-6 space-y-2">
          <p><strong>Nama:</strong> {{ reimburse.name }}</p>
          <p><strong>Tanggal:</strong> {{ reimburse.date }}</p>
          <p><strong>Status Saat Ini:</strong>
            <span :class="statusClass(reimburse.status)">
              {{ reimburse.status }}
            </span>
          </p>
          <p><strong>Catatan:</strong> {{ reimburse.note || '-' }}</p>
          <p><strong>Total:</strong> <span class="text-blue-600 font-semibold">Rp{{ formatRupiah(reimburse.total) }}</span></p>
        </div>
  
        <!-- Tabel Rincian Reimburse -->
        <div class="bg-white shadow-md rounded-lg overflow-x-auto">
          <table class="w-full border-collapse">
            <thead class="bg-gray-100 text-left">
              <tr>
                <th class="p-3 border">No</th>
                <th class="p-3 border">Deskripsi</th>
                <th class="p-3 border">Jumlah</th>
                <th class="p-3 border">Harga Satuan</th>
                <th class="p-3 border">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in reimburse.items" :key="index" class="hover:bg-gray-50">
                <td class="p-3 border">{{ index + 1 }}</td>
                <td class="p-3 border">{{ item.description }}</td>
                <td class="p-3 border">{{ item.quantity }}</td>
                <td class="p-3 border">Rp{{ formatRupiah(item.unitPrice) }}</td>
                <td class="p-3 border font-semibold">Rp{{ formatRupiah(item.quantity * item.unitPrice) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <!-- Bukti Gambar -->
        <div class="bg-white shadow-md rounded-lg p-6">
          <h2 class="text-lg font-semibold mb-2">Bukti Reimburse</h2>
          <img
            :src="reimburse.imageUrl"
            alt="Bukti Reimburse"
            class="w-64 h-64 object-cover rounded-md border"
          />
        </div>
  
        <!-- Tombol Approval -->
        <div class="flex gap-4">
          <button
            @click="approve"
            class="px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded-lg"
          >
            Setujui
          </button>
          <button
            @click="reject"
            class="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded-lg"
          >
            Tolak
          </button>
        </div>
      </div>
      <div class="mb-20"></div>
    </BasePage>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import BasePage from '@/layouts/admin/BasePage.vue'
  import { RouterLink, useRouter } from 'vue-router'
  
  const router = useRouter()
  
  const reimburse = ref({
    id: 1,
    name: 'Dewi Kartika',
    date: '2025-04-05',
    status: 'Menunggu',
    note: 'Pembelian alat tulis kantor',
    total: 250000,
    items: [
      { description: 'Pulpen', quantity: 10, unitPrice: 3000 },
      { description: 'Kertas A4', quantity: 5, unitPrice: 15000 },
      { description: 'Map folder', quantity: 3, unitPrice: 12000 },
    ],
    imageUrl: 'https://via.placeholder.com/300x300.png?text=Bukti+Reimburse'
  })
  
  const formatRupiah = (value: number): string => {
    return value.toLocaleString('id-ID')
  }
  
  const statusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'disetujui':
        return 'text-green-600 font-semibold'
      case 'ditolak':
        return 'text-red-600 font-semibold'
      default:
        return 'text-yellow-600 font-semibold'
    }
  }
  
  // Simulasi approval
  const approve = () => {
    // TODO: replace with API call
    reimburse.value.status = 'Disetujui'
    alert('Reimburse disetujui!')
    router.push('/admin/reimburse')
  }
  
  const reject = () => {
    // TODO: replace with API call
    reimburse.value.status = 'Ditolak'
    alert('Reimburse ditolak!')
    router.push('/admin/reimburse')
  }
  </script>
  