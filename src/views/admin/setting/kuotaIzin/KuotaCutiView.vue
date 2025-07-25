<template>
    <BasePage>
        <ConfirmDialog></ConfirmDialog>

        <div class="my-5 flex justify-between items-center">
            <p class="text-3xl font-semibold text-slate-800">Data Kuota Cuti Karyawan</p>
            <button type="button" @click="confirmGenerate" :disabled="isGenerating"
                class="flex items-center space-x-2 text-white bg-green-600 hover:bg-green-700 disabled:bg-green-300 font-medium rounded-lg text-sm px-5 py-2.5">
                <i class="fa-solid fa-arrows-rotate" :class="{ 'animate-spin': isGenerating }"></i>
                <span>{{ isGenerating ? 'Memproses...' : 'Generate Kuota Tahunan' }}</span>
            </button>
        </div>
        
        <div class="flex justify-end mb-4">
            <div class="relative w-full max-w-md">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </div>
                <input type="text" v-model="search"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                    placeholder="Cari Nama Karyawan..." />
            </div>
        </div>

        <div class="p-3 bg-white rounded-md shadow-md">
            
            <DataTable :value="karyawanList" lazy paginator :rows="lazyParams.rows"
                :rowsPerPageOptions="[5, 10, 20, 50]" :totalRecords="totalRecords" :loading="loading" @page="onPage"
                v-model:first="lazyParams.first" tableStyle="min-width: 50rem">
                <Column field="fullname" header="Nama Karyawan" style="width: 25%"></Column>
                <Column field="sisa_cuti_tahunan" header="Sisa Cuti" style="width: 25%"></Column>
                <Column field="total_cuti_tahunan" header="Total Cuti" style="width: 25%"></Column>
                <Column header="Action" style="width: 20%">
                    <template #body="slotProps">
                        <div class="px-6 space-x-3">
                            <a @click="goToDetail(slotProps.data.id)"
                                class="font-medium text-blue-600 hover:underline cursor-pointer">View</a>
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>
    </BasePage>
</template>

<script setup lang="ts">
import BasePage from '@/layouts/admin/BasePage.vue';
import { useRouter } from 'vue-router';
import { ref, onMounted, watch } from 'vue';
import { KaryawanKuota } from '@/models/userModel';
import { fetchKaryawanKuotaPagination } from '@/services/userService';
import { toast } from 'vue3-toastify';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { useConfirm } from "primevue/useconfirm";
import ConfirmDialog from 'primevue/confirmdialog';
import { generateKuotaTahunan } from '@/services/kuotaCutiService';

const router = useRouter();
const confirm = useConfirm();

const karyawanList = ref<KaryawanKuota[]>([]);
const loading = ref(false);
const totalRecords = ref(0);
const search = ref('');
let debounceTimer: any = null;


const isGenerating = ref(false);

const lazyParams = ref({
    first: 0,
    rows: 10,
    page: 1,
});

const goToDetail = (id: any) => {
    router.push(`kuota-cuti/${id}`);
};

const getKaryawan = async () => {
    loading.value = true;
    try {
        const params = {
            page: lazyParams.value.page,
            size: lazyParams.value.rows,
            search: search.value
        };
        const response = await fetchKaryawanKuotaPagination(params);
        karyawanList.value = response.items;
        totalRecords.value = response.total;
    } catch (error) {
        console.error("Gagal memuat data karyawan:", error);
        toast.error('Gagal memuat data karyawan.');
    } finally {
        loading.value = false;
    }
};

const onPage = (event: any) => {
    lazyParams.value.page = event.page + 1;
    lazyParams.value.rows = event.rows;
    lazyParams.value.first = event.first;
    getKaryawan();
};


const confirmGenerate = () => {
    confirm.require({
        message: 'Apakah Anda yakin ingin men-generate kuota cuti tahunan untuk semua karyawan? Proses ini tidak dapat dibatalkan.',
        header: 'Konfirmasi Generate Kuota',
        icon: 'fa-solid fa-triangle-exclamation',
        acceptLabel: 'Ya, Generate',
        rejectLabel: 'Batal',
        acceptClass: 'p-button-success',
        accept: () => {
            handleGenerate();
        }
    });
};

const handleGenerate = async () => {
    isGenerating.value = true;
    try {
        await generateKuotaTahunan();
        toast.success('Kuota cuti tahunan berhasil di-generate.');
        await getKaryawan();
    } catch (error) {
        console.error("Gagal men-generate kuota tahunan:", error);
        toast.error('Gagal men-generate kuota tahunan.');
    } finally {
        isGenerating.value = false;
    }
};

watch(search, () => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        lazyParams.value.page = 1;
        lazyParams.value.first = 0;
        getKaryawan();
    }, 500);
});

onMounted(() => {
    getKaryawan();
});
</script>