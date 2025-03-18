<template>
    <BasePageNoNav>
        <TopHeader title="Profile" />
        <TopProfileNavigation />
        
        <div class="p-4 space-y-4">
            <h2 class="text-lg font-semibold">Informasi Kontak</h2>
            
            <div class="bg-white p-4 rounded-lg shadow-md">
                <div class="mb-4">
                    <label class="block text-sm font-medium">Alamat</label>
                    <p class="text-gray-700">{{ contact.alamat }}</p>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium">Kota/Kabupaten</label>
                        <p class="text-gray-700">{{ contact.kota_kabupaten }}</p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium">Provinsi</label>
                        <p class="text-gray-700">{{ contact.provinsi }}</p>
                    </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4 mt-4">
                    <div>
                        <label class="block text-sm font-medium">Negara</label>
                        <p class="text-gray-700">{{ contact.negara }}</p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium">No. Telepon</label>
                        <p class="text-gray-700">{{ contact.no_telepon }}</p>
                    </div>
                </div>
            </div>
            
            <h2 class="text-lg font-semibold mt-6">Kontak Darurat</h2>
            <div class="bg-white p-4 rounded-lg shadow-md">
                <div class="mb-4">
                    <label class="block text-sm font-medium">Nama Darurat</label>
                    <p class="text-gray-700">{{ contact.nama_darurat }}</p>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium">No. Telepon Darurat</label>
                        <p class="text-gray-700">{{ contact.no_telepon_darurat }}</p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium">Relasi</label>
                        <p class="text-gray-700">{{ contact.relasi_darurat }}</p>
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
    relasi_darurat: 'Saudara'
});
</script>
