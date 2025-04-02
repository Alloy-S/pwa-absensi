<template>
    <BasePageNoNav>
        <TopHeader title="Koreksi Kehadiran" />
        <TopAbsensiNavigation />
        <div class="p-4">
            <button class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition"
                @click="tambahKoreksi">
                Ajukan Koreksi
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

                <div v-if="koreksiList.length > 0" class="mt-3 space-y-3">
                    <h2 class="text-lg font-semibold text-gray-700">Daftar Pengajuan Koreksi</h2>
                    <Button v-for="(koreksi, index) in koreksiList" :key="index"
                        class="w-full flex justify-between bg-white p-4 rounded-lg shadow border-l-4"
                        :class="statusColor(koreksi.status)" @click="detailKoreksi(koreksi.id)">
                        <div class="flex flex-col items-start">
                            <p class="text-sm font-semibold">Tanggal: {{ koreksi.tanggal }}</p>
                            <p class="text-sm">Alasan: {{ koreksi.alasan }}</p>
                        </div>
                        <div class="text-sm font-semibold" :class="statusTextColor(koreksi.status)">{{ koreksi.status }}
                        </div>
                    </Button>
                </div>
                <p v-else class="text-center text-gray-500">Belum ada pengajuan koreksi.</p>
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

const koreksiList = ref([
    { id: "1", tanggal: '2025-03-10', alasan: 'Terlambat Absen', status: 'Diproses' },
    { id: "1", tanggal: '2025-03-12', alasan: 'Lupa Absen Masuk', status: 'Disetujui' },
    { id: "1", tanggal: '2025-03-14', alasan: 'Kesalahan Data', status: 'Ditolak' }
]);

const statusColor = (status: string) => {
    return {
        'Diproses': 'border-yellow-500',
        'Disetujui': 'border-green-500',
        'Ditolak': 'border-red-500'
    }[status] || 'border-gray-500';
};

const statusTextColor = (status: string) => {
    return {
        'Diproses': 'text-yellow-600',
        'Disetujui': 'text-green-600',
        'Ditolak': 'text-red-600'
    }[status] || 'text-gray-600';
};

const tambahKoreksi = () => {
    router.push('/menu/absensi/koreksi-kehadiran/add');
};

const detailKoreksi = (id: string) => {
    router.push('/menu/absensi/koreksi-kehadiran/' + id);
};
</script>
