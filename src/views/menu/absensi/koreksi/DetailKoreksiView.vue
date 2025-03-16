<template>
    <BasePageNoNav>
        <TopHeader :title="'Detail Koreksi kehadrian'" />
        <div class="p-4">
            <div class="space-y-2">
                <DetailItem label="Diajukan Oleh" :value="data.pengaju" />
                <DetailItem label="Tanggal" :value="data.tanggal" />
                <DetailItem label="Shift" :value="data.shift" />
                <DetailItem label="Jam Masuk" :value="data.jamMasuk" />
                <DetailItem label="Jam Keluar" :value="data.jamKeluar" />
                <DetailItem label="Status" :value="data.status" />
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
import { useRoute } from 'vue-router';
import BasePageNoNav from '@/layouts/BasePageNoNav.vue';
import TopHeader from '@/components/TopHeader.vue';
import DetailItem from '@/components/DetailItem.vue';

const route = useRoute();
const pageTitle = `Detail ${route.params.type}`;

const data = {
    pengaju: 'Alloysius Steven',
    tanggal: '2025-03-13',
    status: 'Menunggu Persetujuan',
    shift: 'Pagi',
    jamMasuk: '08:00',
    jamKeluar: '16:00',
    deskripsi: 'koreksi lupa absen',
    persetujaun: {
        oleh: 'Supervisor',
        tanggal: '2025-03-14'
    }
};
</script>