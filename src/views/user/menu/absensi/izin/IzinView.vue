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

                <div class="mt-3">
                    <label for="month-picker" class="text-sm font-semibold text-gray-700">Periode Berdasarkan
                        Bulan</label>
                    <input type="month" v-model="selectedMonth" id="month-picker"
                        class="w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" />
                </div>

                <div class="mt-3">
                    <label class="block">Filter Status:</label>
                    <select v-model="selectedStatus" class="w-full border-slate-300 p-2 rounded-md">
                        <option value="all">Semua</option>
                        <option value="pending">Menunggu Persetujuan</option>
                        <option value="approved">Disetujui</option>
                        <option value="rejected">Ditolak</option>
                    </select>
                </div>

                <div v-if="daftarIzin.length > 0" class="mt-3 space-y-3">
                    <h2 class="text-lg font-semibold text-gray-700">Daftar Pengajuan Izin</h2>
                    <button v-for="(izin, index) in daftarIzin" :key="index"
                        class="w-full flex justify-between p-4 bg-white shadow-md rounded-md mt-2 border-l-4" :class="{
                            'border-yellow-500': izin.status === 'Menunggu Persetujuan',
                            'border-green-500': izin.status === 'Disetujui',
                            'border-red-500': izin.status === 'Ditolak'
                        }" @click="detailPengajuanIzin(izin.id)">
                        <div class="flex flex-col items-start">
                            <p class="text-sm text-gray-600">{{ izin.tanggal }}</p>
                            <p class="font-medium">{{ izin.keterangan }}</p>
                        </div>
                        
                        <p class="text-sm font-semibold" :class="{
                            'text-yellow-500': izin.status === 'Menunggu Persetujuan',
                            'text-green-500': izin.status === 'Disetujui',
                            'text-red-500': izin.status === 'Ditolak'
                        }">{{ izin.status }}</p>
                    </button>
                </div>
                <p v-else class="text-center text-gray-500">Belum ada pengajuan Izin.</p>
            </div>
        </div>
    </BasePageNoNav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TopAbsensiNavigation from '@/components/user/TopAbsensiNavigation.vue';
import TopHeader from '@/components/user/TopHeader.vue';
import BasePageNoNav from '@/layouts/user/BasePageNoNav.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const selectedMonth = ref(null);
const selectedStatus = ref('pending');

const daftarIzin = ref([
    {id: "1", tanggal: '2025-03-10', keterangan: 'Sakit', status: 'Menunggu Persetujuan' },
    {id: "1", tanggal: '2025-03-05', keterangan: 'Cuti Tahunan', status: 'Disetujui' },
    {id: "1", tanggal: '2025-03-02', keterangan: 'Urusan Keluarga', status: 'Ditolak' }
]);

const ajukanIzin = () => {
    router.push('izin/add');
};

const detailPengajuanIzin = (id: string) => {
    router.push(`izin/${id}`);
};
</script>
