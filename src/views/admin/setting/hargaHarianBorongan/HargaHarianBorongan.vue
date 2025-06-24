<template>
    <BasePage>

        <div class="mt-5 mb-10 flex justify-between items-center">
            <p class="text-3xl font-semibold text-slate-800">Harga Harian Borongan</p>
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

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">

            <DataTable :value="records" lazy paginator :rows="lazyParams.rows" :rowsPerPageOptions="[5, 10, 20, 50]"
                :totalRecords="totalRecords" :loading="loading" @page="onPage" v-model:first="lazyParams.first"
                tableStyle="min-width: 50rem">
                <Column field="nama" header="Nama" style="width: 35%"></Column>
                <Column field="harga_normal" header="Harga Normal" style="width: 35%"></Column>
                <Column field="harga_lembur" header="Harga Lembur" style="width: 35%"></Column>
                <!-- Kolom Aksi dengan Template Kustom -->
                <Column header="Action" style="width: 30%">
                    <template #body="slotProps">
                        <div class="px-6 space-x-3">
                            <a @click="editItem(slotProps.data.id)"
                                class="font-medium text-blue-600 hover:underline cursor-pointer">Edit</a>
                            <a @click="deleteJab(slotProps.data.id)"
                                class="font-medium text-red-600 hover:underline cursor-pointer">Delete</a>
                        </div>
                    </template>
                </Column>
            </DataTable>


        </div>
    </BasePage>
</template>

<script setup lang="ts">
import BasePage from '@/layouts/admin/BasePage.vue'
import { useRouter } from 'vue-router'
import { ref, onMounted, watch } from 'vue'
import { toast } from 'vue3-toastify'

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { deleteHarga, fetchHargaPagination } from '@/services/hargaHarianBorongan';

const router = useRouter()

const records = ref([]);
const loading = ref(false);
const totalRecords = ref(0);
const search = ref('');
let debounceTimer: any = null;

const lazyParams = ref({
    first: 0,
    rows: 10,
    page: 1,
});

const addItem = () => {
    router.push('harga-harian-borongan/add');
}

const editItem = (id: any) => {
    router.push('harga-harian-borongan/' + id);
}

const loadLazyData = async () => {
    loading.value = true;
    try {
        const params = {
            page: lazyParams.value.page,
            search: search.value,
            size: lazyParams.value.rows
        }
        const response = await fetchHargaPagination(params);
        records.value = response.items;
        totalRecords.value = response.total;
    } catch (error) {
        console.error(error);
    } finally {
        loading.value = false;
    }
}

const onPage = (event: any) => {
    lazyParams.value.page = event.page + 1;
    lazyParams.value.rows = event.rows;
    loadLazyData();
};

const deleteJab = async (id: string) => {
    try {
        const response = await deleteHarga(id);
        if (response.status === 200) {
            toast.success("Sukses Menghapus Harga");
            loadLazyData();
        }
    } catch (error: any) {
        console.error(error);
    }
}


watch(search, () => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        lazyParams.value.page = 1;
        lazyParams.value.first = 0;
        console.log('Search:', search.value);
        loadLazyData();
    }, 500);
});

onMounted(() => {
    loadLazyData();
});
</script>