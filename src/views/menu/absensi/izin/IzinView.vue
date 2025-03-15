<template>
    <BasePageNoNav>
        <TopHeader title="Izin" />
        <TopAbsensiNavigation />
        <div class="p-4">
            <button class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition"
                @click="ajukanIzin">
                Ajukan Izin
            </button>

            <div class="mt-4">

                <div v-if="daftarIzin.length > 0" class="space-y-3">
                    <h2 class="text-lg font-semibold text-gray-700">Daftar Pengajuan Izin</h2>
                    <div v-for="(izin, index) in daftarIzin" :key="index"
                        class="p-4 bg-white shadow-md rounded-md mt-2 border-l-4" :class="{
                            'border-yellow-500': izin.status === 'Menunggu Persetujuan',
                            'border-green-500': izin.status === 'Disetujui',
                            'border-red-500': izin.status === 'Ditolak'
                        }">
                        <p class="text-sm text-gray-600">{{ izin.tanggal }}</p>
                        <p class="font-medium">{{ izin.keterangan }}</p>
                        <p class="text-sm" :class="{
                            'text-yellow-500': izin.status === 'Menunggu Persetujuan',
                            'text-green-500': izin.status === 'Disetujui',
                            'text-red-500': izin.status === 'Ditolak'
                        }">Status: {{ izin.status }}</p>
                    </div>
                </div>
                <p v-else class="text-center text-gray-500">Belum ada pengajuan Izin.</p>
            </div>
        </div>
    </BasePageNoNav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TopAbsensiNavigation from '../../../../components/TopAbsensiNavigation.vue';
import TopHeader from '../../../../components/TopHeader.vue';
import BasePageNoNav from '../../../../layouts/BasePageNoNav.vue';

const daftarIzin = ref([
    { tanggal: '2025-03-10', keterangan: 'Sakit', status: 'Menunggu Persetujuan' },
    { tanggal: '2025-03-05', keterangan: 'Cuti Tahunan', status: 'Disetujui' },
    { tanggal: '2025-03-02', keterangan: 'Urusan Keluarga', status: 'Ditolak' }
]);

const ajukanIzin = () => {
    alert('Fitur pengajuan izin akan segera tersedia!');
};
</script>
