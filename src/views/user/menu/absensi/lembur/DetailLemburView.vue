<template>
    <BasePageNoNav>
        <TopHeader :title="'Detail Pengajuan Lembur'" />
        <div class="p-4">
            <div class="space-y-2">
                <DetailItem label="Diajukan Oleh" :value="data.pengaju" />
                <DetailItem label="Tanggal" :value="data.tanggal" />
                <DetailItem label="Status" :value="data.status" />
                <DetailItem label="Status" :value="data.time_start" />
                <DetailItem label="Status" :value="data.time_end" />
                <DetailItem label="Deskripsi" :value="data.deskripsi" />
                
                <div>
                    <p class="text-sm font-medium text-gray-600">Persetujuan</p>
                    <p class="text-lg">Persetujuan oleh <span class="font-semibold">{{ data.persetujaun.oleh }}</span> tanggal <span class="font-semibold">{{ data.persetujaun.tanggal }}</span></p>
                </div>
            </div>
        </div>
    </BasePageNoNav>
</template>

<script setup lang="ts">
// import { useRoute } from 'vue-router';
import BasePageNoNav from '@/layouts/user/BasePageNoNav.vue';
import TopHeader from '@/components/user/TopHeader.vue';
import DetailItem from '@/components/user/DetailItem.vue';

// const route = useRoute();

const data = {
    pengaju: 'Alloysius Steven',
    tanggal: '2025-03-13',
    status: 'Menunggu Persetujuan',
    time_start: '2025-03-13 17:00',
    time_end: '2025-03-13 20:00',
    deskripsi: 'Pengajuan lembur untuk menyelesaikan proyek yang mendesak',
    persetujaun: {
        oleh: 'Supervisor',
        tanggal: '2025-03-14'
    }
};
</script>