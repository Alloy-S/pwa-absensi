<template>
    <BasePageNoNav>
        <TopHeader title="Detail Absensi" />

        <div class="p-4">
            <div v-if="loading" class="text-center py-20">
                <i class="fa-solid fa-spinner fa-spin text-4xl text-gray-400"></i>
                <p class="mt-3 text-gray-500">Memuat detail...</p>
            </div>

            
            <div v-else-if="attendanceDetail" class="space-y-4">
                <div class="bg-white p-4 rounded-lg shadow-md">
                    <div class="flex justify-between items-start">
                        <div>
                            <p class="font-bold text-lg text-slate-800">{{ formatDate(attendanceDetail.date) }}</p>
                            <p class="text-sm text-slate-500">Lokasi: {{ attendanceDetail.lokasi }}</p>
                        </div>
                        <span :class="getStatusBadgeClass(attendanceDetail.status)" 
                              class="text-xs font-semibold px-3 py-1 rounded-full">
                            {{ attendanceDetail.status }}
                        </span>
                    </div>
                </div>

                
                <div class="bg-white p-4 rounded-lg shadow-md">
                    <h3 class="font-semibold text-slate-800 mb-4">Waktu Tercatat</h3>
                    <div class="relative border-l-2 border-gray-200 ml-3">
                        
                        <div v-if="attendanceDetail.jamMasuk" class="mb-6 ml-6">
                            <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white">
                                <i class="fa-solid fa-arrow-right-to-bracket text-blue-600"></i>
                            </span>
                            <h4 class="font-semibold text-gray-900">Jam Masuk</h4>
                            <p class="text-2xl font-mono text-gray-800">{{ formatTime(attendanceDetail.jamMasuk.date) }}</p>
                            <p class="text-sm text-gray-500">{{ attendanceDetail.jamMasuk.status_absensi }}</p>
                        </div>

                        
                        <div v-if="attendanceDetail.jamPulang" class="ml-6">
                            <span class="absolute flex items-center justify-center w-6 h-6 bg-red-100 rounded-full -left-3 ring-8 ring-white">
                                <i class="fa-solid fa-arrow-right-from-bracket text-red-600"></i>
                            </span>
                            <h4 class="font-semibold text-gray-900">Jam Pulang</h4>
                            <p class="text-2xl font-mono text-gray-800">{{ formatTime(attendanceDetail.jamPulang.date) }}</p>
                            <p class="text-sm text-gray-500">{{ attendanceDetail.jamPulang.status_absensi }}</p>
                        </div>
                    </div>
                </div>

                
                <div v-if="attendanceDetail.jamMasuk?.catatan || attendanceDetail.jamPulang?.catatan" class="bg-white p-4 rounded-lg shadow-md">
                    <h3 class="font-semibold text-slate-800 mb-2">Catatan</h3>
                    <p v-if="attendanceDetail.jamMasuk?.catatan" class="text-sm text-gray-600">
                        <span class="font-semibold">[Masuk]</span> {{ attendanceDetail.jamMasuk.catatan }}
                    </p>
                    <p v-if="attendanceDetail.jamPulang?.catatan" class="text-sm text-gray-600 mt-1">
                        <span class="font-semibold">[Pulang]</span> {{ attendanceDetail.jamPulang.catatan }}
                    </p>
                </div>
            </div>
            
            
            <div v-else class="text-center py-20">
                 <i class="fa-solid fa-file-circle-question text-4xl text-gray-400"></i>
                <p class="mt-3 text-gray-500">Detail absensi tidak ditemukan.</p>
            </div>
        </div>
    </BasePageNoNav>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import BasePageNoNav from '@/layouts/user/BasePageNoNav.vue';
import TopHeader from '@/components/user/TopHeader.vue';
import { Absensi, DetailAbsensi } from '@/models/absensiModel';
import { fetchDetailAbsensi } from '@/services/absensiService';

const route = useRoute();
const loading = ref(true);


interface ProcessedAbsensi extends Absensi {
    jamMasuk?: DetailAbsensi;
    jamPulang?: DetailAbsensi;
}

const attendanceDetail = ref<ProcessedAbsensi | null>(null);


const getAttendanceDetail = async () => {
    try {
        const absensiId = route.params.id as string;
        const response: Absensi = await fetchDetailAbsensi(absensiId);

        attendanceDetail.value = {
            ...response,
            jamMasuk: response.detail_absensi.find(d => d.type === 'IN'),
            jamPulang: response.detail_absensi.find(d => d.type === 'OUT'),
        };

    } catch (error) {
        console.error("Gagal memuat detail absensi:", error);
    } finally {
        loading.value = false;
    }
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

const formatTime = (dateTimeString: string) => {
    if (!dateTimeString) return '-';
    return new Date(dateTimeString).toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
};

const getStatusBadgeClass = (status: string) => {
    if (!status) return 'bg-gray-100 text-gray-800';
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes('hadir')) return 'bg-green-100 text-green-800';
    if (lowerStatus.includes('terlambat')) return 'bg-yellow-100 text-yellow-800';
    if (lowerStatus.includes('alpha')) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
};

onMounted(() => {
    getAttendanceDetail();
});
</script>
