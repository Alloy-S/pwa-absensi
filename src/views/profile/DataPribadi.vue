<template>
    <BasePageNoNav>
        <TopHeader title="Profile" />
        <TopProfileNavigation />
        
        <div class="p-4 space-y-4">

            <h2 class="text-lg font-semibold mt-6">Informasi Pribadi</h2>
            <div class="bg-white p-4 rounded-lg shadow-md">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium">Gender</label>
                        <p class="text-gray-700">{{ contact.gender }}</p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium">Tanggal Lahir</label>
                        <p class="text-gray-700">{{ contact.tgl_lahir }}</p>
                    </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4 mt-4">
                    <div>
                        <label class="block text-sm font-medium">Tempat Lahir</label>
                        <p class="text-gray-700">{{ contact.tmpt_lahir }}</p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium">Status Kawin</label>
                        <p class="text-gray-700">{{ contact.status_kawin }}</p>
                    </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4 mt-4">
                    <div>
                        <label class="block text-sm font-medium">Agama</label>
                        <p class="text-gray-700">{{ contact.agama }}</p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium">Golongan Darah</label>
                        <p class="text-gray-700">{{ contact.gol_darah }}</p>
                    </div>
                </div>
            </div>
        </div>
    </BasePageNoNav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BasePageNoNav from '@/layouts/BasePageNoNav.vue';
import TopHeader from '@/components/TopHeader.vue';
import TopProfileNavigation from '@/components/TopProfileNavigation.vue';

const contact = ref({
    alamat: 'Jl. Merdeka No. 123',
    kota_kabupaten: 'Jakarta',
    provinsi: 'DKI Jakarta',
    negara: 'Indonesia',
    no_telepon: '+62 812-3456-7890',
    nama_darurat: 'Ahmad',
    no_telepon_darurat: '+62 812-9876-5432',
    relasi_darurat: 'Saudara',
    gender: 'Laki-laki',
    tgl_lahir: '1990-05-20',
    tmpt_lahir: 'Jakarta',
    status_kawin: 'Menikah',
    agama: 'Islam',
    gol_darah: 'O'
});
</script>