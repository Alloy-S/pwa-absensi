<template>
  <BasePage>
    <div class="space-y-3">
      <div class="mb-10 mt-5 flex justify-between items-start">
        <p class="text-3xl font-semibold text-slate-800">Tambah Pengumuman</p>
      </div>

      <div class="flex space-x-3">
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

            <div class="flex justify-end pt-4 space-x-2">
              <button type="button" @click="goBack"
                class="text-red-500 hover:text-white border border-red-600 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2">
                Batal
              </button>
              <button @click="simpan" type="button"
                class="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">
                Simpan
              </button>
            </div>
          </div>

        </div>
        <div class="flex-[3]">
          <!-- Kosong / nanti bisa untuk preview atau informasi tambahan -->
        </div>
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

const router = useRouter();

const goBack = () => {
  router.back();
};

const form = ref({
  judul: '',
  isi: '',
})

const simpan = () => {
  console.log('Data akan disimpan:', form.value)
  // Tambahkan API call untuk menyimpan ke backend
}
</script>