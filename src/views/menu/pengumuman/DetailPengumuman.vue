<template>
    <BasePageNoNav>
        <TopHeader title="Detail Pengumuman" />
        <div class="p-6 space-y-6 ">
            <h1 class="text-2xl font-semibold text-gray-900">{{ announcement.title }}</h1>
            <p class="text-sm text-gray-600">{{ announcement.date }}</p>

            <div class="bg-white p-6 rounded-lg shadow-md">
                <p class="text-gray-800 text-lg">{{ announcement.content }}</p>
            </div>
        </div>
    </BasePageNoNav>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BasePageNoNav from '@/layouts/BasePageNoNav.vue';
import TopHeader from '@/components/TopHeader.vue';

const route = useRoute();
const router = useRouter();

const announcements = [
    { id: 1, title: 'Libur Nasional', date: '12 Maret 2025', content: 'Perusahaan akan libur pada tanggal 14 Maret 2025.' },
    { id: 2, title: 'Perubahan Jam Kerja', date: '10 Maret 2025', content: 'Jam kerja shift malam berubah menjadi 20:00 - 04:00.' },
];

const announcement = ref(announcements.find(a => a.id === parseInt(route.params.id)) || {});

const goBack = () => {
    router.push('/pengumuman');
};
</script>
