<template>
    <BasePage>
        <ConfirmDialog></ConfirmDialog>
        <div class="mt-5 mb-10 flex justify-between items-center">
            <p class="text-3xl font-semibold text-slate-800">Hari Libur</p>
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

            <DataTable :value="LiburList.items" lazy paginator :rows="lazyParams.rows" :totalRecords="LiburList.total"
                :rowsPerPageOptions="[5, 10, 20, 50]" @page="onPage" dataKey="id" v-model:first="lazyParams.first">

                <Column field="date" header="Tanggal"></Column>
                <Column field="description" header="Event"></Column>

                <!-- <Column header="Type">
                    <template #body="slotProps">
                        <span>{{ slotProps.data.is_holiday ? 'Libur' : 'Cuti Bersama' }}</span>
                    </template>
                </Column> -->

                <Column header="Action" style="min-width: 12rem">
                    <template #body="slotProps">
                        <div class="px-6 space-x-3">
                            <a @click="editItem(slotProps.data.id)"
                                class="font-medium text-blue-600 hover:underline cursor-pointer">Edit</a>
                            <a @click="confirmDelete(slotProps.data.id)"
                                class="font-medium text-red-600 hover:underline cursor-pointer">Delete</a>
                        </div>
                    </template>
                </Column>

                <template #empty>
                    <div class="text-center p-4">
                        Tidak ada data hari libur yang ditemukan.
                    </div>
                </template>

            </DataTable>

        </div>
    </BasePage>
</template>

<script setup lang="ts">
import BasePage from '@/layouts/admin/BasePage.vue'
import { LiburPagination } from '@/models/liburModel';
import { useRouter } from 'vue-router'
import { ref, onMounted, watch } from 'vue';
import { toast } from 'vue3-toastify'
import { deleteLibur, fetchLiburPagination } from '@/services/liburService';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ConfirmDialog from 'primevue/confirmdialog';
import { useConfirm } from "primevue/useconfirm";


const router = useRouter()
const LiburList = ref<LiburPagination>({ pages: 1, total: 0, items: [] });
const search = ref('');
let debounceTimer: any = null;
const confirm = useConfirm();
const lazyParams = ref({
    first: 0,
    rows: 10,
    page: 1,
});

const addItem = () => {
    router.push('hari-libur/add');
}

const editItem = (id: any) => {
    router.push('hari-libur/' + id);
}

const getLibur = async () => {
    const params = {
        page: lazyParams.value.page,
        size: lazyParams.value.rows,
        search: search.value
    }

    const response = fetchLiburPagination(params)

    LiburList.value = (await response);
}

const hitDeleteLibur = async (id: string) => {

    console.log('Delete item with id:', id);

    const response = await deleteLibur(id);

    if (response.status === 200) {
        toast.success("Success Delete Jabatan")
        getLibur()
    }

}

const confirmDelete = (id: string) => {
    confirm.require({
        message: 'Apakah Anda yakin ingin menghapus Tanggal ini?',
        header: 'Konfirmasi Hapus',
        icon: 'fa-solid fa-triangle-exclamation',
        acceptLabel: 'Ya, Hapus',
        rejectLabel: 'Batal',
        acceptClass: 'p-button-danger',
        accept: () => hitDeleteLibur(id),
    });
};

const onPage = (event: any) => {
    lazyParams.value.page = event.page + 1;
    lazyParams.value.rows = event.rows;
    getLibur();
};

watch(search, (_newVal, _oldVal) => {

    if (debounceTimer) clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {

        lazyParams.value.page = 1;
        lazyParams.value.first = 0;
        getLibur()

    }, 1000);
})

onMounted(() => {
    getLibur()
})
</script>