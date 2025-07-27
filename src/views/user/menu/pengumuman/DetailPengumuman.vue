<template>
    <BasePageNoNav>
        <TopHeader :title="'Detail Pengumuman'" :show-back-button="true" />
        <div class="p-4">
            
            <div v-if="loading" class="text-center py-20">
                <i class="fa-solid fa-spinner fa-spin text-4xl text-gray-400"></i>
                <p class="mt-3 text-gray-500">Memuat detail...</p>
            </div>

   
            <div v-else-if="announcement" class="space-y-4">
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <p class="text-sm text-gray-500 mb-2">{{ formatDate(announcement.date_created) }}</p>
                    <h1 class="text-2xl font-bold text-slate-800 mb-5 border-b pb-4">{{ announcement.judul }}</h1>
                    
                
                    <div class="prose max-w-none" v-html="announcement.isi"></div>
                </div>
            </div>

       
            <div v-else class="text-center py-20">
                <i class="fa-solid fa-file-circle-question text-4xl text-gray-400"></i>
                <p class="mt-3 text-gray-500">Pengumuman tidak ditemukan.</p>
            </div>
        </div>
    </BasePageNoNav>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import BasePageNoNav from '@/layouts/user/BasePageNoNav.vue';
import TopHeader from '@/components/user/TopHeader.vue';
import { fetchPengumumanById } from '@/services/pengumumanService';
import { toast } from 'vue3-toastify';
import { Pengumuman } from '@/models/PengumumanModel';

const route = useRoute();
const loading = ref(true);
const announcement = ref<Pengumuman | null>(null);

const getAnnouncementDetail = async (id: string) => {
    loading.value = true;
    try {
        announcement.value = await fetchPengumumanById(id);
    } catch (error) {
        console.error("Gagal memuat detail pengumuman:", error);
        toast.error("Gagal memuat detail pengumuman.");
    } finally {
        loading.value = false;
    }
};

const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
};

onMounted(() => {
    const announcementId = route.params.id as string;
    if (announcementId) {
        getAnnouncementDetail(announcementId);
    } else {
        toast.error("ID Pengumuman tidak valid.");
        loading.value = false;
    }
});
</script>

<style>
.prose h1, .prose h2, .prose h3 {
    margin-bottom: 0.75em;
    font-weight: 600;
}
.prose p {
    margin-bottom: 1em;
    line-height: 1.6;
}
.prose ul, .prose ol {
    margin-bottom: 1em;
    padding-left: 1.5em;
}
.prose li {
    margin-bottom: 0.5em;
}
.prose a {
    color: #2563eb;
    text-decoration: underline;
}
.prose blockquote {
    border-left: 4px solid #e5e7eb;
    padding-left: 1em;
    margin-left: 0;
    font-style: italic;
    color: #4b5563;
}
</style>
