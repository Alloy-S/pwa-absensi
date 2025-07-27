<template>
    <BasePageNoNav>
        <TopHeader title="Pengumuman" :show-back-button="true"/>
        <div class="p-4 space-y-4">
            <h1 class="text-xl font-semibold text-gray-800">Daftar Pengumuman</h1>

            
            <div v-if="loading" class="text-center text-gray-500 py-10">
                <i class="fa-solid fa-spinner animate-spin text-3xl"></i>
                <p class="mt-2">Memuat pengumuman...</p>
            </div>

            
            <div v-else-if="announcements.length === 0" class="text-center text-gray-500 py-10">
                <i class="fa-solid fa-bell-slash text-3xl"></i>
                <p class="mt-2">Tidak ada pengumuman saat ini.</p>
            </div>

            <div v-else class="space-y-3">
                <button v-for="announcement in announcements" :key="announcement.id" @click="goToDetail(announcement.id)"
                    class="w-full flex justify-between items-center text-left p-4 bg-white rounded-lg shadow-md border-l-[6px] transition-all duration-300 hover:shadow-lg hover:border-blue-600 border-blue-500">
                    
                    <div class="flex flex-col">
                        <p class="text-lg font-semibold text-slate-800">{{ announcement.judul }}</p>
                        <p class="text-sm text-slate-500">{{ formatDate(announcement.date_created) }}</p>
                    </div>

                    <div class="flex flex-col justify-center">
                        <i class="fa-solid fa-angle-right text-gray-500 text-lg"></i>
                    </div>
                </button>
            </div>
        </div>
    </BasePageNoNav>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import BasePageNoNav from '@/layouts/user/BasePageNoNav.vue';
import TopHeader from '@/components/user/TopHeader.vue';
import { fetchPengumumanUser } from '@/services/pengumumanService';
import { toast } from 'vue3-toastify';
import { Pengumuman } from '@/models/PengumumanModel';

const router = useRouter();
const loading = ref(true);
const announcements = ref<Pengumuman[]>([]);

const getAnnouncements = async () => {
    loading.value = true;
    try {
        const response = await fetchPengumumanUser();
        announcements.value = response.items;
    } catch (error) {
        console.error("Gagal memuat pengumuman:", error);
        toast.error("Gagal memuat pengumuman.");
    } finally {
        loading.value = false;
    }
};

const goToDetail = (id: string) => {
    router.push(`/menu/pengumuman/${id}`);
};

const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
};

onMounted(() => {
    getAnnouncements();
});
</script>
