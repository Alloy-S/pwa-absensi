<template>
    <BasePage>
        <ConfirmDialog></ConfirmDialog>
        <div class="space-y-6">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-semibold text-slate-800">Detail Approval Absensi Borongan</h1>
                    <p v-if="absensiDetail" class="text-sm text-gray-500">Tinjau pengajuan absensi borongan dari PIC {{
                        absensiDetail.user.fullname }}</p>
                </div>
                <button @click="router.back()" class="text-sm text-blue-600 hover:underline">← Kembali ke
                    Daftar</button>
            </div>

            <div v-if="loading" class="text-center py-20">
                <i class="fa-solid fa-spinner fa-spin text-4xl text-gray-400"></i>
                <p class="mt-3 text-gray-500">Memuat detail...</p>
            </div>

            <div v-else-if="absensiDetail" class="space-y-4">

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div class="bg-white p-4 rounded-lg shadow-md border-l-4"
                        :class="statusColor(absensiDetail.status)">
                        <h3 class="text-sm text-gray-500">Status</h3>
                        <p class="text-xl font-bold text-slate-800">{{ absensiDetail.status }}</p>
                    </div>
                    <div class="lg:col-span-2 bg-white p-4 rounded-lg shadow-md">
                        <h3 class="text-sm text-gray-500">Diajukan oleh (PIC)</h3>
                        <p class="text-xl font-semibold text-slate-800">{{ absensiDetail.user.fullname }}</p>
                        <p class="text-sm text-slate-600">{{ absensiDetail.user.jabatan }} - {{
                            absensiDetail.user.lokasi }}</p>
                    </div>
                </div>


                <div class="bg-white p-4 rounded-lg shadow-md">
                    <h3 class="font-semibold text-slate-800 mb-4">Rincian Pengajuan</h3>
                    <div class="space-y-3 text-sm">
                        <DetailItem icon="fa-solid fa-calendar-alt" label="Tanggal Absensi"
                            :value="formatDate(absensiDetail.absensi_borongan.date)" />
                        <DetailItem icon="fa-solid fa-user-check" label="Ditujukan Kepada"
                            :value="absensiDetail.approval_user?.fullname || '-'" />
                        <DetailItem icon="fa-solid fa-money-bill-wave" label="Total Biaya"
                            :value="formatCurrency(absensiDetail.absensi_borongan.total)" />
                    </div>
                </div>


                <div class="bg-white p-4 rounded-lg shadow-md">
                    <h3 class="font-semibold text-slate-800 mb-3">Detail Pekerjaan Karyawan</h3>
                    <DataTable :value="absensiDetail.absensi_borongan.detail_absensi_borongan"
                        responsiveLayout="scroll">
                        <Column field="user_name" header="Nama Karyawan"></Column>
                        <Column field="tipe" header="Tipe"></Column>
                        <Column field="harga.nama" header="Jenis Pekerjaan">
                            <template #body="slotProps">
                                {{ slotProps.data.harga.nama }}
                            </template>
                        </Column>
                        <!-- <Column field="ton_normal" header="Tonase" bodyClass="text-center"></Column> -->
                        <Column field="total" header="Subtotal" headerClass="text-right" bodyClass="text-right">
                            <template #body="slotProps">
                                <span class="font-semibold">{{ formatCurrency(slotProps.data.total) }}</span>
                            </template>
                        </Column>
                    </DataTable>
                </div>


                <div v-if="absensiDetail.status.toLowerCase().includes('menunggu')"
                    class="bg-white p-4 rounded-lg shadow-md space-y-3">

                    <div class="flex justify-end space-x-3 pt-2">
                        <button @click="confirmAction('reject')" :disabled="isSubmitting"
                            class="px-5 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 disabled:bg-red-300">
                            Tolak
                        </button>
                        <button @click="confirmAction('approve')" :disabled="isSubmitting"
                            class="px-5 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-green-300 flex items-center">
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
    </BasePage>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BasePage from '@/layouts/admin/BasePage.vue';
import DetailItem from '@/components/user/DetailItem.vue';
import { toast } from 'vue3-toastify';
import ConfirmDialog from 'primevue/confirmdialog';
import { useConfirm } from "primevue/useconfirm";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { ApprovalBorongan } from '@/models/absensiBoronganModel';
import { approveAbsensiBoronganApi, fetchDetailAbsensiBoronganPIC } from '@/services/absensiBoronganService';

const route = useRoute();
const router = useRouter();
const confirm = useConfirm();
const loading = ref(true);
const isSubmitting = ref(false);
const absensiDetail = ref<ApprovalBorongan | null>(null);


const getAbsensiDetail = async () => {
    try {
        const id = route.params.id as string;
        absensiDetail.value = await fetchDetailAbsensiBoronganPIC(id);
    } catch (error) {
        console.error("Gagal memuat detail approval.");
    } finally {
        loading.value = false;
    }
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
            await approveAbsensiBoronganApi(id);
            toast.success("Pengajuan berhasil disetujui.");
        } else {
            await approveAbsensiBoronganApi(id);
            toast.warn("Pengajuan berhasil ditolak.");
        }
        router.push('/admin/approval/harian-borongan');
    } catch (error: any) {
        toast.error(error.response?.data?.message || `Gagal ${action === 'approve' ? 'menyetujui' : 'menolak'} pengajuan.`);
    } finally {
        isSubmitting.value = false;
    }
};

const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
const formatCurrency = (value: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value || 0);
const statusColor = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes('menunggu')) return 'border-yellow-500';
    if (s.includes('disetujui')) return 'border-green-500';
    if (s.includes('ditolak')) return 'border-red-500';
    return 'border-gray-500';
};

onMounted(getAbsensiDetail);
</script>
