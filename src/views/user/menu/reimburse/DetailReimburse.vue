<template>
    <BasePageNoNav>
        <TopHeader :title="'Detail Pengajuan Reimburse'" :show-back-button="true" />
        <ConfirmDialog></ConfirmDialog>

        <div class="p-4">
            <div v-if="loading" class="text-center py-20">
                <i class="fa-solid fa-spinner fa-spin text-4xl text-gray-400"></i>
                <p class="mt-3 text-gray-500">Memuat detail...</p>
            </div>

            <div v-else-if="reimburseDetail" class="space-y-4">

                <div class="bg-white p-4 rounded-lg shadow-md border-l-4" :class="statusColor(reimburseDetail.status)">
                    <div class="flex justify-between items-center">
                        <div>
                            <p class="text-sm text-gray-500">Status</p>
                            <p class="text-xl font-bold text-slate-800">{{ reimburseDetail.status }}</p>
                        </div>
                        <div :class="statusTextColor(reimburseDetail.status)" class="text-3xl">
                            <i v-if="reimburseDetail.status.toLowerCase().includes('menunggu')"
                                class="fa-solid fa-hourglass-half"></i>
                            <i v-else-if="reimburseDetail.status.toLowerCase().includes('disetujui')"
                                class="fa-solid fa-check-circle"></i>
                            <i v-else-if="reimburseDetail.status.toLowerCase().includes('ditolak')"
                                class="fa-solid fa-times-circle"></i>
                        </div>
                    </div>
                </div>


                
                <div class="bg-white p-4 rounded-lg shadow-md">
                    <h3 class="font-semibold text-slate-800 mb-3">Rincian Pengajuan</h3>
                    <div class="space-y-3 text-sm">
                        <DetailItem icon="fa-solid fa-calendar-alt" label="Tanggal Pengajuan"
                            :value="formatDateTime(reimburseDetail.created_date)" />
                        <DetailItem icon="fa-solid fa-user-check" label="Akan Disetujui Oleh"
                            :value="reimburseDetail.approval_user?.fullname || '-'" />
                        <DetailItem icon="fa-solid fa-user-check" label="Total Diajukan"
                            :value="formatCurrency(reimburseDetail.reimburse.total) || '-'" />

                    </div>
                </div>

                
                <div class="bg-white p-4 rounded-lg shadow-md">
                    <h3 class="font-semibold text-slate-800 mb-3">Detail Barang</h3>
                    <DataTable :value="reimburseDetail.reimburse.detail_reimburse" responsiveLayout="scroll">
                        <Column field="nama" header="Nama Barang"></Column>
                        <Column field="jumlah" header="Jumlah" headerClass="text-center" bodyClass="text-center">
                        </Column>
                        <Column field="harga" header="Harga Satuan" headerClass="text-right" bodyClass="text-right">
                            <template #body="slotProps">
                                {{ formatCurrency(slotProps.data.harga) }}
                            </template>
                        </Column>
                        <Column header="Subtotal" headerClass="text-right" bodyClass="text-right">
                            <template #body="slotProps">
                                <span class="font-semibold">{{ formatCurrency(slotProps.data.harga *
                                    slotProps.data.jumlah) }}</span>
                            </template>
                        </Column>
                    </DataTable>
                </div>

                <!-- Bukti Foto -->
                <div class="bg-white p-4 rounded-lg shadow-md">
                    <h3 class="font-semibold text-slate-800 mb-3">Bukti Foto</h3>
                    <img v-if="reimburseDetail.reimburse.photo" :src="reimburseDetail.reimburse.photo.image"
                        alt="Bukti Reimburse" class="w-full max-w-md mx-auto rounded-lg shadow" />
                    <p v-else class="text-sm text-gray-500">Tidak ada bukti foto yang dilampirkan.</p>
                </div>

                <!-- Tombol Batalkan -->
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
                <p class="mt-3 text-gray-500">Detail pengajuan reimburse tidak ditemukan.</p>
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
import { toast } from 'vue3-toastify';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ConfirmDialog from 'primevue/confirmdialog';
import { useConfirm } from "primevue/useconfirm";
import { ApprovalReimburse } from '@/models/reimburseModel';
import { cancelReimburseApi, fetchDetailReimburse } from '@/services/reimburseService';

const route = useRoute();
const router = useRouter();
const confirm = useConfirm();
const loading = ref(true);
const isCancelling = ref(false);
const reimburseDetail = ref<ApprovalReimburse | null>(null);

const canCancel = computed(() => {
    return reimburseDetail.value?.status.toLowerCase().includes('menunggu');
});

const getReimburseDetail = async () => {
    try {
        const id = route.params.id as string;
        reimburseDetail.value = await fetchDetailReimburse(id);
    } catch (error) {
        console.error("Gagal memuat detail reimburse:", error);
        toast.error("Gagal memuat detail reimburse.");
    } finally {
        loading.value = false;
    }
};

const confirmCancel = () => {
    confirm.require({
        message: 'Apakah Anda yakin ingin membatalkan pengajuan reimburse ini?',
        header: 'Konfirmasi Pembatalan',
        icon: 'fa-solid fa-triangle-exclamation',
        acceptLabel: 'Ya, Batalkan',
        rejectLabel: 'Tidak',
        acceptClass: 'p-button-danger',
        accept: () => cancelReimburse(),
    });
};

const cancelReimburse = async () => {
    if (!reimburseDetail.value) return;
    isCancelling.value = true;
    try {
        await cancelReimburseApi(reimburseDetail.value.id);
        toast.success("Pengajuan reimburse berhasil dibatalkan.");
        router.back();
    } catch (error) {
        console.error("Gagal membatalkan reimburse:", error);
        toast.error("Gagal membatalkan pengajuan.");
    } finally {
        isCancelling.value = false;
    }
};

const formatDateTime = (dateTimeString: string) => {
    if (!dateTimeString) return '-';
    return new Date(dateTimeString).toLocaleString('id-ID', {
        day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
};

const formatCurrency = (value: number) => {
    if (value == null) return 'Rp 0';
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(value);
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
    getReimburseDetail();
});
</script>
