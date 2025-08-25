<template>
    <BasePage>
        <ConfirmDialog></ConfirmDialog>

        <div class="my-5 flex justify-between items-center">
            <p class="text-3xl font-semibold text-slate-800">Karyawan Terdaftar</p>
            <button type="button" @click="goToAdd"
                class="flex items-center space-x-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">
                <i class="fa-solid fa-plus"></i>
                <span>Tambah Karyawan</span>
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
                <Column field="lokasi" header="Lokasi" style="width: 20%"></Column>
                <Column field="jabatan" header="Jabatan" style="width: 10%"></Column>
                <Column field="tipe_karyawan" header="Tipe Karyawan" style="width: 10%"></Column>
                <Column header="Status" style="width: 15%">
                    <template #body="slotProps">
                        <span class="px-2 py-1 text-xs font-medium rounded-full"
                            :class="slotProps.data.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                            {{ slotProps.data.is_active ? 'Aktif' : 'Non-Aktif' }}
                        </span>
                    </template>
                </Column>
                <Column header="Action" style="width: 20%">
                    <template #body="slotProps">
                        <div class="px-6 space-x-3">
                            <a @click="goToDetail(slotProps.data.id)"
                                class="font-medium text-blue-600 hover:underline cursor-pointer">Edit</a>
                            <a @click="confirmNonActive(slotProps.data.id)"
                                class="font-medium text-red-600 hover:underline cursor-pointer">Non-Aktifkan</a>
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
import { Karyawan } from '@/models/userModel';
import { fetchKaryawanPagination, nonActiveKaryawan } from '@/services/userService';
import { toast } from 'vue3-toastify';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { useConfirm } from "primevue/useconfirm";
import ConfirmDialog from 'primevue/confirmdialog';

const router = useRouter();
const confirm = useConfirm();


const karyawanList = ref<Karyawan[]>([]);
const loading = ref(false);
const totalRecords = ref(0);
const search = ref('');
let debounceTimer: any = null;

const lazyParams = ref({
    first: 0,
    rows: 10,
    page: 1,
});


const goToAdd = () => {
    router.push('karyawan/add');
};

const goToDetail = (id: any) => {
    router.push(`karyawan/${id}`);
};


const getKaryawan = async () => {
    loading.value = true;
    try {
        const params = {
            page: lazyParams.value.page,
            size: lazyParams.value.rows,
            search: search.value
        };
        const response = await fetchKaryawanPagination(params);
        karyawanList.value = response.items;
        totalRecords.value = response.total;
    } catch (error) {
        console.error("Gagal memuat data karyawan:", error);
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


const confirmNonActive = (id: string) => {
    confirm.require({
        message: 'Apakah Anda yakin ingin menonaktifkan karyawan ini?',
        header: 'Konfirmasi Non-Aktifkan',
        icon: 'fa-solid fa-triangle-exclamation',
        acceptLabel: 'Ya, Non-Aktifkan',
        rejectLabel: 'Batal',
        acceptClass: 'p-button-danger',
        accept: () => {
            submitNonActiveKaryawan(id);
        }
    });
};

const submitNonActiveKaryawan = async (id: string) => {
    try {
        const response = await nonActiveKaryawan(id);
        if (response.status === 200) {
            toast.success('Karyawan berhasil dinonaktifkan');
            getKaryawan();
        }
    } catch (error) {
        console.error("Gagal menonaktifkan karyawan:", error);
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
