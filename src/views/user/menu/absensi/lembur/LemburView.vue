<template>
    <BasePageNoNav>
        <TopHeader title="Lembur" />
        <TopAbsensiNavigation />
        <div class="p-4">
            <!-- Tombol Ajukan Lembur -->
            <button class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition"
                @click="ajukanLembur">
                Ajukan Lembur
            </button>

            <!-- Daftar Pengajuan Lembur -->
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

                <div class="mt-3" v-if="pengajuanLembur.length > 0">
                    <p class="text-lg font-semibold text-gray-700">Riwayat Pengajuan Lembur</p>
                    <button v-for="(lembur, index) in pengajuanLembur" :key="index" @click="detailLembur(lembur.id)"
                        class="w-full flex justify-between bg-white p-4 rounded-lg shadow mb-3 border-l-4 border-blue-500">
                        <div class="flex flex-col items-start">
                            <p class="font-semibold">{{ lembur.tanggal }}</p>
                            <p class="text-sm text-gray-600">{{ lembur.jamMulai }} - {{ lembur.jamSelesai }}</p>
                        </div>
                        <div class="text-sm font-semibold" :class="statusClass(lembur.status)">
                            {{ lembur.status }}
                        </div>
                    </button>
                </div>
                <p v-else class="text-gray-500 text-center">Belum ada pengajuan lembur.</p>
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

const pengajuanLembur = ref([
    {id: "1", tanggal: "15 Mar 2025", jamMulai: "18:00", jamSelesai: "21:00", status: "Disetujui" },
    {id: "1", tanggal: "10 Mar 2025", jamMulai: "17:30", jamSelesai: "20:00", status: "Menunggu" },
]);

const statusClass = (status: string) => {
    return status === "Disetujui" ? "text-green-500" : status === "Ditolak" ? "text-red-500" : "text-yellow-500";
};

const ajukanLembur = () => {
   router.push('lembur/add');
};

const detailLembur = (id: string) => {
    router.push(`lembur/${id}`);
};
</script>

<style scoped></style>