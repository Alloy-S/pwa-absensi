<template>
    <BasePageNoNav>
        <TopHeader title="Detail Absensi" />
        <div class="p-4">
            <div class="space-y-2">
                <DetailItem label="Tanggal" :value="data.tanggal" />
                <DetailItem label="Shift" :value="data.shift" />
                <DetailItem label="Jam Masuk" :value="data.jamMasuk" />
                <DetailItem label="Jam Keluar" :value="data.jamKeluar" />
                <DetailItem label="Status Absensi" :value="data.status" />
                <DetailItem label="Deskripsi" :value="data.deskripsi" />
            </div>
        </div>
    </BasePageNoNav>
</template>

<script setup lang="ts">
import BasePageNoNav from '@/layouts/BasePageNoNav.vue';
import TopHeader from '@/components/TopHeader.vue';
import DetailItem from '@/components/DetailItem.vue';

const data = {
    tanggal: '2025-03-13',
    shift: 'Pagi',
    jamMasuk: '08:00',
    jamKeluar: '16:00',
    status: 'Hadir',
    deskripsi: 'Masuk tepat waktu'
};
</script>