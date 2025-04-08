<template>
    <BasePageNoNav>
      <TopHeader title="Pengajuan Reimburse" />
      <div class="p-4 space-y-4">
        <h1 class="text-lg font-semibold">Form Pengajuan Reimburse</h1>
  
        <!-- Input Keterangan Umum -->
        <div class="mb-4">
          <label for="note" class="block text-sm font-medium mb-1">Keterangan</label>
          <input id="note" type="text" v-model="note" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
        </div>
  
        <!-- Daftar Item -->
        <div class="space-y-4">
          <h2 class="text-sm font-semibold">Detail Item Reimburse</h2>
          <div v-for="(item, index) in items" :key="index" class="bg-white border rounded-lg p-4 space-y-2">
            <div>
              <label class="block text-sm">Deskripsi</label>
              <input v-model="item.description" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm">Jumlah</label>
                <input v-model.number="item.quantity" type="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
              </div>
              <div>
                <label class="block text-sm">Harga Satuan</label>
                <input v-model.number="item.unitPrice" type="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
              </div>
            </div>
            <div class="text-sm text-right">
              Subtotal: <span class="font-semibold">Rp {{ formatRupiah(item.quantity * item.unitPrice || 0) }}</span>
            </div>
            <div class="text-right">
              <button @click="removeItem(index)" class="text-red-500 text-sm hover:underline">Hapus</button>
            </div>
          </div>
  
          <!-- Tambah Item -->
          <button @click="addItem" class="text-sm text-blue-600 hover:underline">+ Tambah Item</button>
        </div>
  
        <!-- Upload Bukti Foto -->
        <div class="mt-4">
          <label class="block mb-1 text-sm font-medium">Upload Bukti</label>
          <input type="file" @change="handleFileUpload" accept="image/*" class="w-full border p-2 rounded-md">
          <div v-if="previewImage" class="mt-2">
            <p class="text-sm text-gray-600">Preview Bukti:</p>
            <img :src="previewImage" alt="Preview" class="w-32 h-32 object-cover rounded-md border">
          </div>
        </div>
  
        <!-- Total -->
        <div class="text-right font-semibold">
          Total Reimburse: <span class="text-blue-600">Rp {{ formatRupiah(totalAmount) }}</span>
        </div>
  
        <!-- Submit Button -->
        <button @click="submitReimburse" class="w-full px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600">
          Ajukan Reimburse
        </button>
      </div>
    </BasePageNoNav>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import BasePageNoNav from '@/layouts/user/BasePageNoNav.vue'
  import TopHeader from '@/components/user/TopHeader.vue'
  
  const note = ref('')
  const items = ref([
    { description: '', quantity: 1, unitPrice: 0 }
  ])
  const file = ref(null)
  const previewImage = ref(null)
  
  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0]
    if (selectedFile) {
      file.value = selectedFile
      previewImage.value = URL.createObjectURL(selectedFile)
    }
  }
  
  const addItem = () => {
    items.value.push({ description: '', quantity: 1, unitPrice: 0 })
  }
  
  const removeItem = (index) => {
    items.value.splice(index, 1)
  }
  
  const totalAmount = computed(() => {
    return items.value.reduce((sum, item) => {
      const subtotal = (item.quantity || 0) * (item.unitPrice || 0)
      return sum + subtotal
    }, 0)
  })
  
  const formatRupiah = (val) => {
    return val.toLocaleString('id-ID')
  }
  
  const submitReimburse = () => {
    const payload = {
      note: note.value,
      total: totalAmount.value,
      items: items.value,
      file: file.value,
    }
  
    console.log(payload)
    alert('Reimburse berhasil diajukan!')
  }
  </script>
  