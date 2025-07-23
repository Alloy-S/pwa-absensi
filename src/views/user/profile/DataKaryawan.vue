<template>
    <BasePageNoNav>
        <TopHeader title="Data Karyawan" />
        <TopProfileNavigation />
        <div class="p-4 space-y-4">
            <h2 class="text-lg font-semibold">Informasi Karyawan</h2>
            <div class="bg-white p-4 rounded-lg shadow-md">
                <div class="mb-4">
                    <label class="block text-sm font-medium">NIP</label>
                    <p class="text-gray-700">{{ employee.nip || '-' }}</p>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium">Nama PIC</label>
                        <p class="text-gray-700">{{ employee.user_pic_name || '-' }}</p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium">Lokasi Kerja</label>
                        <p class="text-gray-700">{{ employee.lokasi || '-' }}</p>
                    </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4 mt-4">
                    <div>
                        <label class="block text-sm font-medium">Jadwal Kerja</label>
                        <p class="text-gray-700">{{ employee.jadwal_kerja || '-' }}</p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium">Jabatan</label>
                        <p class="text-gray-700">{{ employee.jabatan || '-' }}</p>
                    </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4 mt-4">
                    <div>
                        <label class="block text-sm font-medium">Tanggal Bergabung</label>
                        <p class="text-gray-700">{{ employee.tgl_gabung || '-' }}</p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium">Tipe Karyawan</label>
                        <p class="text-gray-700">{{ employee.tipe_karyawan || '-' }}</p>
                    </div>
                </div>
                
                <div class="mt-4">
                    <label class="block text-sm font-medium">Jabatan</label>
                    <p class="text-gray-700">{{ employee.jabatan || '-' }}</p>
                </div>
            </div>
        </div>
    </BasePageNoNav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BasePageNoNav from '@/layouts/user/BasePageNoNav.vue';
import TopHeader from '@/components/user/TopHeader.vue';
import TopProfileNavigation from '@/components/user/TopProfileNavigation.vue';
import { DataKaryawan, initDataKaryawan } from '@/models/userModel';
import { fetchDataKaryawan } from '@/services/userService';
import { onMounted } from 'vue';

const employee = ref<DataKaryawan>(initDataKaryawan());

const getDataKaryawan = async () => {
    employee.value = await fetchDataKaryawan();
};

onMounted(() => {
    getDataKaryawan();
});

</script>
