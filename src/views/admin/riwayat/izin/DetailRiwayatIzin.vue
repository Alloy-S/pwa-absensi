<template>
    <BasePage>
        <div class="space-y-6">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-semibold text-slate-800">Detail Riwayat Izin</h1>
                    <p v-if="izinDetail" class="text-sm text-gray-500">Tinjau riwayat izin untuk {{ izinDetail.user.fullname }}</p>
                </div>
                <button @click="router.back()" class="text-sm text-blue-600 hover:underline">← Kembali ke Daftar</button>
            </div>

            <div v-if="loading" class="text-center py-20">
                <i class="fa-solid fa-spinner fa-spin text-4xl text-gray-400"></i>
                <p class="mt-3 text-gray-500">Memuat detail...</p>
            </div>

            <div v-else-if="izinDetail" class="space-y-4">
                
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div class="bg-white p-4 rounded-lg shadow-md border-l-4" :class="statusColor(izinDetail.status)">
                        <h3 class="text-sm text-gray-500">Status Final</h3>
                        <p class="text-xl font-bold text-slate-800">{{ izinDetail.status }}</p>
                    </div>
                    <div class="lg:col-span-2 bg-white p-4 rounded-lg shadow-md">
                        <h3 class="text-sm text-gray-500">Karyawan</h3>
                        <p class="text-xl font-semibold text-slate-800">{{ izinDetail.user.fullname }}</p>
                        <p class="text-sm text-slate-600">{{ izinDetail.user.jabatan }} - {{ izinDetail.user.lokasi }}</p>
                    </div>
                </div>

                
                <div class="bg-white p-4 rounded-lg shadow-md">
                    <h3 class="font-semibold text-slate-800 mb-4">Rincian Izin</h3>
                    <div class="space-y-3 text-sm">
                        <DetailItem icon="fa-solid fa-file-alt" label="Jenis Izin" :value="izinDetail.jenis_izin.nama" />
                        <DetailItem icon="fa-solid fa-calendar-arrow-up" label="Tanggal Mulai" :value="formatDate(izinDetail.tgl_izin_start)" />
                        <DetailItem icon="fa-solid fa-calendar-arrow-down" label="Tanggal Selesai" :value="formatDate(izinDetail.tgl_izin_end)" />
                        <DetailItem icon="fa-solid fa-calendar-day" label="Total Durasi" :value="`${calculateDuration(izinDetail.tgl_izin_start, izinDetail.tgl_izin_end)} hari`" />
                        <DetailItem icon="fa-solid fa-calendar-alt" label="Tanggal Pengajuan" :value="formatDateTime(izinDetail.date)" />
                    </div>
                </div>

                
                <div v-if="izinDetail.keterangan" class="bg-white p-4 rounded-lg shadow-md">
                     <h3 class="font-semibold text-slate-800 mb-2">Catatan dari Karyawan</h3>
                     <p class="text-sm text-gray-600 whitespace-pre-wrap">{{ izinDetail.keterangan }}</p>
                </div>
            </div>
            
            <div v-else class="text-center py-20">
                 <i class="fa-solid fa-file-circle-question text-4xl text-gray-400"></i>
                <p class="mt-3 text-gray-500">Detail riwayat izin tidak ditemukan.</p>
            </div>
        </div>
        <div class="mb-20"></div>
    </BasePage>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BasePage from '@/layouts/admin/BasePage.vue';
import DetailItem from '@/components/user/DetailItem.vue';
import { Izin } from '@/models/izinModel';
import { fetchDetailIzinHistory } from '@/services/izinService';

const route = useRoute();
const router = useRouter();
const loading = ref(true);
const izinDetail = ref<Izin | null>(null);

const getIzinDetail = async () => {
    try {
        const id = route.params.id as string;
        izinDetail.value = await fetchDetailIzinHistory(id);
    } catch (error) {
        console.error("Gagal memuat detail riwayat.");
    } finally {
        loading.value = false;
    }
};

const calculateDuration = (start: string, end: string): number => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1; 
};

const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
const formatDateTime = (dateString: string) => new Date(dateString).toLocaleString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
const statusColor = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes('menunggu')) return 'border-yellow-500';
    if (s.includes('disetujui')) return 'border-green-500';
    if (s.includes('ditolak')) return 'border-red-500';
    return 'border-gray-500';
};

onMounted(getIzinDetail);
</script>
