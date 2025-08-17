<template>
    <BasePage>
        <div class="my-5 flex justify-between items-center">
            <p class="text-3xl font-semibold text-slate-800">Riwayat Penggajian</p>
        </div>


        <div class="bg-white p-4 mb-5 rounded-lg shadow-md">
            <div class="flex justify-center flex-row gap-4 items-end">
                <div class="flex flex-col">
                    <label class="text-sm font-medium mb-1">Periode Mulai</label>
                    <DatePicker v-model="(filters['periode-start'] as any)" dateFormat="dd/mm/yy" class="w-full" />
                </div>
                <div class="flex flex-col">
                    <label class="text-sm font-medium mb-1">Periode Selesai</label>
                    <DatePicker v-model="(filters['periode-end'] as any)" dateFormat="dd/mm/yy" class="w-full" />
                </div>
                <div class="flex flex-col">
                    <label class="block mb-2 text-sm font-medium text-gray-700">Status</label>
                    <select v-model="filters.status"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option value="all">Semua Status</option>
                        <option value="FINAL">Final</option>
                        <option value="DRAFT">Draft</option>
                    </select>
                </div>
                <div class="flex flex-col flex-1">
                    <label for="grup-gaji" class="block mb-2 text-sm font-medium text-gray-700">Pilih Grup Gaji</label>
                    <select id="grup-gaji" v-model="filters['grup-gaji']"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option disabled value="">Pilih grup</option>
                        <option v-for="grup in grupGajiList" :key="grup.id" :value="grup.id">{{ grup.grup_name }}
                        </option>
                    </select>
                </div>
                <button @click="getRiwayatPenggajian"
                    class="flex items-center gap-2 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800">
                    <i class="fa-solid fa-search"></i>
                    <span>Cari</span>
                </button>
            </div>
        </div>


        <div class="bg-white p-4 rounded-lg shadow-md">
            <DataTable :value="RiwayatPenggajianList" lazy paginator :rows="lazyParams.rows"
                :rowsPerPageOptions="[10, 25, 50]" :totalRecords="totalRecords" :loading="loading" @page="onPage"
                v-model:first="lazyParams.first" tableStyle="min-width: 50rem" dataKey="id">
                <template #loading> Memuat data riwayat... </template>

                <Column header="Periode" style="width: 25%">
                    <template #body="slotProps">
                        {{ formatDate(slotProps.data.periode_start) }} - {{ formatDate(slotProps.data.periode_end) }}
                    </template>
                </Column>
                <Column field="grup_name" header="Grup Gaji" style="width: 25%"></Column>
                <Column field="status" header="Status" style="width: 15%">
                    <template #body="slotProps">
                        <span class="px-2 py-1 text-xs font-medium rounded-full"
                            :class="getStatus(slotProps.data.status)">
                            {{ slotProps.data.status }}
                        </span>
                    </template>
                </Column>
                <Column header="Aksi" style="width: 15%">
                    <template #body="slotProps">
                        <div class="px-6">
                            <a @click="goToDetail(slotProps.data.id)"
                                class="font-medium text-blue-600 hover:underline cursor-pointer">View</a>
                            <a @click="exportToExcel(slotProps.data.id)"
                                class="ml-2 font-medium text-green-600 hover:underline cursor-pointer">Export</a>
                        </div>
                    </template>
                </Column>
                <template #empty>
                    <div class="text-center py-5">
                        <p class="text-gray-500">Tidak ada data riwayat absensi yang ditemukan.</p>
                    </div>
                </template>
            </DataTable>
        </div>
        <div class="mb-16"></div>
    </BasePage>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import BasePage from '@/layouts/admin/BasePage.vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import DatePicker from 'primevue/datepicker';
import { format } from 'date-fns';
import { RiwayatPenggajianPaginationItem, RiwayatPenggajianParams } from '@/models/riwayatPenggajianModel';
import { ExportRiwayatPenggajian, fetchRiwayatPenggajianPagination } from '@/services/riwayatPenggajianService';
import { GrupGaji } from '@/models/GrupGajiModel';
import { fetchAllGrupGaji } from '@/services/GrupGajiService';
import { toast } from 'vue3-toastify';

const router = useRouter();

const RiwayatPenggajianList = ref<RiwayatPenggajianPaginationItem[]>([]);
const loading = ref(false);
const totalRecords = ref(0);
const filters = ref<RiwayatPenggajianParams>({
    page: 1,
    size: 10,
    "periode-start": null,
    "periode-end": null,
    status: null,
    "grup-gaji": null
});
const grupGajiList = ref<GrupGaji[]>([]);
const lazyParams = ref({
    first: 0,
    rows: 10,
    page: 1,
});

const getStatus = (status: string) => {
    if (status === 'FINAL') return 'bg-green-100 text-green-800';
    if (status === 'DRAFT') return 'bg-yellow-100 text-yellow-800';
    if (status === 'DIBATALKAN') return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
};

const getRiwayatPenggajian = async () => {
    loading.value = true;
    try {
        const params: RiwayatPenggajianParams = {
            page: lazyParams.value.page,
            size: lazyParams.value.rows,
            "periode-start": filters["periode-start"] ? format(new Date(filters["periode-start"]), 'yyyy-MM-dd') : null,
            "periode-end": filters["periode-end"] ? format(new Date(filters["periode-end"]), 'yyyy-MM-dd') : null,
            status: filters.value.status && filters.value.status !== 'all' ? filters.value.status : null,
            "grup-gaji": filters['grup-gaji'] || null,
        };

        const response = await fetchRiwayatPenggajianPagination(params);
        RiwayatPenggajianList.value = response.items;
        totalRecords.value = response.total;
    } catch (error) {
        console.error("Gagal memuat riwayat absensi.");
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

const exportToExcel = async (id: string) => {

    try {
        const response = await ExportRiwayatPenggajian(id);

        const excelBlob = base64ToBlob(response.file, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

        const url = window.URL.createObjectURL(excelBlob);

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', response.filename);
        document.body.appendChild(link);
        link.click();

        link.remove();
        window.URL.revokeObjectURL(url);

        toast.success("Riwayat Gaji berhasil diunduh.");

    } catch (error) {
        toast.error("Gagal mengekspor data.");
    } finally {

    }
}

const onPage = (event: any) => {
    lazyParams.value.page = event.page + 1;
    lazyParams.value.rows = event.rows;
    lazyParams.value.first = event.first;
    getRiwayatPenggajian();
};

const goToDetail = (id: string) => {
    router.push(`/admin/penggajian/riwayat/${id}`);
};

const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
};

onMounted(async () => {
    grupGajiList.value = await fetchAllGrupGaji();
    getRiwayatPenggajian();
});
</script>
