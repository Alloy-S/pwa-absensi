<template>
    <BasePage>
        <ConfirmDialog></ConfirmDialog>
        <div class="mt-5 mb-10 flex justify-between items-center">
            <p class="text-3xl font-semibold text-slate-800">Lokasi</p>
        </div>

        <div class="flex justify-between mb-5">

            <div class="flex items-center max-w-md">
                <label for="simple-search" class="sr-only">Search</label>
                <div class="relative w-full mr-3">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <input type="text" id="simple-search" v-model="search"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Cari..." required />
                </div>
            </div>

            <div>
                <button type="button" @click="addItem"
                    class="flex items-center space-x-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    <i class="fa-solid fa-plus"></i>
                    <span class="">Tambah</span>
                </button>
            </div>
        </div>

        <div class="bg-white p-4 rounded-lg shadow-md">
            <DataTable :value="lokasiList" lazy paginator :rows="lazyParams.rows" :rowsPerPageOptions="[5, 10, 20, 50]"
                :totalRecords="totalRecords" :loading="loading" @page="onPage" v-model:first="lazyParams.first"
                tableStyle="min-width: 50rem">

                <Column field="name" header="Nama Lokasi" style="width: 75%"></Column>
                <Column header="Action" style="width: 25%">
                    <template #body="slotProps">
                        <div class="space-x-3">
                            <a @click="editItem(slotProps.data.id)"
                                class="font-medium text-blue-600 hover:underline cursor-pointer">Edit</a>
                            <a @click="confirmDelete(slotProps.data.id)"
                                class="font-medium text-red-600 hover:underline cursor-pointer">Delete</a>
                        </div>
                    </template>
                </Column>

                <template #empty>
                    <div class="text-center py-5">
                        <p class="text-gray-500">Tidak ada data jadwal kerja yang ditemukan.</p>
                    </div>
                </template>
            </DataTable>



        </div>
    </BasePage>
</template>

<script setup lang="ts">
import BasePage from '@/layouts/admin/BasePage.vue'
import { Lokasi } from '@/models/lokasiModel';
import { deleteLokasi, fetchLokasiPagination } from '@/services/lokasiService';
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { useConfirm } from "primevue/useconfirm";
import ConfirmDialog from 'primevue/confirmdialog';


const lokasiList = ref<Lokasi[]>([]);
const search = ref('');
const confirm = useConfirm();
const totalRecords = ref(0);
let debounceTimer: any = null;
const loading = ref(false);
const router = useRouter()

const addItem = () => {
    router.push('lokasi/add');
}

const editItem = (id: any) => {
    router.push('lokasi/' + id);
}

const lazyParams = ref({
    first: 0,
    rows: 10,
    page: 1,
});

const getLokasi = async () => {
    loading.value = true;
    try {

        const params = {
            page: lazyParams.value.page,
            size: lazyParams.value.rows,
            search: search.value
        };

        const response = await fetchLokasiPagination(params)

        lokasiList.value = response.items;
        totalRecords.value = response.total;

        console.log(lokasiList.value);
    } catch (error) {
        console.error(error)
    } finally {
        loading.value = false;
    }
}

const onPage = (event: any) => {
    lazyParams.value.page = event.page + 1;
    lazyParams.value.rows = event.rows;
    lazyParams.value.first = event.first;
    getLokasi();
};

const confirmDelete = (id: string) => {
    confirm.require({
        message: 'Apakah Anda yakin ingin menghapus Lokasi ini? Lokasi ini tidak akan bisa digunakan lagi.',
        header: 'Konfirmasi Hapus',
        icon: 'fa-solid fa-triangle-exclamation',
        acceptLabel: 'Ya, Hapus',
        rejectLabel: 'Batal',
        acceptClass: 'p-button-danger',
        accept: () => deleteLok(id),
    });
};

const deleteLok = async (id: string) => {
    try {

        console.log('Delete item with id:', id);

        const response = await deleteLokasi(id);

        if (response.status === 200) {
            toast.success("Success Delete Lokasi")
            getLokasi()
        }
    } catch (error) {
        console.error(error)
    }
}

watch(search, () => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        lazyParams.value.page = 1;
        lazyParams.value.first = 0;
        getLokasi();
    }, 500);
});

onMounted(() => {
    getLokasi()
})
</script>