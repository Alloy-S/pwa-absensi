<template>
    <BasePageNoNav>
        <TopHeader title="Profil Perusahaan" />
        
        <div class="p-4 space-y-4">
            <h2 class="text-lg font-semibold">Informasi Perusahaan</h2>
            
            <div class="bg-white p-4 rounded-lg shadow-md">
                <div class="mb-4">
                    <label class="block text-sm font-medium">Nama Perusahaan</label>
                    <p class="text-gray-700">{{ profile.nama || "-" }}</p>
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium">Alamat</label>
                    <p class="text-gray-700">{{ profile.alamat || "-" }}</p>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium">Kota/Kabupaten</label>
                        <p class="text-gray-700">{{ profile.kota_kabupaten || "-" }}</p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium">Provinsi</label>
                        <p class="text-gray-700">{{ profile.provinsi || "-" }}</p>
                    </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4 mt-4">
                    <div>
                        <label class="block text-sm font-medium">Negara</label>
                        <p class="text-gray-700">{{ profile.negara || "-" }}</p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium">Kode Pos</label>
                        <p class="text-gray-700">{{ profile.kode_pos || "-" }}</p>
                    </div>
                </div>
                
                <div class="mt-4">
                    <label class="block text-sm font-medium">No. Telepon</label>
                    <p class="text-gray-700">{{ profile.no_telepon || "-" }}</p>
                </div>
            </div>
        </div>
    </BasePageNoNav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BasePageNoNav from '@/layouts/user/BasePageNoNav.vue';
import TopHeader from '@/components/user/TopHeader.vue';
import { onMounted } from 'vue';
import { fetchProfilePerusahaanById } from '@/services/profilePerusahaanService'
import { initPerusahaan } from '@/models/profilePerusahaanModel';

const profile = ref(initPerusahaan())

onMounted(() => {
   getProfile()
})

const getProfile = async () => {
  profile.value = await fetchProfilePerusahaanById()
}
</script>