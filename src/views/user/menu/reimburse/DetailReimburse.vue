<template>
    <BasePageNoNav>
        <TopHeader title="Detail Reimburse" />
        <div class="p-4">
            <div class="space-y-4 rounded-md shadow-sm">
                <h1 class="text-lg font-semibold">Detail Pengajuan Reimburse</h1>
                <p><strong>Tanggal:</strong> {{ reimburse.date }}</p>
                <p><strong>Jumlah:</strong> Rp{{ reimburse.amount.toLocaleString() }}</p>
                <p><strong>Keterangan:</strong> {{ reimburse.description }}</p>
                <p><strong>Status:</strong> <span>{{ reimburse.status }}</span></p>
            </div>
        </div>
    </BasePageNoNav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import BasePageNoNav from '@/layouts/user/BasePageNoNav.vue';
import TopHeader from '@/components/TopHeader.vue';

const route = useRoute();
const reimburse = ref({ id: route.params.id, date: '2025-03-12', amount: 500000, description: 'Pembelian alat kerja', status: 'Pending' });
// const statusClass = (status) => status === 'Pending' ? 'text-yellow-500' : 'text-green-500';
</script>