<template>
    <BasePage>
        <ConfirmDialog></ConfirmDialog>
        <div class="my-5 flex justify-between items-center">
            <p class="text-3xl font-semibold text-slate-800">Grup Gaji</p>

        </div>

        <div class="flex justify-between mb-4">
            <div class="relative w-full max-w-sm">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                    <i class="fa-solid fa-magnifying-glass text-gray-400"></i>
                </span>
                <input type="text" v-model="search"
                    class="w-full pl-10 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Cari kode atau nama grup" />
            </div>
            <button type="button" @click="addItem"
                class="flex items-center space-x-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">
                <i class="fa-solid fa-plus"></i>
                <span>Tambah Grup</span>
            </button>
        </div>

        <div class="bg-white p-4 rounded-lg shadow-md">

            <DataTable :value="grupList" lazy paginator :rows="lazyParams.rows" :rowsPerPageOptions="[10, 25, 50]"
                :totalRecords="totalRecords" :loading="loading" @page="onPage" v-model:first="lazyParams.first"
                tableStyle="min-width: 50rem">

                <Column field="grup_kode" header="Kode Grup" style="width: 25%"></Column>
                <Column field="grup_name" header="Nama Grup" style="width: 45%"></Column>
                <Column header="Action" style="width: 30%">
                    <template #body="slotProps">
                        <div class="space-x-3">
                            <a @click="goTolistKaryawan(slotProps.data.id)"
                                class="font-medium text-amber-600 hover:underline cursor-pointer">List Karyawan</a>
                            <a @click="editItem(slotProps.data.id)"
                                class="font-medium text-blue-600 hover:underline cursor-pointer">Edit</a>
                            <a @click="confirmDelete(slotProps.data.id)"
                                class="font-medium text-red-600 hover:underline cursor-pointer">Delete</a>
                        </div>
                    </template>
                </Column>

                <template #empty>
                    <div class="text-center py-5">
                        <p class="text-gray-500">Tidak ada data grup gaji yang ditemukan.</p>
                    </div>
                </template>
            </DataTable>
        </div>
        <div class="mb-16"></div>
    </BasePage>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import BasePage from '@/layouts/admin/BasePage.vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { useConfirm } from "primevue/useconfirm";
import ConfirmDialog from 'primevue/confirmdialog';
import { toast } from 'vue3-toastify';
import { GrupGaji } from '@/models/GrupGajiModel';
import { deleteGrupGaji, fetchGrupGajiPagination } from '@/services/GrupGajiService';

const router = useRouter();
const confirm = useConfirm();

const grupList = ref<GrupGaji[]>([]);
const loading = ref(false);
const totalRecords = ref(0);
const search = ref('');
let debounceTimer: any = null;

const lazyParams = ref({
    first: 0,
    rows: 10,
    page: 1,
});

const getGrupGaji = async () => {
    loading.value = true;
    try {
        const params = {
            page: lazyParams.value.page,
            size: lazyParams.value.rows,
            search: search.value
        };
        const response = await fetchGrupGajiPagination(params);
        grupList.value = response.items;
        totalRecords.value = response.total;
    } catch (error) {
        console.error("Gagal memuat data grup gaji.");
    } finally {
        loading.value = false;
    }
};

const onPage = (event: any) => {
    lazyParams.value.page = event.page + 1;
    lazyParams.value.rows = event.rows;
    lazyParams.value.first = event.first;
    getGrupGaji();
};

const addItem = () => {
    router.push('/admin/pengaturan/gaji/grup-gaji/add');
};

const editItem = (id: any) => {
    router.push(`/admin/pengaturan/gaji/grup-gaji/${id}`);
};

const goTolistKaryawan = (id: any) => {
    router.push(`/admin/pengaturan/gaji/grup-gaji/${id}/list-karyawan`);
};


const confirmDelete = (id: string) => {
    confirm.require({
        message: 'Apakah Anda yakin ingin menghapus grup gaji ini? Semua komponen dan karyawan yang terhubung akan terpengaruh.',
        header: 'Konfirmasi Hapus',
        icon: 'fa-solid fa-triangle-exclamation',
        acceptLabel: 'Ya, Hapus',
        rejectLabel: 'Batal',
        acceptClass: 'p-button-danger',
        accept: () => submitDelete(id),
    });
};

const submitDelete = async (id: string) => {
    try {
        await deleteGrupGaji(id);
        toast.success("Grup gaji berhasil dihapus.");
        getGrupGaji();
    } catch (error: any) {
        console.error("Gagal menghapus grup gaji.");
    }
};

watch(search, () => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        lazyParams.value.page = 1;
        lazyParams.value.first = 0;
        getGrupGaji();
    }, 500);
});

onMounted(() => {
    getGrupGaji();
});
</script>
