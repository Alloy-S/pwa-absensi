<template>
    <BasePageNoNav>
        <TopHeader :title="'Detail Pengajuan Izin'" :show-back-button="true" />
        <ConfirmDialog></ConfirmDialog>

        <div class="p-4">
            <div v-if="loading" class="text-center py-20">
                <i class="fa-solid fa-spinner fa-spin text-4xl text-gray-400"></i>
                <p class="mt-3 text-gray-500">Memuat detail...</p>
            </div>

            <div v-else-if="izinDetail" class="space-y-4">
                <div class="bg-white p-4 rounded-lg shadow-md border-l-4" :class="statusColor(izinDetail.status)">
                    <div class="flex justify-between items-center">
                        <div>
                            <p class="text-sm text-gray-500">Status Pengajuan</p>
                            <p class="text-xl font-bold text-slate-800">{{ izinDetail.status }}</p>
                        </div>
                        <div :class="statusTextColor(izinDetail.status)" class="text-3xl">
                            <i v-if="izinDetail.status.toLowerCase().includes('menunggu')" class="fa-solid fa-hourglass-half"></i>
                            <i v-else-if="izinDetail.status.toLowerCase().includes('disetujui')" class="fa-solid fa-check-circle"></i>
                            <i v-else-if="izinDetail.status.toLowerCase().includes('ditolak')" class="fa-solid fa-times-circle"></i>
                        </div>
                    </div>
                </div>

                
                <div class="bg-white p-4 rounded-lg shadow-md">
                    <h3 class="font-semibold text-slate-800 mb-3">Rincian Pengajuan</h3>
                    <div class="space-y-3 text-sm">
                        <DetailItem icon="fa-solid fa-calendar-alt" label="Tanggal Pengajuan" :value="formatDateTime(izinDetail.created_date)" />
                        <DetailItem icon="fa-solid fa-user-check" label="Akan Disetujui Oleh" :value="izinDetail.approval_user?.fullname || '-'" />
                         <DetailItem icon="fa-solid fa-file-alt" label="Jenis Izin" :value="izinDetail.izin.jenis_izin.nama" />
                    </div>
                </div>

                
                <div class="bg-white p-4 rounded-lg shadow-md">
                    <h3 class="font-semibold text-slate-800 mb-4">Tanggal Izin</h3>
                    <div class="relative border-l-2 border-gray-200 ml-3">
                        <div class="mb-6 ml-6">
                            <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white">
                                <i class="fa-solid fa-calendar-arrow-up text-blue-600"></i>
                            </span>
                            <h4 class="font-semibold text-gray-900">Tanggal Mulai</h4>
                            <p class="text-lg font-medium text-gray-800">{{ formatDate(izinDetail.izin.tgl_izin_start) }}</p>
                        </div>
                        <div class="ml-6">
                            <span class="absolute flex items-center justify-center w-6 h-6 bg-red-100 rounded-full -left-3 ring-8 ring-white">
                                <i class="fa-solid fa-calendar-arrow-down text-red-600"></i>
                            </span>
                            <h4 class="font-semibold text-gray-900">Tanggal Selesai</h4>
                            <p class="text-lg font-medium text-gray-800">{{ formatDate(izinDetail.izin.tgl_izin_end) }}</p>
                        </div>
                    </div>
                </div>

                
                <div v-if="izinDetail.izin.keterangan" class="bg-white p-4 rounded-lg shadow-md">
                     <h3 class="font-semibold text-slate-800 mb-2">Keterangan</h3>
                     <p class="text-sm text-gray-600 whitespace-pre-wrap">{{ izinDetail.izin.keterangan }}</p>
                </div>
                
                
                <div v-if="canCancel" class="mt-6">
                    <button @click="confirmCancel" :disabled="isCancelling"
                        class="w-full flex justify-center items-center px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 disabled:bg-red-300">
                        <i v-if="isCancelling" class="fa-solid fa-spinner animate-spin mr-2"></i>
                        <span>{{ isCancelling ? 'Membatalkan...' : 'Batalkan Pengajuan' }}</span>
                    </button>
                </div>
            </div>
            
            <div v-else class="text-center py-20">
                 <i class="fa-solid fa-file-circle-question text-4xl text-gray-400"></i>
                <p class="mt-3 text-gray-500">Detail pengajuan izin tidak ditemukan.</p>
            </div>
        </div>
    </BasePageNoNav>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BasePageNoNav from '@/layouts/user/BasePageNoNav.vue';
import TopHeader from '@/components/user/TopHeader.vue';
import DetailItem from '@/components/user/DetailItem.vue'; 
import { fetchDetailIzin, cancelIzinApi } from '@/services/izinService';
import { toast } from 'vue3-toastify';
import ConfirmDialog from 'primevue/confirmdialog';
import { useConfirm } from "primevue/useconfirm";
import { ApprovalIzin } from '@/models/izinModel';

const route = useRoute();
const router = useRouter();
const confirm = useConfirm(); 
const loading = ref(true);
const isCancelling = ref(false);
const izinDetail = ref<ApprovalIzin | null>(null);

const canCancel = computed(() => {
    return izinDetail.value?.status.toLowerCase().includes('menunggu');
});

const getIzinDetail = async () => {
    try {
        const izinId = route.params.id as string;
        izinDetail.value = await fetchDetailIzin(izinId);
    } catch (error) {
        console.error("Gagal memuat detail izin:", error);
        toast.error("Gagal memuat detail izin.");
    } finally {
        loading.value = false;
    }
};

const confirmCancel = () => {
    confirm.require({
        message: 'Apakah Anda yakin ingin membatalkan pengajuan izin ini?',
        header: 'Konfirmasi Pembatalan',
        icon: 'fa-solid fa-triangle-exclamation',
        acceptLabel: 'Ya, Batalkan',
        rejectLabel: 'Tidak',
        acceptClass: 'p-button-danger',
        accept: () => cancelIzin(),
    });
};

const cancelIzin = async () => {
    if (!izinDetail.value) return;
    isCancelling.value = true;
    try {
        await cancelIzinApi(izinDetail.value.id);
        toast.success("Pengajuan izin berhasil dibatalkan.");
        router.back();
    } catch (error) {
        console.error("Gagal membatalkan izin:", error);
        toast.error("Gagal membatalkan pengajuan.");
    } finally {
        isCancelling.value = false;
    }
};

const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
};

const formatDateTime = (dateTimeString: string) => {
    if (!dateTimeString) return '-';
    return new Date(dateTimeString).toLocaleString('id-ID', {
        day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
};

const statusColor = (status: string) => {
    if (!status) return 'border-gray-500';
    const s = status.toLowerCase();
    if (s.includes('menunggu')) return 'border-yellow-500';
    if (s.includes('disetujui')) return 'border-green-500';
    if (s.includes('ditolak')) return 'border-red-500';
    return 'border-gray-500';
};

const statusTextColor = (status: string) => {
    if (!status) return 'text-gray-600';
    const s = status.toLowerCase();
    if (s.includes('menunggu')) return 'text-yellow-600';
    if (s.includes('disetujui')) return 'text-green-600';
    if (s.includes('ditolak')) return 'text-red-600';
    return 'text-gray-600';
};

onMounted(() => {
    getIzinDetail();
});
</script>
