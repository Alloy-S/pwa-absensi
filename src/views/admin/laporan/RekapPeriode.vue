<template>
    <BasePage>
        <div class="my-5 flex justify-between items-center">
            <p class="text-3xl font-semibold text-slate-800">Laporan Rekapitulasi Kehadiran</p>
        </div>

        <div class="bg-white p-4 mb-5 rounded-lg shadow-md">
            <div class="flex flex-col md:flex-row gap-4 items-end">
                <div class="flex flex-col">
                    <label class="text-sm font-medium mb-1">Periode Mulai</label>
                    <DatePicker v-model="(filters.startDate as any)" dateFormat="dd/mm/yy" class="w-full" />
                </div>
                <div class="flex flex-col">
                    <label class="text-sm font-medium mb-1">Periode Selesai</label>
                    <DatePicker v-model="(filters.endDate as any)" dateFormat="dd/mm/yy" class="w-full" />
                </div>
                <div class="flex flex-col flex-1">
                    <label class="text-sm font-medium mb-1">Cari Nama / NIP</label>
                    <input type="text" v-model="filters.search" placeholder="Cari nama atau NIP"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                </div>
                <button @click="getRekapData"
                    class="flex items-center gap-2 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800">
                    <i class="fa-solid fa-search"></i>
                    <span>Proses</span>
                </button>
            </div>
        </div>

        <div class="bg-white p-4 rounded-lg shadow-md">
            <div v-if="rekapList.length > 0" class="flex justify-end mb-4">
                <button @click="exportToExcel" :disabled="isExporting"
                    class="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition text-sm flex items-center disabled:bg-green-300">
                    <i v-if="isExporting" class="fa-solid fa-spinner animate-spin mr-2"></i>
                    <i v-else class="fa-solid fa-file-excel mr-2"></i>
                    <span>{{ isExporting ? 'Mengekspor...' : 'Ekspor ke Excel' }}</span>
                </button>
            </div>

            <div v-if="loading" class="text-center py-10 text-gray-500">
                <i class="fa-solid fa-spinner animate-spin text-2xl"></i>
                <p>Memuat data...</p>
            </div>

            <div v-else-if="rekapList.length > 0" class="overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-500" style="min-width: 1400px;">
                    <thead class="text-xs text-gray-700 bg-gray-50 text-center whitespace-nowrap">
                        <tr>
                            <th class="px-4 py-3 border" rowspan="2">NIP</th>
                            <th class="px-4 py-3 border" rowspan="2">Nama</th>
                            <th class="px-4 py-3 border" rowspan="2">Tipe Karyawan</th>
                            <th class="px-4 py-3 border" rowspan="2">Jabatan</th>
                            <th class="px-4 py-3 border" rowspan="2">Lokasi</th>
                            <th class="px-4 py-3 border" colspan="2">Kehadiran</th>
                            <th class="px-4 py-3 border" colspan="3">Izin</th>
                            <th class="px-4 py-3 border" rowspan="2">Alpha</th>
                            <th class="px-4 py-3 border" rowspan="2">Tak Lengkap</th>
                            <th class="px-4 py-3 border" colspan="2">Terlambat</th>
                            <th class="px-4 py-3 border" colspan="2">Pulang Awal</th>
                            <th class="px-4 py-3 border" rowspan="2">Lembur (Jam)</th>
                        </tr>
                        <tr>
                            <th class="px-4 py-3 border">Kali</th>
                            <th class="px-4 py-3 border">Total Jam</th>
                            <th class="px-4 py-3 border">Total</th>
                            <th class="px-4 py-3 border">Berbayar</th>
                            <th class="px-4 py-3 border">Tidak Berbayar</th>
                            <th class="px-4 py-3 border">Kali</th>
                            <th class="px-4 py-3 border">Total Jam</th>
                            <th class="px-4 py-3 border">Kali</th>
                            <th class="px-4 py-3 border">Total Jam</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in rekapList" :key="item.nip" class="bg-white border-b hover:bg-gray-50">
                            <td class="px-4 py-2 border">{{ item.nip }}</td>
                            <td class="px-4 py-2 border font-medium text-gray-900 whitespace-nowrap">{{ item.nama }}
                            </td>
                            <td class="px-4 py-2 border">{{ item.tipe_karyawan }}</td>
                            <td class="px-4 py-2 border">{{ item.jabatan }}</td>
                            <td class="px-4 py-2 border">{{ item.lokasi }}</td>
                            <td class="px-4 py-2 border text-center">{{ item.total_kehadiran }}</td>
                            <td class="px-4 py-2 border text-center">{{ formatMinutesToHours(item.total_menit_kehadiran)
                            }}</td>
                            <td class="px-4 py-2 border text-center">{{ item.total_izin }}</td>
                            <td class="px-4 py-2 border text-center">{{ item.total_izin_berbayar }}</td>
                            <td class="px-4 py-2 border text-center">{{ item.total_izin_tidak_berbayar }}</td>
                            <td class="px-4 py-2 border text-center">{{ item.total_tidak_hadir }}</td>
                            <td class="px-4 py-2 border text-center">{{ item.total_absen_tidak_lengkap }}</td>
                            <td class="px-4 py-2 border text-center">{{ item.total_terlambat }}</td>
                            <td class="px-4 py-2 border text-center">{{ formatMinutesToHours(item.total_menit_terlambat)
                            }}</td>
                            <td class="px-4 py-2 border text-center">{{ item.total_pulang_awal }}</td>
                            <td class="px-4 py-2 border text-center">{{
                                formatMinutesToHours(item.total_menit_pulang_awal) }}</td>
                            <td class="px-4 py-2 border text-center">{{ item.total_jam_lembur }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div v-else class="text-center py-10 text-gray-500">
                <p>Tidak ada data yang cocok dengan filter yang Anda pilih.</p>
            </div>


            <Paginator v-if="totalRecords > 0" :rows="lazyParams.rows" :totalRecords="totalRecords"
                :first="lazyParams.first" @page="onPage" :rowsPerPageOptions="[2, 10, 25, 50]" class="mt-4"></Paginator>
        </div>
        <div class="mb-16"></div>
    </BasePage>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import BasePage from '@/layouts/admin/BasePage.vue';
import Paginator from 'primevue/paginator';
import { toast } from 'vue3-toastify';
import { RekapPeriode, LaporanParams } from '@/models/laporanModel';
import { ExportRekapFull, fetchRekapPeriodePagination } from '@/services/laporanService';
import DatePicker from 'primevue/datepicker';
import { format } from 'date-fns';


const rekapList = ref<RekapPeriode[]>([]);
const loading = ref(false);
const isExporting = ref(false);
const totalRecords = ref(0);

const filters = reactive({
    search: '',
    startDate: '',
    endDate: '',
});

const lazyParams = ref({
    first: 0,
    rows: 10,
    page: 1,
});


const getRekapData = async () => {
    if (!filters.startDate || !filters.endDate) {
        toast.warn("Silakan pilih rentang tanggal terlebih dahulu.");
        return;
    }
    loading.value = true;
    try {
        const params: LaporanParams = {
            page: lazyParams.value.page,
            size: lazyParams.value.rows,
            search: filters.search,
            "start-date": format(filters.startDate, 'yyyy-MM-dd'),
            "end-date": format(filters.endDate, 'yyyy-MM-dd'),
        };
        const response = await fetchRekapPeriodePagination(params);
        rekapList.value = response.items;
        totalRecords.value = response.total;
    } catch (error) {
        toast.error("Gagal memuat data rekapitulasi.");
    } finally {
        loading.value = false;
    }
};

const base64ToBlob = (base64: string, contentType: string = ''): Blob => {
    const byteCharacters = atob(base64);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
};

const exportToExcel = async () => {
    if (!filters.startDate || !filters.endDate) {
        toast.warn("Silakan pilih rentang tanggal terlebih dahulu.");
        return;
    }
    isExporting.value = true;
    try {
        const params = {
            "start-date": format(filters.startDate, 'yyyy-MM-dd'),
            "end-date": format(filters.endDate, 'yyyy-MM-dd'),
        };
        const response = await ExportRekapFull(params);

        const excelBlob = base64ToBlob(response.file, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

        const url = window.URL.createObjectURL(excelBlob);

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', response.filename);
        document.body.appendChild(link);
        link.click();

        link.remove();
        window.URL.revokeObjectURL(url);

        toast.success("Laporan berhasil diunduh.");

    } catch (error) {
        toast.error("Gagal mengekspor data.");
    } finally {
        isExporting.value = false;
    }
}

const onPage = (event: any) => {
    lazyParams.value.page = event.page + 1;
    lazyParams.value.rows = event.rows;
    lazyParams.value.first = event.first;
    getRekapData();
};

const formatMinutesToHours = (totalMinutes: number): string => {
    if (totalMinutes == null || totalMinutes === 0) return '0 menit';
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.round(totalMinutes % 60);
    return `${hours} jam ${minutes} menit`;
};
</script>
