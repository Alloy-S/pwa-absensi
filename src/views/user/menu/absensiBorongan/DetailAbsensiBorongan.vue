<template>
    <BasePageNoNav>
        <TopHeader :title="'Detail Absensi Borongan'" :show-back-button="true" />
        <ConfirmDialog></ConfirmDialog>

        <div class="p-4">
            <div v-if="loading" class="text-center py-20">
                <i class="fa-solid fa-spinner fa-spin text-4xl text-gray-400"></i>
                <p class="mt-3 text-gray-500">Memuat detail...</p>
            </div>

            <div v-else-if="absenceDetail" class="space-y-4">

                <div class="bg-white p-4 rounded-lg shadow-md border-l-4" :class="statusColor(absenceDetail.status)">
                    <div class="flex justify-between items-center">
                        <div>
                            <p class="text-sm text-gray-500">Status</p>
                            <p class="text-xl font-bold text-slate-800">{{ absenceDetail.status }}</p>
                        </div>
                        <div :class="statusTextColor(absenceDetail.status)" class="text-3xl">
                            <i v-if="absenceDetail.status.toLowerCase().includes('menunggu')"
                                class="fa-solid fa-hourglass-half"></i>
                            <i v-else-if="absenceDetail.status.toLowerCase().includes('disetujui')"
                                class="fa-solid fa-check-circle"></i>
                            <i v-else-if="absenceDetail.status.toLowerCase().includes('ditolak')"
                                class="fa-solid fa-times-circle"></i>
                        </div>
                    </div>
                </div>


                
                <div class="bg-white p-4 rounded-lg shadow-md">
                    <h3 class="font-semibold text-slate-800 mb-3">Rincian</h3>
                    <div class="space-y-3 text-sm">
                        <DetailItem icon="fa-solid fa-calendar-alt" label="Tanggal Absensi"
                            :value="formatDate(absenceDetail.absensi_borongan.date)" />
                        <DetailItem icon="fa-solid fa-calendar-alt" label="Total Biaya"
                            :value="formatCurrency(absenceDetail.absensi_borongan.total)" />
                        <DetailItem icon="fa-solid fa-user-check" label="Dibuat / Disetujui Oleh"
                            :value="absenceDetail.approval_user?.fullname || '-'" />
                    </div>
                </div>

                
                <div class="bg-white p-4 rounded-lg shadow-md">
                    <h3 class="font-semibold text-slate-800 mb-3">Daftar Karyawan</h3>
                    <DataTable :value="absenceDetail.absensi_borongan.detail_absensi_borongan" responsiveLayout="scroll">
                        <Column field="user_name" header="Nama Karyawan"></Column>
                        <Column field="harga.nama" header="Jenis Borongan">
                            <template #body="slotProps">
                                {{ slotProps.data.harga.nama }}
                            </template>
                        </Column>
                        <!-- <Column field="ton_normal" header="Ton Normal" style="min-width:8rem" headerClass="text-right"
                            bodyClass="text-right">
                            <template #body="slotProps">
                                {{ slotProps.data.ton_normal }} Ton
                            </template>
                        </Column>
                        <Column field="ton_lembur" header="Ton Lembur" style="min-width:8rem" headerClass="text-right"
                            bodyClass="text-right">
                            <template #body="slotProps">
                                {{ slotProps.data.ton_lembur }} Ton
                            </template>
                        </Column> -->
                        <Column field="total" header="Subtotal" style="min-width:10rem" headerClass="text-right"
                            bodyClass="text-right">
                            <template #body="slotProps">
                                <span class="font-semibold text-blue-600">{{ formatCurrency(slotProps.data.total)
                                    }}</span>
                            </template>
                        </Column>
                    </DataTable>
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
                <p class="mt-3 text-gray-500">Detail absensi borongan tidak ditemukan.</p>
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
import { ApprovalBorongan } from '@/models/absensiBoronganModel';
import { cancelApprovalBoronganApi, fetchDetailApprovalBorongan } from '@/services/absensiBoronganService';

const route = useRoute();
const router = useRouter();
const confirm = useConfirm();
const loading = ref(true);
const isCancelling = ref(false);
const absenceDetail = ref<ApprovalBorongan | null>(null);

const canCancel = computed(() => {
    return absenceDetail.value?.status.toLowerCase().includes('menunggu');
});

const getAbsenceDetail = async () => {
    try {
        const id = route.params.id as string;
        absenceDetail.value = await fetchDetailApprovalBorongan(id);
    } catch (error) {
        console.error("Gagal memuat detail absensi borongan:", error);
    } finally {
        loading.value = false;
    }
};

const confirmCancel = () => {
    confirm.require({
        message: 'Apakah Anda yakin ingin membatalkan pengajuan ini?',
        header: 'Konfirmasi Pembatalan',
        icon: 'fa-solid fa-triangle-exclamation',
        acceptLabel: 'Ya, Batalkan',
        rejectLabel: 'Tidak',
        acceptClass: 'p-button-danger',
        accept: () => cancelAbsence(),
    });
};

const cancelAbsence = async () => {
    if (!absenceDetail.value) return;
    isCancelling.value = true;
    try {
        await cancelApprovalBoronganApi(absenceDetail.value.id);
        toast.success("Pengajuan berhasil dibatalkan.");
        router.back();
    } catch (error) {
        console.error("Gagal membatalkan pengajuan:", error);
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
    getAbsenceDetail();
});
</script>
