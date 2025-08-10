<template>
    <BasePage>
        <div class="my-5">
            <p class="text-3xl font-semibold text-slate-800">Laporan Upah Karyawan Borongan</p>
        </div>

        <div class="bg-white p-4 mb-5 rounded-lg shadow-md">
            <div class="flex flex-col md:flex-row gap-4 items-end">
                <div class="flex flex-col">
                    <label class="text-sm font-medium mb-1">Periode Mulai</label>
                    <input type="date" v-model="filters.startDate"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                </div>
                <div class="flex flex-col">
                    <label class="text-sm font-medium mb-1">Periode Selesai</label>
                    <input type="date" v-model="filters.endDate" :min="filters.startDate"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                </div>
                <div class="flex flex-col flex-1">
                    <label class="text-sm font-medium mb-1">Cari Nama / NIP</label>
                    <input type="text" v-model="filters.search" placeholder="Cari nama atau NIP"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                </div>
                <button @click="getLaporan"
                    class="flex items-center gap-2 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800">
                    <i class="fa-solid fa-search"></i>
                    <span>Proses</span>
                </button>
            </div>
        </div>


        <div class="bg-white p-4 rounded-lg shadow-md">
            <div v-if="laporanList.length > 0" class="flex justify-end mb-4">
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
            <div v-else-if="laporanList.length > 0" class="overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-500" style="min-width: 1000px;">
                    <thead class="text-xs text-gray-700 bg-gray-50 text-center whitespace-nowrap">
                        <tr>
                            <th class="px-4 py-3 border text-left">NIP</th>
                            <th class="px-4 py-3 border text-left">Nama</th>
                            <th v-for="header in dateHeaders" :key="header.date" class="px-4 py-3 border">
                                {{ header.day }} <br> {{ formatDateForHeader(header.date) }}
                            </th>
                            <th class="px-4 py-3 border">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in laporanList" :key="item.nip" class="bg-white border-b hover:bg-gray-50">
                            <td class="px-4 py-2 border font-medium text-gray-900 text-left">{{ item.nip }}</td>
                            <td class="px-4 py-2 border font-medium text-gray-900 text-left">{{ item.nama }}</td>
                            <td v-for="header in dateHeaders" :key="header.date" class="px-4 py-2 border text-right">
                                {{ formatCurrency(getUpahFromDate(item.upah, header.date)) }}
                            </td>
                            <td class="px-4 py-2 border text-right font-semibold bg-gray-50">{{
                                formatCurrency(item.total_upah) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else class="text-center py-10 text-gray-500">
                <p>Tidak ada data yang ditemukan untuk periode dan filter yang dipilih.</p>
            </div>


            <Paginator v-if="totalRecords > 0" :rows="lazyParams.rows" :totalRecords="totalRecords"
                :first="lazyParams.first" @page="onPage" :rowsPerPageOptions="[10, 25, 50]" class="mt-4"></Paginator>
        </div>
        <div class="mb-16"></div>
    </BasePage>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import BasePage from '@/layouts/admin/BasePage.vue';
import Paginator from 'primevue/paginator';
import { toast } from 'vue3-toastify';
import { HeaderUpahItem, LaporanParams, UpahBorongan, UpahItem } from '@/models/laporanModel';
import { ExportUpahBorongan, fetchUpahBoronganPagination } from '@/services/laporanService';


const loading = ref(false);
const isExporting = ref(false);
const dateHeaders = ref<HeaderUpahItem[]>([]);
const laporanList = ref<UpahBorongan[]>([]);
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


const getLaporan = async () => {
    if (!filters.startDate || !filters.endDate) {
        toast.warn("Silakan pilih rentang tanggal terlebih dahulu.");
        return;
    }
    loading.value = true;
    try {
        const params: LaporanParams = {
            search: filters.search,
            "start-date": filters.startDate,
            "end-date": filters.endDate,
            page: lazyParams.value.page,
            size: lazyParams.value.rows,
        };
        const response = await fetchUpahBoronganPagination(params);
        laporanList.value = response.items;
        dateHeaders.value = response.headers;
        totalRecords.value = response.total;
    } catch (error) {
        console.error("Gagal memuat laporan upah borongan.");
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
            "start-date": filters.startDate,
            "end-date": filters.endDate,
        };
        const response = await ExportUpahBorongan(params);

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
    getLaporan();
};


const getUpahFromDate = (listUpah: UpahItem[], date: string): number | null => {
    const found = listUpah.find(w => w.date === date);
    return found ? found.upah : null;
};

const formatCurrency = (value: number | null) => {
    if (value == null || value === 0) return '';
    return new Intl.NumberFormat('id-ID').format(value);
};

const formatDateForHeader = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit' });
};

</script>
