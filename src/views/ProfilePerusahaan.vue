<template>
    <BasePageNoNav>
        <TopHeader title="Profil Perusahaan" />
        
        <div class="p-4 space-y-4">
            <h2 class="text-lg font-semibold">Informasi Perusahaan</h2>
            
            <div class="bg-white p-4 rounded-lg shadow-md">
                <div class="mb-4">
                    <label class="block text-sm font-medium">Alamat</label>
                    <p class="text-gray-700">{{ company.alamat }}</p>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium">Kota/Kabupaten</label>
                        <p class="text-gray-700">{{ company.kota_kabupaten }}</p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium">Provinsi</label>
                        <p class="text-gray-700">{{ company.provinsi }}</p>
                    </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4 mt-4">
                    <div>
                        <label class="block text-sm font-medium">Negara</label>
                        <p class="text-gray-700">{{ company.negara }}</p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium">Kode Pos</label>
                        <p class="text-gray-700">{{ company.kode_pos }}</p>
                    </div>
                </div>
                
                <div class="mt-4">
                    <label class="block text-sm font-medium">No. Telepon</label>
                    <p class="text-gray-700">{{ company.no_telepon }}</p>
                </div>
            </div>
        </div>
    </BasePageNoNav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BasePageNoNav from '@/layouts/BasePageNoNav.vue';
import TopHeader from '@/components/TopHeader.vue';

const company = ref({
    alamat: 'Jl. Raya Industri No. 45',
    kota_kabupaten: 'Bandung',
    provinsi: 'Jawa Barat',
    negara: 'Indonesia',
    kode_pos: '40235',
    no_telepon: '+62 22-1234-5678'
});
</script>