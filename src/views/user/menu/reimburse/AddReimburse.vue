<template>
  <BasePageNoNav>
      <TopHeader title="Pengajuan Reimburse" :show-back-button="true" />
      <div class="p-4">
          <h2 class="text-xl font-bold text-slate-800 mb-1">Formulir Pengajuan Reimburse</h2>
          <p class="text-sm text-slate-500 mb-6">Lengkapi detail item dan unggah bukti foto untuk mengajukan reimburse.</p>

          <form @submit.prevent="submitReimburse" class="space-y-6">
              
              <div>
                  <h3 class="text-lg font-semibold text-slate-700 mb-2">Detail Item</h3>
                  <div v-if="items.length === 0" class="text-center text-sm text-gray-500 p-4 border-2 border-dashed rounded-lg">
                      Belum ada item ditambahkan.
                  </div>
                  <div v-else class="space-y-3">
                      <div v-for="(item, index) in items" :key="index" class="bg-white border rounded-lg p-4 relative">
                          <button @click="removeItem(index)" type="button" class="absolute top-2 right-2 text-gray-400 hover:text-red-500 p-1">
                              <i class="fa-solid fa-trash-can"></i>
                          </button>
                          <div class="space-y-3">
                              <div>
                                  <label class="block text-sm font-medium text-gray-600">Nama Barang / Deskripsi</label>
                                  <input v-model="item.nama" type="text" required class="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                              </div>
                              <div class="grid grid-cols-2 gap-4">
                                  <div>
                                      <label class="block text-sm font-medium text-gray-600">Jumlah</label>
                                      <input v-model.number="item.jumlah" type="number" required min="1" class="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                                  </div>
                                  <div>
                                      <label class="block text-sm font-medium text-gray-600">Harga Satuan</label>
                                      <input v-model.number="item.harga" type="number" required min="0" class="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                                  </div>
                              </div>
                              <div class="text-sm text-right border-t pt-2 mt-2">
                                  Subtotal: <span class="font-semibold text-slate-800">{{ formatCurrency(item.jumlah * item.harga || 0) }}</span>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

              
              <button @click="addItem" type="button" class="w-full text-center py-2 px-4 border-2 border-dashed border-gray-300 text-sm font-semibold text-gray-600 rounded-lg hover:bg-gray-50 transition">
                  <i class="fa-solid fa-plus mr-2"></i>Tambah Item
              </button>

              
              <div>
                  <label class="block mb-2 text-sm font-medium text-gray-700">Upload Bukti Foto</label>
                  <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                      <div class="text-center">
                          <i class="fa-solid fa-image text-4xl text-gray-300"></i>
                          <div class="mt-4 flex text-sm leading-6 text-gray-600">
                              <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500">
                                  <span>Pilih file</span>
                                  <input id="file-upload" name="file-upload" type="file" @change="handleFileUpload" accept="image/*" class="sr-only">
                              </label>
                              <p class="pl-1">atau seret dan lepas</p>
                          </div>
                          <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF hingga 10MB</p>
                      </div>
                  </div>
                  <div v-if="photoBase64" class="mt-4">
                      <p class="text-sm font-medium text-gray-700">Preview:</p>
                      <img :src="photoBase64" alt="Preview" class="mt-2 w-full max-w-xs mx-auto rounded-md border shadow-sm">
                  </div>
              </div>

              
              <div class="border-t pt-4 text-right font-semibold">
                  Total Reimburse: <span class="text-xl text-blue-600">{{ formatCurrency(totalAmount) }}</span>
              </div>

              
              <button type="submit" :disabled="isSubmitting" class="w-full flex justify-center items-center p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300">
                  <i v-if="isSubmitting" class="fa-solid fa-spinner animate-spin mr-2"></i>
                  <span>{{ isSubmitting ? 'Mengirim...' : 'Ajukan Reimburse' }}</span>
              </button>
          </form>
      </div>
  </BasePageNoNav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import BasePageNoNav from '@/layouts/user/BasePageNoNav.vue';
import TopHeader from '@/components/user/TopHeader.vue';
import { ReimburseDetail, ReimburseReq } from '@/models/reimburseModel';
import { createReimburseApi } from '@/services/reimburseService';

const router = useRouter();
const isSubmitting = ref(false);

const items = ref<ReimburseDetail[]>([
  { nama: '', jumlah: 1, harga: 0 }
]);
const photoBase64 = ref<string | null>(null);

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
      photoBase64.value = e.target?.result as string;
  };
  reader.readAsDataURL(file);
};

const addItem = () => {
  items.value.push({ nama: '', jumlah: 1, harga: 0 });
};

const removeItem = (index: number) => {
  items.value.splice(index, 1);
};

const totalAmount = computed(() => {
  return items.value.reduce((sum, item) => {
      const subtotal = (item.jumlah || 0) * (item.harga || 0);
      return sum + subtotal;
  }, 0);
});

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
};

const validateForm = (): boolean => {
  if (!photoBase64.value) {
      toast.error("Bukti foto wajib diunggah.");
      return false;
  }
  if (items.value.length === 0) {
      toast.error("Minimal harus ada satu item reimburse.");
      return false;
  }
  for (const item of items.value) {
      if (!item.nama.trim() || item.jumlah <= 0 || item.harga <= 0) {
          toast.error("Pastikan semua detail item (nama, jumlah, harga) diisi dengan benar.");
          return false;
      }
  }
  return true;
};

const submitReimburse = async () => {
  if (!validateForm()) return;

  isSubmitting.value = true;
  try {
      const payload: ReimburseReq = {
          photo: photoBase64.value!,
          details: items.value.map(item => ({
              ...item,
              jumlah: item.jumlah
          }))
      };
      
      await createReimburseApi(payload);
      toast.success("Pengajuan reimburse berhasil dikirim.");
      router.back();

  } catch (error) {
      console.error("Gagal mengirim pengajuan reimburse:", error);
      toast.error("Gagal mengirim pengajuan. Silakan coba lagi.");
  } finally {
      isSubmitting.value = false;
  }
};
</script>
