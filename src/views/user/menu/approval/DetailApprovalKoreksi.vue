<template>
    <BasePageNoNav>
        <TopHeader title="Approval Koreksi Kehadiran" :show-back-button="true" />
        <ConfirmDialog></ConfirmDialog>

        <div class="p-4">
            <div v-if="loading" class="text-center py-20">
                <i class="fa-solid fa-spinner fa-spin text-4xl text-gray-400"></i>
                <p class="mt-3 text-gray-500">Memuat detail...</p>
            </div>

            <div v-else-if="koreksiDetail" class="space-y-4">
                

                <div class="bg-white p-4 rounded-lg shadow-md border-l-4" :class="statusColor(koreksiDetail.status)">
                    <h3 class="text-sm text-gray-500">Status</h3>
                    <p class="text-xl font-bold text-slate-800">{{ koreksiDetail.status }}</p>
                </div>
                <div class="lg:col-span-2 bg-white p-4 rounded-lg shadow-md">
                    <h3 class="text-sm text-gray-500">Diajukan oleh</h3>
                    <p class="text-xl font-semibold text-slate-800">{{ koreksiDetail.user.fullname }}</p>
                    <p class="text-sm text-slate-600">{{ koreksiDetail.user.jabatan }} - {{ koreksiDetail.user.lokasi }}
                    </p>
                </div>

                
                <div class="bg-white p-4 rounded-lg shadow-md">
                    <h3 class="font-semibold text-slate-800 mb-2">Perbandingan Waktu untuk Tanggal:</h3>
                    <p class="font-bold text-lg text-blue-600 mb-4">{{ formatDate(koreksiDetail.absensi_date) }}</p>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        <div class="border-r pr-6 border-gray-200">
                            <h4 class="font-semibold text-gray-700 mb-3">Jadwal Seharusnya ({{
                                koreksiDetail.jadwal_kerja.shift }})</h4>
                            <div class="space-y-2 text-sm">
                                <p><span class="font-medium w-24 inline-block">Masuk</span>: {{ jadwalHariIni?.time_in
                                    }}</p>
                                <p><span class="font-medium w-24 inline-block">Pulang</span>: {{ jadwalHariIni?.time_out
                                    }}</p>
                            </div>
                        </div>
                        
                        <div>
                            <h4 class="font-semibold text-green-700 mb-3">Waktu Baru yang Diajukan</h4>
                            <div class="space-y-2 text-sm">
                                <p><span class="font-medium w-24 inline-block">Masuk</span>: <span class="font-bold">{{
                                        formatTime(jamMasuk?.requested_datetime) }}</span></p>
                                <p><span class="font-medium w-24 inline-block">Pulang</span>: <span class="font-bold">{{
                                        formatTime(jamPulang?.requested_datetime) }}</span></p>
                            </div>
                        </div>
                    </div>
                </div>

                
                <div v-if="koreksiDetail.catatan_pengajuan" class="bg-white p-4 rounded-lg shadow-md">
                    <h3 class="font-semibold text-slate-800 mb-2">Catatan dari Karyawan</h3>
                    <p class="text-sm text-gray-600 whitespace-pre-wrap">{{ koreksiDetail.catatan_pengajuan }}</p>
                </div>

                
                <div v-if="koreksiDetail.status.toLowerCase().includes('menunggu')"
                    class="bg-white p-4 rounded-lg shadow-md space-y-3">
                    
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
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BasePageNoNav from '@/layouts/user/BasePageNoNav.vue';
import TopHeader from '@/components/user/TopHeader.vue';
import { toast } from 'vue3-toastify';
import ConfirmDialog from 'primevue/confirmdialog';
import { useConfirm } from "primevue/useconfirm";
import { ApprovalKoreksi, DetailKoreksi } from '@/models/koreksiModel';
import { approveKoreksiApi, fetchDetailKoreksiPIC, rejectKoreksiApi } from '@/services/koreksiService';
import { DetailJadwalKerja } from '@/models/jadwalModel';


const route = useRoute();
const router = useRouter();
const confirm = useConfirm();
const loading = ref(true);
const isSubmitting = ref(false);
const koreksiDetail = ref<ApprovalKoreksi | null>(null);

const getKoreksiDetail = async () => {
    try {
        const id = route.params.id as string;
        koreksiDetail.value = await fetchDetailKoreksiPIC(id);
    } catch (error) {
        toast.error("Gagal memuat detail approval.");
    } finally {
        loading.value = false;
    }
};

const jamMasuk = computed<DetailKoreksi | undefined>(() => koreksiDetail.value?.detail_approval.find(d => d.type === 'IN'));
const jamPulang = computed<DetailKoreksi | undefined>(() => koreksiDetail.value?.detail_approval.find(d => d.type === 'OUT'));
const jadwalHariIni = computed<DetailJadwalKerja | undefined>(() => {
    if (!koreksiDetail.value) return undefined;
    const dayOfWeek = new Date(koreksiDetail.value.absensi_date).toLocaleString('id-ID', { weekday: 'long' }).toLowerCase();
    return koreksiDetail.value.jadwal_kerja.detail_jadwal_kerja.find(j => j.hari.toLowerCase() === dayOfWeek);
});

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
            await approveKoreksiApi(id);
            toast.success("Pengajuan berhasil disetujui.");
        } else {
            await rejectKoreksiApi(id);
            toast.warn("Pengajuan berhasil ditolak.");
        }
        router.replace('/menu/approval');
    } catch (error) {
        toast.error(`Gagal ${action === 'approve' ? 'menyetujui' : 'menolak'} pengajuan.`);
    } finally {
        isSubmitting.value = false;
    }
};

const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
const formatTime = (dateTimeString?: string) => dateTimeString ? new Date(dateTimeString).toLocaleTimeString('id-ID', {year: 'numeric', month: 'long', day: 'numeric',  hour: '2-digit', minute: '2-digit' }) : '--:--';
const statusColor = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes('menunggu')) return 'border-yellow-500';
    if (s.includes('disetujui')) return 'border-green-500';
    if (s.includes('ditolak')) return 'border-red-500';
    return 'border-gray-500';
};

onMounted(getKoreksiDetail);
</script>
