<template>
    <BasePage>
        <ConfirmDialog></ConfirmDialog>
        <div class="flex items-center justify-between">
            <div>
                <h1 class="text-3xl font-semibold text-slate-800">Detail Riwayat Penggajian</h1>
                <p v-if="dataRiwayat" class="text-sm text-gray-500">Tinjau riwayat penggajian untuk periode {{
                    formatDate(dataRiwayat.periode_start) }} - {{ formatDate(dataRiwayat.periode_end) }}</p>
            </div>
            <button @click="router.back()" class="text-sm text-blue-600 hover:underline">← Kembali ke Daftar</button>
        </div>
        <div v-if="loadingDetail" class="text-center py-20 text-gray-500">
            <i class="fa-solid fa-spinner animate-spin text-3xl"></i>
            <p>Memuat detail...</p>
        </div>

        <div v-else-if="dataRiwayat" class="mt-5 bg-white p-4 rounded-lg shadow-md">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-sm p-4 bg-gray-50 rounded-lg">
                <div><strong>Periode:</strong> {{ formatDate(dataRiwayat.periode_start) }} - {{
                    formatDate(dataRiwayat.periode_end) }}</div>
                <div><strong>Grup Gaji:</strong> {{ dataRiwayat.grup_gaji }}</div>
                <div><strong>Status:</strong> <span class="font-semibold p-1 rounded-lg"
                        :class="getStatusClass(dataRiwayat.status)">{{
                            dataRiwayat.status }}</span></div>
                <div><strong>Total Gaji:</strong> <span class="font-bold">{{
                    formatCurrency(dataRiwayat.total_gaji_keseluruhan) }}</span></div>
            </div>

            <table class="w-full text-sm text-left text-gray-500" style="min-width: 900px;">
                <thead class="text-xs text-gray-700 bg-gray-50 text-center whitespace-nowrap">
                    <tr>
                        <th class="p-3 border w-10"></th>
                        <th class="p-3 border text-left">Nama Karyawan</th>
                        <th class="p-3 border">Total Tunjangan</th>
                        <th class="p-3 border">Total Potongan</th>
                        <th class="p-3 border">Gaji Bersih (Take-Home Pay)</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="item in dataRiwayat.riwayat_penggajian_detail" :key="item.user_id">
                        <tr class="bg-white border-b hover:bg-gray-50 cursor-pointer" @click="toggleRow(item.user_id)">
                            <td class="p-3 border text-center">
                                <i class="fa-solid"
                                    :class="isRowExpanded(item.user_id) ? 'fa-chevron-down' : 'fa-chevron-right'"></i>
                            </td>
                            <td class="p-3 border font-medium text-gray-900 text-left">{{ item.user }}</td>
                            <td class="p-3 border text-center text-green-600 font-semibold">{{
                                formatCurrency(item.total_tunjangan) }}</td>
                            <td class="p-3 border text-center text-red-600 font-semibold">{{
                                formatCurrency(item.total_potongan) }}</td>
                            <td class="p-3 border text-center text-blue-700 font-bold">{{ formatCurrency(item.gaji) }}
                            </td>
                        </tr>
                        <tr v-if="isRowExpanded(item.user_id)" class="bg-gray-100">
                            <td :colspan="5" class="p-4 border">
                                <div class="font-semibold mb-2">Rincian Perhitungan:</div>
                                <table class="w-full md:w-1/2">
                                    <tbody>
                                        <tr v-for="(rincian, index) in item.riwayat_penggajian_rincian" :key="index"
                                            class="text-xs">
                                            <td class="py-1 pr-4">{{ rincian.komponen }}</td>
                                            <td class="py-1 pr-4">{{ rincian.tipe }}</td>
                                            <td class="py-1 pr-4">{{ `${formatCurrency(rincian.nilai_a)} ${rincian.operasi} ${formatCurrency(rincian.nilai_a)}` }}</td>
                                            <td class="py-1 font-medium text-right">{{ formatCurrency(rincian.jumlah) }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>

            <div class="flex justify-end mt-6">
                <button @click="confirmAction"
                    class="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50"
                    :disabled="loadingFinalisasi">
                    <i v-if="!loadingFinalisasi" class="fa-solid fa-check-circle"></i>
                    <i v-else class="fa-solid fa-spinner animate-spin"></i>
                    <span>Finalisasi & Simpan Gaji</span>
                </button>
            </div>
        </div>

        <div v-else class="text-center py-20 text-gray-500">
            <p>Detail riwayat penggajian tidak ditemukan.</p>
        </div>
        <div class="mb-16"></div>
    </BasePage>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BasePage from '@/layouts/admin/BasePage.vue';
import { toast } from 'vue3-toastify';
import { RiwayatPenggajian } from '@/models/riwayatPenggajianModel';
import { fetchRiwayatPenggajianById, FinalisasiRiwayatPenggajianById } from '@/services/riwayatPenggajianService';
import ConfirmDialog from 'primevue/confirmdialog';
import { useConfirm } from "primevue/useconfirm";

const loadingDetail = ref(true);
const dataRiwayat = ref<RiwayatPenggajian | null>(null);
const expandedRows = ref<string[]>([]);
const route = useRoute();
const router = useRouter();
const loadingFinalisasi = ref(false);
const confirm = useConfirm();

onMounted(async () => {
    getRiwayatPenggajian();
});

const getRiwayatPenggajian = async () => {
    const riwayatId = route.params.id as string;

    try {
        dataRiwayat.value = await fetchRiwayatPenggajianById(riwayatId);
    } catch (error) {
        console.error("Gagal memuat detail riwayat.");
    } finally {
        loadingDetail.value = false;
    }
}

const confirmAction = () => {
    confirm.require({
        message: `Apakah Anda yakin ingin mengfinalisasi penggajian ini?`,
        header: `Konfirmasi Finalisasi`,
        icon: 'fa-solid fa-triangle-exclamation',
        acceptLabel: `Ya, finalisasi`,
        rejectLabel: 'Batal',
        acceptClass: 'p-button-success',
        accept: async () => {
            loadingFinalisasi.value = true;
            try {
                await FinalisasiRiwayatPenggajianById(dataRiwayat.value.id);
                getRiwayatPenggajian();
                toast.success("Gaji berhasil difinalisasi");
            } catch (error) {
                console.error("Gagal melakukan finalisasi.");
            } finally {
                loadingFinalisasi.value = false;
            }
        },
    });
};

const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });

const formatCurrency = (value: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);

const getStatusClass = (status: string) => {
    if (status === 'FINAL') return 'bg-green-100 text-green-800';
    if (status === 'DRAFT') return 'bg-yellow-100 text-yellow-800';
    if (status === 'DIBATALKAN') return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
};

const toggleRow = (userId: string) => {
    const index = expandedRows.value.indexOf(userId);
    if (index === -1) {
        expandedRows.value.push(userId);
    } else {
        expandedRows.value.splice(index, 1);
    }
};

const isRowExpanded = (userId: string) => {
    return expandedRows.value.includes(userId);
};
</script>