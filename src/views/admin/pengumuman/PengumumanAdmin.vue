<template>
    <BasePage>
        <ConfirmDialog></ConfirmDialog>

        <div class="mt-5 mb-5 flex justify-between items-center">
            <p class="text-3xl font-semibold text-slate-800">Pengumuman</p>

        </div>


        <div class="flex justify-between mb-4">
            <div class="relative w-full max-w-md">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </div>
                <input type="text" v-model="search"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                    placeholder="Cari Judul Pengumuman..." />
            </div>
            <button type="button" @click="goToAdd"
                class="flex items-center space-x-2 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">
                <i class="fa-solid fa-plus"></i>
                <span>Tambah Pengumuman</span>
            </button>
        </div>
        <div class="bg-white p-4 rounded-lg shadow-md">


            <DataTable :value="pengumumanList" lazy paginator :rows="lazyParams.rows"
                :rowsPerPageOptions="[5, 10, 20, 50]" :totalRecords="totalRecords" :loading="loading" @page="onPage"
                v-model:first="lazyParams.first" tableStyle="min-width: 50rem">

                <Column field="judul" header="Judul" style="width: 40%"></Column>
                <Column field="date_created" header="Dibuat Pada" style="width: 25%">
                    <template #body="slotProps">
                        {{ formatDate(slotProps.data.date_created) }}
                    </template>
                </Column>
                <Column field="is_active" header="Status" style="width: 15%">
                    <template #body="slotProps">
                        <span class="px-2 py-1 text-xs font-medium rounded-full"
                            :class="slotProps.data.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'">
                            {{ slotProps.data.is_active ? 'Aktif' : 'Tidak Aktif' }}
                        </span>
                    </template>
                </Column>
                <Column header="Action" style="width: 20%">
                    <template #body="slotProps">
                        <div class="space-x-3">
                            <a @click="goToDetail(slotProps.data.id)"
                                class="font-medium text-blue-600 hover:underline cursor-pointer">Edit</a>
                            <a @click="confirmDelete(slotProps.data.id)"
                                class="font-medium text-red-600 hover:underline cursor-pointer">Delete</a>
                        </div>
                    </template>
                </Column>
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
import { fetchPengumumanAdmin, deletePengumuman } from '@/services/pengumumanService';
import { Pengumuman, PengumumanParams } from '@/models/PengumumanModel';

const router = useRouter();
const confirm = useConfirm();

const pengumumanList = ref<Pengumuman[]>([]);
const loading = ref(false);
const totalRecords = ref(0);
const search = ref('');
let debounceTimer: any = null;

const lazyParams = ref({
    first: 0,
    rows: 10,
    page: 1,
});

const getPengumuman = async () => {
    loading.value = true;
    try {
        const params: PengumumanParams = {
            page: lazyParams.value.page,
            size: lazyParams.value.rows,
            search: search.value
        };
        const response = await fetchPengumumanAdmin(params);
        pengumumanList.value = response.items;
        totalRecords.value = response.total;
    } catch (error) {
        console.error("Gagal memuat data pengumuman:", error);
        toast.error("Gagal memuat data pengumuman.");
    } finally {
        loading.value = false;
    }
};

const onPage = (event: any) => {
    lazyParams.value.page = event.page + 1;
    lazyParams.value.rows = event.rows;
    lazyParams.value.first = event.first;
    getPengumuman();
};

const goToAdd = () => {
    router.push('/admin/pengumuman/add');
};

const goToDetail = (id: string) => {
    router.push(`/admin/pengumuman/${id}`);
};

const confirmDelete = (id: string) => {
    confirm.require({
        message: 'Apakah Anda yakin ingin menghapus pengumuman ini?',
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
        await deletePengumuman(id);
        toast.success("Pengumuman berhasil dihapus.");
        getPengumuman();
    } catch (error) {
        console.error("Gagal menghapus pengumuman:", error);
        toast.error("Gagal menghapus pengumuman.");
    }
};

const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
};

watch(search, () => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        lazyParams.value.page = 1;
        lazyParams.value.first = 0;
        getPengumuman();
    }, 500);
});

onMounted(() => {
    getPengumuman();
});
</script>