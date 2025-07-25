<template>
    <BasePageNoNav>
        <TopHeader :title="'Detail Koreksi Kehadiran'" />
        <ConfirmDialog></ConfirmDialog>

        <div class="p-4">
            <div v-if="loading" class="text-center py-20">
                <i class="fa-solid fa-spinner fa-spin text-4xl text-gray-400"></i>
                <p class="mt-3 text-gray-500">Memuat detail...</p>
            </div>

            <div v-else-if="koreksiDetail" class="space-y-4">
                <div class="bg-white p-4 rounded-lg shadow-md border-l-4" :class="statusColor(koreksiDetail.status)">
                    <div class="flex justify-between items-center">
                        <div>
                            <p class="text-sm text-gray-500">Status Pengajuan</p>
                            <p class="text-xl font-bold text-slate-800">{{ koreksiDetail.status }}</p>
                        </div>
                        <div :class="statusTextColor(koreksiDetail.status)" class="text-3xl">
                            <i v-if="koreksiDetail.status.toLowerCase().includes('menunggu')" class="fa-solid fa-hourglass-half"></i>
                            <i v-else-if="koreksiDetail.status.toLowerCase().includes('disetujui')" class="fa-solid fa-check-circle"></i>
                            <i v-else-if="koreksiDetail.status.toLowerCase().includes('ditolak')" class="fa-solid fa-times-circle"></i>
                        </div>
                    </div>
                </div>

                <div class="bg-white p-4 rounded-lg shadow-md">
                    <h3 class="font-semibold text-slate-800 mb-3">Detail Pengajuan</h3>
                    <div class="space-y-2 text-sm">
                        <DetailItem icon="fa-solid fa-calendar-day" label="Untuk Tanggal Absensi" :value="formatDate(koreksiDetail.absensi_date)" />
                        <DetailItem icon="fa-solid fa-user-check" label="Disetujui Oleh" :value="koreksiDetail.approval_user?.fullname || '-'" />
                        <DetailItem v-if="koreksiDetail.catatan_pengajuan" icon="fa-solid fa-pencil" label="Catatan Pengajuan" :value="koreksiDetail.catatan_pengajuan" />
                    </div>
                </div>

                <div class="bg-white p-4 rounded-lg shadow-md">
                    <h3 class="font-semibold text-slate-800 mb-4">Waktu yang Diajukan</h3>
                    <div class="relative border-l-2 border-gray-200 ml-3">
                        
                        <div v-if="jamMasuk" class="mb-6 ml-6">
                            <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white">
                                <i class="fa-solid fa-arrow-right-to-bracket text-blue-600"></i>
                            </span>
                            <h4 class="font-semibold text-gray-900">Jam Masuk</h4>
                            <p class="text-xl font-mono text-gray-800">{{ formatDateTime(jamMasuk.requested_datetime) }}</p>
                        </div>

                        
                        <div v-if="jamPulang" class="ml-6">
                            <span class="absolute flex items-center justify-center w-6 h-6 bg-red-100 rounded-full -left-3 ring-8 ring-white">
                                <i class="fa-solid fa-arrow-right-from-bracket text-red-600"></i>
                            </span>
                            <h4 class="font-semibold text-gray-900">Jam Pulang</h4>
                            <p class="text-xl font-mono text-gray-800">{{ formatDateTime(jamPulang.requested_datetime) }}</p>
                        </div>
                    </div>
                </div>

                
                <div v-if="canCancel" class="mt-6">
                    <button @click="confirmCancel" :disabled="isCancelling"
                        class="w-full px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 disabled:bg-red-300">
                        <span v-if="isCancelling">Membatalkan...</span>
                        <span v-else>Batalkan Pengajuan</span>
                    </button>
                </div>

            </div>
            
            
            <div v-else class="text-center py-20">
                 <i class="fa-solid fa-file-circle-question text-4xl text-gray-400"></i>
                <p class="mt-3 text-gray-500">Detail koreksi tidak ditemukan.</p>
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
import { fetchDetailKoreksi, cancelKoreksiApi } from '@/services/koreksiService';
import { Koreksi } from '@/models/koreksiModel';
import { toast } from 'vue3-toastify';
import ConfirmDialog from 'primevue/confirmdialog';
import { useConfirm } from "primevue/useconfirm";

const route = useRoute();
const router = useRouter();
const confirm = useConfirm(); 
const loading = ref(true);
const isCancelling = ref(false);
const koreksiDetail = ref<Koreksi | null>(null);


const canCancel = computed(() => {
    return koreksiDetail.value?.status.toLowerCase().includes('menunggu');
});

const jamMasuk = computed(() => {
    return koreksiDetail.value?.detail_approval.find(d => d.type === 'IN');
});

const jamPulang = computed(() => {
    return koreksiDetail.value?.detail_approval.find(d => d.type === 'OUT');
});

const getKoreksiDetail = async () => {
    try {
        const approvalId = route.params.id as string;
        koreksiDetail.value = await fetchDetailKoreksi(approvalId);
    } catch (error) {
        console.error("Gagal memuat detail koreksi:", error);
    } finally {
        loading.value = false;
    }
};


const confirmCancel = () => {
    confirm.require({
        message: 'Apakah Anda yakin ingin membatalkan pengajuan koreksi ini?',
        header: 'Konfirmasi Pembatalan',
        icon: 'fa-solid fa-triangle-exclamation',
        acceptLabel: 'Ya, Batalkan',
        rejectLabel: 'Tidak',
        acceptClass: 'p-button-danger',
        accept: async () => {
            await cancelKoreksi();
        },
        reject: () => {
        }
    });
};


const cancelKoreksi = async () => {
    if (!koreksiDetail.value) return;
    isCancelling.value = true;
    try {
        const response = await cancelKoreksiApi(koreksiDetail.value.id);
        if (response.status === 200) {
            toast.success("Pengajuan koreksi berhasil dibatalkan.");
            router.back();
        }
    } catch (error) {
        console.error("Gagal membatalkan koreksi:", error);
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
        day: 'numeric', 
        month: 'short', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
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
    getKoreksiDetail();
});
</script>
