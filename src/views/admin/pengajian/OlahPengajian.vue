<template>
    <BasePage>
        <ConfirmDialog></ConfirmDialog>
        <div class="my-5">
            <p class="text-3xl font-semibold text-slate-800">Proses & Olah Penggajian</p>
        </div>

        <div class="bg-white p-4 mb-5 rounded-lg shadow-md">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div class="md:col-span-1">
                    <label for="grup-gaji" class="block mb-2 text-sm font-medium text-gray-700">Pilih Grup Gaji</label>
                    <select id="grup-gaji" v-model="filters.grup_gaji_id"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option disabled value="">Pilih grup</option>
                        <option v-for="grup in grupGajiList" :key="grup.id" :value="grup.id">{{ grup.grup_name }}
                        </option>
                    </select>
                </div>
                <div class="md:col-span-1">
                    <label for="periode-start" class="block mb-2 text-sm font-medium text-gray-700">Periode
                        Mulai</label>
                    <input type="date" id="periode-start" v-model="filters.periode_start"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                </div>
                <div class="md:col-span-1">
                    <label for="periode-end" class="block mb-2 text-sm font-medium text-gray-700">Periode
                        Selesai</label>
                    <input type="date" id="periode-end" v-model="filters.periode_end"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                </div>
                <div class="md:col-span-1">
                    <button @click="prosesGaji"
                        class="flex w-full justify-center items-center gap-2 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 disabled:opacity-50"
                        :disabled="loading">
                        <i v-if="!loading" class="fa-solid fa-calculator"></i>
                        <i v-else class="fa-solid fa-spinner animate-spin"></i>
                        <span>Proses Gaji (Draf)</span>
                    </button>
                </div>
            </div>
        </div>

        <div class="bg-white p-4 rounded-lg shadow-md">
            <div v-if="loading" class="text-center py-10 text-gray-500">
                <i class="fa-solid fa-spinner animate-spin text-2xl"></i>
                <p>Memproses perhitungan gaji...</p>
            </div>

            <div v-else-if="hasilPengajian.length > 0" class="overflow-x-auto">
                <p class="my-3 text-slate-600 text-sm"><span>*</span>Riwayat Penggajian sudah Tersimpan sebagai draft, laporan ini dapat ditinjau kembali di halaman riwayat penggajian</p>
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
                        <template v-for="item in hasilPengajian" :key="item.user_id">
                            <tr class="bg-white border-b hover:bg-gray-50 cursor-pointer"
                                @click="toggleRow(item.user_id)">
                                <td class="p-3 border text-center">
                                    <i class="fa-solid"
                                        :class="isRowExpanded(item.user_id) ? 'fa-chevron-down' : 'fa-chevron-right'"></i>
                                </td>
                                <td class="p-3 border font-medium text-gray-900 text-left">{{ item.nama_karyawan }}</td>
                                <td class="p-3 border text-center text-green-600 font-semibold">{{
                                    formatCurrency(item.total_tunjangan) }}</td>
                                <td class="p-3 border text-center text-red-600 font-semibold">{{
                                    formatCurrency(item.total_potongan) }}</td>
                                <td class="p-3 border text-center text-blue-700 font-bold">{{ formatCurrency(item.gaji)
                                }}</td>
                            </tr>
                            <tr v-if="isRowExpanded(item.user_id)" class="bg-gray-100">
                                <td :colspan="5" class="p-4 border">
                                    <div class="font-semibold mb-2">Rincian Perhitungan:</div>
                                    <table class="w-full md:w-1/2">
                                        <tbody>
                                            <tr v-for="(rincian, index) in item.rincian" :key="index" class="text-xs">
                                                <td class="py-1 pr-4">{{ rincian.komponen }}</td>
                                                <td class="py-1 pr-4">{{ rincian.tipe }}</td>
                                                <td class="py-1 pr-4">{{ `${formatCurrency(rincian.nilai_a)} ${rincian.operasi} ${formatCurrency(rincian.nilai_a)}` }}</td>
                                                <td class="py-1 font-medium text-right">{{
                                                    formatCurrency(rincian.jumlah) }}</td>
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

            <div v-else class="text-center py-10 text-gray-500">
                <p>{{ initialLoad ? 'Silakan pilih grup dan periode untuk memulai proses penggajian.' : 'Tidak ada data penggajian yang dihasilkan.' }}</p>
            </div>
        </div>
        <div class="mb-16"></div>
    </BasePage>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import BasePage from '@/layouts/admin/BasePage.vue';
import { toast } from 'vue3-toastify';
import { fetchAllGrupGaji } from '@/services/GrupGajiService';
import { GrupGaji } from '@/models/GrupGajiModel';
import { HasilPenggajian } from '@/models/payrollModel';
import { olahPengajian } from '@/services/payrollService';
import { PenggajianReq } from '@/models/payrollModel';
import { FinalisasiRiwayatPenggajianById } from '@/services/riwayatPenggajianService';
import ConfirmDialog from 'primevue/confirmdialog';
import { useConfirm } from "primevue/useconfirm";

const hasilPengajian = ref<HasilPenggajian[]>([]);
const grupGajiList = ref<GrupGaji[]>([]);
const loading = ref(false);
const loadingFinalisasi = ref(false);
const initialLoad = ref(true);
const expandedRows = ref<string[]>([]);
const riwayatId = ref<string | null>(null);
const confirm = useConfirm();
const filters = reactive({
    grup_gaji_id: '',
    periode_start: '',
    periode_end: '',
});


onMounted(async () => {
    grupGajiList.value = await fetchAllGrupGaji();
});

const prosesGaji = async () => {
    if (!filters.grup_gaji_id || !filters.periode_start || !filters.periode_end) {
        toast.warn("Silakan lengkapi Grup Gaji dan Periode terlebih dahulu.");
        return;
    }
    loading.value = true;
    initialLoad.value = false;
    hasilPengajian.value = [];
    try {
        const params: PenggajianReq = { ...filters };
        const response = await olahPengajian(params);
        hasilPengajian.value = response.data;
        riwayatId.value = response.riwayat_id;
    } catch (error) {
        console.error("Terjadi kesalahan saat memproses gaji.");
    } finally {
        loading.value = false;
    }
};

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

                await FinalisasiRiwayatPenggajianById(riwayatId.value!);
                toast.success("Gaji berhasil difinalisasi dan disimpan!");
                hasilPengajian.value = [];
                initialLoad.value = true;
            } catch (error) {
                console.error("Gagal melakukan finalisasi.");
            } finally {
                loadingFinalisasi.value = false;
            }
        },
    });
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

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
};
</script>