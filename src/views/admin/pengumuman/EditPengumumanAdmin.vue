<template>
    <BasePage>
      <div class="space-y-3">
        <div class="mb-10 mt-5 flex justify-between items-start">
          <p class="text-3xl font-semibold text-slate-800">Edit Pengumuman</p>
        </div>
  
        <div v-if="loading" class="text-center py-10">
          <i class="fa-solid fa-spinner animate-spin text-4xl text-slate-500"></i>
          <p class="mt-2 text-slate-500">Memuat data...</p>
        </div>
  
        <div v-else class="flex flex-col lg:flex-row lg:space-x-5">
       
          <div class="flex-[7] space-y-5">
            <div class="bg-white p-5 rounded-md shadow-md max-w-4xl space-y-4">
              <div>
                <label class="block mb-2 text-sm font-medium text-gray-900">Judul Pengumuman<span
                    class="text-red-600">*</span></label>
                <input v-model="form.judul" type="text"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
              </div>
  
              <div class="">
                <label class="block mb-2 text-sm font-medium text-gray-900">Isi Pengumuman<span
                    class="text-red-600">*</span></label>
                <Editor v-model="form.isi" editorStyle="height: 320px" />
              </div>
            </div>
          </div>
  
          <div class="flex-[3] mt-5 lg:mt-0">
            <div class="bg-white p-5 rounded-md shadow-md space-y-4">
              <h3 class="font-semibold text-slate-700">Opsi</h3>
              <div class="flex items-center justify-between">
                <label for="is_active" class="text-sm font-medium text-gray-900">Aktifkan Pengumuman</label>
                <InputSwitch v-model="form.is_active" inputId="is_active" />
              </div>
            </div>
          </div>
        </div>
  
        
        <div v-if="!loading" class="flex justify-end pt-4 space-x-2">
          <button type="button" @click="goBack"
            class="text-red-500 hover:text-white border border-red-600 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5">
            Batal
          </button>
          <button @click="simpan" type="button" :disabled="isSubmitting"
            class="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center disabled:bg-blue-300">
            <i v-if="isSubmitting" class="fa-solid fa-spinner animate-spin mr-2"></i>
            <span>{{ isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan' }}</span>
          </button>
        </div>
      </div>
      <div class="mb-20"></div>
    </BasePage>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import BasePage from '@/layouts/admin/BasePage.vue'
  import { useRouter, useRoute } from "vue-router";
  import Editor from 'primevue/editor';
  import InputSwitch from 'primevue/inputswitch';
  import { toast } from 'vue3-toastify';
  import { fetchPengumumanById, updatePengumuman } from '@/services/pengumumanService';
import { PengumumanReq } from '@/models/PengumumanModel';
  
  const router = useRouter();
  const route = useRoute();
  const loading = ref(true);
  const isSubmitting = ref(false);
  
  const form = ref<PengumumanReq>({
    judul: '',
    isi: '',
    is_active: true,
  });
  
  const getPengumumanDetail = async (id: string) => {
    loading.value = true;
    try {
      const response = await fetchPengumumanById(id);
      form.value.judul = response.judul;
      form.value.isi = response.isi;
      form.value.is_active = response.is_active;
    } catch (error) {
      console.error("Gagal memuat detail pengumuman:", error);
      toast.error("Gagal memuat detail pengumuman.");
    } finally {
      loading.value = false;
    }
  };
  
  const goBack = () => {
    router.back();
  };
  
  const simpan = async () => {
    if (!form.value.judul.trim() || !form.value.isi.trim()) {
      toast.error("Judul dan Isi Pengumuman wajib diisi.");
      return;
    }
  
    isSubmitting.value = true;
    try {
      const id = route.params.id as string;
      await updatePengumuman(id, form.value);
      toast.success("Pengumuman berhasil diperbarui.");
      router.push('/admin/pengumuman');
    } catch (error) {
      console.error("Gagal memperbarui pengumuman:", error);
      toast.error("Gagal memperbarui pengumuman.");
    } finally {
      isSubmitting.value = false;
    }
  };
  
  onMounted(() => {
    const id = route.params.id as string;
    if (id) {
      getPengumumanDetail(id);
    } else {
      toast.error("ID Pengumuman tidak valid.");
      loading.value = false;
    }
  });
  </script>
  