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
                <button type="button" @click="addShift"
                    class="flex items-center space-x-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">
                    <i class="fa-solid fa-plus"></i>
                    <span>Tambah Jadwal Kerja</span>
                </button>
            </div>
        </div>

        <div class="bg-white p-4 rounded-lg shadow-md">
            <DataTable :value="jadwalList" lazy paginator :rows="lazyParams.rows" :rowsPerPageOptions="[5, 10, 20, 50]"
                :totalRecords="totalRecords" :loading="loading" @page="onPage" v-model:first="lazyParams.first"
                tableStyle="min-width: 50rem">

                <Column field="kode" header="Kode" style="width: 20%"></Column>
                <Column field="shift" header="Nama Shift" style="width: 35%"></Column>
                <Column field="is_active" header="Status" style="width: 20%">
                    <template #body="slotProps">
                        <span class="px-2 py-1 text-xs font-medium rounded-full"
                            :class="slotProps.data.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'">
                            {{ slotProps.data.is_active ? 'Aktif' : 'Arship' }}
                        </span>
                    </template>
                </Column>
                <Column header="Action" style="width: 25%">
                    <template #body="slotProps">
                        <div class="space-x-3">
                            <a @click="editItem(slotProps.data.id, slotProps.data.is_active)" class="font-medium text-blue-600 hover:underline cursor-pointer">{{ slotProps.data.is_active? 'Edit': 'View' }}</a>
                            <a v-if="slotProps.data.is_active" @click="confirmDelete(slotProps.data.id)" class="font-medium text-red-600 hover:underline cursor-pointer">Non-aktifkan</a>
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
import { fetchjadwalPagination, deletejadwal } from '@/services/jadwalKerjaService';
import { JadwalKerja } from '@/models/jadwalModel';

const router = useRouter();
const confirm = useConfirm();

const jadwalList = ref<JadwalKerja[]>([]);
const loading = ref(false);
const totalRecords = ref(0);
const search = ref('');
let debounceTimer: any = null;

const lazyParams = ref({
    first: 0,
    rows: 10,
    page: 1,
});

const getJadwal = async () => {
    loading.value = true;
    try {
        const params = {
            page: lazyParams.value.page,
            size: lazyParams.value.rows,
            search: search.value
        };
        const response = await fetchjadwalPagination(params);
        jadwalList.value = response.items;
        totalRecords.value = response.total;
    } catch (error) {
        toast.error("Gagal memuat data jadwal kerja.");
    } finally {
        loading.value = false;
    }
};

const onPage = (event: any) => {
    lazyParams.value.page = event.page + 1;
    lazyParams.value.rows = event.rows;
    lazyParams.value.first = event.first;
    getJadwal();
};

const addShift = () => {
    router.push('jadwal-kerja/add');
};

const editItem = (id: string, is_active: boolean) => {
    if (is_active) {
        router.push(`jadwal-kerja/edit/${id}`);    
    } else {
        router.push(`jadwal-kerja/${id}`);
    }
    
};

const confirmDelete = (id: string) => {
    confirm.require({
        message: 'Apakah Anda yakin ingin menonaktifkan jadwal kerja ini? Jadwal ini tidak akan bisa digunakan lagi.',
        header: 'Konfirmasi Non-aktifkan',
        icon: 'fa-solid fa-triangle-exclamation',
        acceptLabel: 'Ya, Non-aktifkan',
        rejectLabel: 'Batal',
        acceptClass: 'p-button-danger',
        accept: () => submitDelete(id),
    });
};

const submitDelete = async (id: string) => {
    try {
        await deletejadwal(id);
        toast.success("Jadwal kerja berhasil dinonaktifkan.");
        getJadwal();
    } catch (error: any) {
        console.error("Gagal menonaktifkan jadwal kerja.");
    }
};

watch(search, () => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        lazyParams.value.page = 1;
        lazyParams.value.first = 0;
        getJadwal();
    }, 500);
});

onMounted(() => {
    getJadwal();
});
</script>
