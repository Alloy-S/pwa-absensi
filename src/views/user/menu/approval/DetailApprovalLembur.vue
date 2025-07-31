<template>
    <BasePageNoNav>
        <TopHeader title="Approval Lembur" :show-back-button="true" />
        <ConfirmDialog></ConfirmDialog>

        <div class="p-4">
            <div v-if="loading" class="text-center py-20">
                <i class="fa-solid fa-spinner fa-spin text-4xl text-gray-400"></i>
                <p class="mt-3 text-gray-500">Memuat detail...</p>
            </div>

            <div v-else-if="lemburDetail" class="space-y-4">
                
                <div class="grid grid-cols-1 gap-4">
                    <div class="bg-white p-4 rounded-lg shadow-md border-l-4" :class="statusColor(lemburDetail.status)">
                        <h3 class="text-sm text-gray-500">Status</h3>
                        <p class="text-xl font-bold text-slate-800">{{ lemburDetail.status }}</p>
                    </div>
                    <div class="bg-white p-4 rounded-lg shadow-md">
                        <h3 class="text-sm text-gray-500">Diajukan oleh</h3>
                        <p class="text-xl font-semibold text-slate-800">{{ lemburDetail.user.fullname }}</p>
                        <p class="text-sm text-slate-600">{{ lemburDetail.user.jabatan }} - {{ lemburDetail.user.lokasi }}</p>
                    </div>
                </div>

                
                <div class="bg-white p-4 rounded-lg shadow-md">
                    <h3 class="font-semibold text-slate-800 mb-4">Rincian Pengajuan</h3>
                    <div class="space-y-3 text-sm">
                        <DetailItem icon="fa-solid fa-play-circle" label="Waktu Mulai" :value="formatDateTime(lemburDetail.lembur.date_start)" />
                        <DetailItem icon="fa-solid fa-stop-circle" label="Waktu Selesai" :value="formatDateTime(lemburDetail.lembur.date_end)" />
                        <DetailItem icon="fa-solid fa-clock" label="Total Durasi" :value="calculateDuration(lemburDetail.lembur.date_start, lemburDetail.lembur.date_end)" />
                    </div>
                </div>

                
                <div v-if="lemburDetail.lembur.keterangan" class="bg-white p-4 rounded-lg shadow-md">
                     <h3 class="font-semibold text-slate-800 mb-2">Catatan dari Karyawan</h3>
                     <p class="text-sm text-gray-600 whitespace-pre-wrap">{{ lemburDetail.lembur.keterangan }}</p>
                </div>

                
                <div v-if="lemburDetail.status.toLowerCase().includes('menunggu')" class="bg-white p-4 rounded-lg shadow-md space-y-3">
                    <div class="flex justify-end space-x-3 pt-2">
                        <button @click="confirmAction('reject')" :disabled="isSubmitting"
                            class="w-full py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 disabled:bg-red-300">
                            Tolak
                        </button>
                        <button @click="confirmAction('approve')" :disabled="isSubmitting"
                            class="w-full py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-green-300 flex justify-center items-center">
                            <i v-if="isSubmitting" class="fa-solid fa-spinner animate-spin mr-2"></i>
                            Setujui
                        </button>
                    </div>
                </div>
            </div>
            
            <div v-else class="text-center py-20">
                 <i class="fa-solid fa-file-circle-question text-4xl text-gray-400"></i>
                <p class="mt-3 text-gray-500">Detail approval tidak ditemukan.</p>
            </div>
        </div>
        <div class="mb-20"></div>
    </BasePageNoNav>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BasePageNoNav from '@/layouts/user/BasePageNoNav.vue';
import TopHeader from '@/components/user/TopHeader.vue';
import DetailItem from '@/components/user/DetailItem.vue';
import { toast } from 'vue3-toastify';
import ConfirmDialog from 'primevue/confirmdialog';
import { useConfirm } from "primevue/useconfirm";
import { ApprovalLembur } from '@/models/lemburModel';
import { approveLemburApi, fetchDetailLemburPIC, rejectLemburApi } from '@/services/lemburService';

const route = useRoute();
const router = useRouter();
const confirm = useConfirm();
const loading = ref(true);
const isSubmitting = ref(false);
const lemburDetail = ref<ApprovalLembur | null>(null);
const approvalNote = ref('');

const getLemburDetail = async () => {
    try {
        const id = route.params.id as string;
        lemburDetail.value = await fetchDetailLemburPIC(id);
    } catch (error) {
        toast.error("Gagal memuat detail approval.");
    } finally {
        loading.value = false;
    }
};

const calculateDuration = (start: string, end: string): string => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffMs = endDate.getTime() - startDate.getTime();
    const diffHours = Math.floor(diffMs / 3600000);
    const diffMins = Math.floor((diffMs % 3600000) / 60000);
    return `${diffHours} jam ${diffMins} menit`;
};

const confirmAction = (action: 'approve' | 'reject') => {
   
    const isApprove = action === 'approve';
    confirm.require({
        message: `Apakah Anda yakin ingin ${isApprove ? 'menyetujui' : 'menolak'} pengajuan ini?`,
        header: `Konfirmasi ${isApprove ? 'Persetujuan' : 'Penolakan'}`,
        icon: 'fa-solid fa-triangle-exclamation',
        acceptLabel: `Ya, ${isApprove ? 'Setujui' : 'Tolak'}`,
        rejectLabel: 'Batal',
        acceptClass: isApprove ? 'p-button-success' : 'p-button-danger',
        accept: () => handleAction(action),
    });
};

const handleAction = async (action: 'approve' | 'reject') => {
    isSubmitting.value = true;
    try {
        const id = route.params.id as string;
        if (action === 'approve') {
            await approveLemburApi(id);
            toast.success("Pengajuan berhasil disetujui.");
        } else {
            await rejectLemburApi(id);
            toast.warn("Pengajuan berhasil ditolak.");
        }
        router.push('/menu/approval');
    } catch (error: any) {
        toast.error(error.response?.data?.message || `Gagal ${action === 'approve' ? 'menyetujui' : 'menolak'} pengajuan.`);
    } finally {
        isSubmitting.value = false;
    }
};

const formatDateTime = (dateString: string) => new Date(dateString).toLocaleString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
const statusColor = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes('menunggu')) return 'border-yellow-500';
    if (s.includes('disetujui')) return 'border-green-500';
    if (s.includes('ditolak')) return 'border-red-500';
    return 'border-gray-500';
};

onMounted(getLemburDetail);
</script>
