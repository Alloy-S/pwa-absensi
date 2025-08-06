<template>
    <BasePage>
        <div class="my-5">
            <p class="text-3xl font-semibold text-slate-800">Laporan Keterlambatan</p>
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

            <div v-if="loading" class="text-center py-10 text-gray-500">
                <i class="fa-solid fa-spinner animate-spin text-2xl"></i>
                <p>Memuat data...</p>
            </div>
            <div v-else-if="laporanData.length > 0" class="overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-500" style="min-width: 1000px;">
                    <thead class="text-xs text-gray-700 bg-gray-50 text-center whitespace-nowrap">
                        <tr>
                            <th class="px-4 py-3 border">NIP</th>
                            <th class="px-4 py-3 border">Nama</th>
                            <th class="px-4 py-3 border">Jabatan</th>
                            <th class="px-4 py-3 border">Lokasi</th>
                            <th class="px-4 py-3 border">Jadwal Kerja</th>
                            <th class="px-4 py-3 border">Tanggal Absen</th>
                            <th class="px-4 py-3 border">Jadwal Masuk</th>
                            <th class="px-4 py-3 border">Waktu Absen</th>
                            <th class="px-4 py-3 border">Durasi Terlambat (Menit)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in laporanData" :key="item.nip" class="bg-white border-b hover:bg-gray-50">
                            <td class="px-4 py-2 border">{{ item.nip }}</td>
                            <td class="px-4 py-2 border font-medium text-gray-900">{{ item.nama }}</td>
                            <td class="px-4 py-2 border">{{ item.jabatan }}</td>
                            <td class="px-4 py-2 border">{{ item.lokasi }}</td>
                            <td class="px-4 py-2 border">{{ item.jadwal_kerja }}</td>
                            <td class="px-4 py-2 border text-center">{{ formatDate(item.date_absensi) }}</td>
                            <td class="px-4 py-2 border text-center">{{ item.jadwal_time_in }}</td>
                            <td class="px-4 py-2 border text-center">{{ formatDateTime(item.waktu_absen) }}</td>
                            <td class="px-4 py-2 border text-center font-semibold text-red-600">{{
                                formatMinutesToHours(item.menit_terlambat)
                            }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else class="text-center py-10 text-gray-500">
                <p>Tidak ada data keterlambatan yang ditemukan.</p>
            </div>


            <Paginator v-if="totalRecords > 0" :rows="lazyParams.rows" :totalRecords="totalRecords"
                :first="lazyParams.first" @page="onPage" :rowsPerPageOptions="[10, 25, 50]" class="mt-4"></Paginator>
        </div>
        <div class="mb-16"></div>
    </BasePage>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import BasePage from '@/layouts/admin/BasePage.vue';
import Paginator from 'primevue/paginator';
import { toast } from 'vue3-toastify';
import { DatangTerlambat, LaporanParams } from '@/models/laporanModel';
import { fetchDatangTerlambatPagination } from '@/services/laporanService';


const laporanData = ref<DatangTerlambat[]>([]);
const loading = ref(false);
const totalRecords = ref(0);
let debounceTimer: any = null;

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
            page: lazyParams.value.page,
            size: lazyParams.value.rows,
            search: filters.search,
            "start-date": filters.startDate,
            "end-date": filters.endDate,
        };
        const response = await fetchDatangTerlambatPagination(params);
        laporanData.value = response.items;
        totalRecords.value = response.total;
    } catch (error) {
        toast.error("Gagal memuat laporan keterlambatan.");
    } finally {
        loading.value = false;
    }
};

const formatMinutesToHours = (totalMinutes: number): string => {
    if (totalMinutes == null || totalMinutes === 0) return '00:00';
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.round(totalMinutes % 60);
    return `${hours} jam ${minutes} menit`;
};

const onPage = (event: any) => {
    lazyParams.value.page = event.page + 1;
    lazyParams.value.rows = event.rows;
    lazyParams.value.first = event.first;
    getLaporan();
};

const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' });
const formatDateTime = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

watch(() => filters.search, () => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        lazyParams.value.page = 1;
        lazyParams.value.first = 0;
        getLaporan();
    }, 500);
});

</script>
