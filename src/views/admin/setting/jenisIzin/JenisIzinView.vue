<template>
    <BasePage>

        <ConfirmDialog></ConfirmDialog>

        <div class="mt-5 mb-10 flex justify-between items-center">
            <p class="text-3xl font-semibold text-slate-800">Pengaturan Jenis Izin</p>
        </div>


        <div class="flex justify-between mb-5">

            <div class="flex items-center max-w-md">
                <div class="relative w-full">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <input type="text" v-model="search"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                        placeholder="Cari berdasarkan nama..." />
                </div>
            </div>

            <div>
                <button type="button" @click="addItem"
                    class="flex items-center space-x-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">
                    <i class="fa-solid fa-plus"></i>
                    <span>Tambah Jenis Izin</span>
                </button>
            </div>
        </div>

        <div class="p-3 bg-white rounded-md shadow-md">
            <DataTable :value="records" lazy paginator :rows="lazyParams.rows" :rowsPerPageOptions="[5, 10, 20, 50]"
                :totalRecords="totalRecords" :loading="loading" @page="onPage" v-model:first="lazyParams.first"
                tableStyle="min-width: 50rem">
                <Column field="nama" header="Nama Izin" style="width: 25%"></Column>
                <Column field="kuota_default" header="Kuota Default (Hari)" style="width: 15%"></Column>
                <Column field="periode_reset" header="Periode Reset" style="width: 20%"></Column>
                <Column field="berlaku_setelah_bulan" header="Berlaku Setelah (Bulan)" style="width: 20%"></Column>
                <Column header="Aksi" style="width: 20%">
                    <template #body="slotProps">
                        <div class="px-6 space-x-3">
                            <a @click="editItem(slotProps.data.id)"
                                class="font-medium text-blue-600 hover:underline cursor-pointer">Edit</a>
                            <a @click="confirmDelete(slotProps.data.id)"
                                class="font-medium text-red-600 hover:underline cursor-pointer">Delete</a>
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>
    </BasePage>
</template>

<script setup lang="ts">
import BasePage from '@/layouts/admin/BasePage.vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useConfirm } from "primevue/useconfirm";
import ConfirmDialog from 'primevue/confirmdialog';
import { toast } from 'vue3-toastify';

import { fetchJenisIzinPagination, deleteJenisIzin } from '@/services/jenisIzinService';
import { JenisIzin, JenisIzinPagination } from '@/models/jenisIzinModel';

const router = useRouter();
const confirm = useConfirm();


const records = ref<JenisIzin[]>([]);
const loading = ref(false);
const totalRecords = ref(0);
const search = ref('');
let debounceTimer: any = null;

const lazyParams = ref({
    first: 0,
    rows: 10,
    page: 1,
});


const loadLazyData = async () => {
    loading.value = true;
    try {
        const params = {
            page: lazyParams.value.page,
            size: lazyParams.value.rows,
            search: search.value
        };
        const response: JenisIzinPagination = await fetchJenisIzinPagination(params);
        records.value = response.items;
        totalRecords.value = response.total;
    } catch (error) {
        console.error("Gagal memuat data jenis izin:", error);
    } finally {
        loading.value = false;
    }
};


const onPage = (event: any) => {
    lazyParams.value.page = event.page + 1;
    lazyParams.value.rows = event.rows;
    lazyParams.value.first = event.first;
    loadLazyData();
};


watch(search, () => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        lazyParams.value.page = 1;
        lazyParams.value.first = 0;
        loadLazyData();
    }, 500);
});


const addItem = () => {
    router.push('/admin/pengaturan/jenis-izin/add');
};

const editItem = (id: string) => {
    router.push(`/admin/pengaturan/jenis-izin/${id}`);
};


const confirmDelete = (id: string) => {
    confirm.require({
        message: 'Apakah Anda yakin ingin menghapus jenis izin ini?',
        header: 'Konfirmasi Penghapusan',
        icon: 'fa-solid fa-triangle-exclamation',
        acceptLabel: 'Ya, Hapus',
        rejectLabel: 'Batal',
        acceptClass: 'p-button-danger',
        accept: () => {
            deleteItem(id);
        }
    });
};

const deleteItem = async (id: string) => {
    try {
        await deleteJenisIzin(id);
        toast.success("Jenis izin berhasil dihapus.");
        loadLazyData();
    } catch (error) {
        console.error("Gagal menghapus jenis izin:", error);
    }
};


onMounted(() => {
    loadLazyData();
});
</script>
