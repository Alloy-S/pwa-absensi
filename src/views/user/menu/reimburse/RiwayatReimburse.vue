<template>
    <BasePageNoNav>
        <TopHeader title="Riwayat Reimburse" />
        <div class="p-4 space-y-4">
            <h1 class="text-lg font-semibold">Riwayat Reimburse</h1>
            <button @click="goToCreateReimburse"
                class="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-700">
                + Ajukan Reimburse
            </button>
            <Button v-for="(reimburse, index) in reimburses" :key="index"
                class="w-full flex justify-between bg-white p-4 rounded-lg shadow border-l-4"
                :class="statusColor(reimburse.status)" @click="goToDetail(reimburse.id)">
                <div class="flex flex-col items-start">
                    <p class="text-sm font-semibold">Tanggal: {{ reimburse.date }}</p>
                    <p class="text-sm">Jumlah: {{ reimburse.amount }}</p>
                </div>
                <!-- <div class="text-sm font-semibold" :class="statusTextColor(reimburse.status)">{{ reimburse.status }}
                </div> -->
            </Button>
        </div>
    </BasePageNoNav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import BasePageNoNav from '@/layouts/user/BasePageNoNav.vue';
import TopHeader from '@/components/user/TopHeader.vue';

const router = useRouter();
const reimburses = [
    { id: 1, date: '2025-03-12', status: 'Diproses', amount: 1000000, reason: 'Pembelian Laptop' },
    { id: 2, date: '2025-03-10', status: 'Disetujui', amount: 500000, reason: 'Pembelian Mouse' },

];

const statusColor = (status: string) => {
    return {
        'Diproses': 'border-yellow-500',
        'Disetujui': 'border-green-500',
        'Ditolak': 'border-red-500'
    }[status] || 'border-gray-500';
};

const goToDetail = (id) => router.push(`/menu/reimburse/${id}`);
const goToCreateReimburse = () => router.push('/menu/reimburse/create');
// const statusClass = (status) => status === 'Pending' ? 'text-yellow-500' : 'text-green-500';
</script>