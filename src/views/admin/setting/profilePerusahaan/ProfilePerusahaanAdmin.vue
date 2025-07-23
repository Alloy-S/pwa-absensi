<template>
  <BasePage>
    <div class="space-y-6 max-w-3xl">
      <div class="mt-5 mb-10 flex justify-between items-center">
        <h1 class="text-3xl font-semibold text-slate-800">Profile Perusahaan</h1>
      </div>

      <form @submit.prevent="saveProfile" class="space-y-4 bg-white p-6 shadow rounded-lg">
        <div>
          <label class="block text-sm font-medium text-gray-700">Nama Perusahaan</label>
          <input type="text" v-model="profile.nama" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Alamat</label>
            <input type="text" v-model="profile.alamat"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Kota/Kabupaten</label>
            <input type="text" v-model="profile.kota_kabupaten"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Provinsi</label>
            <input type="text" v-model="profile.provinsi"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Negara</label>
            <input type="text" v-model="profile.negara"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Kode Pos</label>
            <input type="text" v-model="profile.kode_pos"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">No Telepon</label>
            <input type="text" v-model="profile.no_telepon"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
          </div>
        </div>

        <div class="pt-4 flex justify-end">
          <button type="submit" class="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-2 rounded-lg">
            Simpan Profil
          </button>
        </div>
      </form>
    </div>
  </BasePage>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BasePage from '@/layouts/admin/BasePage.vue'
import { initPerusahaan } from '@/models/profilePerusahaanModel'
import { onMounted } from 'vue'
import { fetchProfilePerusahaanById, updateProfilePerusahaan } from '@/services/profilePerusahaanService'
import { toast } from 'vue3-toastify'

const profile = ref(initPerusahaan())

onMounted(() => {
   getProfile()
})

const getProfile = async () => {
  profile.value = await fetchProfilePerusahaanById()
}

const saveProfile = async () => {
  const response = await updateProfilePerusahaan(profile.value);

    if (response.status === 200) {
        toast.success("Success Update Profile Perusahaan")
        getProfile()
    }
}
</script>