<template>
    <BasePageNoNav>
        <TopHeader title="Daftar Pengajuan" />
        <div class="p-4 space-y-4">
            <h1 class="text-lg font-semibold">Daftar Pengajuan untuk Disetujui</h1>

            <label class="block">Filter Kategori:</label>
            <select v-model="selectedCategory" class="w-full border-slate-300 p-2 rounded-md">
                <option value="all">Semua</option>
                <option value="koreksi kehadiran">Koreksi Kehadiran</option>
                <option value="izin">Izin</option>
                <option value="lembur">Lembur</option>
                <option value="reimburse">Reimburse</option>
            </select>

            <!-- Filter Status -->
            <label class="block">Filter Status:</label>
            <select v-model="selectedStatus" class="w-full border-slate-300 p-2 rounded-md">
                <option value="all">Semua</option>
                <option value="pending">Menunggu Persetujuan</option>
                <option value="approved">Disetujui</option>
                <option value="rejected">Ditolak</option>
            </select>

            <!-- Daftar Pengajuan -->
            <div class="mt-3">
                <button v-for="(request, index) in filteredRequests" :key="index" @click="goToDetail(request)"
                    class="w-full flex space-x-4 justify-between bg-white p-4 rounded-lg shadow mb-3 border-l-4 border-blue-500">
                    <div class="flex flex-col justify-center items-start text-sm text-slate-800">
                        <p class="text-lg font-semibold">{{ request.category }}</p>
                        <p>Tanggal: <span class="font-semibold">{{ request.date }}</span></p>
                        <p>Status: <span class="font-semibold" :class="statusClass(request.status)">{{ request.status
                                }}</span></p>
                    </div>
                    <div class="flex flex-col justify-center">
                        <i class="fa-solid fa-angle-right"></i>
                    </div>
                </button>
            </div>
        </div>
    </BasePageNoNav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import BasePageNoNav from '@/layouts/user/BasePageNoNav.vue';
import TopHeader from '@/components/user/TopHeader.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const selectedCategory = ref('all');
const selectedStatus = ref('all');

const requests = ref([
    { id: 1, category: 'koreksi', type: 'Koreksi Absensi', date: '2025-03-13', status: 'pending' },
    { id: 3, category: 'borongan', type: 'Reimburse', date: '2025-03-11', status: 'pending' },
    { id: 2, category: 'izin', type: 'Reimburse', date: '2025-03-12', status: 'approved' },
    { id: 3, category: 'lembur', type: 'Reimburse', date: '2025-03-11', status: 'rejected' },
    { id: 4, category: 'reimburse', type: 'Koreksi Absensi', date: '2025-03-10', status: 'pending' },
]);

const filteredRequests = computed(() => {
    if (selectedStatus.value === 'all' && selectedCategory.value === 'all') {
        return requests.value;
    } else if (selectedStatus.value === 'all') {
        return requests.value.filter(req => req.category === selectedCategory.value);
    } else if (selectedCategory.value === 'all') {
        return requests.value.filter(req => req.status === selectedStatus.value);
    }
    return requests.value.filter(req => (req.status === selectedStatus.value && req.category === selectedCategory.value));
});

const statusClass = (status) => {
    return status === 'pending' ? 'text-yellow-500' : status === 'approved' ? 'text-green-500' : 'text-red-500';
};

const goToDetail = (request) => {
    if (request.category === 'borongan') {
        router.push(`/menu/approval/borongan/${request.id}`);
    } else if (request.category === 'reimburse') {
        router.push(`/menu/approval/reimburse/${request.id}`);
    } else if (request.category === 'koreksi') {
        router.push(`/menu/approval/koreksi/${request.id}`);
    } else if (request.category === 'izin') {
        router.push(`/menu/approval/izin/${request.id}`);
    } else if (request.category === 'lembur') {
        router.push(`/menu/approval/lembur/${request.id}`);
    }
};
</script>