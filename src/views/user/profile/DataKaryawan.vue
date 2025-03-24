<template>
    <BasePageNoNav>
        <TopHeader title="Data Karyawan" />
        <TopProfileNavigation />
        <div class="p-4 space-y-4">
            <h2 class="text-lg font-semibold">Informasi Karyawan</h2>
            <div class="bg-white p-4 rounded-lg shadow-md">
                <div class="mb-4">
                    <label class="block text-sm font-medium">NIP</label>
                    <p class="text-gray-700">{{ employee.nip }}</p>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium">Nama PIC</label>
                        <p class="text-gray-700">{{ getPICName(employee.pic_id) }}</p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium">Lokasi Kerja</label>
                        <p class="text-gray-700">{{ getLocationName(employee.lokasi_id) }}</p>
                    </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4 mt-4">
                    <div>
                        <label class="block text-sm font-medium">Jadwal Kerja</label>
                        <p class="text-gray-700">{{ getScheduleName(employee.jadwal_kerja_id) }}</p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium">Grup</label>
                        <p class="text-gray-700">{{ getGroupName(employee.grup_id) }}</p>
                    </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4 mt-4">
                    <div>
                        <label class="block text-sm font-medium">Tanggal Bergabung</label>
                        <p class="text-gray-700">{{ employee.tgl_gabung }}</p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium">Tipe Karyawan</label>
                        <p class="text-gray-700">{{ employee.tipe_karyawan }}</p>
                    </div>
                </div>
                
                <div class="mt-4">
                    <label class="block text-sm font-medium">Jabatan</label>
                    <p class="text-gray-700">{{ employee.jabatan }}</p>
                </div>
            </div>
        </div>
    </BasePageNoNav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BasePageNoNav from '@/layouts/user/BasePageNoNav.vue';
import TopHeader from '@/components/TopHeader.vue';
import TopProfileNavigation from '@/components/TopProfileNavigation.vue';

const employee = ref({
    nip: '12345678',
    pic_id: 'uuid-pic-001',
    lokasi_id: 'uuid-lokasi-001',
    jadwal_kerja_id: 'uuid-jadwal-001',
    grup_id: 'uuid-grup-001',
    tgl_gabung: '2023-05-10',
    lokasi_kerja: 'Jakarta',
    tipe_karyawan: 'Full-time',
    jabatan: 'Supervisor'
});

const picNames = {
    'uuid-pic-001': 'Budi Santoso',
};

const locationNames = {
    'uuid-lokasi-001': 'Kandang Utama',
};

const scheduleNames = {
    'uuid-jadwal-001': 'Shift Pagi',
};

const groupNames = {
    'uuid-grup-001': 'Tim Produksi',
};

const getPICName = (id: string) => picNames[id] || 'Tidak Diketahui';
const getLocationName = (id: string) => locationNames[id] || 'Tidak Diketahui';
const getScheduleName = (id: string) => scheduleNames[id] || 'Tidak Diketahui';
const getGroupName = (id: string) => groupNames[id] || 'Tidak Diketahui';
</script>
