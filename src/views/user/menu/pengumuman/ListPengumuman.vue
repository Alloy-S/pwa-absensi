<template>
    <BasePageNoNav>
        <TopHeader title="Pengumuman" />
        <div class="p-6 space-y-4">
            <h1 class="text-xl font-semibold text-gray-800">Daftar Pengumuman</h1>

            <div v-if="announcements.length === 0" class="text-center text-gray-500 py-4">
                Tidak ada pengumuman.
            </div>

            <div class="space-y-4">
                <button v-for="announcement in announcements" :key="announcement.id" @click="goToDetail(announcement)"
                    class="w-full flex justify-between p-4 rounded-lg shadow-md border-l-[6px] transition-all duration-300
                    border-blue-500">
                    
                    <div class="flex flex-col justify-center text-blue-700">
                        <p class="text-lg font-semibold">{{ announcement.title }}</p>
                        <p class="text-sm">{{ announcement.date }}</p>
                    </div>

                    <div class="flex flex-col justify-center">
                        <i class="fa-solid fa-angle-right text-gray-600 text-lg"></i>
                    </div>
                </button>
            </div>
        </div>
    </BasePageNoNav>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import BasePageNoNav from '@/layouts/user/BasePageNoNav.vue';
import TopHeader from '@/components/TopHeader.vue';

const router = useRouter();

const announcements = ref([
    { id: 1, title: 'Libur Nasional', date: '12 Maret 2025', content: 'Perusahaan akan libur pada tanggal 14 Maret 2025.' },
    { id: 2, title: 'Perubahan Jam Kerja', date: '10 Maret 2025', content: 'Jam kerja shift malam berubah menjadi 20:00 - 04:00.' },
]);

const goToDetail = (announcement) => {
    router.push(`/menu/pengumuman/${announcement.id}`);
};
</script>
