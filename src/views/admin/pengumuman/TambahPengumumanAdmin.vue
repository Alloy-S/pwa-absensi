<template>
  <BasePage>
    <div class="space-y-3">
      <div class="mb-10 mt-5 flex justify-between items-start">
        <p class="text-3xl font-semibold text-slate-800">Tambah Pengumuman</p>
      </div>

      <div class="flex flex-col lg:flex-row lg:space-x-5">
       
        <div class="flex-[7] space-y-5">
          <div class="bg-white p-5 rounded-md shadow-md space-y-4">
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900">Judul Pengumuman<span
                  class="text-red-600">*</span></label>
              <input v-model="form.judul" type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>

            <div>
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

      
      <div class="flex justify-end pt-4 space-x-2">
        <button type="button" @click="goBack"
          class="text-red-500 hover:text-white border border-red-600 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5">
          Batal
        </button>
        <button @click="simpan" type="button" :disabled="isSubmitting"
          class="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center disabled:bg-blue-300">
          <i v-if="isSubmitting" class="fa-solid fa-spinner animate-spin mr-2"></i>
          <span>{{ isSubmitting ? 'Menyimpan...' : 'Simpan' }}</span>
        </button>
      </div>
    </div>
    <div class="mb-20"></div>
  </BasePage>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BasePage from '@/layouts/admin/BasePage.vue'
import { useRouter } from "vue-router";
import Editor from 'primevue/editor';
import InputSwitch from 'primevue/inputswitch';
import { toast } from 'vue3-toastify';
import { PengumumanReq } from '@/models/PengumumanModel';
import { addPengumuman } from '@/services/pengumumanService';

const router = useRouter();
const isSubmitting = ref(false);

const form = ref<PengumumanReq>({
  judul: '',
  isi: '',
  is_active: true, 
});

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
    await addPengumuman(form.value);
    toast.success("Pengumuman berhasil ditambahkan.");
    router.push('/admin/pengumuman'); 
  } catch (error) {
    console.error("Gagal menyimpan pengumuman:", error);
    toast.error("Gagal menyimpan pengumuman. Silakan coba lagi.");
  } finally {
    isSubmitting.value = false;
  }
};
</script>
