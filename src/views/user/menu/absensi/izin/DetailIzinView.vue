<template>
    <BasePageNoNav>
        <TopHeader :title="'Detail Pengajuan Izin'" />
        <div class="p-4">
            <div class="space-y-2">
                <DetailItem label="Diajukan Oleh" :value="data.pengaju" />
                <DetailItem label="Tanggal" :value="data.tanggal" />
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
// import { useRoute } from 'vue-router';
import BasePageNoNav from '@/layouts/user/BasePageNoNav.vue';
import TopHeader from '@/components/user/TopHeader.vue';
import DetailItem from '@/components/user/DetailItem.vue';

// const route = useRoute();

const data = {
    pengaju: 'Alloysius Steven',
    tanggal: '2025-03-13',
    status: 'Menunggu Persetujuan',
    deskripsi: 'Pengajuan izin sakit karena demam',
    persetujaun: {
        oleh: 'Supervisor',
        tanggal: '2025-03-14'
    }
};
</script>