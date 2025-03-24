<template>
    <BasePageNoNav>
        <TopHeader title="Absensi Borongan" />

        <div class="p-4 space-y-4">
            <div class="flex justify-between items-center">
                <h1 class="text-xl font-semibold text-gray-800">Riwayat Absensi Borongan</h1>
            </div>

            <!-- Tombol Tambah Absensi -->
            <button @click="goToCreateAbsence"
                class="w-full px-4 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
                + Tambah Absensi Borongan
            </button>

            <div class="mt-3">
                <label for="month-picker" class="text-sm font-semibold text-gray-700">Periode Berdasarkan Bulan</label>
                <input type="month" v-model="selectedMonth" id="month-picker"
                    class="w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" />
            </div>

            <!-- Daftar Riwayat -->
            <div v-if="filteredAbsences.length > 0" class="space-y-3">
                <div v-for="absence in filteredAbsences" :key="absence.id"
                    class="p-4 bg-white border rounded-lg shadow-sm cursor-pointer hover:shadow-md transition"
                    @click="goToDetail(absence.id)">
                    <p class="text-lg font-semibold text-gray-900">{{ formatDate(absence.date) }}</p>
                    <p class="text-gray-700">Dibuat oleh: <span class="font-medium">{{ absence.createdBy }}</span></p>
                    <p class="text-gray-700">Jumlah Karyawan: <span class="font-medium">{{ absence.workers.length }}</span></p>
                </div>
            </div>
            
            <p v-else class="text-gray-500 text-center">Tidak ada absensi untuk bulan ini.</p>
        </div>
    </BasePageNoNav>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import BasePageNoNav from '@/layouts/user/BasePageNoNav.vue';
import TopHeader from '@/components/TopHeader.vue';

const router = useRouter();
const selectedMonth = ref('');

// Data Dummy
const absences = ref([
    { id: 1, date: '2025-03-12', createdBy: 'Admin', workers: [{ name: 'Budi', type: 'borongan' }, { name: 'Ani', type: 'harian' }] },
    { id: 2, date: '2025-03-11', createdBy: 'Supervisor', workers: [{ name: 'Doni', type: 'borongan' }] },
    { id: 3, date: '2025-02-15', createdBy: 'Admin', workers: [{ name: 'Rudi', type: 'borongan' }] },
]);

// Daftar bulan
const months = ref([
    { label: 'Januari', value: '01' },
    { label: 'Februari', value: '02' },
    { label: 'Maret', value: '03' },
    { label: 'April', value: '04' },
    { label: 'Mei', value: '05' },
    { label: 'Juni', value: '06' },
    { label: 'Juli', value: '07' },
    { label: 'Agustus', value: '08' },
    { label: 'September', value: '09' },
    { label: 'Oktober', value: '10' },
    { label: 'November', value: '11' },
    { label: 'Desember', value: '12' },
]);

// Filter berdasarkan bulan
const filteredAbsences = computed(() => {
    if (!selectedMonth.value) return absences.value;
    return absences.value.filter(absence => absence.date.split('-')[1] === selectedMonth.value);
});

// Navigasi ke halaman detail
const goToDetail = (id) => {
    router.push(`/menu/absensi/borongan/${id}`);
};

// Navigasi ke halaman tambah absensi
const goToCreateAbsence = () => {
    router.push('/menu/absensi/borongan/create');
};

// Format tanggal ke DD MMMM YYYY
const formatDate = (date) => {
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return new Date(date).toLocaleDateString('id-ID', options);
};
</script>
